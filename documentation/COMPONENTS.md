# Componentes — Documentação Detalhada

Cada componente é uma função React **sem estado externo** (exceto onde indicado). Todos seguem o padrão de **export default**.

---

## Índice

- [`App`](#app)
- [`Header`](#header)
- [`Hero`](#hero)
- [`Products`](#products)
- [`Gallery`](#gallery)
- [`Contact`](#contact)
- [`ContactInfo`](#contactinfo)
- [`ContactForm`](#contactform)
- [`Footer`](#footer)
- [`WhatsAppFloat`](#whatsappfloat)
- [`lib/contact.js`](#libcontactjs)

---

## `App`

📁 `src/App.js`

**Responsabilidade:** composição da página inteira.

**Estrutura:**

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

Sem props. Sem estado.

---

## `Header`

📁 `src/components/Header.jsx`

**Responsabilidade:** cabeçalho sticky com logo, navegação e CTA "Solicitar Orçamento". No mobile, vira menu hamburger.

**Estado interno:**
- `isMenuOpen: boolean` — controla abertura do menu mobile.

**Itens de navegação** (constante `navItems`):
- Início → `#inicio`
- Produtos → `#produtos`
- Galeria → `#galeria`
- Contato → `#contato`

**`data-testid`:**
| Elemento | testid |
|---|---|
| Container do header | `site-header` |
| Logo | `brand-logo` |
| Cada link de nav | `nav-{label-lowercase}` |
| Botão CTA (desktop) | `header-cta-btn` |
| Botão hamburger (mobile) | `mobile-menu-toggle` |

---

## `Hero`

📁 `src/components/Hero.jsx`

**Responsabilidade:** seção de abertura — apresentação da marca, proposta de valor e CTAs primários.

**Conteúdo:**
- Ícone de coroa 👑
- Título "Mari Lajes"
- Subtítulo destacado em laranja
- 3 features (checkmarks): Alta Qualidade · Atendimento de Confiança · Entrega Rápida
- CTAs: **"Falar no WhatsApp"** (verde, primário) + **"Ver Produtos"** (outline)
- Imagem hero (lajes pré-moldadas)

**Integração:**
- Botão WhatsApp envia mensagem: *"Olá! Gostaria de solicitar um orçamento de lajes/concreto."*

**`data-testid`:**
| Elemento | testid |
|---|---|
| Botão WhatsApp | `hero-whatsapp-btn` |
| Botão "Ver Produtos" | `hero-products-btn` |

---

## `Products`

📁 `src/components/Products.jsx`

**Responsabilidade:** 3 cards apresentando os produtos/serviços da empresa.

**Dados** (constante `products`):

| Título | Ícone | Features |
|---|---|---|
| Lajes Pré-moldadas | `Building2` | Pronta entrega · Qualidade garantida · Instalação rápida |
| Concreto Usinado | `Truck` | Dosagem precisa · Entrega pontual · Diversos traços |
| Serviços Especializados | `Zap` | Equipe experiente · Suporte técnico · Acompanhamento |

**Keys:**
Cada card usa `key={product.title}` (estável). Cada feature usa `key={feature}` (a string em si).

**`data-testid`:**
| Elemento | testid |
|---|---|
| Cada card | `product-card-{title}` |

---

## `Gallery`

📁 `src/components/Gallery.jsx`

**Responsabilidade:** carrossel manual de imagens com legenda e categoria.

**Estado interno:**
- `currentIndex: number` — índice da imagem atual.

**Funções:**
- `goToPrevious()` — volta uma imagem (loop)
- `goToNext()` — avança uma imagem (loop)

**Imagens** (3 ao total, hospedadas em CDN externa):
1. Lajes Pré-moldadas (categoria: Produtos)
2. Caminhão Betoneira Mari Lajes (categoria: Frota)
3. Instalação de Lajes (categoria: Obras)

**Controles:**
- Setas laterais (esquerda/direita)
- Dots clicáveis abaixo

**`data-testid`:**
| Elemento | testid |
|---|---|
| Botão anterior | `gallery-prev-btn` |
| Botão próximo | `gallery-next-btn` |

---

## `Contact`

📁 `src/components/Contact.jsx`

**Responsabilidade:** container da seção de contato. Apenas compõe `<ContactInfo />` e `<ContactForm />` em grid de 2 colunas.

Sem estado. Sem lógica.

---

## `ContactInfo`

📁 `src/components/ContactInfo.jsx`

**Responsabilidade:** lado esquerdo da seção de contato — 4 blocos de informação.

**Blocos:**
1. **Telefone** — clicável (`tel:`)
2. **WhatsApp** — clicável (`wa.me`)
3. **Email** — clicável (`mailto:`)
4. **Horário de Funcionamento** — não clicável, lista de horários

**Sub-componente interno:**
- `InfoRow` — recebe `icon`, `iconColor`, `bgColor`, `title`, `href` (opcional). Se `href` for passado, renderiza como `<a>`; senão como `<div>`.

**`data-testid`:**
| Elemento | testid |
|---|---|
| Link telefone | `contact-phone-link` |
| Link WhatsApp | `contact-whatsapp-link` |
| Link email | `contact-email-link` |
| Bloco horários | `contact-hours` |

---

## `ContactForm`

📁 `src/components/ContactForm.jsx`

**Responsabilidade:** formulário de contato que **envia mensagem direto para o WhatsApp**.

**Estado interno:**
- `formData: { name, email, phone, message }` — controlled inputs.

**Campos** (definidos em constante `FIELDS`):
- Nome Completo (`text`, required)
- Email (`email`, required)
- Telefone (`tel`, required)
- Mensagem (`textarea`, required)

**Submit:**
Monta mensagem multi-linha com os dados e abre `wa.me` em nova aba. Limpa o formulário em seguida.

**`data-testid`:**
| Elemento | testid |
|---|---|
| Formulário | `contact-form` |
| Input nome | `form-name-input` |
| Input email | `form-email-input` |
| Input telefone | `form-phone-input` |
| Textarea mensagem | `form-message-input` |
| Botão enviar | `form-submit-btn` |

---

## `Footer`

📁 `src/components/Footer.jsx`

**Responsabilidade:** rodapé com 4 colunas — Marca · Links Rápidos · Contato · Redes Sociais.

**Conteúdo:**
- **Marca:** logo Mari Lajes + tagline
- **Links Rápidos:** Início · Produtos · Galeria · Contato
- **Contato:** telefone (tel:), WhatsApp (wa.me), email (mailto:), horários
- **Redes Sociais:** ícones Facebook, Instagram, LinkedIn (links `#` — substituir quando houver perfis)

Copyright dinâmico (`new Date().getFullYear()`).

**`data-testid`:**
| Elemento | testid |
|---|---|
| Link telefone | `footer-phone-link` |
| Link WhatsApp | `footer-whatsapp-link` |
| Link email | `footer-email-link` |

---

## `WhatsAppFloat`

📁 `src/components/WhatsAppFloat.jsx`

**Responsabilidade:** botão verde flutuante fixo no canto inferior direito, sempre visível.

**Constantes:**
- `WHATSAPP_ICON_SIZE = 26`
- `WHATSAPP_PRELOAD_MESSAGE = "Olá! Vim pelo site da Mari Lajes…"`

**Comportamento:**
Clicar abre o WhatsApp em nova aba com a mensagem pré-preenchida.

**`data-testid`:** `whatsapp-float-btn`

---

## `lib/contact.js`

📁 `src/lib/contact.js`

**Responsabilidade:** **fonte única de verdade** para dados de contato + helper de WhatsApp.

### Export `CONTACT`

```js
{
  phoneDisplay: "+55 (61) 98248-0654",   // exibido na UI
  phoneRaw: "5561982480654",              // usado em wa.me e tel:
  email: "marinamacielsa2011@gmail.com",
  hours: [
    { label: "Segunda a Sexta", value: "07:00 às 18:00" },
    { label: "Sábado e Domingo", value: "Fechado" },
  ],
}
```

### Export `whatsappLink(message?)`

Gera URL do WhatsApp:

```js
whatsappLink("Olá!")
// → "https://wa.me/5561982480654?text=Ol%C3%A1!"

whatsappLink()
// → "https://wa.me/5561982480654"
```

A mensagem é codificada com `encodeURIComponent`.

### Onde é importado

| Arquivo | Usa |
|---|---|
| `Hero.jsx` | `whatsappLink` |
| `ContactInfo.jsx` | `CONTACT` + `whatsappLink` |
| `ContactForm.jsx` | `whatsappLink` |
| `Footer.jsx` | `CONTACT` + `whatsappLink` |
| `WhatsAppFloat.jsx` | `whatsappLink` |
