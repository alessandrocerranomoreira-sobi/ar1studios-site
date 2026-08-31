-- AR1 Studios: initial database foundation.
-- Target inspected empty: pykbaqlwrkamxtrmsswm.
-- Transactional; intentionally fails on existing objects instead of overwriting.
BEGIN;

CREATE SCHEMA ar1_private;
REVOKE ALL ON SCHEMA ar1_private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA ar1_private TO authenticated, service_role;

-- Private reservation only: no automatic privilege grant on signup.
CREATE TABLE ar1_private.admin_bootstrap (
  email text PRIMARY KEY CHECK (email=lower(btrim(email))),
  requested_at timestamptz NOT NULL DEFAULT now(),
  activated_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL
);
REVOKE ALL ON ar1_private.admin_bootstrap FROM PUBLIC, anon, authenticated;
GRANT ALL ON ar1_private.admin_bootstrap TO service_role;

CREATE TABLE public.ar1_staff (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'commercial')),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.ar1_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 200),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.ar1_client_users (
  client_id uuid NOT NULL REFERENCES public.ar1_clients(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (client_id, user_id)
);
CREATE INDEX ar1_client_users_user_idx ON public.ar1_client_users(user_id);

CREATE TABLE public.ar1_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.ar1_clients(id) ON DELETE RESTRICT,
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 250),
  client_description text CHECK (char_length(client_description) <= 5000),
  status text NOT NULL DEFAULT 'planning'
    CHECK (status IN ('planning', 'production', 'review', 'delivered', 'archived')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ar1_projects_client_idx ON public.ar1_projects(client_id);

CREATE TABLE public.ar1_quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 200),
  phone text NOT NULL CHECK (char_length(btrim(phone)) BETWEEN 8 AND 32),
  company text NOT NULL CHECK (char_length(btrim(company)) BETWEEN 1 AND 200),
  email text CHECK (char_length(email) <= 254),
  project_type text NOT NULL CHECK (char_length(btrim(project_type)) BETWEEN 1 AND 100),
  expected_date date,
  message text CHECK (char_length(message) <= 5000),
  source_path text CHECK (char_length(source_path) <= 500),
  status text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacting', 'proposal', 'won', 'lost')),
  internal_notes text CHECK (char_length(internal_notes) <= 10000),
  assigned_to uuid REFERENCES public.ar1_staff(user_id) ON DELETE SET NULL,
  client_id uuid REFERENCES public.ar1_clients(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ar1_quotes_created_idx ON public.ar1_quote_requests(created_at DESC);
CREATE INDEX ar1_quotes_status_idx ON public.ar1_quote_requests(status);
CREATE INDEX ar1_quotes_assignee_idx ON public.ar1_quote_requests(assigned_to);
CREATE INDEX ar1_quotes_client_idx ON public.ar1_quote_requests(client_id);

CREATE FUNCTION ar1_private.is_staff() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $func$
  SELECT EXISTS (SELECT 1 FROM public.ar1_staff
    WHERE user_id=(SELECT auth.uid()) AND active);
$func$;
CREATE FUNCTION ar1_private.is_admin() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $func$
  SELECT EXISTS (SELECT 1 FROM public.ar1_staff
    WHERE user_id=(SELECT auth.uid()) AND active AND role='admin');
$func$;
CREATE FUNCTION ar1_private.is_client_member(target_client uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $func$
  SELECT EXISTS (SELECT 1 FROM public.ar1_client_users
    WHERE client_id=target_client AND user_id=(SELECT auth.uid()) AND active);
$func$;
CREATE FUNCTION ar1_private.touch_updated_at() RETURNS trigger
LANGUAGE plpgsql SET search_path = ''
AS $func$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$func$;

REVOKE ALL ON ALL FUNCTIONS IN SCHEMA ar1_private FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION ar1_private.is_staff(), ar1_private.is_admin(),
  ar1_private.is_client_member(uuid) TO authenticated, service_role;

CREATE TRIGGER ar1_clients_updated BEFORE UPDATE ON public.ar1_clients
  FOR EACH ROW EXECUTE FUNCTION ar1_private.touch_updated_at();
CREATE TRIGGER ar1_projects_updated BEFORE UPDATE ON public.ar1_projects
  FOR EACH ROW EXECUTE FUNCTION ar1_private.touch_updated_at();
CREATE TRIGGER ar1_quotes_updated BEFORE UPDATE ON public.ar1_quote_requests
  FOR EACH ROW EXECUTE FUNCTION ar1_private.touch_updated_at();

ALTER TABLE public.ar1_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ar1_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ar1_client_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ar1_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ar1_quote_requests ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.ar1_staff, public.ar1_clients, public.ar1_client_users,
  public.ar1_projects, public.ar1_quote_requests FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.ar1_staff, public.ar1_clients,
  public.ar1_client_users, public.ar1_projects, public.ar1_quote_requests
  TO authenticated, service_role;

CREATE POLICY ar1_staff_read ON public.ar1_staff FOR SELECT TO authenticated
  USING (user_id=(SELECT auth.uid()) OR (SELECT ar1_private.is_admin()));
CREATE POLICY ar1_staff_manage ON public.ar1_staff FOR ALL TO authenticated
  USING ((SELECT ar1_private.is_admin())) WITH CHECK ((SELECT ar1_private.is_admin()));

CREATE POLICY ar1_clients_read ON public.ar1_clients FOR SELECT TO authenticated
  USING ((SELECT ar1_private.is_staff()) OR ar1_private.is_client_member(id));
CREATE POLICY ar1_clients_insert ON public.ar1_clients FOR INSERT TO authenticated
  WITH CHECK ((SELECT ar1_private.is_staff()));
CREATE POLICY ar1_clients_update ON public.ar1_clients FOR UPDATE TO authenticated
  USING ((SELECT ar1_private.is_staff())) WITH CHECK ((SELECT ar1_private.is_staff()));
CREATE POLICY ar1_clients_delete ON public.ar1_clients FOR DELETE TO authenticated
  USING ((SELECT ar1_private.is_admin()));

CREATE POLICY ar1_members_read ON public.ar1_client_users FOR SELECT TO authenticated
  USING (user_id=(SELECT auth.uid()) OR (SELECT ar1_private.is_staff()));
CREATE POLICY ar1_members_manage ON public.ar1_client_users FOR ALL TO authenticated
  USING ((SELECT ar1_private.is_admin())) WITH CHECK ((SELECT ar1_private.is_admin()));

CREATE POLICY ar1_projects_read ON public.ar1_projects FOR SELECT TO authenticated
  USING ((SELECT ar1_private.is_staff()) OR ar1_private.is_client_member(client_id));
CREATE POLICY ar1_projects_insert ON public.ar1_projects FOR INSERT TO authenticated
  WITH CHECK ((SELECT ar1_private.is_staff()));
CREATE POLICY ar1_projects_update ON public.ar1_projects FOR UPDATE TO authenticated
  USING ((SELECT ar1_private.is_staff())) WITH CHECK ((SELECT ar1_private.is_staff()));
CREATE POLICY ar1_projects_delete ON public.ar1_projects FOR DELETE TO authenticated
  USING ((SELECT ar1_private.is_admin()));

CREATE POLICY ar1_quotes_read ON public.ar1_quote_requests FOR SELECT TO authenticated
  USING ((SELECT ar1_private.is_staff()));
CREATE POLICY ar1_quotes_insert ON public.ar1_quote_requests FOR INSERT TO authenticated
  WITH CHECK ((SELECT ar1_private.is_staff()));
CREATE POLICY ar1_quotes_update ON public.ar1_quote_requests FOR UPDATE TO authenticated
  USING ((SELECT ar1_private.is_staff())) WITH CHECK ((SELECT ar1_private.is_staff()));
CREATE POLICY ar1_quotes_delete ON public.ar1_quote_requests FOR DELETE TO authenticated
  USING ((SELECT ar1_private.is_admin()));

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('ar1-client-files','ar1-client-files',false,26214400,
  ARRAY['application/pdf','image/jpeg','image/png','image/webp']);

CREATE POLICY ar1_files_staff ON storage.objects FOR ALL TO authenticated
  USING (bucket_id='ar1-client-files' AND (SELECT ar1_private.is_staff()))
  WITH CHECK (bucket_id='ar1-client-files' AND (SELECT ar1_private.is_staff()));
CREATE POLICY ar1_files_client_read ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id='ar1-client-files' AND EXISTS (
    SELECT 1 FROM public.ar1_client_users m
    WHERE m.user_id=(SELECT auth.uid()) AND m.active
      AND m.client_id::text=split_part(name,'/',1)
  ));

COMMENT ON TABLE public.ar1_quote_requests IS
  'Private AR1 leads. Anonymous inserts denied. Connect only through a validated, rate-limited server endpoint.';
COMMENT ON TABLE public.ar1_staff IS
  'AR1 application roles, independent from user-editable Auth metadata. Bootstrap first admin only after explicit owner approval.';
COMMENT ON COLUMN public.ar1_projects.client_description IS
  'Client-visible description. Never store internal notes here.';
COMMENT ON TABLE public.ar1_client_users IS
  'Explicit user-to-client membership; only admins can grant or revoke access.';

COMMIT;
