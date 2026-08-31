-- Read-only structure inspection; no customer data is returned.
SELECT jsonb_build_object(
 'public_tables', (SELECT coalesce(jsonb_agg(tablename), '[]'::jsonb) FROM pg_tables WHERE schemaname='public'),
 'public_views', (SELECT coalesce(jsonb_agg(viewname), '[]'::jsonb) FROM pg_views WHERE schemaname='public'),
 'public_functions', (SELECT coalesce(jsonb_agg(p.proname), '[]'::jsonb) FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname='public'),
 'auth_user_count', (SELECT count(*) FROM auth.users),
 'storage_buckets', (SELECT coalesce(jsonb_agg(jsonb_build_object('id',id,'public',public)), '[]'::jsonb) FROM storage.buckets),
 'migration_table', to_regclass('supabase_migrations.schema_migrations'),
 'postgres_version', current_setting('server_version')
) AS inspection;
