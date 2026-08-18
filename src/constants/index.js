const navLinks = [
  // {
  //   name: "Experience",
  //   link: "#experience",
  // },
  {
    name: "Projects",
    link: "#projects",
  },
  {
    name: "Tech Stack",
    link: "#tech-stack",
  },
  {
    name: "Achievements",
    link: "#achievements",
  },
  // {
  //   name: "Testimonials",
  //   link: "#testimonials",
  // },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  {
    value: 600,
    suffix: "+",
    label: "DSA Problems Solved",
  },
  {
    value: 1626,
    suffix: "+",
    label: "LeetCode Rating (Top 20.58%)",
  },
  {
    prefix: "Level ",
    value: 4,
    suffix: "",
    label: "Hacktoberfest 2024 Badge",
  },
  {
    value: 3,
    suffix: "+",
    label: "Production-Ready Cross-Platform Apps Built",
  },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/mobile.svg",
    title: "Cross-Platform Apps",
    desc: "Develop responsive Android and iOS applications using React Native and Expo.",
  },
  {
    imgPath: "/images/backend.png",
    title: "Backend Development",
    desc: "Build scalable REST APIs, authentication, databases, and real-time services.",
  },
  {
    imgPath: "/images/ai.svg",
    title: "AI Integration",
    desc: "Integrate AI assistants and intelligent features into modern mobile applications.",
  },
  {
    imgPath: "/images/brain.png",
    title: "Engineering Mindset",
    desc: "I focus on solving problems efficiently by making thoughtful technical decisions that balance performance, cost, and real user value.",
  },
];

const techStackImgs = [
  {
    name: "React Native",
    imgPath: "/images/logos/reactNative.svg",
  },
  {
    name: "Node.js",
    imgPath: "/images/logos/nodeJs.svg",
  },
  {
    name: "Typescript",
    imgPath: "/images/logos/typeScript.svg",
  },
  {
    name: "JavaScript",
    imgPath: "/images/logos/JavaScript.svg",
  },
  {
    name: "Java",
    imgPath: "/images/logos/Java.svg",
  },
  {
    name: "Socket.IO",
    imgPath: "/images/logos/socket.svg",
  },
  {
    name: "Express JS",
    imgPath: "/images/logos/express.svg",
  },
  {
    name: "MongoDB",
    imgPath: "/images/logos/mongodb.svg",
  },
  {
    name: "Firebase",
    imgPath: "/images/logos/firebase.svg",
  },
  {
    name: "Expo",
    imgPath: "/images/logos/expo.svg",
  },
  {
    name: "Render",
    imgPath: "/images/logos/render.svg",
  },
  {
    name: "Clerk",
    imgPath: "/images/logos/clerk.svg",
  },
  {
    name: "Github",
    imgPath: "/images/logos/github.svg",
  },
  {
    name: "AI Integration",
    imgPath: "/images/ai.svg",
  },
  {
    name: "Cloudinary",
    imgPath: "/images/logos/cloudinary.svg",
  },
];

const achievements = [
  {
    id: "eroh",
    image: "/images/eroh.png",
    eyebrow: "VERIFIED ACHIEVEMENT",
    accent: "#a78bfa",
    title: "EROH '25",
    subtitle: "2nd Rank",
    description:
      "Secured 2nd Rank among 200+ participants in a national-level coding competition organized by Naukri Campus.",
    stats: [
      { label: "Rank", value: "#2" },
      { label: "Participants", value: "200+" },
      { label: "Level", value: "National" },
    ],
  },
  {
    id: "hacktoberfest",
    image: "/images/hacktoberfest.png",
    eyebrow: "OPEN SOURCE ACHIEVEMENT",
    accent: "#4ade80",
    title: "Hacktoberfest '24",
    subtitle: "Level 4 Finisher",
    description:
      "Earned the Hacktoberfest 2024 Level 4 Badge for impactful open-source contributions through multiple accepted pull requests on GitHub.",
    stats: [
      { label: "Badge", value: "Level 4" },
      { label: "PRs Merged", value: "5+" },
      { label: "Projects", value: "6+" },
    ],
  },
];

const expCards = [
  {
    review:
      "Built a production-ready ride hailing platform with live tracking and real-time ride management.",
    imgPath: "/images/project1.png",
    logoPath: "/images/rydr.svg",
    githublink: "https://github.com/shubhmrwt01/Rydr",
    title: "Rydr",
    date: "Jan 2026 - May 2026",
    features: [
      "Built a dual-role ride-hailing platform with a 5-stage real-time ride lifecycle.",
      "Reduced ride-matching latency to under 1 second using Socket.IO live event broadcasting.",
      "Improved ride allocation efficiency by 50% through real-time rider availability tracking.",
      "Deployed cross-platform apps with Render and Expo EAS, reducing release effort by 60%.",
    ],
  },
  {
    review:
      "Developed an AI-powered pet adoption platform featuring authentication, chat, and intelligent pet care assistance.",
    imgPath: "/images/project2.png",
    logoPath: "/images/adoptly.svg",
    githublink: "https://github.com/shubhmrwt01/Adoptly",
    title: "Adoptly",
    date: "Aug 2025 - Nov 2025",
    features: [
      "Reduced user onboarding time by 60% with one-tap Clerk authentication.",
      "Scaled real-time messaging to 1,000+ concurrent users using Firestore live listeners.",
      "Improved adoption inquiry response rate by 45% with an AI-powered pet care assistant.",
      "Achieved over 95% code reuse across Android and iOS using React Native and Expo.",
    ],
  },
  {
    review:
      "Developed a Java-based desktop Employee Management System featuring secure authentication and database integration.",
    imgPath: "/images/project3.png",
    logoPath: "/images/ems.png",
    githublink: "https://github.com/shubhmrwt01/Employee-Management-System",
    title: "Employee Management System",
    date: "Dec 2024 - Feb 2025",
    features: [
      "Managed 500+ employee records with sub-second query response via JDBC-MySQL integration.",
      "Cut unauthorized access risk with a role-based secure login system.",
      "Delivered full CRUD functionality across 4 modules within a 3-month timeline.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/rydr.svg",
  },
  {
    name: "logo2",
    imgPath: "/images/adoptly.svg",
  },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "Github",
    imgPath: "/images/logos/github.svg",
    url: "https://github.com/shubhmrwt01",
  },
  {
    name: "LinkedIn",
    imgPath: "/images/linkedin.svg",
    url: "https://www.linkedin.com/in/shubhmrwt01/",
  },
  {
    name: "Leetcode",
    imgPath: "/images/leetcode.svg",
    url: "https://leetcode.com/u/shubhmrwt01/",
  },
  {
    name: "Resume",
    imgPath: "/images/document.svg",
    url: "https://drive.google.com/file/d/1135-dMVRWNVMzTloScxt5inPH9gEe7MA/view?usp=sharing",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackImgs,
  navLinks,
  achievements,
};
