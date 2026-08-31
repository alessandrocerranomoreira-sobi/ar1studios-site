-- Synthetic fixtures only. All inserts/updates are rolled back.
BEGIN;
INSERT INTO auth.users(id) VALUES
('f4710000-0000-4000-8000-000000000001'),
('f4710000-0000-4000-8000-000000000002'),
('f4710000-0000-4000-8000-000000000003'),
('f4710000-0000-4000-8000-000000000004'),
('f4710000-0000-4000-8000-000000000005');
INSERT INTO public.ar1_staff(user_id,role) VALUES
('f4710000-0000-4000-8000-000000000001','admin'),
('f4710000-0000-4000-8000-000000000002','commercial');
INSERT INTO public.ar1_clients(id,name) VALUES
('f4720000-0000-4000-8000-000000000001','TEST A'),
('f4720000-0000-4000-8000-000000000002','TEST B');
INSERT INTO public.ar1_client_users(client_id,user_id) VALUES
('f4720000-0000-4000-8000-000000000001','f4710000-0000-4000-8000-000000000003'),
('f4720000-0000-4000-8000-000000000002','f4710000-0000-4000-8000-000000000004');
INSERT INTO public.ar1_projects(client_id,title) VALUES
('f4720000-0000-4000-8000-000000000001','TEST A'),
('f4720000-0000-4000-8000-000000000002','TEST B');
INSERT INTO public.ar1_quote_requests(id,name,phone,company,project_type) VALUES
('f4730000-0000-4000-8000-000000000001','TEST','00000000000','TEST','test');

DO $test$ BEGIN
  IF has_table_privilege('anon','public.ar1_quote_requests','SELECT')
    OR has_table_privilege('anon','public.ar1_quote_requests','INSERT')
    THEN RAISE EXCEPTION 'Anonymous quote access'; END IF;
  IF has_table_privilege('authenticated','ar1_private.admin_bootstrap','SELECT')
    THEN RAISE EXCEPTION 'Bootstrap email exposed'; END IF;
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id='ar1-client-files' AND NOT public)
    THEN RAISE EXCEPTION 'Bucket not private'; END IF;
  IF (SELECT count(*) FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
      WHERE n.nspname='public' AND c.relname IN
      ('ar1_staff','ar1_clients','ar1_client_users','ar1_projects','ar1_quote_requests')
      AND c.relrowsecurity)<>5 THEN RAISE EXCEPTION 'Missing RLS'; END IF;
END $test$;

SELECT set_config('request.jwt.claim.sub','f4710000-0000-4000-8000-000000000003',true);
SET LOCAL ROLE authenticated;
DO $test$ BEGIN
  IF (SELECT count(*) FROM public.ar1_projects)<>1
    OR EXISTS(SELECT 1 FROM public.ar1_projects WHERE title<>'TEST A')
    THEN RAISE EXCEPTION 'Client A isolation failed'; END IF;
  IF EXISTS(SELECT 1 FROM public.ar1_quote_requests)
    THEN RAISE EXCEPTION 'Client can read quotes'; END IF;
  BEGIN
    INSERT INTO public.ar1_staff(user_id,role) VALUES(auth.uid(),'admin');
    RAISE EXCEPTION 'Self promotion allowed';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
  BEGIN
    INSERT INTO public.ar1_quote_requests(name,phone,company,project_type)
      VALUES('TEST','00000000000','TEST','test');
    RAISE EXCEPTION 'Client quote insertion allowed';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $test$;
RESET ROLE;

SELECT set_config('request.jwt.claim.sub','f4710000-0000-4000-8000-000000000004',true);
SET LOCAL ROLE authenticated;
DO $test$ BEGIN
  IF (SELECT count(*) FROM public.ar1_projects)<>1
    OR EXISTS(SELECT 1 FROM public.ar1_projects WHERE title<>'TEST B')
    THEN RAISE EXCEPTION 'Client B isolation failed'; END IF;
END $test$;
RESET ROLE;

SELECT set_config('request.jwt.claim.sub','f4710000-0000-4000-8000-000000000005',true);
SET LOCAL ROLE authenticated;
DO $test$ BEGIN
  IF EXISTS(SELECT 1 FROM public.ar1_projects)
    OR EXISTS(SELECT 1 FROM public.ar1_clients)
    OR EXISTS(SELECT 1 FROM public.ar1_quote_requests)
    THEN RAISE EXCEPTION 'Unassigned user can read business data'; END IF;
END $test$;
RESET ROLE;

SELECT set_config('request.jwt.claim.sub','f4710000-0000-4000-8000-000000000002',true);
SET LOCAL ROLE authenticated;
DO $test$ DECLARE changed integer; BEGIN
  IF NOT EXISTS(SELECT 1 FROM public.ar1_quote_requests
    WHERE id='f4730000-0000-4000-8000-000000000001')
    THEN RAISE EXCEPTION 'Commercial cannot read quote'; END IF;
  UPDATE public.ar1_quote_requests SET status='contacting'
    WHERE id='f4730000-0000-4000-8000-000000000001';
  GET DIAGNOSTICS changed=ROW_COUNT;
  IF changed<>1 THEN RAISE EXCEPTION 'Commercial cannot update quote'; END IF;
  UPDATE public.ar1_staff SET role='admin' WHERE user_id=auth.uid();
  GET DIAGNOSTICS changed=ROW_COUNT;
  IF changed<>0 THEN RAISE EXCEPTION 'Commercial self promotion'; END IF;
  BEGIN
    INSERT INTO public.ar1_client_users(client_id,user_id) VALUES
    ('f4720000-0000-4000-8000-000000000001','f4710000-0000-4000-8000-000000000005');
    RAISE EXCEPTION 'Commercial can grant membership';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $test$;
RESET ROLE;

SELECT set_config('request.jwt.claim.sub','f4710000-0000-4000-8000-000000000001',true);
SET LOCAL ROLE authenticated;
DO $test$ BEGIN
  IF NOT ar1_private.is_admin() THEN RAISE EXCEPTION 'Admin check failed'; END IF;
  INSERT INTO public.ar1_client_users(client_id,user_id) VALUES
  ('f4720000-0000-4000-8000-000000000001','f4710000-0000-4000-8000-000000000005');
END $test$;
RESET ROLE;
UPDATE public.ar1_staff SET active=false
  WHERE user_id='f4710000-0000-4000-8000-000000000002';
SELECT set_config('request.jwt.claim.sub','f4710000-0000-4000-8000-000000000002',true);
SET LOCAL ROLE authenticated;
DO $test$ BEGIN
  IF EXISTS(SELECT 1 FROM public.ar1_quote_requests)
    THEN RAISE EXCEPTION 'Inactive staff has quote access'; END IF;
END $test$;
RESET ROLE;
ROLLBACK;
SELECT 'PASS: anonymous privileges, client isolation, quote privacy, no self-promotion, commercial/admin boundaries, inactive staff, RLS and private bucket; fixtures rolled back' AS result;
