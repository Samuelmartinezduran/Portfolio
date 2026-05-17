import {Resend} from 'resend';
import type {IncomingMessage, ServerResponse} from 'http';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL!;

// Max 3 submissions per IP every 10 minutes
const LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;
const ipMap = new Map<string, {count: number; resetAt: number}>();

function getIp(req: IncomingMessage): string {
  const forwarded = req.headers['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return (raw?.split(',')[0] ?? req.socket?.remoteAddress ?? 'unknown').trim();
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry || now >= entry.resetAt) {
    ipMap.set(ip, {count: 1, resetAt: now + WINDOW_MS});
    return false;
  }
  if (entry.count >= LIMIT) return true;
  entry.count++;
  return false;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.writeHead(405, {'Content-Type': 'application/json'});
    return res.end(JSON.stringify({error: 'Method not allowed'}));
  }

  const ip = getIp(req);
  if (isRateLimited(ip)) {
    res.writeHead(429, {'Content-Type': 'application/json'});
    return res.end(JSON.stringify({error: 'Demasiados intentos. Espera unos minutos.'}));
  }

  const body: string = await new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
  });

  let nombre: string, email: string, asunto: string, mensaje: string;
  try {
    ({nombre, email, asunto, mensaje} = JSON.parse(body));
  } catch {
    res.writeHead(400, {'Content-Type': 'application/json'});
    return res.end(JSON.stringify({error: 'JSON inválido'}));
  }

  if (!nombre || !email || !mensaje) {
    res.writeHead(400, {'Content-Type': 'application/json'});
    return res.end(JSON.stringify({error: 'Faltan campos obligatorios.'}));
  }

  const {error} = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: TO_EMAIL,
    subject: `[Portfolio] ${asunto} — ${nombre}`,
    html: `
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Asunto:</strong> ${asunto}</p>
      <hr />
      <p>${mensaje.replace(/\n/g, '<br/>')}</p>
    `,
    replyTo: email,
  });

  if (error) {
    console.error(error);
    res.writeHead(500, {'Content-Type': 'application/json'});
    return res.end(JSON.stringify({error: 'No se pudo enviar el mensaje.'}));
  }

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ok: true}));
}
