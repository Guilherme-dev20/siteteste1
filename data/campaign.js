// ─────────────────────────────────────────────────────────────────────────────
// CAMPANHA ATIVA
// Para ativar: mude "active" para true e preencha os campos abaixo.
// Para desativar: mude "active" para false.
// ─────────────────────────────────────────────────────────────────────────────
export const campaign = {
  active: true,

  // Etiqueta de destaque (ex: "NOVO LANÇAMENTO", "EM CARTAZ", "ESTREIA HOJE")
  badge:      'NOVO LANÇAMENTO',
  badgeColor: '#ef4444',   // cor da etiqueta (hex)

  // Título e descrição da campanha
  title:       'Homem-Aranha: Além do Aranhaverso',
  subtitle:    'A saga continua — vista o seu herói favorito',
  description: 'Miles Morales está de volta! Aproveite o lançamento e personalize sua camisa com os designs exclusivos do Aranhaverso. Qualidade premium, entrega rápida.',

  // Imagem do banner (salve em /public/assets/campaigns/)
  // Sugestão: poster do filme ou arte oficial 4:3 ou 16:9
  banner:  '/assets/campaigns/spiderman.jpeg',

  // IDs dos produtos relacionados (de data/products.js)
  productIds: [2, 1, 5],

  // Link do botão "Ver coleção completa"
  collectionLink: '/produtos?tema=Heróis',
}
