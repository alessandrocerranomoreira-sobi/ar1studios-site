# AR1 Studios

Site institucional React/Vite. Documentação revisada em 31/08/2026, versão 1.1.

- Site ativo: https://ar1studios-site.vercel.app/
- GitHub: https://github.com/alessandrocerranomoreira-sobi/ar1studios-site
- Código auditado: 98eb28a7bb38b738f9533ced1e0a41b64ca04701, branch main.
- Domínio pretendido: ar1studios.com.br; não resolveu no teste de 31/08/2026.
- Esta documentação é uma entrega local. Não foi enviada ao GitHub nem altera o site.

## Documentação

- [Manual completo](DOCUMENTACAO_TOTAL_AR1_STUDIOS.md)
- [Guia de manutenção](AGENTS.md)
- [PDF do manual](docs/AR1_STUDIOS_Documentacao_Total_do_Site.pdf)
- [Correções e evidências](docs/REVISAO_2026-08-31.md)

## Como reproduzir a versão auditada

Ambiente local testado: Node.js 24.16.0 e npm 11.13.0. Respeitar o package-lock.json.

```bash
npm ci
npm run build
npm run lint
npm run preview
```

npm ci substitui node_modules da pasta atual. Para desenvolvimento, usar npm run dev. O projeto gera dist/ e não usa backend, banco, CMS ou Supabase.

## Onde editar

- Contatos e arrays comerciais: src/content.ts.
- Títulos fixos, páginas, menu e formulário: src/App.tsx.
- Layout e responsividade: src/App.css e src/index.css.
- Imagens: public/media/.
- SEO e domínio: index.html, public/robots.txt e public/sitemap.xml.

siteConfig.domain não atualiza o domínio em outros arquivos; siteConfig.brand também não controla todos os textos da marca.

## Pendências reais

- Confirmar WhatsApp, caixa de e-mail e perfis sociais. Não usar número fictício.
- O formulário só prepara contato externo; não envia nem armazena leads.
- Confirmar plano Vercel adequado ao uso comercial. A orientação anterior de usar Hobby foi corrigida: [documentação oficial](https://vercel.com/docs/plans/hobby).
- Configurar domínio/DNS e corrigir referências de SEO quando o domínio final for validado.
- Consolidar posicionamento amplo versus agro e assinatura; “primeiro sinal” não é regra aprovada.
- Fazer QA interativo desktop/mobile e teste autorizado de recebimento.
- Não tratar imagens conceituais como portfólio comprovado sem autorização.

## Publicação

O projeto Vercel já existe. A integração publicou main em 31/08/2026. Não importar novamente para uma atualização comum. Referência: Vite, root ./, build npm run build, saída dist. Os valores atuais do painel não foram reinspecionados.

O rewrite permite abrir /leilao-360 e /filme-de-legado diretamente. Barras finais e caminhos desconhecidos caem na home; isso não é uma implementação de 404.

## Gerar o PDF

Requer Python 3 e ReportLab. Windows usa Arial/Consolas; Linux procura Liberation Sans/Mono. Também é possível indicar AR1_FONT_DIR com as fontes Liberation.

```bash
python docs/gen_documentation_pdf.py
```

O script lê o Markdown mestre e grava o PDF em docs/. Versão e data da capa vêm do Markdown, sem valor fixo. Não gera publicação remota.
