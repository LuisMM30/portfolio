export const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML5', description: 'Lenguaje de marcado con el que estructuro todo el contenido de una web: semántica correcta, jerarquía de títulos, formularios accesibles y una base sólida que después da sentido al diseño y al SEO.' },
      { name: 'CSS3', description: 'La capa visual de todos mis proyectos: layout con Flexbox y Grid, responsive sin frameworks, animaciones ligeras y un sistema de variables y temas que mantiene el diseño consistente en cualquier pantalla.' },
      { name: 'JavaScript', description: 'El lenguaje con el que trabajo a diario, tanto en el navegador como en el servidor con Node.js. Con él construyo la lógica de las interfaces, consumo APIs y resuelvo los problemas reales de cada proyecto.' },
      { name: 'TypeScript', description: 'JavaScript con tipos estáticos que uso en los proyectos profesionales para detectar errores antes de ejecutar el código, documentar la estructura de los datos y refactorizar con confianza.' },
      { name: 'React', description: 'Mi librería principal para construir interfaces: componentes reutilizables, hooks, manejo de estado y un ecosistema enorme. La he usado en proyectos reales de gestión y en webs completas de clientes.' },
      { name: 'Next.js', description: 'El framework React que uso cuando el proyecto necesita posicionamiento y rendimiento: renderizado híbrido, rutas localizadas, metadata por página, sitemap y despliegues en Cloudflare con OpenNext.' },
      { name: 'Angular', description: 'Framework completo para aplicaciones SPA grandes, con inyección de dependencias, enrutado y una arquitectura estricta que hace escalable el trabajo en equipo. Lo domino como alternativa seria a React.' },
      { name: 'A11y (WCAG)', description: 'Aplico criterios de accesibilidad web en todo lo que construyo: HTML semántico, navegación completa por teclado, foco visible, contraste suficiente y compatibilidad con lectores de pantalla.' },
    ],
  },
  {
    title: 'Estilos y animación',
    skills: [
      { name: 'Tailwind CSS', description: 'Mi framework de estilos habitual: utilidades atómicas que aceleran el desarrollo y mantienen la coherencia visual. Lo uso con temas personalizados, dark mode y diseño responsive en cada proyecto React.' },
      { name: 'Framer Motion', description: 'Librería de animación para React con la que doy vida a las interfaces: transiciones entre vistas, reveals al hacer scroll, gestos y micro-interacciones físicas que hacen la experiencia más premium.' },
    ],
  },
  {
    title: 'Estado y datos',
    skills: [
      { name: 'React Query', description: 'Gestión del estado de servidor: caché automática, revalidación en segundo plano y sincronización de datos sin escribir lógica manual. Imprescindible en aplicaciones con APIs como la plataforma de pedidos.' },
      { name: 'Zustand', description: 'Store global minimalista para el estado del cliente. Lo uso cuando la aplicación necesita compartir estado entre muchos componentes sin la ceremonia ni el boilerplate de otras soluciones.' },
      { name: 'React Hook Form', description: 'Mi opción por defecto para formularios: rendimiento excelente con mínimos re-renders, validaciones integradas y combinación perfecta con Zod para formularios complejos de pedidos y contacto.' },
      { name: 'Zod', description: 'Validación de esquemas en TypeScript que comparto entre cliente y servidor: el mismo contrato valida formularios en el navegador y datos en la API, eliminando inconsistencias entre ambas capas.' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', description: 'El runtime con el que construyo el lado servidor: APIs REST, scripts de inicialización, automatizaciones y herramientas. Comparte el mismo lenguaje que el frontend, lo que agiliza todo el desarrollo full stack.' },
      { name: 'Express', description: 'El framework de servidores que uso sobre Node.js para exponer APIs REST: middlewares de autenticación, validación, rutas organizadas y una base sólida para el backend de la plataforma de gestión de pedidos.' },
      { name: 'Nodemailer', description: 'Envío de emails transaccionales desde el backend: notificaciones de pedidos, alertas de workflow y confirmaciones, con plantillas, colas de envío y logs para garantizar la entrega.' },
      { name: 'JWT', description: 'Autenticación sin estado mediante tokens firmados. La uso junto a bcryptjs para sesiones seguras con roles y permisos, de forma que cada usuario solo accede a lo que su perfil le permite.' },
    ],
  },
  {
    title: 'Calidad y entrega',
    skills: [
      { name: 'Vite', description: 'Mi herramienta de desarrollo y build para el frontend: dev server instantáneo, hot reload inmediato y builds optimizados. Con ella monté el monorepo de la plataforma de pedidos con npm workspaces.' },
      { name: 'Vitest', description: 'Tests unitarios con la misma velocidad y filosofía que Vite: los uso para verificar lógica de negocio, utilidades y componentes críticos sin salir del flujo de desarrollo.' },
      { name: 'Playwright', description: 'Tests end-to-end que recorren la aplicación como lo haría un usuario real: flujos completos, varios navegadores y confianza total antes de poner un despliegue en producción.' },
      { name: 'ESLint', description: 'Análisis estático de código en todos mis proyectos: detecta errores antes de ejecutarlos, unifica el estilo del equipo y mantiene la base de código limpia, consistente y fácil de mantener.' },
      { name: 'Git', description: 'El control de versiones que sostiene todo mi trabajo: ramas por funcionalidad, commits limpios y revisión de cambios tanto en proyectos individuales como colaborando con otros desarrolladores.' },
    ],
  },
]

export const capabilities = [
  {
    title: 'Desarrollo web full stack',
    description: 'Creación de interfaces, aplicaciones y soluciones web modernas para necesidades reales.',
    icon: 'building',
    experienceId: 'experiencia-1',
  },
  {
    title: 'E-commerce y webs para negocios',
    description: 'Desarrollo de tiendas online y webs para clientes reales con diferentes tecnologías web.',
    icon: 'shopping',
    experienceId: 'experiencia-3',
  },
  {
    title: 'Auditoría de negocios y captación',
    description: 'Análisis y auditoría de negocios, contacto directo con comercios y captación de clientes para presentar servicios y entender sus necesidades.',
    icon: 'database',
    experienceId: 'experiencia-4',
  },
  {
    title: 'IA aplicada al desarrollo',
    description: 'Uso de herramientas de IA para investigar, planificar, construir y revisar productos web.',
    icon: 'app',
    experienceId: 'experiencia-1',
  },
  {
    title: 'SEO local y diseño responsive',
    description: 'Posicionamiento SEO local para mejorar la presencia digital y creación de experiencias web adaptadas a distintos dispositivos.',
    icon: 'building',
    experienceId: 'experiencia-4',
  },
]

export const aptitudes = [
  'Aprendizaje continuo',
  'Adaptación a nuevas tecnologías',
  'Resolución de problemas',
  'Trabajo Full Stack',
  'Atención al detalle',
  'Mejora continua',
]
