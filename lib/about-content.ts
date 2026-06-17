export type TeamMember = {
  name: string
  role: string
  photo: string
  bio: string
  speaks: string[]
}

export type Collaborator = {
  name: string
  logo: string
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Hanghang Li',
    role: 'Founder and Trip Planner',
    photo: '/images/team-hanghang.png',
    speaks: ['Mandarin Chinese', 'English', 'German'],
    bio: "Hi, I'm Hanghang. My journey started in Chongqing, but at 17, I moved to the US to study civil engineering. Working as an engineer in America and Switzerland trained me to see the world with millimeter-level precision. But along the way, I realized that cold blueprints couldn't match the warmth of the cultural connections I found on the road. That’s why I founded Explore with Li in Zurich.\n\nToday, I combine that engineering rigor with my love for deep, authentic travel to design worry-free journeys into China. I completely reject rushed, cookie-cutter tourism. I don’t just hand you an itinerary; I craft experiences. My goal is to create memories so vivid that years from now, you won’t even need to look at a photo—you’ll just close your eyes, smile, and be right back there. Let’s discover the true depth of China together!",
  },
  {
    name: 'Shu Chen',
    role: 'Resource Manager and Trip Planner',
    photo: '/images/team-shu.png',
    speaks: ['Mandarin Chinese', 'English', 'Spanish'],
    bio: "Hi, I'm Shu. I grew up surrounded by the breathtaking landscapes of Guilin, China, which sparked my lifelong passion for travel and culture. My curiosity eventually led me to Spain for my master’s degree—where I picked up fluent Spanish—and now, life has brought me to my cozy home here in Zurich.\n\nHaving spent years in the Chinese travel industry, I love designing unique, culture-rich journeys that look beyond standard guidebooks. I bring a creative vision to every trip, crafting immersive experiences like dining in the middle of a lush Guangxi rice terrace. I can't wait to help you skip the tourist traps and discover the authentic, magical soul of China!",
  },
  {
    name: 'Nadja Spillmann',
    role: 'Sales Manager and Trip Planner',
    photo: '/images/team-nadja.png',
    speaks: ['Swiss German', 'German', 'English', 'Thai'],
    bio: "Hi, I’m Nadja! As a Swiss local with a Thai heart, I’ve spent my life navigating the beautiful space between two worlds. This dual heritage sparked a lifelong passion for authentic discovery—the kind that moves past the tourist highlights to find the true pulse of a place.\n\nWith a Master’s degree specializing in linguistic and cultural diversity, I don’t just see travel as a vacation; I see it as a way to connect perspectives across borders. My background allows me to bridge the gap between Western expectations and the vibrant, complex soul of the East. Whether we are navigating the neon-lit hills of Chongqing or uncovering a hidden tea house in Chengdu, I love helping travelers experience the beautiful China through a lens that is both deeply personal and culturally immersive. Let’s explore the energy and contrasts that make this corner of the world so unforgettable!",
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
