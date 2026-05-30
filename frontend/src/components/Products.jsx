import { Truck, Building2, Zap } from "lucide-react";

const products = [
  {
    icon: Building2,
    title: "Lajes Pré-moldadas",
    description:
      "Lajes de alta qualidade, pré-moldadas e prontas para instalação. Garantem resistência, durabilidade e acabamento perfeito.",
    features: ["Pronta entrega", "Qualidade garantida", "Instalação rápida"],
  },
  {
    icon: Truck,
    title: "Concreto Usinado",
    description:
      "Concreto fresco, produzido em nossa usina com rigoroso controle de qualidade. Entrega em caminhão betoneira.",
    features: ["Dosagem precisa", "Entrega pontual", "Diversos traços"],
  },
  {
    icon: Zap,
    title: "Serviços Especializados",
    description:
      "Consultoria técnica, cálculo de estruturas e acompanhamento de obra para garantir o melhor resultado.",
    features: ["Equipe experiente", "Suporte técnico", "Acompanhamento"],
  },
];

export default function Products() {
  return (
    <section id="produtos" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Nossos Produtos
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Soluções completas em concreto e argamassa para sua construção
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.title}
                data-testid={`product-card-${product.title}`}
                className="p-8 bg-white rounded-lg border border-neutral-200 hover:shadow-lg transition-shadow"
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    {product.title}
                  </h3>
                </div>

                <p className="text-neutral-600 mb-6">{product.description}</p>

                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-neutral-700"
                    >
                      <span className="w-2 h-2 bg-orange-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
