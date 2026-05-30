import { Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { CONTACT, whatsappLink } from "@/lib/contact";

function InfoRow({ icon: Icon, iconColor, bgColor, title, children, ...linkProps }) {
  const content = (
    <>
      <div
        className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0 transition-colors`}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div>
        <p className="font-semibold text-neutral-900">{title}</p>
        {children}
      </div>
    </>
  );

  if (linkProps.href) {
    return (
      <a {...linkProps} className="flex gap-4 group">
        {content}
      </a>
    );
  }
  return <div className="flex gap-4">{content}</div>;
}

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-neutral-900">
        Informações de Contato
      </h3>

      <InfoRow
        icon={Phone}
        iconColor="text-orange-600"
        bgColor="bg-orange-500/10 group-hover:bg-orange-500/20"
        title="Telefone"
        href={`tel:${CONTACT.phoneRaw}`}
        data-testid="contact-phone-link"
      >
        <p className="text-neutral-600 group-hover:text-orange-600 transition-colors">
          {CONTACT.phoneDisplay}
        </p>
      </InfoRow>

      <InfoRow
        icon={MessageCircle}
        iconColor="text-green-600"
        bgColor="bg-green-600/10 group-hover:bg-green-600/20"
        title="WhatsApp"
        href={whatsappLink(
          "Olá! Gostaria de mais informações sobre os produtos da Mari Lajes."
        )}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="contact-whatsapp-link"
      >
        <p className="text-neutral-600 group-hover:text-green-700 transition-colors">
          Conversar agora pelo WhatsApp
        </p>
      </InfoRow>

      <InfoRow
        icon={Mail}
        iconColor="text-orange-600"
        bgColor="bg-orange-500/10 group-hover:bg-orange-500/20"
        title="Email"
        href={`mailto:${CONTACT.email}`}
        data-testid="contact-email-link"
      >
        <p className="text-neutral-600 break-all group-hover:text-orange-600 transition-colors">
          {CONTACT.email}
        </p>
      </InfoRow>

      <div className="flex gap-4" data-testid="contact-hours">
        <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Clock className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <p className="font-semibold text-neutral-900 mb-1">
            Horário de Funcionamento
          </p>
          <ul className="space-y-1 text-neutral-600">
            {CONTACT.hours.map((h) => (
              <li key={h.label}>
                <span className="font-medium text-neutral-700">{h.label}:</span>{" "}
                {h.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
