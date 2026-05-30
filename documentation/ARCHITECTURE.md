# Arquitetura do Projeto

Este documento descreve a arquitetura, os fluxos e as decisões de design do site Mari Lajes.

---

## 1. Visão Geral

O site é uma **Single Page Application (SPA) estática** construída em **React 19**, sem backend próprio. Todas as ações de contato são delegadas a serviços externos do dispositivo do usuário:

- **WhatsApp** (via `https://wa.me/<numero>`)
- **Discador** (via `tel:<numero>`)
- **Cliente de email** (via `mailto:<email>`)

```
┌──────────────────────────────────────────────────────────────┐
│                        Usuário (Browser)                      │
└─────────────────────────────┬────────────────────────────────┘
                              │
                              ▼
            ┌──────────────────────────────────┐
            │   Site Estático (HTML/JS/CSS)    │
            │   React + Tailwind, sem backend   │
            └──────┬──────────────┬────────────┘
                   │              │
       wa.me/...   │  tel:...     │   mailto:...
                   ▼              ▼              ▼
              WhatsApp        Discador        Email
              (externo)       (externo)       (externo)
```

### Por que sem backend?

- A operação atual da Mari Lajes não exige cadastros, login ou histórico.
- Custo zero de hospedagem (deploy estático).
- Manutenção mínima.
- Performance máxima (TTFB baixo, sem cold-start).

---

## 2. Estrutura de Pastas

```
frontend/src/
├── index.js           Entry point — monta <App/> no #root
├── index.css          Tailwind base + variáveis CSS globais
├── App.js             Composição vertical das seções
├── App.css            Estilos globais (fontes, smooth scroll)
├── lib/
│   └── contact.js     Fonte única de verdade para dados de contato
└── components/
    ├── Header.jsx
    ├── Hero.jsx
    ├── Products.jsx
    ├── Gallery.jsx
    ├── Contact.jsx        ← container
    │   ├── ContactInfo.jsx
    │   └── ContactForm.jsx
    ├── Footer.jsx
    └── WhatsAppFloat.jsx
```

---

## 3. Fluxo de Dados

### 3.1. Dados de Contato (centralizado)

Toda informação de contato vive em `lib/contact.js` como **única fonte de verdade**:

```
┌──────────────────────┐
│   lib/contact.js     │
│   (CONTACT, ...)     │
└──────────┬───────────┘
           │ import
           │
   ┌───────┼───────────┬───────────┬────────────────┐
   ▼       ▼           ▼           ▼                ▼
 Hero  ContactInfo  Footer  ContactForm    WhatsAppFloat
   │       │           │           │                │
   └───────┴───────────┴───────────┴────────────────┘
                       │
                       ▼
              whatsappLink(msg)
                       │
                       ▼
           https://wa.me/<phoneRaw>?text=<msg>
```

**Vantagem:** atualizar telefone, email ou horário em um único lugar atualiza o site inteiro.

### 3.2. Formulário de Contato

O formulário **não envia para servidor**. Ao submeter:

```
ContactForm
   │
   │ onSubmit
   ▼
Monta mensagem com nome/email/telefone/mensagem
   │
   ▼
whatsappLink(mensagem)
   │
   ▼
window.open() → WhatsApp Web/App
```

**Vantagens:**
- Lead chega direto no WhatsApp da Mari Lajes (já com o contexto).
- Conversa imediata sem latência de email/CRM.
- Não exige captcha, anti-spam, SMTP, banco de dados.

---

## 4. Roteamento

Não há roteamento de páginas (SPA de página única).
A navegação é por **âncoras**:

| Link | Destino |
|---|---|
| `#inicio` | Seção Hero |
| `#produtos` | Seção Products |
| `#galeria` | Seção Gallery |
| `#contato` | Seção Contact |

Smooth scroll é habilitado globalmente via `html { scroll-behavior: smooth; }` em `App.css`.

---

## 5. Decisões de Design

### 5.1. CRA + craco (e não Vite)

O ambiente da plataforma já estava configurado com **Create React App + craco**. Mantivemos por compatibilidade e zero atrito de migração. O `craco.config.js` adiciona o alias `@/` para `src/`.

### 5.2. Tailwind utility-first (e não shadcn/ui)

Apesar do projeto inicial trazer componentes shadcn/ui em `components/ui/`, **nenhum era necessário** para uma landing page. Removemos todos para manter o repositório enxuto. Todo o estilo é feito direto com classes Tailwind.

### 5.3. Composição vertical em `App.js`

O `App.js` é deliberadamente declarativo, listando seções em ordem:

```jsx
<Header />
<main>
  <Hero />
  <Products />
  <Gallery />
  <Contact />
</main>
<Footer />
<WhatsAppFloat />
```

Reordenar ou desligar seções é trivial — basta comentar uma linha.

### 5.4. `Contact` dividido em sub-componentes

A seção de contato originalmente tinha ~200 linhas misturando UI e lógica de formulário. Foi dividida em:

- `Contact.jsx` — container (composição)
- `ContactInfo.jsx` — lado esquerdo (telefone, WhatsApp, email, horários)
- `ContactForm.jsx` — formulário com estado próprio

Cada arquivo tem **uma responsabilidade clara**.

### 5.5. Botão flutuante separado

`WhatsAppFloat` ficou em arquivo próprio porque é renderizado **fora do flow normal** (fixed positioning sobre todo o site) e independe das seções.

---

## 6. Acessibilidade (a11y)

- Todos os botões interativos têm `aria-label` quando o conteúdo é apenas ícone.
- Links externos usam `rel="noopener noreferrer"` por segurança.
- Estrutura semântica: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`.
- Headings hierárquicos (`h1` → `h2` → `h3`).
- Contraste de cores respeita WCAG AA (texto neutral-700+ sobre fundo claro).
- Foco visível em inputs (`focus:ring-2 focus:ring-orange-500`).

---

## 7. Performance

| Estratégia | Implementação |
|---|---|
| Fontes web otimizadas | Preconnect + `display=swap` no `<head>` |
| Lazy/CSS-only animations | `transition-colors`, `hover:scale-105` (GPU) |
| Sem JS de terceiros pesado | Apenas `lucide-react` (tree-shaken) |
| Imagens otimizadas | `.webp` via CDN externa |
| Build minificado | `yarn build` produz bundle gzipped |

---

## 8. Deploy

O site pode ser publicado em **qualquer serviço de hospedagem estática**:

| Serviço | Comando |
|---|---|
| Vercel | `vercel --prod` |
| Netlify | Conectar repo, comando: `yarn build`, diretório: `frontend/build` |
| GitHub Pages | Build → publicar `build/` na branch `gh-pages` |
| Cloudflare Pages | Conectar repo, framework preset: Create React App |
| S3 + CloudFront | `aws s3 sync frontend/build s3://meu-bucket` |

Nenhuma variável de ambiente é obrigatória para o site funcionar.

---

## 9. Extensibilidade Futura

Pontos de evolução naturais:

| Quando | O que adicionar |
|---|---|
| Quando tiver fotos próprias | Substituir imagens stock em `Gallery.jsx` |
| Quando tiver depoimentos | Criar `components/Testimonials.jsx` e adicionar em `App.js` |
| Quando quiser blog/notícias | Criar pasta `content/` em Markdown + biblioteca tipo `gray-matter` |
| Quando quiser analytics | Adicionar Google Tag Manager no `public/index.html` |
| Quando tiver formulário com armazenamento | Plugar serviço externo (Formspree, Netlify Forms, Web3Forms) — sem precisar criar backend |
