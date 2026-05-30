# Mari Lajes - Landing Page

## Problem Statement
Retrabalhar o site Mari Lajes, atualizando informações de contato:
- Telefone: +55 61 98248-0654
- Email: marinamacielsa2011@gmail.com
- Remover endereço
- Horário: Segunda a Sexta 07:00 às 18:00 / Sábado e Domingo Fechado
- Adicionar link direto para WhatsApp (mesmo número)

## Tech Stack
- React 19 (CRA + craco)
- Tailwind CSS v3
- lucide-react para ícones
- Fontes: Poppins (corpo) + Playfair Display (títulos)

## Architecture
Landing page de página única com seções:
- Header (sticky) com navegação
- Hero (CTA: WhatsApp + Ver Produtos)
- Products (3 cards de produtos)
- Gallery (carrossel de 3 imagens)
- Contact (info + formulário que envia via WhatsApp)
- Footer (links, contato, redes sociais)
- WhatsApp floating button (canto inferior direito)

## Implemented (2026-01)
- Reescrita do site Mari Lajes em /app/frontend (CRA)
- Centralização de dados de contato em `src/lib/contact.js`
- Atualização: telefone, email, horário, remoção do endereço
- Múltiplos pontos de contato via WhatsApp (Hero, Contact, Footer, FAB)
- Telefone clicável (tel:), email clicável (mailto:)
- Tema laranja/preto + tipografia Poppins/Playfair
- Páginas responsivas (mobile menu)
- Compilado sem erros

## Files
- /app/frontend/src/App.js
- /app/frontend/src/App.css
- /app/frontend/src/lib/contact.js (fonte única de informações de contato)
- /app/frontend/src/components/Header.jsx
- /app/frontend/src/components/Hero.jsx
- /app/frontend/src/components/Products.jsx
- /app/frontend/src/components/Gallery.jsx
- /app/frontend/src/components/Contact.jsx
- /app/frontend/src/components/Footer.jsx
- /app/frontend/src/components/WhatsAppFloat.jsx
- /app/frontend/public/index.html (título + fontes)

## Backlog / Next
- P1: Adicionar fotos reais da Mari Lajes (galeria atualmente usa imagens stock)
- P1: Configurar redes sociais reais (Instagram, Facebook)
- P2: Adicionar seção "Sobre" / depoimentos de clientes
- P2: SEO meta tags, Open Graph, favicon personalizado
- P2: Google Analytics / Pixel
