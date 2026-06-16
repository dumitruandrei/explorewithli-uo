import type { TravelPackage } from '../lib/travel'

export type Destination = {
  slug: string
  name: string
  region: string
  tagline: string
  heroImage: string
  description: string
  longDescription: string
  packages: TravelPackage[]
}

export type Review = {
  id: string
  travelerName: string
  avatar: string
  stars: number
  comment: string
  googleReviewUrl: string
}

export const destinations: Destination[] = [
  {
    slug: 'sichuan',
    name: 'Sichuan',
    region: 'Southwest China',
    tagline: 'Pandas, sacred peaks & fiery cuisine',
    heroImage: '/images/dest-sichuan.png',
    description:
      'Misty mountains, bamboo forests and the gentle giants that call them home.',
    longDescription:
      'Sichuan is a province of dramatic contrasts — from the bamboo groves where giant pandas roam to the jewel-toned lakes of Jiuzhaigou and the bustling teahouses of Chengdu. Our local guides open doors to a slower, richer way of travelling, blending nature, spirituality and the legendary Sichuan table.',
    packages: [
      {
        slug: 'panda-sanctuary',
        title: 'Panda Sanctuary & Chengdu Living',
        image: '/images/pkg-sichuan-panda.png',
        images: [
          'https://picsum.photos/seed/panda1/1200/900',
          'https://picsum.photos/seed/panda2/1200/900',
          'https://picsum.photos/seed/panda3/1200/900',
        ],
        description:
          'Wake before the crowds for a private morning with the pandas, then sink into the rhythm of Chengdu life.',
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Chengdu',
            description:
              'Land in the laid-back capital of Sichuan and settle into your boutique courtyard hotel.',
            activities: [
              'Private airport transfer and check-in',
              'Evening stroll through Jinli Ancient Street',
              'Welcome dinner of classic Sichuan small plates',
            ],
          },
          {
            day: 2,
            title: 'Sunrise with the Pandas',
            description:
              'Beat the crowds with an early private entry to a panda research base while the giant pandas are most active.',
            activities: [
              'Private sunrise visit to a panda research base',
              'Behind-the-scenes talk with conservation keepers',
              'Afternoon tea in a traditional teahouse',
            ],
          },
          {
            day: 3,
            title: 'Hands-on Conservation',
            description:
              'Go deeper with a hands-on volunteering morning supporting the keepers and their work.',
            activities: [
              'Hands-on conservation experience with keepers',
              'Bamboo preparation and enrichment activities',
              'Documentary screening on panda rewilding',
            ],
          },
          {
            day: 4,
            title: 'Old-Town Culture & Cuisine',
            description:
              'Slow down into the rhythm of Chengdu life, from teahouses to the theatre.',
            activities: [
              'Guided Sichuan street-food walk',
              'Face-changing Sichuan opera evening',
              'Hands-on mapo tofu cooking class',
            ],
          },
          {
            day: 5,
            title: 'Departure',
            description:
              'A relaxed final morning before your onward journey.',
            activities: [
              'Leisure morning and last-minute shopping',
              'Private transfer to the airport',
            ],
          },
        ],
        durationDays: 5,
        groupPrice: 1480,
        highlights: 'Best for first-time visitors and families.',
        tripHighlights: [
          'Private sunrise visit to a giant panda research base',
          'Hands-on panda conservation volunteer experience',
          'Traditional teahouse afternoon tea and guided street-food walk',
          'Private hands-on cooking class with a local chef',
          'Face-changing Sichuan Opera evening show',
        ],
        included: [
          '4 nights in standard boutique courtyard accommodation',
          'All private transfers and custom ground transportation',
          'Private English-speaking local cultural guide',
          'Entrance tickets to all itinerary sights & reserves',
          'Volunteering keeper pass at the Panda Base',
          'Daily breakfasts, welcome dinner & teahouse tastings',
        ],
        notIncluded: [
          'International or domestic flights to/from Chengdu',
          'Personal travel insurance (highly recommended)',
          'Dinners and lunches not specified in the itinerary',
          'Gratuities or tipping for guide and private driver',
        ],
      },
      {
        slug: 'jiuzhaigou-lakes',
        title: 'Jiuzhaigou Lakes & Alpine Valleys',
        image: '/images/pkg-sichuan-jiuzhaigou.png',
        images: [
          'https://picsum.photos/seed/jiuzhaigou1/1200/900',
          'https://picsum.photos/seed/jiuzhaigou2/1200/900',
          'https://picsum.photos/seed/jiuzhaigou3/1200/900',
        ],
        description:
          'Trek between turquoise lakes and tiered waterfalls in one of China’s most surreal landscapes.',
        itinerary: [
          {
            day: 1,
            title: 'Chengdu to the Mountains',
            description:
              'Depart the city and journey north into the alpine highlands of northern Sichuan.',
            activities: [
              'Scenic drive into the mountains',
              'Roadside village lunch stop',
              'Evening check-in near the valley gate',
            ],
          },
          {
            day: 2,
            title: 'Jiuzhaigou Valley',
            description:
              'A full day exploring the surreal turquoise lakes and tiered waterfalls of Jiuzhaigou.',
            activities: [
              'Guided hikes through Jiuzhaigou valley',
              'Boardwalk trails between the mirror lakes',
              'Picnic lunch among the forests',
            ],
          },
          {
            day: 3,
            title: 'Sunrise Photography',
            description:
              'Rise early for the still, mirror-like reflections that make these lakes legendary.',
            activities: [
              'Sunrise photography at the mirror lakes',
              'Composition guidance with a local photographer',
              'Relaxed afternoon by the water',
            ],
          },
          {
            day: 4,
            title: 'Tibetan Village Life',
            description:
              'Share a meal and the warmth of a Tibetan highland community.',
            activities: [
              'Tibetan village homestay lunch',
              'Highland tea tasting with a local family',
              'Walk through prayer-flag draped trails',
            ],
          },
          {
            day: 5,
            title: 'Huanglong Pools',
            description:
              'Marvel at the cascading travertine pools of Huanglong, a natural wonder of mineral terraces.',
            activities: [
              'Visit to Huanglong travertine pools',
              'Alpine meadow walk',
              'Cable car ascent for panoramic views',
            ],
          },
          {
            day: 6,
            title: 'Return Journey',
            description:
              'A scenic drive back toward Chengdu with stops along the way.',
            activities: [
              'Mountain pass viewpoints',
              'Local handicraft market visit',
            ],
          },
          {
            day: 7,
            title: 'Departure',
            description: 'Final morning in Chengdu before departure.',
            activities: [
              'Leisure breakfast',
              'Private transfer to the airport',
            ],
          },
        ],
        durationDays: 7,
        groupPrice: 1980,
        highlights: 'Best for nature lovers and photographers.',
        tripHighlights: [
          "Full day guided hike through Jiuzhaigou's valleys",
          'Sunrise photography at legendary mirror lakes',
          'Travertine mineral pools of Huanglong with cable car',
          'Authentic Tibetan village homestay lunch and tea',
          'Scenic alpine meadow trails and mountain passes',
        ],
        included: [
          '6 nights premium boutique mountain lodge accommodation',
          'All private ground transfers in luxury 4x4 or SUV vehicles',
          'Dedicated English-speaking private hiking guide',
          'National Park multi-day passes & environment bus tickets',
          'Return cable car tickets at Huanglong Valley',
          'Special Tibetan homestay lunch and cultural exchanges',
          'Daily breakfasts, scenic picnic box lunches',
        ],
        notIncluded: [
          'Flights or bullet train tickets to/from Chengdu',
          'Personal outdoor hiking gear and equipment',
          'Dinner meals (offering flexibility to dine at local spots)',
          'Driver and guide gratuities',
        ],
      },
    ],
  },
  {
    slug: 'yunnan',
    name: 'Yunnan',
    region: 'Southwest China',
    tagline: 'Ancient towns, snow peaks & living cultures',
    heroImage: '/images/dest-yunnan.png',
    description:
      'Cobblestone old towns beneath snow mountains, home to China’s richest tapestry of cultures.',
    longDescription:
      'Yunnan is where China meets the Himalaya and Southeast Asia — a province of terraced rice fields, glacier-fed valleys and more than twenty ethnic minorities. Wander the lantern-lit lanes of Lijiang, stand beneath Jade Dragon Snow Mountain, and journey north to the Tibetan highlands of Shangri-La.',
    packages: [
      {
        slug: 'lijiang-old-town',
        title: 'Lijiang Old Town & Naxi Culture',
        image: '/images/pkg-yunnan-lijiang.png',
        images: [
          'https://picsum.photos/seed/lijiang1/1200/900',
          'https://picsum.photos/seed/lijiang2/1200/900',
          'https://picsum.photos/seed/lijiang3/1200/900',
        ],
        description:
          'Lose yourself in canal-laced lanes and discover the living traditions of the Naxi people.',
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Lijiang',
            description:
              'Arrive in the UNESCO-listed old town and settle into a restored Naxi courtyard inn.',
            activities: [
              'Private transfer and check-in',
              'Orientation walk through the canal lanes',
              'Welcome dinner of Naxi specialties',
            ],
          },
          {
            day: 2,
            title: 'Old Town & Naxi Culture',
            description:
              'Explore the lantern-lit lanes and living traditions of the Naxi people.',
            activities: [
              'Private walking tour of Lijiang Old Town',
              'Visit to the Dongba cultural museum',
              'Naxi music and cuisine evening',
            ],
          },
          {
            day: 3,
            title: 'Jade Dragon Snow Mountain',
            description:
              'Ascend toward the glaciers of Yunnan’s most iconic peak.',
            activities: [
              'Day trip to Jade Dragon Snow Mountain',
              'Cable car to the glacier viewpoint',
              'Impression Lijiang outdoor performance',
            ],
          },
          {
            day: 4,
            title: 'Gardens & Reflections',
            description:
              'A gentle day of gardens, water and quiet corners of the old town.',
            activities: [
              'Black Dragon Pool sunrise stroll',
              'Tea house afternoon with mountain views',
              'Free time to explore the lanes',
            ],
          },
          {
            day: 5,
            title: 'Departure',
            description: 'A relaxed final morning before your onward journey.',
            activities: [
              'Leisure breakfast',
              'Private transfer to the airport',
            ],
          },
        ],
        durationDays: 5,
        groupPrice: 1620,
        highlights: 'Best for culture and slow travel.',
        tripHighlights: [
          'Private walking tour of UNESCO-listed Lijiang Old Town',
          'Day trip to Jade Dragon Snow Mountain with cable car',
          'Impression Lijiang outdoor theater performance',
          'Sunrise stroll around Black Dragon Pool',
          'Visit to the Dongba cultural museum and Naxi dinner',
        ],
        included: [
          '4 nights in a beautifully restored Naxi courtyard inn',
          'Private chauffeured transportation throughout the trip',
          'Expert local English-speaking cultural guide',
          'All entry tickets, including Jade Dragon Snow Mountain passes',
          'VIP seating tickets for Impression Lijiang show',
          'Daily breakfasts, welcome dinner of traditional Naxi dishes',
        ],
        notIncluded: [
          'Airfares or train travel to Lijiang Old Town',
          'Personal shopping and active gear rentals',
          'Unspecified lunches and dinners',
          'Guide/driver gratuities',
        ],
      },
      {
        slug: 'shangri-la-highlands',
        title: 'Shangri-La Highlands & Monasteries',
        image: '/images/pkg-yunnan-shangri.png',
        images: [
          'https://picsum.photos/seed/shangrila1/1200/900',
          'https://picsum.photos/seed/shangrila2/1200/900',
          'https://picsum.photos/seed/shangrila3/1200/900',
        ],
        description:
          'Climb to the Tibetan plateau for golden monasteries, vast meadows and prayer-flag passes.',
        itinerary: [
          {
            day: 1,
            title: 'Lijiang to the Highlands',
            description:
              'Begin the ascent from Lijiang toward the Tibetan plateau.',
            activities: [
              'Scenic drive north into the mountains',
              'Roadside viewpoints and photo stops',
              'Evening arrival in Shangri-La old town',
            ],
          },
          {
            day: 2,
            title: 'Tiger Leaping Gorge',
            description:
              'Stand above one of the deepest river canyons in the world.',
            activities: [
              'Scenic drive over the Tiger Leaping Gorge',
              'Short rim trail walk',
              'Picnic lunch with canyon views',
            ],
          },
          {
            day: 3,
            title: 'Songzanlin Monastery',
            description:
              'Visit the largest Tibetan Buddhist monastery in Yunnan, often called the little Potala Palace.',
            activities: [
              'Visit Songzanlin Monastery with a local monk',
              'Prayer-wheel walk and rooftop views',
              'Old-town butter-tea break',
            ],
          },
          {
            day: 4,
            title: 'Pudacuo National Park',
            description:
              'Walk through pristine alpine meadows, lakes and forests.',
            activities: [
              'Meadow walk through Pudacuo National Park',
              'Lakeside boardwalk trails',
              'Wildlife and wildflower spotting',
            ],
          },
          {
            day: 5,
            title: 'Tibetan Family Life',
            description:
              'Share an evening in a traditional Tibetan home.',
            activities: [
              'Tibetan family dinner and butter-tea ceremony',
              'Traditional song and dance',
              'Cultural exchange with your hosts',
            ],
          },
          {
            day: 6,
            title: 'Highland Wandering',
            description:
              'A free day to soak in the vast skies and quiet of the plateau.',
            activities: [
              'Optional horseback ride on the meadow',
              'Local handicraft market visit',
              'Relaxed afternoon at altitude',
            ],
          },
          {
            day: 7,
            title: 'Plateau Stargazing',
            description:
              'Under some of the clearest skies in China, the highland night sky is unforgettable.',
            activities: [
              'Stargazing on the highland plateau',
              'Bonfire and warm highland drinks',
              'Astronomy guidance with your guide',
            ],
          },
          {
            day: 8,
            title: 'Departure',
            description: 'Final highland morning before the return journey.',
            activities: [
              'Leisure breakfast',
              'Private transfer for departure',
            ],
          },
        ],
        durationDays: 8,
        groupPrice: 2240,
        highlights: 'Best for adventurous, immersive travellers.',
        tripHighlights: [
          'Songzanlin Monastery private tour with a local monk',
          'Scenic drive and rim trail walk at Tiger Leaping Gorge',
          'Pristine meadow walks in Pudacuo National Park',
          'Authentic Tibetan family dinner and butter-tea ceremony',
          'Clear night stargazing on the highland plateau',
        ],
        included: [
          '7 nights standard premium Tibetan luxury hotel accommodation',
          'Private 4x4 group transportation suitable for mountain passes',
          'English-speaking Tibetan local cultural guide',
          'Monastery tickets, Tiger Leaping Gorge permits, National Park entry',
          'Traditional family dinner, butter-tea and bonfire arrangements',
          'All breakfasts, specified trail lunch sets',
        ],
        notIncluded: [
          'Flights or transit to starting/ending stations',
          'Highland acclimatisation oxygen kits or gear',
          'Dinners and lunches not mentioned above',
          'Driver and guide gratuities',
        ],
      },
    ],
  },
  {
    slug: 'chongqing',
    name: 'Chongqing',
    region: 'Southwest China',
    tagline: 'Riverside megacity, gorges & legendary hotpot',
    heroImage: '/images/dest-chongqing.png',
    description:
      'A vertical city of fog and neon where the Yangtze and Jialing rivers meet.',
    longDescription:
      'Chongqing rises in layers along the cliffs above the Yangtze — a city of stilted houses, cable cars and the most thrilling food in China. From here the great river carries you east into the Three Gorges, past sheer cliffs and ancient towns. It is raw, electric and unforgettable.',
    packages: [
      {
        slug: 'hotpot-city',
        title: 'Hotpot City & Neon Nights',
        image: '/images/pkg-chongqing-hotpot.png',
        images: [
          'https://picsum.photos/seed/chongqinghotpot1/1200/900',
          'https://picsum.photos/seed/chongqinghotpot2/1200/900',
          'https://picsum.photos/seed/chongqinghotpot3/1200/900',
        ],
        description:
          'Eat your way through the spice capital of China and ride the city’s vertiginous skyline.',
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Chongqing',
            description:
              'Arrive in the vertical megacity where the Yangtze and Jialing rivers meet.',
            activities: [
              'Private transfer and check-in',
              'Evening orientation walk',
              'Riverside welcome dinner',
            ],
          },
          {
            day: 2,
            title: 'Hotpot Masterclass',
            description:
              'Get hands-on with the spice capital’s most legendary dish.',
            activities: [
              'Private hotpot masterclass with a local chef',
              'Spice market tour',
              'Hidden alley food crawl',
            ],
          },
          {
            day: 3,
            title: 'Neon Nights & Skyline',
            description:
              'Experience the futuristic, fog-wrapped skyline of Chongqing after dark.',
            activities: [
              'Cable car ride across the Yangtze',
              'Hongya Cave and riverside night walk',
              'Rooftop viewpoint over the rivers',
            ],
          },
          {
            day: 4,
            title: 'Departure',
            description: 'A final morning before your onward journey.',
            activities: [
              'Leisure breakfast',
              'Private transfer to the airport',
            ],
          },
        ],
        durationDays: 4,
        groupPrice: 1390,
        highlights: 'Best for foodies and city explorers.',
        tripHighlights: [
          'Private hotpot masterclass with a local chef',
          'Guided spice market tour and hidden alley food crawl',
          'Cable car ride across the Yangtze River',
          'Spectacular night views of Hongya Cave and city skyline',
          'Traditional riverside welcome dinner',
        ],
        included: [
          '3 nights in high-rise luxury boutique hotel in Chongqing center',
          'Private ground transfers and subway/cable car fast-pass tickets',
          'Specialist food explorer guide (bilingual)',
          'Private chef hotpot masterclass session & all spice samplers',
          'All food and drink tastings on the alley food crawl',
          'Daily breakfasts, welcome dinner',
        ],
        notIncluded: [
          'Domestic or international flights to/from Chongqing',
          'Personal shopping and active gear rentals',
          'Alcoholic beverages beyond what is provided in tastings',
          'Driver and guide gratuities',
        ],
      },
      {
        slug: 'yangtze-gorges',
        title: 'Yangtze River & Three Gorges',
        image: '/images/pkg-chongqing-yangtze.png',
        images: [
          'https://picsum.photos/seed/yangtze1/1200/900',
          'https://picsum.photos/seed/yangtze2/1200/900',
          'https://picsum.photos/seed/yangtze3/1200/900',
        ],
        description:
          'Drift through the legendary Three Gorges on a slow, scenic river journey.',
        itinerary: [
          {
            day: 1,
            title: 'Embarkation in Chongqing',
            description:
              'Board your river vessel and set sail east into the night.',
            activities: [
              'Private transfer to the cruise terminal',
              'Cabin check-in and ship orientation',
              'Welcome dinner as the city lights drift by',
            ],
          },
          {
            day: 2,
            title: 'Fengdu Ancient Town',
            description:
              'Step ashore to explore the storied “Ghost City” of Fengdu.',
            activities: [
              'Visit to the ancient town of Fengdu',
              'Sunrise tai chi on deck',
              'Onboard talk on Yangtze history',
            ],
          },
          {
            day: 3,
            title: 'Into the Three Gorges',
            description:
              'Sail through the dramatic cliffs of the Qutang and Wu gorges.',
            activities: [
              'Gorge photography with a local guide',
              'Scenic cruising through the Three Gorges',
              'Evening cultural performance',
            ],
          },
          {
            day: 4,
            title: 'Lesser Three Gorges',
            description:
              'Transfer to smaller boats to navigate the intimate side canyons.',
            activities: [
              'Shore excursion to the Lesser Three Gorges',
              'Sampan ride through narrow channels',
              'Riverside village visit',
            ],
          },
          {
            day: 5,
            title: 'Three Gorges Dam',
            description:
              'Witness the scale of the world’s largest hydroelectric project.',
            activities: [
              'Guided tour of the Three Gorges Dam',
              'Ship lock transit experience',
              'Farewell dinner aboard',
            ],
          },
          {
            day: 6,
            title: 'Disembark & Departure',
            description: 'Leave the river and continue your onward journey.',
            activities: [
              'Disembarkation and transfer',
              'Onward travel assistance',
            ],
          },
        ],
        durationDays: 6,
        groupPrice: 1860,
        highlights: 'Best for a relaxed, scenic pace.',
        tripHighlights: [
          'Scenic cruising through the majestic Three Gorges',
          'Guided tour of the epic Three Gorges Dam',
          'Sampan ride through the narrow Lesser Three Gorges',
          'Shore excursion to the ancient "Ghost City" of Fengdu',
          'Cultural performances and sunrise tai chi on deck',
        ],
        included: [
          '5 nights premium river vessel balcony cabin accommodation',
          'Private port-to-hotel chauffeured transfers at start/finish',
          'Dedicated shipboard English tour guides & shore escorts',
          'All shore excursion entrance passes & local sampan transport',
          'All shipboard dining plans including captain’s farewell dinner',
          'Onboard historical lectures and evening cultural events',
        ],
        notIncluded: [
          'Flights or train transits to Chongqing or from terminal',
          'Personal laundry, salon, or cabin minibar charges',
          'Unspecified drinks or vintage wines in ship lounges',
          'Voluntary shipboard tipping or service charges',
        ],
      },
    ],
  },
]

export type BlogSection = {
  heading?: string
  paragraphs: string[]
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  readTime: string
  author: string
  date: string
  intro: string
  content: BlogSection[]
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
    author: 'Mei Lin',
    date: 'March 12, 2025',
    intro:
      'Tea in southwest China is less a drink than a way of marking time. To sit with a cup is to step out of the hurry of travel and into the unhurried rhythm of local life.',
    content: [
      {
        heading: 'The teahouse as a second living room',
        paragraphs: [
          'In Chengdu, the teahouse is an institution. Bamboo chairs spill out under old trees, and from morning until dusk locals gather to play cards, read the paper, have their ears cleaned, and above all, to talk. A pot of fragrant green tea costs little and buys you a whole afternoon.',
          'Unlike the ceremony of other tea cultures, the Sichuan teahouse is wonderfully informal. The covered gaiwan bowl is refilled endlessly with hot water, and you are expected to linger. There is no rush, no expectation, only the gentle clink of porcelain and the murmur of conversation.',
        ],
      },
      {
        heading: 'Highland gardens of Yunnan',
        paragraphs: [
          'Travel south and west into Yunnan and the story of tea changes. Here, on misty mountain slopes, grow some of the oldest tea trees on earth — the source of pu-erh, a fermented tea prized for its depth and the way it changes with age, like wine.',
          'Visiting a highland tea garden, you can watch leaves being hand-picked and pressed into cakes, then taste a brew that carries the earth and fog of the mountain in every sip.',
        ],
      },
      {
        heading: 'How to slow down over a cup',
        paragraphs: [
          'Our advice to travellers is simple: build a teahouse afternoon into every itinerary. Order a pot, put your phone away, and let the place reveal itself. Some of the most memorable moments of a journey through China happen not at a famous sight, but across a small table, steam rising between you and a new friend.',
        ],
      },
    ],
  },
  {
    slug: 'festivals-of-yunnan',
    title: 'Festivals of Yunnan: A Year in Colour',
    excerpt:
      'Yunnan’s minority communities mark the seasons with some of the most vibrant celebrations on earth.',
    image: '/images/blog-festival.png',
    category: 'Traditions',
    readTime: '8 min read',
    author: 'Daniel Cho',
    date: 'February 2, 2025',
    intro:
      'Home to more than twenty ethnic minorities, Yunnan keeps a calendar bursting with festivals — explosions of music, water, fire and colour that turn entire valleys into celebration.',
    content: [
      {
        heading: 'The Water-Splashing Festival',
        paragraphs: [
          'Each April, the Dai people of southern Yunnan ring in their new year by splashing water on one another — a joyful blessing meant to wash away the misfortunes of the past year. Streets become rivers of laughter as buckets, basins and water guns come out in force.',
          'Beyond the splashing, the days are filled with dragon-boat races, sky lanterns and peacock dances. It is one of the most exuberant festivals you can witness anywhere in China.',
        ],
      },
      {
        heading: 'Torch Festival of the Yi',
        paragraphs: [
          'In high summer, the Yi people light great torches and parade them through villages and fields, believed to drive away pests and bad spirits and to pray for a good harvest. After dark, the hillsides glow with fire and the air fills with song, wrestling and bullfights.',
        ],
      },
      {
        heading: 'Planning a festival visit',
        paragraphs: [
          'Festival dates follow lunar and local calendars, so they shift each year. Because these celebrations are deeply community-based, we always travel with local guides who have personal ties to the villages — ensuring your visit is welcomed, respectful and genuinely immersive.',
          'Tell us when you hope to travel and we will build an itinerary around whatever celebrations fall within your window.',
        ],
      },
    ],
  },
  {
    slug: 'chongqing-after-dark',
    title: 'Chongqing After Dark',
    excerpt:
      'How to navigate the neon, the fog and the food of China’s most electric riverside megacity.',
    image: '/images/blog-street.png',
    category: 'Food & City',
    readTime: '5 min read',
    author: 'Mei Lin',
    date: 'January 18, 2025',
    intro:
      'When night falls, Chongqing transforms. The fog rolls in off the rivers, the skyscrapers light up in waves of colour, and the city reveals itself as one of the most cinematic places on earth.',
    content: [
      {
        heading: 'A city built in layers',
        paragraphs: [
          'Chongqing climbs the cliffs above the meeting point of the Yangtze and Jialing rivers, and nothing here is flat. Streets stack on top of streets, a light-rail train famously punches through an apartment building, and what looks like a ground-floor exit can leave you twenty storeys up.',
          'At night this vertical geography becomes magical. Take the cable car across the Yangtze for a slow, glittering crossing, or ride to a rooftop bar to watch the fog swallow the towers.',
        ],
      },
      {
        heading: 'The food that never sleeps',
        paragraphs: [
          'Chongqing is the spiritual home of hotpot, and the locals take it seriously. A cauldron of fiery, numbing broth bubbles at the centre of the table while you cook thin slices of meat, vegetables and tofu. It is communal, loud and utterly addictive.',
          'Venture into the back alleys and you will find xiaomian noodle stalls, skewers grilling over coals, and crowds eating late into the night.',
        ],
      },
      {
        heading: 'Our after-dark route',
        paragraphs: [
          'We like to begin at the illuminated Hongya Cave complex, ride the cable car, then dive into a neighbourhood hotpot joint well away from the tourist track — finishing with a riverside stroll as the city shimmers on the water.',
        ],
      },
    ],
  },
  {
    slug: 'packing-for-southwest-china',
    title: 'Packing for Southwest China',
    excerpt:
      'Altitude, humidity and spice — everything you need to travel light and comfortably across the region.',
    image: '/images/blog-packing.png',
    category: 'Travel Tips',
    readTime: '4 min read',
    author: 'Daniel Cho',
    date: 'December 5, 2024',
    intro:
      'Southwest China packs an extraordinary range of climates into a single trip. A little planning lets you stay comfortable from steamy river cities to the cold, thin air of the Tibetan plateau.',
    content: [
      {
        heading: 'Dress in layers',
        paragraphs: [
          'You might begin a trip sweating in humid Chongqing and end it reaching for a down jacket in Shangri-La. The trick is layering: breathable base layers, a warm mid-layer and a packable waterproof shell will see you through almost anything.',
        ],
      },
      {
        heading: 'Prepare for altitude',
        paragraphs: [
          'Parts of Yunnan and northern Sichuan sit well above 3,000 metres. Take the first day at altitude slowly, drink plenty of water, and talk to your doctor about altitude medication before you travel. Our guides always carry oxygen and monitor the group carefully.',
        ],
      },
      {
        heading: 'The small essentials',
        paragraphs: [
          'Pack good walking shoes, a refillable water bottle, sun protection for the high-altitude glare, and a few tissues — and bring a sense of adventure for the spice. A power bank and a universal adapter round out the kit for a smooth, light-footed journey.',
        ],
      },
    ],
  },
  {
    slug: 'sichuan-beyond-the-basics',
    title: 'Sichuan Beyond the Basics',
    excerpt:
      'Skip the crowds and discover teahouse culture, hidden monasteries and kitchens locals actually use.',
    image: '/images/blog-sichuan-hidden.png',
    category: 'Culture',
    readTime: '7 min read',
    author: 'Ming Zhang',
    date: 'April 8, 2025',
    intro:
      'Most visitors to Sichuan tick off pandas and hotpot — both essential — but the province rewards those who stay longer and walk further from the main roads.',
    content: [
      {
        heading: 'The monastery trail',
        paragraphs: [
          'North of Chengdu, forested hills hide active Buddhist monasteries where monks still rise before dawn. A morning here is silence, incense and the clack of prayer beads — a world away from the city\'s traffic.',
          'We arrange visits with guides who have long-standing relationships with the communities, so your presence is welcomed rather than intrusive.',
        ],
      },
      {
        heading: 'Kitchens without menus',
        paragraphs: [
          'Some of the best meals in Sichuan happen at tables with no English signage and no fixed menu. Trust your guide, point at what smells good, and prepare for flavours that redefine what "spicy" means.',
        ],
      },
    ],
  },
  {
    slug: 'traveling-with-kids-in-china',
    title: 'Traveling with Kids in Southwest China',
    excerpt:
      'How to keep young travellers engaged from panda bases to river boats without overloading the schedule.',
    image: '/images/blog-family-travel.png',
    category: 'Travel Tips',
    readTime: '5 min read',
    author: 'Elena Rossi',
    date: 'March 28, 2025',
    intro:
      'Families often assume China is too big, too busy or too unfamiliar for children. In our experience, southwest China is one of the most rewarding regions for multi-generational trips — if you design the pace correctly.',
    content: [
      {
        heading: 'Build in downtime',
        paragraphs: [
          'Children absorb more when the day has breathing room. We alternate big sights with teahouse afternoons, hotel swims and free exploration in car-free old towns.',
        ],
      },
      {
        heading: 'Food without battles',
        paragraphs: [
          'Sichuan spice can be dialled down in any kitchen. We pre-arrange milder versions of local dishes and always know where to find noodles, dumplings and fruit markets that keep everyone happy.',
        ],
      },
      {
        heading: 'Guides who get it',
        paragraphs: [
          'Our family specialists know when to push and when to pivot. A tired afternoon becomes a kite-flying session by the river — still China, still memorable, without tears.',
        ],
      },
    ],
  },
]

export const reviews: Review[] = [
  {
    id: 'review-001',
    travelerName: 'James Crawford',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    stars: 5,
    comment:
      'Explore with Li transformed our understanding of southwest China. Every detail was thoughtfully arranged, from the private panda base visit to the family meals in Tibetan villages. Our guide Ming was exceptionally knowledgeable and kind. This wasn\'t just a trip—it was a journey into another way of life.',
    googleReviewUrl:
      'https://www.google.com/maps/place/Explore+with+Li/@coordinates/reviews',
  },
  {
    id: 'review-002',
    travelerName: 'Sophie & Marcus',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    stars: 5,
    comment:
      'We booked Explore with Li because of the small-group promise, and it delivered. Five travellers, two guides, local drivers who knew hidden restaurants. The Jiuzhaigou sunrise still takes our breath away when we close our eyes. Coming back for the Chongqing cruise in 2026.',
    googleReviewUrl:
      'https://www.google.com/maps/place/Explore+with+Li/@coordinates/reviews',
  },
  {
    id: 'review-003',
    travelerName: 'Amelia Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia',
    stars: 5,
    comment:
      'As a travel journalist, I\'ve been to 80+ countries. Li\'s approach to cultural exchange is genuinely respectful and immersive. The relationships with local communities are real. Not a single moment felt extractive or staged. Rare to find.',
    googleReviewUrl:
      'https://www.google.com/maps/place/Explore+with+Li/@coordinates/reviews',
  },
  {
    id: 'review-004',
    travelerName: 'Thomas Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
    stars: 5,
    comment:
      'First time in China. First time with a boutique operator. First time I actually understood a place instead of just photographing it. Sarah\'s team knows how to balance structure with spontaneity. Already planning return visit.',
    googleReviewUrl:
      'https://www.google.com/maps/place/Explore+with+Li/@coordinates/reviews',
  },
  {
    id: 'review-005',
    travelerName: 'Hannah & David',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hannah',
    stars: 5,
    comment:
      'Our honeymoon. Panda encounters, river cruises, family dinners in remote villages. The Shangri-La stargazing night was pure magic. Every question we had was answered before we asked it. Thank you, Li.',
    googleReviewUrl:
      'https://www.google.com/maps/place/Explore+with+Li/@coordinates/reviews',
  },
  {
    id: 'review-006',
    travelerName: 'Olivia & Ben',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
    stars: 5,
    comment:
      'We wanted Guizhou without a tour-bus feel and got exactly that — village songs, waterfall mist and guides who translated not just language but context. The drum tower dinner was a highlight of our year.',
    googleReviewUrl:
      'https://www.google.com/maps/place/Explore+with+Li/@coordinates/reviews',
  },
  {
    id: 'review-007',
    travelerName: 'Raj Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Raj',
    stars: 5,
    comment:
      'Traveled solo and never felt alone. The Li River mornings were meditative, the Yangshuo cycling was joyful, and every logistics detail was handled before I knew I needed it. Already recommending to colleagues.',
    googleReviewUrl:
      'https://www.google.com/maps/place/Explore+with+Li/@coordinates/reviews',
  },
]
