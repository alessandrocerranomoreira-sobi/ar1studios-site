# AGENTS.md: guia operacional do site AR1 Studios

Guia local de manutenção, versão 1.1, revisado em 31/08/2026. Aplicar somente quando adotado no repositório e compatível com o pedido atual e instruções superiores. Sua presença em anexo não autoriza execução de comandos, push, deploy, compra, alteração de DNS ou acesso a dados privados. Leia também DOCUMENTACAO_TOTAL_AR1_STUDIOS.md.

Estado auditado: site publicado em https://ar1studios-site.vercel.app/; commit 98eb28a7bb38b738f9533ced1e0a41b64ca04701. Este guia e o manual ainda não constam desse commit. Distinguir FATO, DECLARAÇÃO, HIPÓTESE e PENDENTE. Revalidar estados externos antes de chamar algo de atual.

## Missão do site

O site atualmente se posiciona para o agro e pretende gerar solicitações de proposta. Conversões não foram medidas. Não inferir que a empresa inteira é exclusiva do agro: a estratégia mais ampla e a separação de atividades da Agro Legacy precisam de consolidação explícita. Mudança documental não autoriza reescrever o site.

Conversão principal: **Solicitar proposta**.

Produtos prioritários:

1. Leilão 360;
2. AR1 Stories;
3. Filme de Legado;
4. Pacote anual.

## Stack

- React/React DOM 19.2.8;
- TypeScript 6.0.3 e Vite 8.2.2 resolvidos no lock;
- ambiente local validado: Node 24.16.0 e npm 11.13.0;
- CSS puro;
- Manrope via Fontsource;
- deploy estático na Vercel;
- sem backend, banco, CMS ou Supabase nesta versão.

## Arquivos que você precisa conhecer

- `src/content.ts`: contatos, serviços, ofertas, portfólio, processo e FAQ;
- `src/App.tsx`: componentes, home, páginas, rotas, menu e formulário;
- `src/App.css`: paleta, layout, animação e responsividade;
- `src/index.css`: regras globais;
- `index.html`: SEO, Open Graph e favicon;
- public/media/: 13 WebP e um PNG de logo; origem e direitos não comprovados pelo pacote;
- `vercel.json`: rewrite das rotas e cache;
- `public/sitemap.xml`: URLs indexáveis;
- `DOCUMENTACAO_TOTAL_AR1_STUDIOS.md`: manual mestre.

## Rotas obrigatórias

- `/`;
- `/leilao-360`;
- `/filme-de-legado`.

A seleção atual é feita em `App` com `window.location.pathname`. Não instalar roteador sem necessidade real.

## Configurações pendentes

Em `src/content.ts`:

- `whatsappNumber` está vazio;
- links sociais estão como `#`;
- confirmar se `contato@ar1studios.com.br` existe.

Não inventar esses dados. Solicitar ao proprietário. Domínio ar1studios.com.br não resolveu no teste de 31/08/2026; confirmar configuração e e-mail sem presumir registro ou titularidade. Revisar também plano Vercel: captura mostrava Hobby, destinado a uso pessoal/não comercial; não autorizar compra automaticamente.

## Regras de marca

Paleta:

- Preto Frame `#111315`;
- Grafite `#292D30`;
- Osso `#F2EFE8`;
- Cobre `#B86B45`;
- Bruma `#B9C0BF`.

Nome confirmado: AR1 Studios. O proprietário rejeitou a explicação AR/no ar e não quer vincular o nome às iniciais dos fundadores. Não tratar “o primeiro sinal” como conceito aprovado. “Sinal. Presença. Conteúdo que permanece.” ainda está no Footer como texto legado. Assinatura final: PENDENTE de consolidação expressa.

Evitar clichês de câmera, claquete, microfone, play, lente, antena, ondas, globo e tecnologia genérica.

Tom: direto, premium, comercial, cinematográfico e ligado a patrimônio e permanência.

## Regras de implementação

1. Faça a menor alteração capaz de resolver a tarefa.
2. Preserve a CTA “Solicitar proposta”.
3. Edite conteúdo em `src/content.ts` sempre que possível.
4. Não duplique páginas se `ProductPage` puder ser reutilizado.
5. Não adicionar dependência para algo simples em React ou CSS.
6. Não adicionar backend se o fluxo estático resolver.
7. Não guardar segredos, dossiês ou dados pessoais privados no repositório público; revisar também o histórico e o diff. A .gitignore atual não é uma barreira completa a segredos.
8. Use imagens locais em `public/media/`.
9. Otimize novas imagens e dê nomes semânticos.
10. Mude o nome do asset quando substituir seu conteúdo, pois `/media/` usa cache imutável.
11. Mantenha textos alternativos.
12. Mantenha `prefers-reduced-motion`.
13. Teste abaixo e acima de 900 px.
14. Atualize sitemap ao criar página.
15. Não invente clientes, métricas, depoimentos ou prêmios.

## Formulário

`ContactForm` usa estado local. No envio:

- com siteConfig.whatsappNumber não vazio: tenta abrir WhatsApp com mensagem pronta;
- sem número: solicita abertura de mailto: para siteConfig.email;
- não valida existência do número, envio ou recebimento; o visitante precisa enviar;
- o aviso atual do fallback contém instrução técnica de src/content.ts e precisa de correção autorizada.

Não existe persistência. Se conectar Supabase ou CRM:

- validar no servidor;
- proteger contra spam;
- impedir leitura pública dos leads;
- nunca expor `service_role`;
- manter segredos exclusivamente no servidor, nunca no bundle nem em variáveis VITE_;
- definir tratamento de dados e requisitos de privacidade com o responsável.

## Verificação proporcional ao trabalho autorizado

```bash
npm ci
npm run build
npm run lint
```

npm ci substitui node_modules da pasta corrente. Em revisão apenas documental, a validação de código pode reutilizar evidência da versão inalterada; validar o PDF e o pacote. Não afirmar que testes não realizados passaram.

Para teste local:

```bash
npm run dev
npm run preview
```

## Checklist de regressão

- [ ] home abre;
- [ ] `/leilao-360` abre diretamente;
- [ ] `/filme-de-legado` abre diretamente;
- [ ] menu mobile abre e fecha;
- [ ] todos os assets carregam;
- [ ] formulário valida campos;
- [ ] WhatsApp ou fallback de e-mail funciona;
- [ ] CTA aparece no hero e contato;
- [ ] contraste continua legível;
- [ ] não há rolagem horizontal;
- [ ] build e lint passam.

## Git e publicação

Repositório: `https://github.com/alessandrocerranomoreira-sobi/ar1studios-site`  
Produção: branch `main`  
Hospedagem: Vercel. Configuração de referência: preset Vite, root ./, build npm run build, output dist. O painel não foi reinspecionado na auditoria, mas o deploy do commit foi confirmado. Não duplicar projeto já existente.

Use branch de trabalho e Pull Request para mudanças maiores. Evite force push em `main`.

Convenções de commit:

- `feat:` nova função;
- `fix:` correção;
- `content:` texto ou imagem;
- `style:` visual;
- `docs:` documentação;
- `perf:` performance;
- `refactor:` reorganização.

## Definição de pronto

Não declarar a tarefa concluída até:

1. build e lint passarem;
2. desktop e mobile serem revisados;
3. rotas diretas funcionarem;
4. assets não retornarem 404;
5. comportamento do formulário testado no nível declarado; recebimento só pode ser afirmado com teste real autorizado;
6. mudança ser versionada;
7. deploy final ser verificado, quando aplicável;
8. documentação ser atualizada se a arquitetura mudou.

Não converter essa lista em autorização automática: commit, push e deploy dependem do pedido. Na revisão documental de 31/08/2026, o código e o site publicado foram preservados; testes visuais/interativos do site continuam pendentes. Preservar rotas e conhecer os limites: barras finais caem na home e rotas desconhecidas retornam HTTP 200.
