export type TeamMember = {
  name: string
  role: string
  photo: string
  bio: string
}

export type Collaborator = {
  name: string
  logo: string
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Sarah Mitchell',
    role: 'Founder & Chief Curator',
    photo: '/images/team-sarah.png',
    bio: 'Sarah founded Explore with Li after a decade leading expedition teams across Central Asia and the Himalayas. She believes that travel should deepen understanding, not collect experiences. Her philosophy: move slowly, stay longer, listen more. When not scouting new routes, she\'s likely in a teahouse somewhere, notebook in hand.',
  },
  {
    name: 'Ming Zhang',
    role: 'Head Guide & Cultural Director',
    photo: '/images/team-ming.png',
    bio: 'Ming grew up in Chengdu and has spent 20 years as a guide, educator and cultural bridge. He holds degrees in anthropology and tourism, but his real education comes from the families, monks, and communities he works with. Ming ensures every itinerary reflects genuine local life, not tourist expectations. He speaks Mandarin, English, and some Tibetan.',
  },
  {
    name: 'Elena Rossi',
    role: 'Operations & Sustainability Lead',
    photo: '/images/team-elena.png',
    bio: 'Elena manages every logistical thread that makes seamless travel possible, while keeping our environmental footprint minimal. A former hotel manager in Barcelona, she shifted careers to prove that luxury and sustainability aren\'t opposites. She oversees local partnerships, carbon offsetting, and community benefit initiatives.',
  },
]

export const collaborators: Collaborator[] = [
  {
    name: 'World Travel & Tourism Council',
    logo: '/images/collab-logo-1.png',
  },
  {
    name: 'Global Sustainable Tourism Council',
    logo: '/images/collab-logo-2.png',
  },
  {
    name: 'Cultural Exchange International',
    logo: '/images/collab-logo-3.png',
  },
  {
    name: 'Wildlife Conservation Alliance',
    logo: '/images/collab-logo-4.png',
  },
]
