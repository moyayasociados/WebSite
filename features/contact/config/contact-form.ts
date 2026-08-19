export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  rows?: number;
};

export const contactFormFields: FormField[] = [
  {
    name: "name",
    label: "Nombre completo",
    type: "text",
    placeholder: "Tu nombre",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "tu@email.com",
    required: true,
  },
  {
    name: "phone",
    label: "Teléfono",
    type: "tel",
    placeholder: "+593...",
    required: false,
  },
  {
    name: "service",
    label: "Tipo de servicio",
    type: "select",
    required: true,
    options: [
      { label: "Desarrollo de Software", value: "software" },
      { label: "Servicios Contables", value: "accounting" },
      { label: "Ambos / Integral", value: "integral" },
    ],
  },
  {
    name: "message",
    label: "Mensaje",
    type: "textarea",
    placeholder: "Cuéntanos brevemente qué necesitas...",
    required: true,
    rows: 5,
  },
];
