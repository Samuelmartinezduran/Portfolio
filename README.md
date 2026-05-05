#  Portfolio

Portfolio personal de Samuel Martínez. Desarrollado con React 19, TypeScript, Vite y Tailwind CSS 4.

## Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS 4
- **Backend:** Express + TypeScript (API de contacto)
- **Email:** Resend

## Desarrollo local

**Requisitos:** Node.js 18+

1. Instala dependencias:
   ```bash
   npm install
   ```

2. Crea el archivo `.env` en la raíz basándote en `.env.example`:
   ```bash
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
   CONTACT_EMAIL=tu@email.com
   ```

3. Arranca frontend y backend en paralelo:
   ```bash
   npm run dev
   ```
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:3001`

## Scripts

```bash
npm run dev          # Frontend + backend en paralelo
npm run dev:client   # Solo frontend (puerto 3000)
npm run dev:server   # Solo backend (puerto 3001)
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Type check
npm run clean        # Elimina dist/
```
