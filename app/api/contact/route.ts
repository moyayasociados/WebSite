import { z } from "zod";
import { createClient } from "@/shared/lib/supabase/server";
const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().default(""),
  service: z.enum(["software", "accounting", "integral"]),
  message: z.string().trim().min(10).max(3000),
});
export async function POST(request: Request) {
  try {
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success)
      return Response.json(
        { message: "Datos inválidos", errors: parsed.error.flatten() },
        { status: 400 },
      );
    const supabase = await createClient();
    const { error } = await supabase.from("contact_leads").insert(parsed.data);
    if (error) throw error;
    if (
      process.env.RESEND_API_KEY &&
      process.env.CONTACT_TO_EMAIL &&
      process.env.CONTACT_FROM_EMAIL
    ) {
      const lead = parsed.data;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL,
          to: [process.env.CONTACT_TO_EMAIL],
          subject: `Nuevo contacto web: ${lead.name}`,
          text: `Nombre: ${lead.name}
Email: ${lead.email}
Teléfono: ${lead.phone}
Servicio: ${lead.service}
Mensaje: ${lead.message}`,
        }),
      });
    }
    return Response.json(
      { ok: true, message: "Contacto recibido" },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/contact", error);
    return Response.json(
      { ok: false, message: "No fue posible procesar el contacto" },
      { status: 500 },
    );
  }
}
