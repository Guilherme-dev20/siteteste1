// ─────────────────────────────────────────────────────────────────────────────
// CAMPANHAS
// Cada item representa uma aba (Lançamento, Série, Filme, etc.)
// Para desativar a seção inteira: comente/remova todos os itens do array.
// ─────────────────────────────────────────────────────────────────────────────
export const campaigns = [
  {
    id: 'lancamento',
    tab: 'Lançamento',

    badge:      'NOVO LANÇAMENTO',
    badgeColor: '#ef4444',

    title:       'Homem-Aranha: Além do Aranhaverso',
    subtitle:    'A saga continua — vista o seu herói favorito',
    description: 'Miles Morales está de volta! Aproveite o lançamento e personalize sua camisa com os designs exclusivos do Aranhaverso. Qualidade premium, entrega rápida.',

    banner:  '/assets/campaigns/spiderman.jpeg',
    productIds: [2, 1, 5],
    collectionLink: '/produtos?tema=Heróis',
  },
  {
    id: 'serie',
    tab: 'Série',

    badge:      'EM SÉRIE',
    badgeColor: '#8B5CF6',

    title:       'Stranger Things — Coleção Hawkins',
    subtitle:    'Do outro lado do mundo invertido',
    description: 'Designs exclusivos inspirados em Hawkins, o Mundo Invertido e seus personagens mais icônicos. Perfeito para fãs da série.',

    banner:  '/assets/campaigns/spiderman.jpeg',
    productIds: [3, 4, 1],
    collectionLink: '/produtos?tema=Séries',
  },
  {
    id: 'filme',
    tab: 'Filme',

    badge:      'EM CARTAZ',
    badgeColor: '#F59E0B',

    title:       'Duna: Parte Dois — Coleção Arrakis',
    subtitle:    'A especiaria deve fluir',
    description: 'Mergulhe no universo de Arrakis com camisas de alta qualidade inspiradas no épico sci-fi. Edição limitada disponível por tempo limitado.',

    banner:  '/assets/campaigns/spiderman.jpeg',
    productIds: [5, 2, 3],
    collectionLink: '/produtos?tema=Filmes',
  },
]

// Mantém compatibilidade com código que importa { campaign }
export const campaign = campaigns[0]
