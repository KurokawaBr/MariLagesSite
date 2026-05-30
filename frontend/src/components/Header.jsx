import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Produtos", href: "#produtos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2" data-testid="brand-logo">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-neutral-900">Mari Lajes</h1>
              <p className="text-xs text-neutral-500">Concreto e Argamassa</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-testid={`nav-${item.label.toLowerCase()}`}
                className="text-neutral-700 hover:text-orange-600 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#contato"
              data-testid="header-cta-btn"
              className="inline-flex items-center px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
            >
              Solicitar Orçamento
            </a>
          </div>

          <button
            className="md:hidden p-2 text-neutral-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-neutral-200 pt-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-neutral-700 hover:text-orange-600 font-medium py-2"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center inline-flex items-center justify-center px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-medium mt-2"
            >
              Solicitar Orçamento
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
