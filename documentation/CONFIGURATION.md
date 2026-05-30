# Configuração do Projeto

Documentação dos arquivos de configuração e ambiente.

---

## 1. Scripts disponíveis

📁 `frontend/package.json`

| Script | Comando | Uso |
|---|---|---|
| `start` | `craco start` | Dev server com hot-reload em http://localhost:3000 |
| `build` | `craco build` | Gera bundle de produção em `build/` |
| `test` | `craco test` | Roda testes (não usado neste projeto) |

```bash
yarn start    # desenvolvimento
yarn build    # produção
```

---

## 2. craco — overrides do CRA

📁 `frontend/craco.config.js`

O CRA não permite editar webpack direto. O **craco** sobrescreve a config sem ejetar.

**Principal customização:**
- **Alias `@/`** apontando para `src/`, permitindo imports limpos:

```js
import Header from "@/components/Header";
// em vez de
import Header from "../../components/Header";
```

---

## 3. Tailwind CSS

📁 `frontend/tailwind.config.js`

```js
content: [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./public/index.html"
]
```

Tailwind escaneia esses arquivos para gerar somente as classes utilizadas (purge automático).

### Plugins
- `tailwindcss-animate` — utilities de animação (`animate-in`, `animate-out`, etc).

### Theme extensions
O tema estende Tailwind com **CSS variables** (definidas em `index.css`). Isso permite trocar paleta sem mexer em JSX.

---

## 4. PostCSS

📁 `frontend/postcss.config.js`

```js
module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} }
}
```

- **`tailwindcss`** processa as diretivas `@tailwind base/components/utilities`.
- **`autoprefixer`** adiciona prefixos de browser (`-webkit-`, `-moz-`).

---

## 5. Estilos globais

📁 `frontend/src/index.css`

Contém:
- `@tailwind base` / `@tailwind components` / `@tailwind utilities`
- Variáveis CSS para a paleta padrão do Tailwind (`--background`, `--foreground`, etc.)
- Reset de fonte e suavização (`-webkit-font-smoothing`)

📁 `frontend/src/App.css`

Contém:
- `html { scroll-behavior: smooth; }` — animação ao clicar em âncoras
- `body { font-family: 'Poppins', sans-serif; }`
- `h1–h6 { font-family: 'Playfair Display', serif; }`

---

## 6. Tipografia

Fontes carregadas via Google Fonts em `public/index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
```

| Fonte | Pesos | Uso |
|---|---|---|
| **Poppins** | 400, 500, 600, 700, 800 | Corpo, botões, navegação |
| **Playfair Display** | 700, 800 | Títulos (`h1`–`h6`) |

> `display=swap` evita FOIT (texto invisível) — usa fonte de fallback enquanto carrega.

---

## 7. Paleta de Cores

Toda a UI usa classes Tailwind. **Não** há paleta customizada (mantemos a default do Tailwind para evitar lock-in).

| Cor | Onde |
|---|---|
| `orange-500/600` 🟧 | Cor primária da marca (CTAs, ícones, highlights) |
| `green-500/600` 🟩 | WhatsApp (CTAs verdes, botão flutuante) |
| `neutral-900` ⬛ | Texto forte, footer, logo |
| `neutral-700/600/500` ◼️ | Texto secundário, descrições |
| `neutral-200/100/50` ▫️ | Bordas, fundos suaves |
| `white` ⬜ | Fundo principal |

### Como mudar a cor primária?

Faça find-and-replace no projeto inteiro:
- `orange-500` → `<sua-cor>-500`
- `orange-600` → `<sua-cor>-600`
- `orange-500/10` → `<sua-cor>-500/10`

Exemplos de paletas Tailwind compatíveis: `red`, `amber`, `yellow`, `lime`, `emerald`, `sky`, `blue`, `indigo`, `violet`, `purple`, `pink`, `rose`.

---

## 8. Ícones — lucide-react

📁 Dependência: `lucide-react`

Importação por tree-shaking:

```jsx
import { Phone, Mail, MessageCircle } from "lucide-react";

<Phone size={20} className="text-orange-600" />
```

Documentação completa: <https://lucide.dev/icons>

**Ícones usados no projeto:**
- `Menu`, `X` (Header — menu hamburger)
- `ArrowRight`, `CheckCircle`, `MessageCircle` (Hero)
- `Truck`, `Building2`, `Zap` (Products)
- `ChevronLeft`, `ChevronRight` (Gallery)
- `Phone`, `Mail`, `Clock`, `MessageCircle`, `Send` (Contact)
- `Facebook`, `Instagram`, `Linkedin` (Footer)

---

## 9. Variáveis de Ambiente

O site **não exige** nenhuma variável de ambiente para funcionar.

Existe um `frontend/.env` apenas com `REACT_APP_BACKEND_URL` herdado do template original — não é usado pelo código atual do site.

---

## 10. Build de Produção

```bash
cd frontend
yarn build
```

Saída em `frontend/build/`:
- `index.html` (com `<head>` resolvido)
- `static/css/main.[hash].css` (minificado, gzipped)
- `static/js/main.[hash].js` (minificado, gzipped, tree-shaken)
- `static/media/…` (assets referenciados)

Esse diretório pode ser publicado em qualquer serviço de hospedagem estática.

### Tamanhos esperados (aproximados)

| Arquivo | Tamanho gzipped |
|---|---|
| `main.js` | ~60–80 KB |
| `main.css` | ~5–10 KB |

---

## 11. Dependências principais

📁 `frontend/package.json`

| Pacote | Versão | Função |
|---|---|---|
| `react` | ^19 | Framework |
| `react-dom` | ^19 | Renderer |
| `react-scripts` | 5.0.1 | CRA (usado via craco) |
| `@craco/craco` | ^7 | Override do CRA |
| `tailwindcss` | ^3.4 | Estilo |
| `autoprefixer` | ^10 | CSS prefixos |
| `postcss` | ^8 | Pipeline CSS |
| `lucide-react` | ^0.507 | Ícones |
| `clsx` / `tailwind-merge` | — | Não usados no site atual, mas mantidos por compatibilidade |

### Instalação

```bash
yarn install
```

### Atualizar uma dependência

```bash
yarn add <pacote>@latest
```

> Use sempre **yarn** (e não npm) — o repositório tem `yarn.lock`.
