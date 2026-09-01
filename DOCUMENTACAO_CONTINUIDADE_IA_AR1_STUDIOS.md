# AR1 Studios — Manual técnico de continuidade para qualquer IA
Versão 1.3 · atualização operacional em 01/09/2026, America/Sao_Paulo.

> **Leitura obrigatória para o estado atual:** consulte primeiro [docs/ESTADO_ATUAL_SITE_AR1_STUDIOS_2026-09-01.md](docs/ESTADO_ATUAL_SITE_AR1_STUDIOS_2026-09-01.md). As seções históricas deste manual registram a verificação de 31/08/2026; onde houver divergência sobre interface, Git, rotas, imagens, publicação ou pendências, o documento de estado atual prevalece.

## 1. Leia isto primeiro

Este documento permite localizar, executar, editar e preparar a publicação do site existente. É um retrato técnico datado, não autorização permanente para publicar, alterar contas, enviar convites ou apagar dados. Revalide o estado antes de agir.

**O site já existe. Não precisa ser recriado nem depende do Higgsfield para funcionar ou ser editado.** É uma aplicação React + TypeScript + Vite, com CSS próprio e imagens locais. Está hospedada na Vercel. O Supabase já tem uma base de dados preparada, mas o site ainda não está conectado a ela.

O pacote de continuidade inclui código-fonte, imagens, dependências declaradas, lockfile, migração e testes SQL. Não inclui senhas, tokens, arquivos privados, node_modules, dist, histórico .git ou backup dos dados do banco. O Markdown sozinho explica o projeto; para alterar efetivamente, a IA também precisa dos arquivos e de um ambiente de desenvolvimento.

### Estado confirmado nesta revisão

| Item | Situação |
| --- | --- |
| Site Vercel | Publicação pela integração GitHub → Vercel foi observada após a atualização da main; revalidar URL e DNS antes de chamar um domínio de ativo |
| Código publicado em main | Referência da versão atual: commit `08e4af5` |
| Base Supabase | Criada no projeto indicado; migração aplicada |
| Código local da base | Commit f6b6dd7, branch feat/supabase-base |
| GitHub | `main` contém as atualizações de interface, jornada, imagens do Haras e documentação atual; revalidar branches remotas antes de qualquer integração de Supabase |
| Formulário | Abre WhatsApp ou aplicativo de e-mail; não salva no banco |
| Login / painel / portal | Ainda não implementados |
| Domínio próprio e www | `ar1studios.com.br` é o domínio pretendido; resolução e configuração devem ser confirmadas externamente antes de divulgação |
| Qualidade local | npm run lint e npm run build concluídos com sucesso |
| Alterações desta documentação | Documentais; não alteram a interface nem publicam novo deploy |

HTTP 200 não comprova comportamento visual, entrega de e-mail ou envio de orçamento. Nesta revisão foram realizados testes HTTP, lint e build; não foi realizado novo teste visual ponta a ponta.

## 2. Endereços e plataformas

| Finalidade | Endereço / identificador |
| --- | --- |
| Site em funcionamento | https://ar1studios-site.vercel.app/ |
| Página Leilão 360 | https://ar1studios-site.vercel.app/leilao-360 |
| Página Filme de Legado | https://ar1studios-site.vercel.app/filme-de-legado |
| Contato na home | https://ar1studios-site.vercel.app/#contato |
| Domínio definido pelo proprietário | ar1studios.com.br — ativação/DNS ainda pendentes de confirmação |
| Repositório público | https://github.com/alessandrocerranomoreira-sobi/ar1studios-site |
| Git remote origin | https://github.com/alessandrocerranomoreira-sobi/ar1studios-site.git |
| Painel Vercel informado no projeto | https://vercel.com/alessandrocerranomoreira-sobi/ar1studios-site |
| Projeto Vercel | ar1studios-site |
| Branch de produção conhecida | main |
| Painel Supabase | https://supabase.com/dashboard/project/pykbaqlwrkamxtrmsswm |
| URL da API Supabase | https://pykbaqlwrkamxtrmsswm.supabase.co |
| Referência Supabase | pykbaqlwrkamxtrmsswm |
| Região Supabase | sa-east-1, São Paulo |
| Bucket de arquivos de clientes | ar1-client-files, privado |

Os endereços dos painéis exigem acesso autorizado. Possuir uma URL não significa possuir credenciais. Nenhuma chave é necessária para ler este manual. As URLs são referências operacionais, não prova de acesso administrativo.

## 3. Caminhos locais e fonte correta

### Cópia de trabalho mais completa nesta máquina

~~~text
E:\CLIENTES 2026\AR1 STUDIOS OFICIAL 2026\01_SITE_ATUAL\ar1studios-site
~~~

Esta pasta contém o Git local, o site e a base Supabase. É a cópia indicada para manutenção. O projeto não depende do Codex, de visualizações ou de um serviço de geração para funcionar.

### Cópia anterior do proprietário

~~~text
F:\AR1 FILMS PASTA PRINCIPAL\ar1studios-site\ar1studios-site
~~~

A pasta existe, mas não foi consolidada/sincronizada nesta revisão. Não presumir que contenha a migração Supabase ou este manual. Antes de escolhê-la para novas alterações, comparar arquivos e commits; não sobrescrever mudanças existentes.

### Outros materiais históricos

- Pasta inicialmente indicada: E:\R1 OFICIAL 2027. Não é a pasta de execução deste site; estava indisponível para a execução anterior.
- Documentação antiga recebida: C:\Users\aless\Downloads\DOCUMENTACAO_TOTAL_AR1_STUDIOS.md.
- Pacote antigo recebido: C:\Users\aless\Downloads\ar1studios-site-documentado.zip.
- Documentação revisada anterior: C:\Users\aless\.codex\visualizations\2026\08\30\01a053aa-5897-7ad3-85b4-5a5e79c240e0\ar1-documentacao-revisada-2026-08-31\ar1studios-site-documentado-v1.1.zip.

Esses documentos anteriores não prevalecem sobre o código, o banco verificado e as decisões posteriores do proprietário. Este manual substitui informações técnicas antigas conflitantes, especialmente o status do Supabase.

### Em outro computador / outra IA

Use o pacote AR1_STUDIOS_CONTINUIDADE_IA_2026-08-31.zip somente como snapshot da base e abra a pasta extraída ar1studios-site. Os caminhos relativos deste manual passam a partir dela. Para o front-end atual, clone o GitHub e consulte o documento de estado atual; antes de integrar a fundação Supabase, compare a branch e os arquivos necessários.

O ZIP é um snapshot sem .git. Para preservar o histórico, preferir clonar o repositório e comparar/aplicar os arquivos adicionais do pacote em uma branch. Nunca tratar o ZIP como autorização para sobrescrever arquivos locais.

## 4. Programação, ferramentas e modelos

### Tecnologias efetivamente usadas

Versões resolvidas no package-lock.json, não estimativas de versões mais recentes:

| Tecnologia | Versão | Função |
| --- | --- | --- |
| React / React DOM | 19.2.8 | Interface e componentes |
| TypeScript | 6.0.3 | Tipagem; fontes .ts e .tsx |
| Vite | 8.2.2 | Desenvolvimento e build estático |
| @vitejs/plugin-react | 6.1.1 | Integração React/Vite |
| Oxlint | 1.80.0 | Análise estática |
| @fontsource/manrope | 5.3.0 | Fonte Manrope empacotada localmente |
| Node.js usado no teste | 24.16.0 | Ambiente de ferramentas |
| npm usado no teste | 11.13.0 | Instalação e scripts |
| Supabase CLI usada | 2.116.0 | Migrações e verificação |
| PostgreSQL inspecionado | 17.6 | Banco remoto Supabase |

package.json contém intervalos de versões; npm ci reproduz o lockfile. Não atualizar dependências automaticamente durante uma mudança de texto ou imagem. O projeto usa módulos ESM (type: module).

### Modelo de aplicação

- SPA renderizada no navegador, sem SSR e sem backend próprio no código atual.
- Sem Next.js, TanStack, React Router, Tailwind, CMS ou Supabase SDK instalados.
- Roteamento por comparação de window.location.pathname em src/App.tsx.
- Estado local via useState; animação de entrada via IntersectionObserver.
- Dados de conteúdo em arrays/objetos TypeScript; sem editor administrativo.
- CSS próprio, media query principal em 900 px e suporte a prefers-reduced-motion.
- Imagens em public/media; fontes servidas junto do build.
- Vercel serve o diretório dist produzido pelo Vite.

### Modelos de IA

Não existe modelo de IA integrado à aplicação. Não há API de geração, chatbot, agente ou modelo pago necessário para manter o site. A identidade/versão do modelo usado historicamente para gerar cada imagem não está comprovada nos fontes; não inventar essa informação.

Outra IA que possa ler arquivos, editar TypeScript/CSS e executar comandos consegue trabalhar neste código. Publicação e banco exigem permissões separadas. A ausência de dependência técnica do Higgsfield não comprova direitos/licenças de todos os materiais; validar esses direitos com o proprietário antes de usos novos.

## 5. Arquitetura atual e futura

~~~text
ATUAL
Visitante -> Vercel -> React + CSS + imagens locais
                        |
                        +-> Formulário -> WhatsApp OU aplicativo de e-mail

BASE PREPARADA, AINDA SEM CONEXÃO COM O SITE
Supabase -> PostgreSQL + RLS + bucket privado

PRÓXIMA INTEGRAÇÃO (NÃO IMPLEMENTADA)
Formulário -> endpoint validado no servidor -> ar1_quote_requests
Login -> usuário autenticado -> permissões explícitas -> painel/portal
~~~

Não confundir base pronta com aplicação integrada. Criar tabelas não faz o formulário salvar automaticamente.

## 6. Mapa de arquivos: onde alterar cada coisa

Todos os caminhos abaixo são relativos à raiz do site definida na seção 3.

| Arquivo / área | O que contém e onde mexer |
| --- | --- |
| package.json / package-lock.json | Scripts, bibliotecas e versões reproduzíveis |
| src/main.tsx | Montagem React, StrictMode, importação do CSS global |
| src/App.tsx | Home, páginas de produto, formulário, cabeçalho, rodapé, textos fixos e roteamento |
| src/content.ts | siteConfig, services, offers, portfolio, processSteps e faq |
| src/App.css | Cores, tipografia, layout, componentes, animações e responsividade |
| src/index.css | Altura global, overflow, seleção e foco |
| public/media/ | Imagens usadas e logo |
| index.html | Título, description, Open Graph, favicon e preload |
| public/sitemap.xml | Lista pública das três URLs |
| public/robots.txt | Orientação de indexação e caminho do sitemap |
| vercel.json | Rewrite SPA e cache de imagens |
| vite.config.ts | Plugin React; configuração mínima do Vite |
| tsconfig*.json | Configuração TypeScript |
| .oxlintrc.json | Regras do lint |
| supabase/migrations/20260831140000_ar1_foundation.sql | Migração já aplicada, tabelas, políticas, funções e bucket |
| supabase/tests/access_control.sql | Testes de permissões com dados sintéticos e rollback |
| supabase/checks/inspect.sql | Inspeção inicial somente leitura |
| supabase/checks/verify_foundation.sql | Contagens e conferência da base |
| supabase/README.md | Notas e limites da etapa Supabase |
| supabase/config.toml | Configuração local gerada pela CLI, não espelho do Auth remoto |
| DOCUMENTACAO_CONTINUIDADE_IA_AR1_STUDIOS.md | Este manual |

Não editar dist ou node_modules como fonte. Arquivos como src/assets/react.svg, src/assets/vite.svg e public/favicon.svg existem, mas não são o logo ativo indicado pelo código. O favicon atual usa public/media/ar1-logo.png.

## 7. Modelos de página, componentes e identidade visual

### Componentes em src/App.tsx

- Logo: imagem /media/ar1-logo.png; variação compacta no rodapé.
- Header: menu desktop/mobile e links para âncoras da home.
- Footer: frase institucional, e-mail, links sociais e copyright fixo em 2026.
- Reveal: wrapper das animações de entrada.
- ContactForm: campos, estado, validação HTML e abertura de contato externo.
- Home: página principal completa.
- ProductPage: modelo compartilhado com type live ou legacy.
- App: identifica pathname e inicializa o IntersectionObserver.

### Rotas

| Rota | Modelo |
| --- | --- |
| / | Home |
| /leilao-360 | ProductPage type live |
| /filme-de-legado | ProductPage type legacy |
| /#servicos, /#projetos, /#processo, /#contato | Âncoras da home |

A comparação das rotas é exata. /leilao-360/ e /filme-de-legado/ não correspondem aos modelos de produto e caem na Home. Rotas desconhecidas também caem na Home; não há 404 própria. Para adicionar uma página, alterar App, links e sitemap, testar acesso direto e decidir a normalização de barra final.

### Conteúdo e modelos comerciais

Frentes no código: AR1 LIVE, AR1 FILMS, AR1 STORIES e AR1 ORIGINALS. Ofertas: Leilão 360, AR1 Stories, Filme de Legado e Pacote anual. São conteúdos comerciais do site, não comprovação de capacidade, clientes atendidos ou contratos existentes.

A copy atual é focada em agro e inclui “Casa de conteúdo do agro”. Não alterar automaticamente para posicionamento multissetorial com base em discussões antigas. A marca escrita no site é AR1 STUDIOS; o rodapé ainda usa “Sinal. Presença. Conteúdo que permanece.”. Caso o proprietário queira substituir o conceito, editar explicitamente os textos indicados, sem assumir que já foram substituídos.

### Tokens visuais de src/App.css

| Token | Valor |
| --- | --- |
| --black | #111315 |
| --graphite | #292d30 |
| --bone | #f2efe8 |
| --copper | #b86b45 |
| --mist | #b9c0bf |
| --line | rgba(242,239,232,0.15) |
| --radius | 2px |
| Fonte | Manrope, pesos 400/500/600/700/800 |

Layout escuro, imagens cinematográficas, cobre nos destaques, títulos grandes e respiro amplo. As imagens são estáticas: não há player de vídeo ou transmissão real integrado.

### Imagens principais

- ar1-logo.png: marca e favicon.
- hero-fields.webp: hero da home e imagem social configurada.
- event-stage.webp: página Leilão 360 e cards.
- horse.webp: página Filme de Legado e cards.
- camera-auction.webp / camera-auction-vertical.webp: transmissão e seção institucional.
- cattle-rays.webp / cattle-wide.webp: cenas de campo e páginas de produto.
- edit-suite.webp: processo e conteúdo recorrente.
- glow-horizontal.webp: fundo da seção de contato.
- Demais mídias disponíveis: fields-square.webp, mist-fields.webp, mist-vertical.webp, glow-vertical.webp.

**Cuidado com o cache:** vercel.json define /media/* como public, max-age=31536000, immutable. Ao trocar uma imagem, prefira nome novo (ex.: hero-fields-v2.webp) e atualize referências/preload/Open Graph. Sobrescrever o mesmo nome pode manter a imagem antiga no navegador.

## 8. Formulário e contatos: comportamento real

Campos atuais do tipo LeadForm: name, phone, company, project e date. Os quatro primeiros são required; data é opcional. Não há campo de e-mail do solicitante no formulário.

No submit:
1. Monta uma mensagem com os campos.
2. Se siteConfig.whatsappNumber estiver preenchido, abre https://wa.me/NUMERO?text=MENSAGEM.
3. Caso contrário, abre mailto: usando siteConfig.email.

Configuração atual em src/content.ts:

~~~ts
brand: "AR1 STUDIOS"
domain: "ar1studios.com.br"
email: "contato@ar1studios.com.br"
whatsappNumber: ""
instagramUrl: "#"
youtubeUrl: "#"
linkedinUrl: "#"
~~~

O endereço de e-mail aparece no código; a existência/entrega da caixa não foi comprovada. O número WhatsApp está vazio. Não inventar número nem substituir pelo e-mail pessoal do administrador. Ao preencher o número, usar DDI + DDD + telefone, somente dígitos.

A mensagem de fallback ainda menciona “preencha o número em src/content.ts”, inadequada para o visitante final. O status de abertura de aplicativo não significa que uma solicitação foi enviada, recebida ou gravada.

### Mapeamento para futura integração

| Formulário atual | Coluna do banco |
| --- | --- |
| name | name |
| phone | phone |
| company | company |
| project | project_type |
| date | expected_date, converter vazio para null |

email e message existem como campos opcionais no banco, não no formulário atual. source_path pode ser capturado no envio. status, internal_notes, assigned_to e client_id são campos de operação interna: não aceitar valores arbitrários de um visitante.

## 9. Supabase: modelo de dados e segurança

### Tabelas e relações

| Objeto | Papel / principais campos |
| --- | --- |
| public.ar1_staff | user_id -> auth.users; role admin/commercial; active |
| public.ar1_clients | id; name; created_at; updated_at |
| public.ar1_client_users | client_id + user_id; vínculo explícito de acesso; active |
| public.ar1_projects | id; client_id; title; client_description; status; timestamps |
| public.ar1_quote_requests | Contato, tipo de projeto, data, mensagem, status, notas internas, responsável e cliente |
| ar1_private.admin_bootstrap | Reserva privada de e-mail; ativação futura; sem cadastro automático |

Relacionamento: auth.users -> vínculos ar1_client_users -> ar1_clients -> ar1_projects.
A equipe fica em ar1_staff. Orçamentos podem referenciar equipe e cliente.

Status dos projetos: planning, production, review, delivered, archived.
Status dos orçamentos: new, contacting, proposal, won, lost.
client_description é visível ao cliente; não armazenar notas internas nessa coluna.

### Regras atuais

- RLS habilitado nas cinco tabelas públicas da aplicação.
- Visitante anônimo: sem leitura ou inserção direta de orçamentos.
- Usuário autenticado sem vínculo/equipe: sem acesso aos dados comerciais.
- Cliente: lê seus clientes/projetos por vínculo explícito, não os orçamentos internos.
- Comercial ativo: lê/cria/atualiza dados comerciais; não concede papéis ou vínculos de cliente.
- Administrador ativo: gerencia equipe, vínculos e exclusões autorizadas pelas políticas.
- Equipe inativa perde o acesso comercial.
- Não usar user_metadata controlável pelo usuário como fonte de privilégios.
- Helpers privados is_staff, is_admin e is_client_member verificam permissões; funções SECURITY DEFINER usam search_path vazio.

### Storage

Bucket ar1-client-files privado. Limite configurado: 25 MiB. Tipos: PDF, JPEG, PNG, WebP.
Convenção de objeto: <client_uuid>/nome-do-arquivo.
Equipe ativa pode gerenciar; clientes leem apenas a pasta do cliente ao qual estão vinculados.
A permissão de equipe é ampla dentro deste bucket; não há restrição por vendedor/projeto.
Não há UI de upload/download pronta. Transferência real pela Storage API ainda não foi testada.

### Administrador

O e-mail fornecido pelo proprietário foi reservado na tabela privada. A reserva não equivale a usuário Auth, login ativo, convite enviado ou papel admin concedido. Não publicar o e-mail privado nem o SQL de reserva. Primeiro acesso exige uma etapa explícita de criação/confirmação de identidade e atribuição de papel.

### Verificação executada em 31/08/2026

- Migração aplicada com sucesso.
- 16 políticas nas tabelas públicas da aplicação.
- Testes SQL aprovados: isolamento de dois clientes, usuário sem vínculo, anonimato, privacidade dos orçamentos, proibição de autoelevação, limites comercial/admin e equipe inativa.
- Bucket confirmado privado.
- Zero usuários Auth e zero registros comerciais após rollback das fixtures; uma reserva privada.
- Security Advisor consultado com nível warn: No issues found.

Esses são resultados datados, não garantia de ausência de falhas futuras. Revalidar antes de novas migrações. Os testes assumem base isolada/vazia e usam transação com ROLLBACK; não executá-los automaticamente em produção depois que houver dados reais.

## 10. Executar e editar localmente

Abra um terminal na raiz correta. Exemplo PowerShell nesta máquina:

~~~powershell
Set-Location -LiteralPath 'C:\Users\aless\.codex\visualizations\2026\08\30\01a053aa-5897-7ad3-85b4-5a5e79c240e0\ar1studios-site-publicacao'
git status --short
git branch --show-current
git remote -v
npm ci
npm run dev -- --host 127.0.0.1
~~~

Desenvolvimento normalmente em http://127.0.0.1:5173; usar o endereço efetivamente informado pelo Vite se a porta estiver ocupada.

Após editar:

~~~sh
npm run lint
npm run build
npm run preview -- --host 127.0.0.1
~~~

Preview normalmente em http://127.0.0.1:4173. O build executa tsc -b && vite build e gera dist. Não existe script npm test ou suíte automatizada de navegador no projeto atual.

### Checklist de validação

- Conferir as três páginas por acesso direto e recarregamento.
- Testar menu em celular, navegação por teclado e âncoras.
- Conferir imagens, logo, cortes, texto alternativo e ausência de erros no console.
- Validar formulário vazio/preenchido e o destino correto sem afirmar recebimento.
- Conferir lint/build, diff e ausência de dados privados antes de commit.
- Se alterar rotas, testar barras finais e URLs inexistentes.
- Se alterar domínio, alinhar index.html, sitemap e robots.
- Se integrar API, revisar o rewrite global antes do deploy para não devolver HTML no endpoint.
- Se alterar banco, testar as permissões de visitante, cliente A, cliente B e equipe.

## 11. Publicar com segurança

Configuração conhecida: projeto Vercel ar1studios-site, preset Vite, raiz ./, build npm run build, saída dist. O front-end estático atual não exige variáveis de ambiente.

Fluxo esperado: alteração revisada -> commit -> push autorizado no repositório correto -> integração Git/Vercel -> verificar deploy pronto -> testar URL pública.

**Não executar push, merge ou deploy só porque este documento mostra como.** Obter autorização no pedido de trabalho e preservar mudanças do proprietário. main remoto foi confirmado em 98eb28a nesta revisão. A branch local feat/supabase-base está à frente com a base preparada; não presumir que o GitHub já contém esses arquivos.

Antes de publicar:
1. Conferir git status, branch e remote.
2. Conferir identidade/autorização do GitHub, sem imprimir tokens.
3. Confirmar acesso ao projeto Vercel do proprietário. Nesta máquina, uma sessão Vercel CLI anterior apontava para outra conta; não usar deploy CLI sem revalidar.
4. Não criar projeto substituto para contornar ausência de permissão.
5. Para revisar mudanças, usar branch/preview; para produção, publicar apenas o conteúdo aprovado.
6. Após o deploy, validar páginas, assets e formulário na URL pública.

Nunca usar force push ou reset --hard para resolver divergências. Reverter uma alteração exige identificar o commit/deploy correto; banco e site têm históricos independentes.

### Domínio próprio

ar1studios.com.br e www não resolveram nesta consulta. Não foi confirmado se o domínio está registrado ou qual configuração DNS está ativa. Adicionar/validar o domínio no projeto Vercel correto e usar os registros DNS indicados pelo painel naquele momento. Não adivinhar IP/CNAME. Preservar MX/TXT existentes para não afetar e-mail.

O HTML e o sitemap já apontam para ar1studios.com.br mesmo sem confirmação de ativação; isso é uma pendência de publicação/SEO.

## 12. Segredos, variáveis e permissões

- Não há variável de integração Supabase implementada no front-end atual.
- Não há .env.example versionado nesta versão.
- URL/ref do projeto são identificadores; não substituem credenciais.
- Só valores públicos podem ser expostos em variáveis VITE_: o Vite os entrega ao navegador.
- Nunca usar chave secret/service_role em src, VITE_*, HTML, GitHub ou conversa.
- Segredos de servidor devem ficar nas configurações protegidas do backend escolhido.
- Não pedir senha por chat nem ler/exibir arquivos de autenticação da CLI.
- Ignorados pelo Git: .env*, supabase/.temp/, supabase/.branches/ e supabase/private/; .env.example é permitido se criado sem valores secretos.
- O ZIP entregue não inclui esses arquivos privados.
- config.toml é configuração local: não executar supabase config push sem revisar efeitos remotos.
- Não executar a migração inicial novamente pelo SQL Editor; ela já foi aplicada. Usar novas migrações incrementais.
- Não carregar dossiês privados, documentos financeiros ou dados pessoais no repositório público.

Para novas migrações, revisar primeiro o destino e o diff. Com autorização específica:

~~~sh
npx --yes supabase@2.116.0 link --project-ref pykbaqlwrkamxtrmsswm
npx --yes supabase@2.116.0 db push --dry-run --output-format text
~~~

A aplicação efetiva com db push é uma alteração remota. Não é necessária para executar o site estático ou editar textos.

## 13. Pendências, sem confundir com funcionalidades prontas

1. Confirmar telefone comercial, caixa de e-mail e links sociais.
2. Ativar/verificar o domínio próprio e alinhar SEO.
3. Implementar endpoint de orçamento com validação, controle de abuso e escrita restrita; conectar formulário e testar persistência real.
4. Definir login, recuperação, URLs de redirecionamento e entrega de e-mails.
5. Ativar administrador após confirmar identidade.
6. Construir painel comercial e área de clientes.
7. Testar Storage por API e definir políticas futuras de envio de arquivos.
8. Publicar, quando autorizado, a branch que contém a base/documentação no GitHub.
9. Consolidar a pasta de trabalho com a pasta principal do proprietário, sem sobrescrever versões.
10. Validar portfólio, autorizações de imagem e afirmações comerciais antes de tratá-los como fatos.
11. Melhorar o fallback do formulário, normalização de rotas e página 404 conforme escopo solicitado.

Não implementar toda esta lista automaticamente. Escolher somente o item solicitado pelo proprietário.

## 14. Texto pronto para entregar a outra IA

> Você vai continuar o site existente da AR1 Studios, sem reconstruí-lo do zero. Leia este manual e inspecione os arquivos antes de editar. Use React + TypeScript + Vite e preserve o design salvo se eu pedir mudança. O site público é https://ar1studios-site.vercel.app/. O repositório é alessandrocerranomoreira-sobi/ar1studios-site. O pacote local inclui uma base Supabase que ainda não está na main remota. O banco existe, mas o formulário não salva dados e login/painel ainda não existem. Não exponha credenciais, não sobrescreva mudanças e não publique nem altere permissões sem autorização. Implemente apenas o pedido que eu fornecer, execute lint/build, teste o comportamento afetado e relate exatamente o que mudou, o que foi verificado e o que permanece pendente.

## 15. Evidências e limites

Fontes primárias desta documentação: código local e package-lock.json; git log/status/ls-remote; respostas HTTP dos três endereços Vercel; falha de resolução dos dois domínios próprios; testes locais lint/build; migração e verificação Supabase realizadas nesta sessão.

O código e as verificações datadas prevalecem sobre textos de versões anteriores. Os painéis autenticados e as permissões precisam ser revalidados em cada ambiente. O manual não contém credenciais nem substitui acesso autorizado. Nenhum banco novo, usuário ou deploy foi criado para produzir esta documentação.
