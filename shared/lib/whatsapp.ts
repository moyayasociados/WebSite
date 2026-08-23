export function whatsappUrl(number?: string) {
  const n = number ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "593984641093";
  return `https://wa.me/${n}?text=${encodeURIComponent("Hola, me gustaría recibir información sobre sus servicios.")}`;
}
