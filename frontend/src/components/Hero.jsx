import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/contact";

export default function Hero() {
  const waMsg = "Olá! Gostaria de solicitar um orçamento de lajes/concreto.";

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-white to-orange-50/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-full">
              <span className="text-4xl" aria-hidden>👑</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
              Mari Lajes
            </h1>

            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-orange-600">
                Temos Lajes a Pronta Entrega e Concreto Usinado
              </p>
              <p className="text-lg text-neutral-700">
                Garantindo agilidade e praticidade para sua obra
              </p>
            </div>

            <div className="space-y-3 py-4">
              {[
                "Produtos de Alta Qualidade",
                "Atendimento de Confiança",
                "Entrega Rápida e Pontual",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  <span className="text-neutral-800 font-medium">{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={whatsappLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-whatsapp-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
              >
                <MessageCircle size={20} />
                Falar no WhatsApp
              </a>
              <a
                href="#produtos"
                data-testid="hero-products-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold transition-colors"
              >
                Ver Produtos
                <ArrowRight size={20} />
              </a>
            </div>
          </div>

          <div className="relative h-96 md:h-full min-h-96">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028939675/h4DiD3Q4e7AdZXNisafN9Q/lajes-hero-Ki94d4DPqaj3U5uxUCqSfr.webp"
              alt="Lajes Pré-moldadas"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" />
    </section>
  );
}
