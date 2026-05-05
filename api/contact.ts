import { Resend } from "resend";

type ContactRequest = {
  method?: string;
  body: {
    nombre?: string;
    email?: string;
    asunto?: string;
    mensaje?: string;
  };
};

type JsonResponse = {
  status: (code: number) => JsonResponse;
  json: (body: unknown) => void;
};

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL!;

export default async function handler(req: ContactRequest, res: JsonResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nombre, email, asunto, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: TO_EMAIL,
    subject: `[Portfolio] ${asunto} — ${nombre}`,
    html: `
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Asunto:</strong> ${asunto}</p>
      <hr />
      <p>${mensaje.replace(/\n/g, "<br/>")}</p>
    `,
    replyTo: email,
  });

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "No se pudo enviar el mensaje." });
  }

  return res.json({ ok: true });
}
