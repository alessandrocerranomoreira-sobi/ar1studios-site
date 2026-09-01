# Integração do pacote Manus — 31 de agosto de 2026

> **Registro histórico de integração.** Este documento descreve somente a etapa datada. Para a arquitetura e o estado atual do site, consulte [ESTADO_ATUAL_SITE_AR1_STUDIOS_2026-09-01.md](ESTADO_ATUAL_SITE_AR1_STUDIOS_2026-09-01.md).

## Origem e preservação

O código recebido em `MANUS/AR1_STUDIOS_CODIGO_ATUALIZADO.zip` foi integrado ao repositório canônico em `01_SITE_ATUAL/ar1studios-site`.

O estado anterior está preservado em `99_CONTROLE_ORGANIZACAO/integracao-manus/antes-da-integracao.zip`. Nenhuma alteração foi feita no projeto Supabase nem em serviços externos.

## O que entrou

- sete páginas de serviços detalhadas, reutilizando a estrutura existente;
- oferta de consultoria para implantação de estúdios de podcast;
- textos de posicionamento multissetorial e conteúdos de serviços atualizados;
- metadados e sitemap com as rotas públicas dos serviços;
- estilos para a grade de sete serviços e páginas internas.

## Correções aplicadas durante a integração

- CTAs das páginas de serviço voltam para a home com o tipo de projeto já selecionado;
- opções do formulário são derivadas das páginas de serviço, evitando valores inválidos;
- URLs com barra final são normalizadas;
- rotas inexistentes mostram uma página de orientação em vez de renderizar a home;
- cases, galerias e menções a projetos sem aprovação explícita não são exibidos publicamente;
- links sociais sem URL confirmada não são renderizados;
- o status do formulário orienta a conclusão no WhatsApp ou e-mail e não afirma um envio que o site estático não consegue confirmar;
- ajustes de acessibilidade: atalho para conteúdo, fechamento do menu por Escape, `aria-controls`, preenchimento automático e margem de rolagem para âncoras.

## Pendências do proprietário

- confirmar o número comercial de WhatsApp, os links sociais e o e-mail de atendimento;
- aprovar imagens e informações de cases antes de publicá-los;
- confirmar domínio e publicação na Vercel antes de qualquer deploy.

## Verificação local

- `npm run build`: aprovado;
- `npm run lint`: aprovado;
- preview local revisado nas rotas obrigatórias, nas sete páginas de serviço, em rota inexistente e com URL de pré-seleção;
- revisão em viewport desktop e mobile (390 px): sem rolagem horizontal, menu mobile abre corretamente e sem erros no console.
