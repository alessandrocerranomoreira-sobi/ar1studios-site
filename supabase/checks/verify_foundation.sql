SELECT
 (SELECT count(*) FROM public.ar1_staff) AS staff_count,
 (SELECT count(*) FROM public.ar1_clients) AS client_count,
 (SELECT count(*) FROM public.ar1_client_users) AS membership_count,
 (SELECT count(*) FROM public.ar1_projects) AS project_count,
 (SELECT count(*) FROM public.ar1_quote_requests) AS quote_count,
 (SELECT count(*) FROM auth.users) AS auth_user_count,
 (SELECT count(*) FROM ar1_private.admin_bootstrap) AS administrator_reservations,
 (SELECT NOT public FROM storage.buckets WHERE id='ar1-client-files') AS files_bucket_private,
 (SELECT count(*) FROM pg_policies WHERE schemaname='public' AND tablename LIKE 'ar1_%') AS application_policies;
