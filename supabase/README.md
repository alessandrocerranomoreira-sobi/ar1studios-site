# AR1 Studios — base Supabase

Projeto: `pykbaqlwrkamxtrmsswm` (São Paulo).
Dashboard: https://supabase.com/dashboard/project/pykbaqlwrkamxtrmsswm

## Escopo da etapa — 31/08/2026

Base de dados e permissões para futura integração. Esta etapa não altera o site publicado e não faz o formulário salvar solicitações.

- Cinco tabelas: `ar1_staff`, `ar1_clients`, `ar1_client_users`, `ar1_projects`, `ar1_quote_requests`.
- RLS em todas as tabelas de aplicação. Visitantes não podem ler nem inserir orçamentos diretamente.
- Equipe comercial acessa os orçamentos; administradores gerenciam permissões e vínculos.
- Clientes autenticados acessam somente os clientes/projetos aos quais estão vinculados.
- Papéis não são derivados de metadados editáveis pelo usuário.
- Bucket privado `ar1-client-files`: PDF/JPEG/PNG/WebP, até 25 MiB por arquivo. Caminho: `<client_uuid>/arquivo`. Equipe pode gravar; clientes só podem ler sua pasta.
- E-mail do primeiro administrador reservado exclusivamente em `ar1_private.admin_bootstrap`. Reserva não cria conta, não envia convite e não concede acesso. Ativação futura exige identidade confirmada e concessão explícita de papel.

## O que falta

Verificação executada em 31/08/2026: migração aplicada, testes SQL aprovados,
16 políticas nas tabelas da aplicação, bucket privado e uma reserva de
administrador. Nenhum usuário Auth criado. Nenhum dado sintético permaneceu
nas tabelas após os testes. Consulta ao Security Advisor (nível warn)
retornou "No issues found"; isso não substitui testes da futura integração.

1. Endpoint de orçamento com validação, proteção contra abuso e segredo de servidor; conectar o formulário a ele e testar envio real.
2. Login e recuperação de acesso, URLs de redirecionamento e configuração de e-mail/Auth.
3. Ativar o primeiro administrador após confirmar sua identidade.
4. Painel comercial e área de clientes; testes completos pela interface e API.
5. Upload/download real pelo Storage e verificação de isolamento ponta a ponta.

Não colocar chave secreta/service-role no navegador. Só chaves públicas podem usar prefixo VITE_. O e-mail privado, credenciais e arquivos temporários da CLI não devem ser versionados.

## Migrações e verificação

CLI usada: Supabase 2.116.0. Executar na raiz do repositório com a conta correta:

```sh
npx --yes supabase@2.116.0 link --project-ref pykbaqlwrkamxtrmsswm
npx --yes supabase@2.116.0 db push --dry-run --output-format text
npx --yes supabase@2.116.0 db push --output-format text
npx --yes supabase@2.116.0 db query --linked --project-ref pykbaqlwrkamxtrmsswm --file supabase/tests/access_control.sql --output json
npx --yes supabase@2.116.0 db query --linked --project-ref pykbaqlwrkamxtrmsswm --file supabase/checks/verify_foundation.sql --output json
```

O teste SQL insere dados sintéticos dentro de transação e executa ROLLBACK: verifica isolamento entre dois clientes, usuário sem vínculo, bloqueio anônimo, privacidade de orçamentos, impedimento de autoelevação, comercial/admin e equipe inativa. Executar em ambiente isolado; contagens assumem base vazia. Verificação do Storage nesta etapa é de configuração/políticas, não de transferência real de arquivos.

`config.toml` é configuração local gerada pela CLI, não comprovação de configurações remotas de Auth. Não executar `config push` sem revisar seu impacto.

Este suplemento substitui apenas o status do backend da documentação anterior v1.1. Código, imagens e hospedagem do site não foram migrados para Supabase.
