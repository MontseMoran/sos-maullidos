# SOS Maullidos — Protótipo (React + Vite + Supabase)

Protótipo navegable para la asociación _SOS Maullidos_. Proyecto frontend con Vite + React, autenticación y almacenamiento en Supabase.

## Requisitos

- Node 18+
- Cuenta en Supabase (proyecto gratuito)

## Instalación

1. Copia `.env.example` a `.env` y rellena las variables.
2. Instala dependencias:

```bash
npm install
```

3. Ejecuta en desarrollo:

```bash
npm run dev
```

## Variables de entorno (ver `.env.example`)

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_BUCKET` (opcional)
- `VITE_DEFAULT_LOCALE` (opcional)

## Pasos Supabase (rápido)

1. Crea proyecto en Supabase.
2. En SQL Editor, ejecuta `supabase.sql` (incluido) para crear tablas y policies.
3. En el panel de Supabase, activa RLS (Row Level Security) para las tablas `cats`, `posts` y `profiles`.
4. Comprueba que las policies creadas permiten:
   - Lectura pública únicamente cuando `published = true`.
   - Escritura y gestión (`INSERT`, `UPDATE`, `DELETE`) únicamente a usuarios con `profiles.role = 'admin'`.
5. Crea un bucket público en Storage para subir imágenes.
6. Crea al menos un usuario (Auth) y copia su `id` en `profiles` con role=`admin` (ver SQL de ejemplo abajo).

### Crear primer admin (rápido)

- Registra el usuario desde la sección Auth en Supabase (email/password).
- Copia `user.id` (desde tabla `auth.users`) y ejecuta:

```sql
INSERT INTO public.profiles (id, email, role) VALUES ('<user-uuid>', 'tu@correo', 'admin');
```

Nota: la SQL incluida ya crea las tablas `cats` y `posts` con los campos requeridos. `cats` incluye campos adicionales: `sterilized`, `tested`, `location`, `contact`.

## SQL

Archivo: `supabase.sql` — contiene esquema y policies.

## Notas

- Las imágenes se redimensionan en cliente antes de subir (máx 1200px, JPG/WebP, calidad ~70%).
- No se incluyen claves ni datos reales en el repositorio.

Si quieres que implemente más funcionalidades (drag & drop de imágenes, previews, o tests), dímelo y lo añado.
