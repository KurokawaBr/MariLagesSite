# Mari Lajes — Site Institucional

![Status](https://img.shields.io/badge/status-online-brightgreen)
![Stack](https://img.shields.io/badge/stack-React%2019%20%2B%20Tailwind-orange)
![License](https://img.shields.io/badge/license-private-lightgrey)

Site institucional da **Mari Lajes** — empresa de **lajes pré-moldadas** e **concreto usinado**.
Landing page de página única (SPA) focada em **conversão via WhatsApp**.

> 👑 *Temos Lajes a Pronta Entrega e Concreto Usinado — garantindo agilidade e praticidade para sua obra.*

---

## 📸 Preview

O site é dividido em 5 seções principais:

| Seção | Função |
|---|---|
| **Hero** | Apresentação, valor da marca e CTA para WhatsApp |
| **Produtos** | 3 cards: Lajes Pré-moldadas · Concreto Usinado · Serviços Especializados |
| **Galeria** | Carrossel com fotos da produção e obras |
| **Contato** | Telefone, WhatsApp, email, horários + formulário |
| **Footer** | Links rápidos, contato consolidado e redes sociais |

Além de um **botão flutuante de WhatsApp** sempre visível no canto inferior direito.

---

## 🛠️ Stack Técnica

| Camada | Tecnologia |
|---|---|
| Framework | **React 19** |
| Build / Dev | **Create React App** (via **craco**) |
| Estilo | **Tailwind CSS 3** |
| Ícones | **lucide-react** |
| Fontes | **Poppins** (corpo) · **Playfair Display** (títulos) |
| Roteamento | Página única (anchors `#inicio`, `#produtos`, etc.) |

Não há backend próprio — todas as ações de contato abrem o WhatsApp via link `wa.me`, o cliente de email padrão (`mailto:`) ou o discador (`tel:`).

---

## 🚀 Rodando o projeto localmente

A forma mais simples — **um único comando Python** que cuida de tudo:

```bash
python app.py
```

O script `app.py` (Python puro, sem dependências):

1. ✅ Verifica se todos os arquivos do projeto estão no lugar
2. ✅ Verifica Node.js e Yarn
3. ✅ Instala dependências se for a primeira vez (`yarn install`)
4. ✅ Gera o build se ainda não existir (`yarn build`)
5. ✅ Abre o site em **http://localhost:8000**

### Modos disponíveis

```bash
python app.py              # auto-detecta (local ou serve)
python app.py local        # roda local (porta 8000)
python app.py local --port 3000   # porta customizada
python app.py serve        # produção (usa $PORT) — Railway/Render/Heroku
python app.py pages        # prepara /docs/ para GitHub Pages
python app.py check        # apenas valida arquivos
python app.py local --force       # força rebuild
```

> 💡 Para deploy no Streamlit, use `streamlit_app.py` como arquivo principal no painel Streamlit.
> Ele carrega o build estático em `docs/` e renderiza o site diretamente no app Streamlit.
>
> Se o `docs/` não existir no repo, gere o build localmente com:
> ```bash
> python app.py pages
> ```

### Deploy no Streamlit

Se você for publicar no Streamlit Cloud, use `streamlit_app.py` como entrypoint.
Ele já está preparado para renderizar o site estático gerado em `docs/` sem precisar de Node.js no servidor.

Como usar:

```bash
pip install streamlit
streamlit run streamlit_app.py
```

No painel do Streamlit Cloud, configure o arquivo principal como `streamlit_app.py`.

### Alternativa — somente o React (sem Python)

Se preferir usar o dev server do React com **hot-reload**:

```bash
cd frontend
yarn install
yarn start            # abre em http://localhost:3000
```

### Pré-requisitos

- **Python 3.8+** (para o `app.py`)
- **Node.js 18+** + **Yarn 1.x** (para o build do React)
  - Se o diretório `docs/` já existir com o site estático, `python app.py` pode servir o site sem precisar de Node/Yarn.

```bash
# Instalar Yarn caso não tenha
npm install -g yarn
```

### Build de produção

Forma simples (com o bootstrap):
```bash
python app.py local --force      # gera build em frontend/build/ e serve
python app.py pages              # gera build e copia para /docs/ (GitHub Pages)
```

Forma direta (sem Python):
```bash
cd frontend
yarn build                       # gera arquivos otimizados em frontend/build/
```

> 🚀 **Para publicar o site online:** veja [`documentation/DEPLOY.md`](./documentation/DEPLOY.md) — o projeto suporta **3 caminhos**: GitHub Pages (Actions ou via `app.py pages`), hospedagem com Python (Railway/Render) ou serviços de static hosting (Vercel/Netlify).

---

## ✏️ Como atualizar informações da empresa

**Toda a informação de contato fica em um único arquivo:**

📁 `frontend/src/lib/contact.js`

```js
export const CONTACT = {
  phoneDisplay: "+55 (61) 98248-0654",   // como aparece na tela
  phoneRaw: "5561982480654",              // usado no link wa.me e tel:
  email: "marinamacielsa2011@gmail.com",
  hours: [
    { label: "Segunda a Sexta", value: "07:00 às 18:00" },
    { label: "Sábado e Domingo", value: "Fechado" },
  ],
};
```

Basta editar esse arquivo e **todas as seções do site são atualizadas automaticamente** (Hero, Contato, Footer, formulário, botão flutuante).

---

## 📁 Estrutura do projeto

```
MariLagesSite/
├── README.md                    👈 Você está aqui
├── app.py                       🐍 Bootstrap: verifica, builda e serve o site
├── Procfile                     Config p/ Railway/Render/Heroku (web: python app.py serve)
├── requirements.txt             Sem dependências (apenas stdlib do Python)
├── .python-version              Versão do Python para cloud (3.11)
├── .github/workflows/
│   └── deploy.yml               Deploy automático no GitHub Pages
├── documentation/               📚 Documentação técnica detalhada
│   ├── ARCHITECTURE.md
│   ├── COMPONENTS.md
│   ├── CONFIGURATION.md
│   └── DEPLOY.md
├── docs/                        🌐 Build do site p/ GitHub Pages (gerado por `app.py pages`)
└── frontend/
    ├── public/
    │   ├── index.html           HTML base + tags <head>
    │   └── .nojekyll            Evita conflito com Jekyll no GitHub Pages
    ├── src/
    │   ├── index.js             Entrada do React
    │   ├── index.css            Tailwind base + variáveis globais
    │   ├── App.js               Composição das seções da página
    │   ├── App.css              Estilos globais (fontes, scroll smooth)
    │   ├── lib/
    │   │   └── contact.js       🔑 Fonte única de dados de contato
    │   └── components/
    │       ├── Header.jsx       Cabeçalho sticky + menu mobile
    │       ├── Hero.jsx         Seção principal com CTA
    │       ├── Products.jsx     Cards de produtos
    │       ├── Gallery.jsx      Carrossel de imagens
    │       ├── Contact.jsx      Composição da seção contato
    │       ├── ContactInfo.jsx  Lado esquerdo (telefone/email/etc)
    │       ├── ContactForm.jsx  Formulário que envia via WhatsApp
    │       ├── Footer.jsx       Rodapé
    │       └── WhatsAppFloat.jsx Botão flutuante fixo
    ├── package.json             Dependências e scripts
    ├── tailwind.config.js       Tema Tailwind
    ├── craco.config.js          Overrides do CRA (aliases @/)
    └── postcss.config.js        PostCSS + Tailwind plugin
```

---

## 🔗 Integração WhatsApp

O site converte visitantes em conversas no WhatsApp através de **5 pontos de contato**:

| Local | Comportamento |
|---|---|
| Botão flutuante | Mensagem genérica ("vim pelo site da Mari Lajes") |
| CTA do Hero | "Falar no WhatsApp" — mensagem de orçamento |
| Card WhatsApp em Contato | "Gostaria de mais informações sobre os produtos" |
| Footer | Link "WhatsApp" |
| Formulário de Contato | Compõe mensagem com nome/email/telefone/mensagem do usuário |

Todos usam o helper `whatsappLink(message)` definido em `lib/contact.js`, que gera URLs no formato:

```
https://wa.me/5561982480654?text=<mensagem-encoded>
```

---

## 📚 Documentação completa

Para detalhes técnicos consulte a pasta [`documentation/`](./documentation/):

- **[Deploy](./documentation/DEPLOY.md)** — 🚀 como publicar o site (GitHub Pages, Vercel, Netlify, Cloudflare, Railway/Render)
- **[Arquitetura](./documentation/ARCHITECTURE.md)** — visão geral, fluxo de dados e decisões de design
- **[Componentes](./documentation/COMPONENTS.md)** — responsabilidades, props e `data-testid`s
- **[Configuração](./documentation/CONFIGURATION.md)** — Tailwind, craco, paleta, fontes e env

---

## 📞 Contato

**Mari Lajes — Concreto e Argamassa**

- 📱 WhatsApp: [+55 (61) 98248-0654](https://wa.me/5561982480654)
- 📧 Email: [marinamacielsa2011@gmail.com](mailto:marinamacielsa2011@gmail.com)
- 🕒 Segunda a Sexta · 07:00 às 18:00
- 🚫 Sábado e Domingo · Fechado

---

© 2026 Mari Lajes. Todos os direitos reservados.
