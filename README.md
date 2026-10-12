# PortafolioWeb

Mi portafolio personal. Lo rehice desde cero porque el anterior ya no me representaba, y quería algo que se sintiera más "backend": terminal, diagramas de arquitectura, un `git log` como trayectoria, ese tipo de cosas.

La web tiene 5 páginas:

- `/` – inicio y un poco sobre mí
- `/stack` – las tecnologías con las que trabajo
- `/proyectos` – PiensaYa, ReclamaYa y este mismo portafolio
- `/trayectoria` – estudios y experiencia
- `/contacto` – correo, LinkedIn, GitHub y WhatsApp

Está en español e inglés (se cambia con las banderitas de arriba).

## Con qué está hecho

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS 4
- Motion para las animaciones
- Los diagramas de los proyectos son SVG a mano, nada de librerías

## Correrlo en local

Necesitas Node 20 o superior.

```bash
npm install
npm run dev
```

Y abres http://localhost:3000.

Para generar la versión de producción:

```bash
npm run build
npm start
```

## Dónde está cada cosa

- `src/app/` → las páginas (una carpeta por ruta)
- `src/components/` → las secciones y piezas de la UI
- `src/lib/content.ts` → todos los textos en ES/EN, links y datos de los proyectos. Si quiero cambiar algo del contenido normalmente es aquí.
- `public/images/` → mi foto, las banderas y el logo de la UPC

## Cosas que quiero agregar después

- Terminar bien la descripción de ReclamaYa
- Subirlo a Vercel con un dominio propio
- Agregar más proyectos conforme los vaya haciendo

## Licencia

MIT, revisa el archivo [LICENSE](LICENSE). Si te sirve algo del código, úsalo tranquilo. Eso sí, la foto y mis datos personales no.
