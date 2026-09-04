export const profile = {
  name: "Daniel Mejía",
  legalName: "Luis Daniel Mejía",
  role: "Senior / Lead Software Engineer",
  tagline: "React · Next.js · TypeScript · Node.js · AWS · AI/LLM",
  location: "Bogotá, Colombia — 100% remote",
  languages: "Spanish (native), English (professional working proficiency)",
  contact: {
    email: "luisdanielmejia@outlook.com",
    phone: "+57 312-614-0708",
    phoneHref: "+573126140708",
    github: "https://github.com/danielmejiadev",
    linkedin: "https://linkedin.com/in/danielmejiadev",
  },
  mailSubject: "Let's talk — Senior/Lead Software Engineer role",
} as const;

export const stats = [
  { value: 12, suffix: "+", label: "years shipping production software" },
  { value: 20, suffix: "M+", label: "customers served (GoDaddy Website Builder)" },
  { value: 7, suffix: "+", label: "years maintaining open source, in parallel" },
] as const;

export type CaseStudy = {
  company: string;
  role: string;
  dates: string;
  badge: string;
  problem: string;
  build: string;
  result: string;
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    company: "Brevian",
    role: "Senior Lead Frontend Engineer",
    dates: "Apr 2025 – Present · Remote",
    badge: "AI-native · production",
    problem:
      "Brevian is an AI-native meeting-intelligence platform — the AI can't be a bolt-on feature, it has to be central to the product architecture itself.",
    build:
      "Owns the frontend architecture and the integration layer between the product and the AI/LLM stack. Built React/Next.js interfaces powering real-time AI assistance during live Zoom and Microsoft Teams meetings. Integrated Anthropic Claude and OpenAI GPT, AI agents, and MCP servers exposing customer knowledge bases and external data sources. Implemented streaming LLM responses over SSE and WebSocket-based real-time comms for live transcription and AI-generated insights. Contributed to RAG pipelines for contextual retrieval, and to the Electron desktop layer that captures richer meeting context from Zoom/Teams. Infrastructure on AWS.",
    result: "Runs A/B tests and LLM evals to check AI features against real user behavior before they ship.",
    stack: ["React", "Next.js", "Node.js", "Python", "Claude", "GPT", "MCP", "RAG", "SSE", "WebSockets", "Electron", "AWS"],
  },
  {
    company: "GoDaddy Website Builder",
    role: "Lead Software Engineer",
    dates: "2022 – 2025 · Remote",
    badge: "20M+ customers",
    problem:
      "The Products Service powers shopping and online-store experiences across GoDaddy Website Builder — multiple teams building for 20M+ customers, each reinventing auth, theming and testing on their own.",
    build:
      "Led frontend architecture for the Products Service. Introduced Next.js and standardized a reusable “frontend seed” — code practices, theming, auth, i18n and testing — adopted across multiple teams. Built a shared Okta authentication package for secure, reusable login. Standardized the testing strategy with React Testing Library and Cypress. Created a design system aligned to GoDaddy's branding. Integrated REST and GraphQL backend services and third parties (Okta, Zoom, Outlook, Google, Instagram), and built the scalable shopping-experience system behind Website Builder's online stores. Also principal PR reviewer, mentored engineers, and supported sprint planning.",
    result: "The frontend seed and Okta package were adopted org-wide — one integration, reused, instead of every team building its own.",
    stack: ["React", "Next.js", "TypeScript", "GraphQL", "REST", "React Testing Library", "Cypress", "TailwindCSS", "Material UI"],
  },
  {
    company: "Cropswap Services",
    role: "Lead Software Engineer",
    dates: "2018 – 2020 · Remote (Cafeto Software)",
    badge: "0 → market",
    problem: "Cropswap needed to connect farmers and local producers directly with buyers — starting from nothing.",
    build:
      "Led the full development process and architecture, from design through implementation and testing of the React components. Defined release strategy and best practices, and mentored the dev team. Designed the technical architecture, created reusable packages, and integrated third-party services to build the entire Cropswap ecosystem from MVP.",
    result: "Grew from MVP into one of the most innovative apps in its market category.",
    stack: ["React", "React Native", "Java", "Spring Boot", "AWS", "Firebase", "Stripe", "Node", "NestJS"],
  },
];

export const stackGroups = [
  {
    name: "Frontend",
    items: "React · Next.js (App Router, RSC, Server Actions) · TypeScript · Redux Toolkit · React Query/SWR · TailwindCSS · Radix UI · WCAG 2.2 AA",
  },
  {
    name: "AI / LLM",
    items: "Claude · GPT · MCP · RAG · tool calling · agent orchestration · LLM evals · prompt engineering · Claude Code",
  },
  {
    name: "Real-time",
    items: "SSE · WebSockets · Webhooks · event-driven architecture · streaming UI",
  },
  {
    name: "Backend & cloud",
    items: "Node.js · NestJS · Express · Python · GraphQL · REST · AWS · Docker · Kubernetes · GitHub Actions",
  },
  {
    name: "Testing",
    items: "React Testing Library · Cypress · Jest · Vitest · Mocha/Chai",
  },
  {
    name: "Data",
    items: "PostgreSQL · MySQL · MongoDB · Firebase Realtime Database",
  },
] as const;

export const targetRoles = [
  "Senior / Lead / Staff Frontend Engineer",
  "Senior / Lead Software Engineer",
  "Senior Product Engineer",
  "AI Product / AI Application Engineer",
  "Frontend AI Engineer",
  "Senior Full-Stack Engineer",
] as const;

export type TimelineItem = { date: string; title: string; body: string };

export const timeline: TimelineItem[] = [
  {
    date: "2025 — Present",
    title: "Senior Lead Frontend Engineer — Brevian",
    body: "Owns frontend architecture and the AI/LLM integration layer for an AI-native meeting-intelligence platform. Remote.",
  },
  {
    date: "2022 — 2025",
    title: "Lead Software Engineer — GoDaddy",
    body: "Led frontend architecture for the Products Service powering GoDaddy Website Builder, serving 20M+ customers. Remote.",
  },
  {
    date: "2020 — 2022",
    title: "Senior Software Engineer — GoDaddy",
    body: "Designed, coded and tested frontend and backend features for GoDaddy Online Store, serving millions of users in real time. React, Node, Ruby on Rails. Remote.",
  },
  {
    date: "2018 — 2020",
    title: "Lead Software Engineer — Cropswap Services (Cafeto Software)",
    body: "Led development process and architecture for a marketplace connecting farmers directly with buyers, from MVP onward. Remote.",
  },
  {
    date: "2016 — 2018",
    title: "Lead / Software Engineer — Cafeto Software",
    body: "Led frontend/full-stack delivery across client projects: The Dress Club App (Houston textile-manufacturing MVP), Colombo Website Tools (migrated a legacy PHP admin to Node.js; built the React website and mobile app for one of LATAM's largest English-learning platforms), and Amelio App (behavioral-health/telemedicine, React Native + Java/Spring Boot).",
  },
  {
    date: "2013 — 2016",
    title: "Freelance Full-Stack / Software Developer",
    body: "Cyclist App (ML-based ride analysis, REST backend, realtime/offline mobile), Campus Univalle Website (campus-admin platform with neural-network matching for student/apartment data), Criticos App (native Android/Java, Firebase, PostgreSQL). Taught programming (OOP, functional paradigm, backend architecture, modern frontend) at Universidad del Valle, 2014–2015.",
  },
];

export const education = [
  { title: "BSc Computer Science", meta: "Universidad del Valle — 2011–2016" },
  { title: "Computer Programming", meta: "SENA — 2009–2011" },
  { title: "Bootcamps", meta: "Git Expert; React & React Native Expert (Platzi); NodeCamp — 2017–2019" },
] as const;

export type OssProject = { name: string; description: string; since: string };

export const ossProjects: OssProject[] = [
  { name: "React", description: "Contributor — issue resolution in React's core library.", since: "2018 – Present" },
  { name: "React Native Gifted Chat", description: "Contributor — migrated the library to Hooks, Context, and native React/React Native animations.", since: "2019 – Present" },
  { name: "React Hooks Util", description: "Creator & lead maintainer — a set of reusable React hooks.", since: "2020 – Present" },
  { name: "Stripe Client JS", description: "Creator & lead maintainer — a JavaScript client for the Stripe API.", since: "2020 – Present" },
  { name: "Spring Boot Utilities", description: "Creator & lead maintainer — reusable utilities for Spring Boot in Java.", since: "2018 – Present" },
  { name: "React Native Components", description: "Creator & lead maintainer — a pack of reusable, customizable React Native components.", since: "2019 – Present" },
  { name: "React Native Chatting", description: "Creator & lead maintainer — React Native utilities for chat UI and server connection.", since: "2020 – Present" },
];
