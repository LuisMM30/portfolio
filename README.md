# Portfolio — Luis Montes de Oca

Portfolio profesional de desarrollador web con dirección editorial propia (tipografía de gran escala, índices, reglas y composición asimétrica), **modo oscuro / claro** persistente, proyectos reales, experiencia y formación, y descarga de CV.

## Stack

- React + Vite
- Tailwind CSS v4 (variables CSS para temas)
- Framer Motion (animaciones)
- Lucide React (iconos)
- Geist Sans / Geist Mono (tipografía)

## Puesta en marcha

```bash
npm install
npm run dev       # desarrollo  → http://localhost:5173
npm run build     # build de producción (carpeta dist/)
npm run preview   # previsualizar el build
npm run lint      # oxlint
```

## IMPORTANTE — Tu CV en PDF

Todos los botones «Descargar CV» apuntan a:

```
public/cv/DESARROLLADOR-WEB-LUIS-MONTES-DE-OCA.pdf
```

Coloca tu PDF real en esa ruta con ese nombre exacto (lee
`public/cv/INSTRUCCIONES.txt`). La ruta/nombre se configuran en
`src/data/site.js` (bloque `cv`). Hasta que añadas el archivo, el botón
mostrará un 404 en lugar de descargar.

## Formulario de contacto

Sin configuración, el formulario abre el cliente de correo del visitante con
el mensaje preparado (`mailto`). Para envíos reales sin backend, conecta un
servicio tipo Formspree/EmailJS:

1. Crea una copia de `.env.example` como `.env`.
2. Añade tu endpoint:

```bash
VITE_CONTACT_ENDPOINT=https://formspree.io/f/XXXXXXX
```

3. Reinicia el servidor de desarrollo.

## Personalización rápida

| Qué quieres cambiar | Dónde |
| --- | --- |
| Nombre, email, LinkedIn, estado | `src/data/site.js` |
| Proyectos | `src/data/projects.js` + `public/images/projects/...` |
| Experiencia | `src/data/experience.js` |
| Formación e idiomas | `src/data/education.js` |
| Tecnologías y aptitudes | `src/data/skills.js` |
| Herramientas e IA | `src/data/tools.js` |
| Colores / temas / sistema visual | `src/index.css` |

Revisa siempre las fechas y los datos de `experience.js` contra tu CV real
antes de publicar.

## Despliegue

La web es estática: sube el contenido de `dist/` tras `npm run build`
(Netlify, Vercel, GitHub Pages…).
