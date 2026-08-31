# AR1 Studios

> Pasta de trabalho consolidada em 31/08/2026: consulte [LOCAL_DE_TRABALHO.md](LOCAL_DE_TRABALHO.md) para a localização atual, o histórico preservado e as referências documentais.

Site institucional de alta conversão da AR1 Studios, pronto para Vercel.

## Como editar

- Textos, ofertas, contatos e links sociais: `src/content.ts`
- Estrutura das páginas e seções: `src/App.tsx`
- Cores, tipografia, layout e responsividade: `src/App.css`
- Imagens e logo: `public/media/`
- SEO: `index.html`, `public/sitemap.xml` e `public/robots.txt`

A estrutura é deliberadamente simples para ser modificada por qualquer IA ou desenvolvedor sem dependência de CMS.

## Configuração obrigatória antes de publicar

Abra `src/content.ts` e preencha:

```ts
whatsappNumber: "5562999999999",
instagramUrl: "https://instagram.com/...",
youtubeUrl: "https://youtube.com/...",
linkedinUrl: "https://linkedin.com/company/...",
```

O número deve conter DDI + DDD + telefone, sem `+`, espaços ou traços. Enquanto estiver vazio, o formulário abre um e-mail para `contato@ar1studios.com.br`.

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Teste de produção

```bash
npm run build
npm run preview
```

## Publicar na Vercel

1. Importe este repositório no painel da Vercel.
2. Framework preset: Vite.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Vincule o domínio `ar1studios.com.br`.

O arquivo `vercel.json` mantém as rotas `/leilao-360` e `/filme-de-legado` funcionando ao abrir diretamente.

## Supabase

A base Supabase foi criada em 31/08/2026, com tabelas, RLS e bucket privado. O site publicado continua estático e ainda não está conectado ao banco: o formulário não salva solicitações e login/painel não foram implementados. Consulte `supabase/README.md` para o estado da base.

## Continuidade por outra IA ou desenvolvedor

Leia [o manual técnico de continuidade](DOCUMENTACAO_CONTINUIDADE_IA_AR1_STUDIOS.md). Ele reúne caminhos locais, URLs, versões, arquivos editáveis, modelos de páginas e dados, publicação, segurança e pendências. O pacote de continuidade contém também os arquivos Supabase locais ainda não enviados à main remota nesta revisão.
