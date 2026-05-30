import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/contact";

const WHATSAPP_ICON_SIZE = 26;
const WHATSAPP_PRELOAD_MESSAGE =
  "Olá! Vim pelo site da Mari Lajes e gostaria de mais informações.";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(WHATSAPP_PRELOAD_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      data-testid="whatsapp-float-btn"
      className="fixed bottom-20 right-4 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
    >
      <MessageCircle size={WHATSAPP_ICON_SIZE} />
      <span className="sr-only">Falar no WhatsApp</span>
    </a>
  );
}
