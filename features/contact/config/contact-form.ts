export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  rows?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  validationMessage?: string;
};

export const contactFormFields: FormField[] = [
  {
    name: "name",
    label: "Nombre completo",
    type: "text",
    placeholder: "Tu nombre",
    required: true,
    minLength: 3,
    maxLength: 100,
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
    minLength: 7,
    maxLength: 20,
  },
  {
    name: "service",
    label: "Tipo de servicio",
    type: "select",
    required: true,
    options: [
      { label: "Selecciona un servicio", value: "" },
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
    minLength: 10,
    maxLength: 2000,
    rows: 5,
  },
];
