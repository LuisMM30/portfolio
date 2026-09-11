export const projects = [
  {
    id: '01',
    slug: 'ferreteria-delicias',
    title: 'Ferretería Delicias',
    category: 'E-commerce',
    description:
      'Participación en un proyecto de comercio electrónico para un negocio real, trabajando en diferentes aspectos técnicos, productos y optimización de contenido.',
    technologies: ['WordPress', 'WooCommerce'],
    url: 'https://ferreteriadelicias.com/',
    isPrivate: false,
    status: 'online',
    statusLabel: 'Online',
    cta: 'Visitar web',
    ctaType: 'external',
    images: {
      desktop: '/images/projects/ferreteria-delicias/preview-desktop.svg',
      mobile: '/images/projects/ferreteria-delicias/preview-mobile.svg',
    },
    details: null,
  },
  {
    id: '02',
    slug: 'la-luna-de-hugo',
    title: 'La Luna de Hugo',
    category: 'E-commerce',
    description:
      'Desarrollo de una tienda online para un negocio real, trabajando en la experiencia, estructura y configuración de la plataforma de comercio electrónico.',
    technologies: ['WordPress', 'WooCommerce'],
    url: 'https://lalunadehugo.es/',
    isPrivate: false,
    status: 'online',
    statusLabel: 'Online',
    cta: 'Visitar web',
    ctaType: 'external',
    images: {
      desktop: '/images/projects/la-luna-de-hugo/preview-desktop.svg',
      mobile: '/images/projects/la-luna-de-hugo/preview-mobile.svg',
    },
    details: null,
  },
  {
    id: '03',
    slug: 'gestion-pedidos',
    title: 'Sistema de gestión de pedidos',
    category: 'Aplicación web',
    description:
      'Aplicación web desarrollada para centralizar y facilitar la gestión de pedidos de una empresa.',
    technologies: ['React', 'MongoDB'],
    url: null,
    isPrivate: true,
    status: 'private',
    statusLabel: 'Proyecto privado',
    cta: 'Ver proyecto',
    ctaType: 'modal',
    images: {
      desktop: '/images/projects/gestion-pedidos/preview-desktop.svg',
      mobile: '/images/projects/gestion-pedidos/preview-mobile.svg',
    },
    details: {
      context:
        'Aplicación web desarrollada para una empresa real, orientada a centralizar y facilitar la gestión de pedidos.',
      project:
        'Desarrollo de una herramienta web para gestionar pedidos, con una interfaz pensada para el uso diario en un entorno empresarial.',
      features: [
        'Interfaz web para la gestión de pedidos',
        'Estructura orientada al trabajo diario de la empresa',
        'Aplicación web con enfoque en usabilidad',
      ],
      technologies: ['React', 'MongoDB'],
      gallery: [
        '/images/projects/gestion-pedidos/screen-1.svg',
        '/images/projects/gestion-pedidos/screen-2.svg',
        '/images/projects/gestion-pedidos/screen-3.svg',
      ],
      status: 'Proyecto privado',
    },
  },
  {
    id: '04',
    slug: 'webs-comercios',
    title: 'Webs para comercios reales',
    category: 'Proyectos para negocios',
    description:
      'Colección de webs desarrolladas para comercios y negocios reales, incluyendo proyectos para una consultoría y un restaurante.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React'],
    url: null,
    isPrivate: true,
    status: 'private',
    statusLabel: 'Preview del proyecto',
    cta: 'Ver proyecto',
    ctaType: 'modal',
    images: {
      desktop: '/images/projects/otros-proyectos/preview-desktop.svg',
    },
    details: {
      context:
        'Varios proyectos web desarrollados para comercios y negocios reales. Algunos aún no están publicados online.',
      project:
        'Desarrollo de experiencias web adaptadas a las necesidades de cada negocio, desde la estructura hasta la presentación visual.',
      subProjects: [
        {
          name: 'Web para consultoría',
          category: 'Web corporativa',
          description:
            'Web desarrollada para una consultoría, con enfoque en presentar el negocio y sus servicios.',
          technologies: ['HTML5', 'CSS3', 'JavaScript'],
          image: '/images/projects/otros-proyectos/consultoria.svg',
        },
        {
          name: 'Web para restaurante',
          category: 'Web para negocio',
          description:
            'Web desarrollada para un restaurante, orientada a presentar el local y facilitar el contacto.',
          technologies: ['HTML5', 'CSS3', 'JavaScript'],
          image: '/images/projects/otros-proyectos/restaurante.svg',
        },
      ],
      features: [
        'Webs adaptadas a negocios reales',
        'Diseño orientado a la identidad de cada comercio',
        'Estructura clara para presentar servicios y contacto',
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'React'],
      gallery: [
        '/images/projects/otros-proyectos/consultoria.svg',
        '/images/projects/otros-proyectos/restaurante.svg',
      ],
      status: 'Preview del proyecto',
    },
  },
]
