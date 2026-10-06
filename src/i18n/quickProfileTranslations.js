const copy = {
  es: ['Proyectos reales para negocios y empresas, de la idea al producto final.', 'Stack principal', ['Proyectos reales', 'Frontend moderno', 'IA y automatización']],
  en: ['Real projects for businesses, from the initial idea to the finished product.', 'Core stack', ['Real projects', 'Modern frontend', 'AI and automation']],
  de: ['Reale Projekte für Unternehmen – von der ersten Idee bis zum fertigen Produkt.', 'Technologie-Stack', ['Reale Projekte', 'Modernes Frontend', 'KI und Automatisierung']],
  gl: ['Proxectos reais para negocios e empresas, desde a idea ata o produto final.', 'Tecnoloxías principais', ['Proxectos reais', 'Frontend moderno', 'IA e automatización']],
  pt: ['Projetos reais para negócios e empresas, da ideia ao produto final.', 'Tecnologias principais', ['Projetos reais', 'Frontend moderno', 'IA e automatização']],
  ca: ['Projectes reals per a negocis i empreses, de la idea al producte final.', 'Tecnologies principals', ['Projectes reals', 'Frontend modern', 'IA i automatització']],
  fr: ['Des projets concrets pour les entreprises, de la première idée au produit final.', 'Technologies principales', ['Projets réels', 'Frontend moderne', 'IA et automatisation']],
}

export function getQuickProfileCopy(locale) {
  const [summary, stack, highlights] = copy[locale] ?? copy.es
  return { summary, stack, highlights }
}
