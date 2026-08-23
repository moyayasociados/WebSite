"use client";

import { useState } from "react";
import { apiClient } from "@/shared/lib/api-client";
import {
  contactFormFields,
  type FormField,
} from "@/features/contact/config/contact-form";

type FieldErrors = Record<string, string>;

function getFieldError(field: FormField, value: string) {
  const trimmed = value.trim();

  if (field.required && !trimmed) {
    return `El campo ${field.label.toLowerCase()} es obligatorio.`;
  }

  if (!trimmed) return "";

  if (field.minLength && trimmed.length < field.minLength) {
    return `${field.label} acepta mínimo ${field.minLength} caracteres.`;
  }

  if (field.maxLength && trimmed.length > field.maxLength) {
    return `${field.label} acepta máximo ${field.maxLength} caracteres.`;
  }

  if (field.type === "email") {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!validEmail) return "Ingresa un correo electrónico válido.";
  }

  if (field.pattern && !new RegExp(field.pattern).test(trimmed)) {
    return (
      field.validationMessage ??
      `El formato de ${field.label.toLowerCase()} no es válido.`
    );
  }

  return "";
}

export function DynamicForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  function validateForm(form: HTMLFormElement) {
    const nextErrors: FieldErrors = {};

    contactFormFields.forEach((field) => {
      const value = String(new FormData(form).get(field.name) ?? "");
      const error = getFieldError(field, value);
      if (error) nextErrors[field.name] = error;
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function validateField(name: string, value: string) {
    const field = contactFormFields.find((item) => item.name === name);
    if (!field) return;

    const error = getFieldError(field, value);
    setErrors((current) => {
      const next = { ...current };
      if (error) next[name] = error;
      else delete next[name];
      return next;
    });
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElement = e.currentTarget;
    setStatus("idle");

    // Al presionar Enviar se validan todos los campos y se muestran
    // inmediatamente los mensajes debajo de cada campo.
    if (!validateForm(formElement)) return;

    setLoading(true);

    const formData = new FormData(formElement);
    const payload = Object.fromEntries(formData.entries());

    try {
      await apiClient.post("/contact", payload);
      formElement.reset();
      setErrors({});
      setStatus("success");
    } catch (error) {
      console.error("Error enviando contacto:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {contactFormFields.map((field) => {
        const error = errors[field.name];

        const commonProps = {
          id: field.name,
          name: field.name,
          required: field.required,
          minLength: field.minLength,
          maxLength: field.maxLength,
          pattern: field.pattern,
          "aria-invalid": Boolean(error),
          "aria-describedby": error ? `${field.name}-error` : undefined,
          onChange: (
            event: React.ChangeEvent<
              HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >,
          ) => validateField(field.name, event.target.value),
          className: `w-full rounded-md border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-300 focus:border-secondary focus:ring-secondary/20"
          }`,
        };

        return (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="mb-1.5 block text-sm font-semibold text-primary"
            >
              {field.label}
            </label>

            {field.type === "select" ? (
              <select {...commonProps}>
                {field.options?.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                {...commonProps}
                rows={field.rows ?? 4}
                placeholder={field.placeholder}
                className={`${commonProps.className} resize-y`}
              />
            ) : (
              <input
                {...commonProps}
                type={field.type}
                placeholder={field.placeholder}
              />
            )}

            {error && (
              <p
                id={`${field.name}-error`}
                role="alert"
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {error}
              </p>
            )}

            {field.name === "message" && !error && (
              <p className="mt-1.5 text-xs text-muted">
                Mínimo {field.minLength} y máximo {field.maxLength} caracteres.
              </p>
            )}
          </div>
        );
      })}

      <button
        type="submit"
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
          No pudimos enviar el mensaje. Revisa los datos e intenta nuevamente.
        </p>
      )}
    </form>
  );
}
