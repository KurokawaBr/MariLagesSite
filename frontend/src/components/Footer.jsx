import { Facebook, Instagram, Linkedin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { CONTACT, whatsappLink } from "@/lib/contact";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Mari Lajes</h3>
            <p className="text-sm text-neutral-400">
              Soluções em concreto e argamassa para sua construção.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Início", href: "#inicio" },
                { label: "Produtos", href: "#produtos" },
                { label: "Galeria", href: "#galeria" },
                { label: "Contato", href: "#contato" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-neutral-400 hover:text-orange-400 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contato</h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li>
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                  data-testid="footer-phone-link"
                >
                  <Phone size={16} />
                  <span>{CONTACT.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink("Olá! Gostaria de mais informações.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-green-400 transition-colors"
                  data-testid="footer-whatsapp-link"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 hover:text-orange-400 transition-colors break-all"
                  data-testid="footer-email-link"
                >
                  <Mail size={16} />
                  <span>{CONTACT.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <Clock size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  {CONTACT.hours.map((h) => (
                    <div key={h.label}>
                      <span className="font-medium">{h.label}:</span> {h.value}
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Redes Sociais</h4>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 bg-neutral-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-neutral-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-neutral-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
            <p>&copy; {currentYear} Mari Lajes. Todos os direitos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-orange-400 transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
