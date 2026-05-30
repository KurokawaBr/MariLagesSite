import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleryItems = [
  {
    title: "Lajes Pré-moldadas",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663028939675/h4DiD3Q4e7AdZXNisafN9Q/lajes-hero-Ki94d4DPqaj3U5uxUCqSfr.webp",
    category: "Produtos",
  },
  {
    title: "Caminhão Betoneira Mari Lajes",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663028939675/h4DiD3Q4e7AdZXNisafN9Q/caminhao-concreto-K39AuVYwAr2YLDpo5AiCps.webp",
    category: "Frota",
  },
  {
    title: "Instalação de Lajes",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663028939675/h4DiD3Q4e7AdZXNisafN9Q/lajes-aplicacao-TXvSxaeceoix42YX8h2AE8.webp",
    category: "Obras",
  },
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () =>
    setCurrentIndex((i) => (i === 0 ? galleryItems.length - 1 : i - 1));
  const goToNext = () =>
    setCurrentIndex((i) => (i === galleryItems.length - 1 ? 0 : i + 1));

  return (
    <section id="galeria" className="py-16 md:py-24 bg-orange-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Galeria de Projetos
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Veja alguns de nossos trabalhos e aplicações de qualidade
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            <img
              src={galleryItems[currentIndex].image}
              alt={galleryItems[currentIndex].title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-sm font-semibold text-orange-300 mb-2">
                {galleryItems[currentIndex].category}
              </p>
              <h3 className="text-2xl font-bold">
                {galleryItems[currentIndex].title}
              </h3>
            </div>
          </div>

          <button
            onClick={goToPrevious}
            data-testid="gallery-prev-btn"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-orange-500/90 hover:bg-orange-600 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            data-testid="gallery-next-btn"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-500/90 hover:bg-orange-600 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Próxima imagem"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {galleryItems.map((item, index) => (
              <button
                key={item.title}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir para imagem ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-orange-500" : "bg-neutral-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
