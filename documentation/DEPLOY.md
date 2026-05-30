# Deploy do Site Mari Lajes

Este projeto suporta **5 formas de publicação**. Escolha a que faz mais sentido pra você.

| Forma | Comando | Esforço | Ideal para |
|---|---|---|---|
| **GitHub Pages (Actions)** | `git push` | ⭐ | Auto-deploy + sem mexer manualmente |
| **GitHub Pages (`app.py`)** | `python app.py pages && git push` | ⭐⭐ | Quando preferir build manual |
| **Vercel** | 1 clique | ⭐ | Domínio custom grátis + analytics |
| **Netlify** | 1 clique | ⭐ | Forms grátis + redirects |
| **Railway / Render** | conectar repo | ⭐⭐ | Quem quer servidor Python rodando |

---

## 🚀 Opção 1 — GitHub Pages via GitHub Actions (recomendado)

Já configurado em `.github/workflows/deploy.yml`. Cada push na `main` builda e publica automaticamente.

### Passos (uma vez)

1. Faça push do código pro repositório
2. No GitHub vá em **Settings → Pages**
3. Em **"Build and deployment" → "Source"** selecione: **GitHub Actions**
4. Aguarde ~2 minutos (acompanhe em **Actions**)
5. Acesse: `https://kurokawabr.github.io/MariLagesSite/`

### Atualizar
Apenas faça push de qualquer mudança na `main`. O workflow roda sozinho.

---

## 🐍 Opção 2 — GitHub Pages via `app.py` (sem Actions)

Use quando quiser **build manual** + commitar a pasta `/docs/` direto.

### Passos

```bash
# 1. Gere o build e copie para /docs/
python app.py pages

# 2. Commite a pasta /docs/
git add docs/
git commit -m "build: atualiza site"
git push

# 3. No GitHub vá em Settings → Pages
#    Source: "Deploy from a branch"
#    Branch: main
#    Folder: /docs
```

### Atualizar
Sempre que mudar algo no código, rode `python app.py pages` e dê push.

> ⚠️ **Escolha uma só:** ou Actions (Opção 1) ou `app.py pages` (Opção 2). As duas ativas brigam entre si.

---

## ⚡ Opção 3 — Vercel

1. <https://vercel.com> → login com GitHub
2. **Add New → Project** → selecione `MariLagesSite`
3. Configurações:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `yarn build` (padrão)
   - **Output Directory:** `build` (padrão)
4. **Deploy**

URL: `https://mari-lages-site.vercel.app`

---

## 🌐 Opção 4 — Netlify

1. <https://app.netlify.com> → login com GitHub
2. **Add new site → Import an existing project** → `MariLagesSite`
3. Configurações:
   - **Base directory:** `frontend`
   - **Build command:** `yarn build`
   - **Publish directory:** `frontend/build`
4. **Deploy site**

---

## ☁️ Opção 5 — Railway / Render / Heroku (servidor Python)

O `app.py` + `Procfile` deixam o projeto pronto pra rodar em qualquer **PaaS Python**. Útil se um dia precisar adicionar lógica de servidor (formulários com banco, etc.).

### Railway

1. <https://railway.app> → **New Project → Deploy from GitHub repo**
2. Selecione `MariLagesSite`
3. Railway detecta automaticamente:
   - `requirements.txt` → Python
   - `Procfile` → `web: python app.py serve`
   - `.python-version` → Python 3.11
4. **Deploy**

O `app.py serve` detecta a variável `$PORT` que o Railway define e serve o build.

### Render

1. <https://render.com> → **New + → Web Service**
2. Conecte o repo `MariLagesSite`
3. Configurações:
   - **Environment:** Python 3
   - **Build Command:** `cd frontend && yarn install && yarn build`
   - **Start Command:** `python app.py serve`
4. **Create Web Service**

### Heroku

```bash
heroku create mari-lajes
git push heroku main
```

(Heroku usa o `Procfile` automaticamente.)

---

## ☁️ Opção 6 — Streamlit (build estático em `docs/`)

Se você quer publicar o site no Streamlit, o projeto já tem um wrapper dedicado:

- Arquivo principal: `streamlit_app.py`
- Ele carrega o HTML estático em `docs/index.html`
- Ele injeta o CSS e o JS estático em linha para renderizar o site dentro do Streamlit

### Como configurar

1. No painel do Streamlit Cloud, escolha o repositório `MariLages`
2. Aponte o arquivo principal para:
   - `streamlit_app.py`
3. Garanta que o diretório `docs/` esteja presente no repositório com o build gerado
   - Se ainda não existir, gere localmente com:
     ```bash
     python app.py pages
     ```
4. Faça deploy

### Por que isso funciona

- O Streamlit Cloud roda o app como um app Streamlit,
- não como um `python app.py` que tenta usar Node/Yarn no servidor.
- `streamlit_app.py` serve o build já gerado em `docs/`, então não depende de Node no ambiente de deploy.

### Se algo não carregar

- Confirme que `docs/index.html` existe no repositório
- Confirme que `docs/static/js/...` e `docs/static/css/...` também existem
- Se for preciso atualizar o site, rode:
  ```bash
  python app.py pages
  git add docs/
  git commit -m "build: atualiza docs para Streamlit"
  git push
  ```

---

## ⚙️ Como funciona o `app.py serve` na nuvem?

```
Railway/Render define $PORT (ex: 8080)
                ↓
python app.py (sem argumentos)
                ↓
auto-detect → modo "serve" (porque $PORT existe)
                ↓
verifica arquivos · garante build · serve build/ em 0.0.0.0:$PORT
                ↓
✅ Site no ar
```

---

## 🧭 Como apontar um domínio próprio (ex: `marilajes.com.br`)

### GitHub Pages
1. **Settings → Pages → Custom domain** → `www.marilajes.com.br`
2. No DNS:
   - **CNAME** `www` → `kurokawabr.github.io`
   - **A** `@` → IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

### Vercel / Netlify / Railway / Render
Todos têm seção "Custom Domain" — cola o domínio e segue as instruções (validam DNS automaticamente).

---

## ⚙️ Por que `"homepage": "."` no package.json?

CRA gera URLs absolutas por padrão (`/static/js/main.js`), o que quebra em **subdiretórios** (como GitHub Pages: `kurokawabr.github.io/MariLagesSite/`).

Com `"homepage": "."`:
- URLs ficam relativas (`./static/js/main.js`)
- Funciona em **qualquer** hospedagem
- Sem precisar mudar nada ao trocar de hospedagem

---

## 🐛 Troubleshooting

### "Aparece só o README no GitHub Pages"
**Causa:** GitHub Pages está em "Deploy from a branch" servindo a raiz da `main`.
**Solução A (Actions):** mude **Source** para **GitHub Actions** em Settings → Pages.
**Solução B (`app.py`):** rode `python app.py pages`, faça push e configure Source: branch=`main`, folder=`/docs`.

### "Workflow falhou em yarn install"
**Causa:** `yarn.lock` desatualizado.
**Solução:** localmente, rode `cd frontend && yarn install`, commite o `yarn.lock` e push.

### "Página em branco / 404 nos assets"
**Causa:** `homepage` no `package.json` está faltando ou errado.
**Solução:** confirme que `frontend/package.json` tem `"homepage": "."`.

### "`python app.py` reclama de Node/Yarn"
**Causa:** Node.js ou Yarn não instalados.
**Solução:** instale Node LTS de <https://nodejs.org/> e depois `npm install -g yarn`.

### "Mudei algo mas o site não atualizou"
- Confirme que o push foi na branch `main`
- Cheque a aba **Actions** — algum workflow pode ter falhado
- Limpe o cache do navegador (Ctrl+Shift+R)
- Se usa `app.py pages`, lembre que precisa rodar o comando + push novamente

---

## 📊 Comparação rápida

| Plataforma | Setup | Build automático | Domínio próprio grátis | HTTPS grátis | Custom backend |
|---|---|---|---|---|---|
| **GitHub Pages (Actions)** | 2 cliques | ✅ | ✅ | ✅ | ❌ |
| **GitHub Pages (`app.py`)** | manual | ❌ | ✅ | ✅ | ❌ |
| **Vercel** | 1 clique | ✅ | ✅ | ✅ | ⚠️ serverless |
| **Netlify** | 1 clique | ✅ | ✅ | ✅ | ⚠️ functions |
| **Railway** | 1 clique | ✅ | ✅ | ✅ | ✅ Python full |
| **Render** | 1 clique | ✅ | ✅ | ✅ | ✅ Python full |

Para o site atual da Mari Lajes (estático), **GitHub Pages via Actions** é o melhor custo-benefício.
