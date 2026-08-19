"use client";
import { useState } from "react";
import { apiClient } from "@/shared/lib/api-client";
import { contactFormFields } from "@/features/contact/config/contact-form";

export function DynamicForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElement = e.currentTarget;

    setLoading(true);
    setStatus("idle");

    const formData = new FormData(formElement);
    const payload = Object.fromEntries(formData.entries());

    try {
      await apiClient.post("/contact", payload);

      formElement.reset();

      setStatus("success");
    } catch (error) {
      console.error("Error enviando contacto:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={submit} className="space-y-5">
      {contactFormFields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-1.5 block text-sm font-semibold text-primary"
          >
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              className="w-full rounded-md border-gray-300 bg-white px-4 py-3 text-sm focus:border-secondary focus:ring-secondary"
            >
              {field.options?.map((o) => (
                <option value={o.value} key={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              rows={field.rows ?? 4}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full resize-y rounded-md border-gray-300 px-4 py-3 text-sm focus:border-secondary focus:ring-secondary"
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full rounded-md border-gray-300 px-4 py-3 text-sm focus:border-secondary focus:ring-secondary"
            />
          )}
        </div>
      ))}
      <button
        disabled={loading}
        className="w-full rounded-md bg-secondary px-5 py-3.5 font-bold text-white transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Enviar mensaje"}
      </button>
      {status === "success" && (
        <p className="rounded-md bg-green-50 p-3 text-sm text-green-700">
          Mensaje recibido. Nos pondremos en contacto contigo.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          No pudimos enviar el mensaje. Intenta nuevamente o escríbenos por
          WhatsApp.
        </p>
      )}
    </form>
  );
}
