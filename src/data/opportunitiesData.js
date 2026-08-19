export const SCHOLARSHIPS = [
  {
    id: 'sch-1',
    logo: 'KU',
    color: '#3B82F6',
    bgGradient: 'from-blue-500/10 to-indigo-500/10',
    name: 'Global Excellence Award',
    school: 'Kingston University',
    country: 'United Kingdom',
    flag: '🇬🇧',
    level: 'Masters Degree',
    amount: '$18,000',
    deadline: '18 days left',
    type: 'Fully Funded',
    featured: true,
    description: 'Full tuition coverage plus living stipend for international students demonstrating outstanding academic merit and leadership skills.',
    eligibility: ['Min GPA 3.5/4.0', 'IELTS 7.0+', 'Under 32 years old'],
    category: 'Scholarships'
  },
  {
    id: 'sch-2',
    logo: 'TU',
    color: '#F97316',
    bgGradient: 'from-orange-500/10 to-amber-500/10',
    name: 'Women in STEM Fellowship',
    school: 'TU Delft',
    country: 'Netherlands',
    flag: '🇳🇱',
    level: 'PhD Program',
    amount: '$32,500 / yr',
    deadline: '24 days left',
    type: 'Full Tuition + Stipend',
    featured: false,
    description: 'Empowering women in engineering, computer science, and renewable energy with complete research grants and industry mentorship.',
    eligibility: ['MSc Degree in STEM', 'Research Proposal', '2 Recommendation Letters'],
    category: 'Scholarships'
  },
  {
    id: 'sch-3',
    logo: 'UB',
    color: '#10B981',
    bgGradient: 'from-emerald-500/10 to-teal-500/10',
    name: 'Global Leaders Scholarship',
    school: 'University of British Columbia',
    country: 'Canada',
    flag: '🇨🇦',
    level: 'Undergraduate',
    amount: '$12,000 / yr',
    deadline: '31 days left',
    type: 'Partial Funding',
    featured: false,
    description: 'Renewable annual scholarship for international undergraduate applicants who demonstrate exceptional civic engagement.',
    eligibility: ['High School Graduate', 'Community Leadership Record', 'English Proficiency'],
    category: 'Scholarships'
  },
  {
    id: 'sch-4',
    logo: 'ETH',
    color: '#8B5CF6',
    bgGradient: 'from-purple-500/10 to-indigo-500/10',
    name: 'Excellence Scholarship & Opportunity',
    school: 'ETH Zurich',
    country: 'Switzerland',
    flag: '🇨🇭',
    level: 'Masters Degree',
    amount: 'CHF 24,000',
    deadline: '45 days left',
    type: 'Fully Funded',
    featured: true,
    description: 'Supports students with full study and living costs for top-tier master studies at ETH Zurich.',
    eligibility: ['Top 10% Bachelor Grade', 'GRE Scores', 'Motivation Letter'],
    category: 'Scholarships'
  }
];

export const JOBS = [
  {
    id: 'job-1',
    logo: 'A',
    company: 'Airbnb',
    tint: '#FF5A5F',
    name: 'Senior Product Designer',
    location: 'San Francisco · Remote',
    salary: '$135k – $170k',
    tag: 'Design & UX',
    type: 'Full-time',
    featured: true,
    description: 'Lead design initiatives across international discovery and host experiences. Shape design systems for millions of users.',
    requirements: ['5+ years UI/UX design', 'Figma Mastery', 'Design System Experience'],
    category: 'Jobs'
  },
  {
    id: 'job-2',
    logo: 'S',
    company: 'Spotify',
    tint: '#1DB954',
    name: 'Growth Marketing Lead',
    location: 'London · Hybrid',
    salary: '$95k – $125k',
    tag: 'Marketing',
    type: 'Full-time',
    featured: false,
    description: 'Drive subscriber acquisition across emerging global markets through data-driven campaigns and localized brand partnerships.',
    requirements: ['4+ years growth marketing', 'SQL & Analytics', 'A/B Testing'],
    category: 'Jobs'
  },
  {
    id: 'job-3',
    logo: 'N',
    company: 'Notion',
    tint: '#6366F1',
    name: 'Staff Frontend Engineer',
    location: 'New York · Remote',
    salary: '$150k – $195k',
    tag: 'Engineering',
    type: 'Full-time',
    featured: true,
    description: 'Architect collaborative editing tools, WebGL rendering optimizations, and real-time state sync engine.',
    requirements: ['React, TypeScript, Canvas/WebGL', 'Performance Optimization', 'Wasm/WebSockets'],
    category: 'Jobs'
  },
  {
    id: 'job-4',
    logo: 'F',
    company: 'Framer',
    tint: '#0055FF',
    name: 'Design Technologist',
    location: 'Amsterdam · Hybrid',
    salary: '€85k – €110k',
    tag: 'Engineering',
    type: 'Full-time',
    featured: false,
    description: 'Bridge high-fidelity prototyping and production code. Build next-gen interactive components for web motion designers.',
    requirements: ['React, Framer Motion', 'CSS Architecture', '3D Graphics basics'],
    category: 'Jobs'
  }
];

export const INTERNSHIPS = [
  {
    id: 'int-1',
    logo: 'G',
    company: 'Google',
    tint: '#4285F4',
    name: 'Product Design Fellow',
    location: 'New York · Hybrid',
    duration: '12 weeks',
    tag: 'Paid · $8,400 / mo',
    type: 'Internship',
    description: 'Work directly alongside Google design mentors to create intuitive AI-powered workflow experiences.',
    requirements: ['Current Student/Recent Grad', 'Portfolio of Digital Products'],
    category: 'Internships'
  },
  {
    id: 'int-2',
    logo: 'W',
    company: 'World Bank',
    tint: '#00A3E0',
    name: 'Climate Innovation Fellow',
    location: 'Washington DC · Hybrid',
    duration: '6 months',
    tag: 'Paid · $12,000 stipend',
    type: 'Fellowship',
    description: 'Conduct policy research and develop digital tracking tools for sustainable infrastructure projects in emerging economies.',
    requirements: ['Master candidate in Public Policy or Econ', 'Data visualization skills'],
    category: 'Internships'
  }
];


export const PLATFORM_STATS = [
  { value: '15,000+', label: 'Verified Scholarships', change: '+12% this month' },
  { value: '5,000+', label: 'Global Remote Roles', change: '+28% this month' },
  { value: '120+', label: 'Countries Covered', change: 'Global reach' },
  { value: '25,000+', label: 'Lives Transformed', change: '98% match success' }
];
