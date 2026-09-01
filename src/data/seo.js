export const SITE_URL = "https://drprashantmakhija.com"

export const pageSeo = {
  home: {
    title: "Dr. Prashant Makhija | Neurologist & Sleep Medicine Specialist in Mumbai",
    description: "Dr. Prashant Makhija is a consultant neurologist and sleep medicine specialist in Mumbai offering diagnosis and management for brain, nerve, muscle and sleep-related neurological conditions.",
    canonical: `${SITE_URL}/`,
    keywords: ["neurologist in Mumbai", "neurologist Mumbai", "sleep medicine specialist Mumbai", "neurologist Mumbai Central", "brain specialist Mumbai", "nerve specialist Mumbai", "Dr Prashant Makhija"],
  },
  about: {
    title: "Dr. Prashant Makhija | Consultant Neurologist & Sleep Specialist",
    description: "Learn about Dr. Prashant Makhija, consultant neurologist and sleep medicine specialist, his clinical expertise and patient-centred approach to neurological care.",
    canonical: `${SITE_URL}/about/`,
    keywords: ["Dr. Prashant Makhija", "consultant neurologist Mumbai", "sleep specialist Mumbai", "clinical neurologist Mumbai", "neurologist Mumbai Central", "brain and nerve specialist"],
  },
  blogs: {
    title: "Neurology & Brain Health Blogs | Dr. Prashant Makhija",
    description: "Read evidence-based insights from Dr. Prashant Makhija on sleep, migraine, brain health, neurological symptoms and everyday questions about the nervous system.",
    canonical: `${SITE_URL}/blogs/`,
    keywords: ["neurology blog Mumbai", "neurology blogs", "brain health blog", "sleep health blog", "migraine information", "neurological health articles"],
  },
  contact: {
    title: "Contact Dr. Prashant Makhija | Neurologist in Mumbai",
    description: "Book a neurological or sleep medicine consultation with Dr. Prashant Makhija at Wockhardt Hospitals, Mumbai Central.",
    canonical: `${SITE_URL}/contact/`,
    keywords: ["Dr. Prashant Makhija appointment", "neurologist appointment Mumbai", "sleep specialist appointment Mumbai", "neurologist Mumbai Central", "neurological consultation Mumbai", "sleep consultation Mumbai"],
  },
  expertise: {
    title: "Neurological Conditions & Treatments | Dr. Prashant Makhija",
    description: "Explore neurological conditions evaluated and treated by Dr. Prashant Makhija, including stroke, epilepsy, migraine, movement, neuromuscular and sleep disorders.",
    canonical: `${SITE_URL}/expertise/`,
    keywords: ["neurological treatments Mumbai", "neurological conditions", "stroke specialist Mumbai", "epilepsy specialist Mumbai", "migraine specialist Mumbai", "sleep disorders specialist Mumbai"],
  },
}

export const blogSeo = {
  "sleep-isnt-optional-why-quality-sleep-is-one-of-the-most-powerful-health-tools-you-already-have": {
    title: "Why Quality Sleep Matters for Brain & Overall Health | Dr. Makhija",
    description: "Understand how sleep affects brain health, mood, cognition and overall wellbeing, with practical guidance from neurologist and sleep medicine specialist Dr. Prashant Makhija.",
    keywords: ["importance of sleep for brain health", "quality sleep brain health", "sleep and cognition", "sleep health Mumbai", "sleep medicine specialist Mumbai", "sleep deprivation effects"],
  },
  "sleep-equity-why-everyone-deserves-good-rest": {
    title: "Sleep Equity: Why Everyone Deserves Better Sleep | Dr. Makhija",
    description: "Explore why access to healthy sleep matters and how sleep quality can influence neurological and overall health.",
    keywords: ["sleep health", "sleep health awareness", "importance of sleep", "sleep deprivation", "sleep medicine Mumbai", "healthy sleep habits"],
  },
  "how-to-protect-your-brain-in-your-30s-what-every-young-adult-needs-to-know": {
    title: "How to Protect Your Brain in Your 30s | Dr. Prashant Makhija",
    description: "Practical brain-health habits for young adults covering sleep, movement, nutrition, stress, mental stimulation and healthy routines.",
    keywords: ["brain health in your 30s", "brain health tips", "protect brain health", "brain health for young adults", "memory and focus", "neurologist advice"],
  },
  "hiccups-unravelled-why-they-happen-and-how-to-stop-them-quick": {
    title: "Hiccups: Why They Happen & When to See a Doctor | Dr. Makhija",
    description: "Learn what causes hiccups, common triggers, simple measures and when persistent hiccups may need medical evaluation.",
    keywords: ["hiccups causes and treatment", "persistent hiccups", "hiccups treatment", "hiccups when to see doctor", "neurological causes of hiccups", "hiccups specialist Mumbai"],
  },
  "hello-world": {
    title: "Better Sleep, Better Moods: How Sleep Affects Emotional Health",
    description: "Understand the connection between sleep, mood, stress and emotional wellbeing, with practical sleep habits from Dr. Prashant Makhija.",
    keywords: ["sleep and mood", "sleep and mental health", "poor sleep effects", "better sleep tips", "sleep specialist Mumbai"],
  },
}

export const physicianSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Prashant Makhija",
  url: `${SITE_URL}/`,
  medicalSpecialty: ["Neurology", "Sleep Medicine"],
  address: { "@type": "PostalAddress", addressLocality: "Mumbai Central", addressRegion: "Maharashtra", addressCountry: "IN" },
}

export const expertiseSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Neurological Conditions and Treatments",
  description: pageSeo.expertise.description,
  url: pageSeo.expertise.canonical,
  about: {
    "@type": "MedicalSpecialty",
    name: "Neurology",
  },
  reviewedBy: {
    "@type": "Physician",
    name: "Dr. Prashant Makhija",
    url: `${SITE_URL}/about/`,
    medicalSpecialty: ["Neurology", "Sleep Medicine"],
  },
}
