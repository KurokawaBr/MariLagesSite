import { useState } from "react";
import { Send } from "lucide-react";
import { whatsappLink } from "@/lib/contact";

const INITIAL_FORM = { name: "", email: "", phone: "", message: "" };

const FIELDS = [
  { name: "name", label: "Nome Completo", type: "text", placeholder: "Seu nome" },
  { name: "email", label: "Email", type: "email", placeholder: "seu@email.com" },
  { name: "phone", label: "Telefone", type: "tel", placeholder: "(11) 98765-4321" },
];

const inputClass =
  "w-full px-3 py-2 border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500";

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Olá! Meu nome é ${formData.name}. Gostaria de solicitar um orçamento.\nTelefone: ${formData.phone}\nEmail: ${formData.email}\nMensagem: ${formData.message}`;
    window.open(whatsappLink(msg), "_blank");
    setFormData(INITIAL_FORM);
  };

  return (
    <div className="bg-neutral-50 p-8 rounded-lg border border-neutral-200">
      <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
        {FIELDS.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-neutral-800 mb-2">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required
              data-testid={`form-${field.name}-input`}
              className={inputClass}
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-neutral-800 mb-2">
            Mensagem
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Descreva sua necessidade..."
            rows={4}
            required
            data-testid="form-message-input"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          data-testid="form-submit-btn"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
        >
          Enviar via WhatsApp
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
