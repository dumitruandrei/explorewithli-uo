export type Activity = string

export type TravelPackage = {
  slug: string
  title: string
  image: string
  description: string
  activities: Activity[]
  durationDays: number
  groupPrice: number // base price for a group of 4 (per person, USD)
  highlights: string
}

export type Destination = {
  slug: string
  name: string
  region: string
  tagline: string
  heroImage: string
  cardImage: string
  startingPrice: number
  description: string
  longDescription: string
  packages: TravelPackage[]
}

export const destinations: Destination[] = [
  {
    slug: 'sichuan',
    name: 'Sichuan',
    region: 'Southwest China',
    tagline: 'Pandas, sacred peaks & fiery cuisine',
    heroImage: '/images/dest-sichuan.png',
    cardImage: '/images/dest-sichuan.png',
    startingPrice: 1480,
    description:
      'Misty mountains, bamboo forests and the gentle giants that call them home.',
    longDescription:
      'Sichuan is a province of dramatic contrasts — from the bamboo groves where giant pandas roam to the jewel-toned lakes of Jiuzhaigou and the bustling teahouses of Chengdu. Our local guides open doors to a slower, richer way of travelling, blending nature, spirituality and the legendary Sichuan table.',
    packages: [
      {
        slug: 'panda-sanctuary',
        title: 'Panda Sanctuary & Chengdu Living',
        image: '/images/pkg-sichuan-panda.png',
        description:
          'Wake before the crowds for a private morning with the pandas, then sink into the rhythm of Chengdu life.',
        activities: [
          'Private sunrise visit to a panda research base',
          'Hands-on conservation experience with keepers',
          'Old-town teahouse and face-changing opera evening',
          'Guided Sichuan street-food walk',
        ],
        durationDays: 5,
        groupPrice: 1480,
        highlights: 'Best for first-time visitors and families.',
      },
      {
        slug: 'jiuzhaigou-lakes',
        title: 'Jiuzhaigou Lakes & Alpine Valleys',
        image: '/images/pkg-sichuan-jiuzhaigou.png',
        description:
          'Trek between turquoise lakes and tiered waterfalls in one of China’s most surreal landscapes.',
        activities: [
          'Guided hikes through Jiuzhaigou valley',
          'Tibetan village homestay lunch',
          'Sunrise photography at the mirror lakes',
          'Visit to Huanglong travertine pools',
          'Highland tea tasting with a local family',
        ],
        durationDays: 7,
        groupPrice: 1980,
        highlights: 'Best for nature lovers and photographers.',
      },
    ],
  },
  {
    slug: 'yunnan',
    name: 'Yunnan',
    region: 'Southwest China',
    tagline: 'Ancient towns, snow peaks & living cultures',
    heroImage: '/images/dest-yunnan.png',
    cardImage: '/images/dest-yunnan.png',
    startingPrice: 1620,
    description:
      'Cobblestone old towns beneath snow mountains, home to China’s richest tapestry of cultures.',
    longDescription:
      'Yunnan is where China meets the Himalaya and Southeast Asia — a province of terraced rice fields, glacier-fed valleys and more than twenty ethnic minorities. Wander the lantern-lit lanes of Lijiang, stand beneath Jade Dragon Snow Mountain, and journey north to the Tibetan highlands of Shangri-La.',
    packages: [
      {
        slug: 'lijiang-old-town',
        title: 'Lijiang Old Town & Naxi Culture',
        image: '/images/pkg-yunnan-lijiang.png',
        description:
          'Lose yourself in canal-laced lanes and discover the living traditions of the Naxi people.',
        activities: [
          'Private walking tour of Lijiang Old Town',
          'Naxi music and cuisine evening',
          'Day trip to Jade Dragon Snow Mountain',
          'Black Dragon Pool sunrise stroll',
        ],
        durationDays: 5,
        groupPrice: 1620,
        highlights: 'Best for culture and slow travel.',
      },
      {
        slug: 'shangri-la-highlands',
        title: 'Shangri-La Highlands & Monasteries',
        image: '/images/pkg-yunnan-shangri.png',
        description:
          'Climb to the Tibetan plateau for golden monasteries, vast meadows and prayer-flag passes.',
        activities: [
          'Visit Songzanlin Monastery with a local monk',
          'Meadow walk through Pudacuo National Park',
          'Tibetan family dinner and butter-tea ceremony',
          'Scenic drive over the Tiger Leaping Gorge',
          'Stargazing on the highland plateau',
        ],
        durationDays: 8,
        groupPrice: 2240,
        highlights: 'Best for adventurous, immersive travellers.',
      },
    ],
  },
  {
    slug: 'chongqing',
    name: 'Chongqing',
    region: 'Southwest China',
    tagline: 'Riverside megacity, gorges & legendary hotpot',
    heroImage: '/images/dest-chongqing.png',
    cardImage: '/images/dest-chongqing.png',
    startingPrice: 1390,
    description:
      'A vertical city of fog and neon where the Yangtze and Jialing rivers meet.',
    longDescription:
      'Chongqing rises in layers along the cliffs above the Yangtze — a city of stilted houses, cable cars and the most thrilling food in China. From here the great river carries you east into the Three Gorges, past sheer cliffs and ancient towns. It is raw, electric and unforgettable.',
    packages: [
      {
        slug: 'hotpot-city',
        title: 'Hotpot City & Neon Nights',
        image: '/images/pkg-chongqing-hotpot.png',
        description:
          'Eat your way through the spice capital of China and ride the city’s vertiginous skyline.',
        activities: [
          'Private hotpot masterclass with a local chef',
          'Hongya Cave and riverside night walk',
          'Cable car ride across the Yangtze',
          'Hidden alley food crawl',
        ],
        durationDays: 4,
        groupPrice: 1390,
        highlights: 'Best for foodies and city explorers.',
      },
      {
        slug: 'yangtze-gorges',
        title: 'Yangtze River & Three Gorges',
        image: '/images/pkg-chongqing-yangtze.png',
        description:
          'Drift through the legendary Three Gorges on a slow, scenic river journey.',
        activities: [
          'Multi-day Yangtze river cruise',
          'Shore excursion to the Lesser Three Gorges',
          'Visit to the ancient town of Fengdu',
          'Sunrise tai chi on deck',
          'Gorge photography with a local guide',
        ],
        durationDays: 6,
        groupPrice: 1860,
        highlights: 'Best for a relaxed, scenic pace.',
      },
    ],
  },
]

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug)
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  readTime: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'art-of-chinese-tea',
    title: 'The Quiet Art of Chinese Tea',
    excerpt:
      'From Chengdu’s teahouses to the highland gardens of Yunnan, a guide to slowing down over a perfect cup.',
    image: '/images/blog-tea.png',
    category: 'Culture',
    readTime: '6 min read',
  },
  {
    slug: 'festivals-of-yunnan',
    title: 'Festivals of Yunnan: A Year in Colour',
    excerpt:
      'Yunnan’s minority communities mark the seasons with some of the most vibrant celebrations on earth.',
    image: '/images/blog-festival.png',
    category: 'Traditions',
    readTime: '8 min read',
  },
  {
    slug: 'chongqing-after-dark',
    title: 'Chongqing After Dark',
    excerpt:
      'How to navigate the neon, the fog and the food of China’s most electric riverside megacity.',
    image: '/images/blog-street.png',
    category: 'Food & City',
    readTime: '5 min read',
  },
  {
    slug: 'packing-for-southwest-china',
    title: 'Packing for Southwest China',
    excerpt:
      'Altitude, humidity and spice — everything you need to travel light and comfortably across the region.',
    image: '/images/blog-packing.png',
    category: 'Travel Tips',
    readTime: '4 min read',
  },
]
