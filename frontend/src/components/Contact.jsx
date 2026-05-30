import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section id="contato" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Estamos prontos para atender suas necessidades. Solicite um orçamento
            ou tire suas dúvidas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
