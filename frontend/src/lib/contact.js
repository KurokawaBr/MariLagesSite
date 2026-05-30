// Centralized contact info for Mari Lajes
export const CONTACT = {
  phoneDisplay: "+55 (61) 98248-0654",
  phoneRaw: "5561982480654",
  email: "marinamacielsa2011@gmail.com",
  hours: [
    { label: "Segunda a Sexta", value: "07:00 às 18:00" },
    { label: "Sábado e Domingo", value: "Fechado" },
  ],
};

export const whatsappLink = (message) => {
  const base = `https://wa.me/${CONTACT.phoneRaw}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
