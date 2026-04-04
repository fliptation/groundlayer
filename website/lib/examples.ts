export interface Example {
  name: string;
  location: string;
  description: string;
  websiteUrl: string;
  tags: string[];
  yearFounded: number | null;
  layer: number; // 1-13
}

export const EXAMPLES: Example[] = [
  // ── Layer 1: Food & Land ──────────────────────────────────────────
  {
    name: "Southside Community Land Trust",
    location: "Providence, Rhode Island, USA",
    description:
      "One of the longest-running agricultural community land trusts in the US, managing urban farms, community gardens, and farmer training programs to strengthen equitable local food access.",
    websiteUrl: "https://www.southsideclt.org/",
    tags: ["community-land-trust", "urban-farming", "food-hub"],
    yearFounded: 1981,
    layer: 1,
  },
  {
    name: "Agrarian Trust",
    location: "Maine, USA",
    description:
      "A nonprofit developing the Agrarian Commons model — community-based land trusts that hold farmland permanently and lease it affordably to working farmers, removing land from the speculative market.",
    websiteUrl: "https://www.agrariantrust.org/",
    tags: ["community-land-trust", "farmland-access", "regenerative-agriculture"],
    yearFounded: 2013,
    layer: 1,
  },
  {
    name: "Open Source Seed Initiative",
    location: "Madison, Wisconsin, USA",
    description:
      "Applies open-source principles to plant breeding with a legal pledge that keeps seed varieties freely available for use, saving, sharing, and further breeding — countering corporate seed consolidation.",
    websiteUrl: "https://osseeds.org/",
    tags: ["open-source-seeds", "seed-sovereignty"],
    yearFounded: 2012,
    layer: 1,
  },
  {
    name: "OpenSourceSeeds (Agrecol)",
    location: "Marburg, Germany",
    description:
      "Developed a legally binding Open Source Seed Licence to protect crop varieties from patents. Coordinates with the Global Open Source Seed Initiative network spanning ten countries.",
    websiteUrl: "https://www.opensourceseeds.org/en",
    tags: ["open-source-seeds", "seed-sovereignty"],
    yearFounded: 2017,
    layer: 1,
  },
  {
    name: "Beacon Food Forest",
    location: "Seattle, Washington, USA",
    description:
      "A 7-acre community-managed public food forest using permaculture design to mimic woodland ecosystems with edible plants. Anyone in the community can forage freely.",
    websiteUrl: "https://www.beaconfoodforest.org/",
    tags: ["food-forest", "urban-farming", "permaculture"],
    yearFounded: 2012,
    layer: 1,
  },
  {
    name: "Groundswell Center for Local Food & Farming",
    location: "Ithaca, New York, USA",
    description:
      "A farm incubator providing beginning farmers — particularly immigrants and refugees — with hands-on education, land access, and mentorship to build sustainable land-based livelihoods.",
    websiteUrl: "https://groundswellcenter.org/",
    tags: ["local-food-network", "farmer-training"],
    yearFounded: 2009,
    layer: 1,
  },
  {
    name: "Savanna Institute",
    location: "Madison, Wisconsin, USA",
    description:
      "Advances agroforestry as a mainstream farming practice across the Midwest, demonstrating that tree-based agriculture can restore soil health, sequester carbon, and diversify farm income.",
    websiteUrl: "https://www.savannainstitute.org/",
    tags: ["regenerative-agriculture", "agroforestry"],
    yearFounded: 2013,
    layer: 1,
  },
  {
    name: "Community Alliance with Family Farmers",
    location: "Davis, California, USA",
    description:
      "Builds sustainable local food systems by connecting small and mid-scale family farmers with communities through CSA programs, farm-to-school initiatives, and buy-local campaigns.",
    websiteUrl: "https://caff.org/",
    tags: ["csa", "local-food-network"],
    yearFounded: 1978,
    layer: 1,
  },

  // ── Layer 2: Health ───────────────────────────────────────────────
  {
    name: "OpenMRS",
    location: "Global (Kenya / USA origin)",
    description:
      "An open-source electronic medical record platform operating in over 80 countries across 8,100+ health facilities, serving more than 16 million patients in resource-constrained environments.",
    websiteUrl: "https://openmrs.org",
    tags: ["open-medical-knowledge", "open-source-medical"],
    yearFounded: 2004,
    layer: 2,
  },
  {
    name: "GNU Health",
    location: "Las Palmas, Spain (global deployments)",
    description:
      "A free hospital information system focused on social medicine and public health determinants. Deployed in national health systems across Argentina, Jamaica, Cameroon, and Laos. Recognized as a UN Digital Public Good.",
    websiteUrl: "https://www.gnuhealth.org",
    tags: ["open-source-medical", "prevention-first", "community-health"],
    yearFounded: 2006,
    layer: 2,
  },
  {
    name: "Open Healthcare Network",
    location: "Ernakulam, India",
    description:
      "An open-source healthcare system that grew from a COVID-19 volunteer response into a comprehensive platform operational across 11 Indian states, benefiting over 186 million people.",
    websiteUrl: "https://ohc.network",
    tags: ["open-source-medical", "community-health"],
    yearFounded: 2020,
    layer: 2,
  },
  {
    name: "Partners In Health",
    location: "Boston, USA (10+ countries)",
    description:
      "Embeds community health workers in underserved communities to deliver preventive care, with over 12,000 workers conducting 800,000+ home visits per year, proving prevention-first healthcare works everywhere.",
    websiteUrl: "https://www.pih.org",
    tags: ["prevention-first", "community-health", "peer-support"],
    yearFounded: 1987,
    layer: 2,
  },
  {
    name: "Aravind Eye Care System",
    location: "Madurai, Tamil Nadu, India",
    description:
      "The world's largest eye care provider, conducting community eye camps in remote villages to catch curable conditions early. Over 90 million outpatient visits and 10.8 million surgeries, mostly free.",
    websiteUrl: "https://aravind.org",
    tags: ["prevention-first", "community-health"],
    yearFounded: 1976,
    layer: 2,
  },
  {
    name: "The Friendship Bench",
    location: "Harare, Zimbabwe (6+ countries)",
    description:
      "Trained lay health workers deliver structured therapy on park benches at clinics. Clients join peer-led support circles combining emotional support with income-generating activities. Has served over 700,000 people.",
    websiteUrl: "https://www.friendshipbenchzimbabwe.org",
    tags: ["mental-health", "community-health", "peer-support"],
    yearFounded: 2006,
    layer: 2,
  },
  {
    name: "StrongMinds",
    location: "Uganda, Zambia, Malawi",
    description:
      "Treats depression at scale in sub-Saharan Africa through group talk therapy delivered by trained lay facilitators. Treated over 426,000 people in 2024 alone — one of the most cost-effective mental health interventions globally.",
    websiteUrl: "https://strongminds.org",
    tags: ["mental-health", "peer-support", "prevention-first"],
    yearFounded: 2013,
    layer: 2,
  },
  {
    name: "OpenEvidence",
    location: "Boston, USA",
    description:
      "A medical knowledge platform providing healthcare professionals with clinical answers grounded in peer-reviewed research, making evidence-based knowledge accessible at the point of care.",
    websiteUrl: "https://www.openevidence.com",
    tags: ["open-medical-knowledge"],
    yearFounded: 2022,
    layer: 2,
  },

  // ── Layer 3: Governance ───────────────────────────────────────────
  {
    name: "Participatory Budgeting Project",
    location: "Brooklyn, New York, USA",
    description:
      "Partners with communities across the US and Canada to design participatory budgeting processes, enabling residents to directly decide how public money is spent.",
    websiteUrl: "https://www.participatorybudgeting.org/",
    tags: ["participatory-budgeting"],
    yearFounded: 2009,
    layer: 3,
  },
  {
    name: "DemocracyNext",
    location: "Paris, France",
    description:
      "Designs and supports citizens' assemblies worldwide using civic lottery to select demographically representative groups for policy deliberation, including at cooperatives like Mondragon.",
    websiteUrl: "https://www.demnext.org/",
    tags: ["citizens-assembly", "rotating-leadership"],
    yearFounded: 2022,
    layer: 3,
  },
  {
    name: "Liquid Democracy e.V.",
    location: "Berlin, Germany",
    description:
      "Develops open-source digital participation tools including the adhocracy+ platform, powering platforms like meinBerlin where hundreds of thousands of residents participate in urban planning decisions.",
    websiteUrl: "https://liqd.net/en/",
    tags: ["liquid-democracy", "participatory-budgeting"],
    yearFounded: 2009,
    layer: 3,
  },
  {
    name: "Decidim",
    location: "Barcelona, Spain",
    description:
      "Open-source digital infrastructure for participatory democracy, providing tools for citizen proposals, assemblies, and participatory budgets. Used by municipalities across Europe and Latin America.",
    websiteUrl: "https://decidim.org/",
    tags: ["participatory-budgeting", "citizens-assembly", "liquid-democracy"],
    yearFounded: 2016,
    layer: 3,
  },
  {
    name: "Restorative Practices Aotearoa",
    location: "Wellington, New Zealand",
    description:
      "Coordinates a national network of community-based restorative justice providers, drawing on Maori traditions and modern frameworks for criminal justice, education, and workplaces.",
    websiteUrl: "https://www.rpa.org.nz/",
    tags: ["restorative-justice"],
    yearFounded: 2005,
    layer: 3,
  },
  {
    name: "Decide Madrid",
    location: "Madrid, Spain",
    description:
      "The city's official digital participation platform with over 500,000 registered citizens proposing policies, debating issues, voting on initiatives, and allocating budget through participatory budgeting.",
    websiteUrl: "https://decide.madrid.es/",
    tags: ["participatory-budgeting", "liquid-democracy", "citizens-assembly"],
    yearFounded: 2015,
    layer: 3,
  },
  {
    name: "National Association of Community and Restorative Justice",
    location: "Denver, Colorado, USA",
    description:
      "Connects and supports restorative justice practitioners, researchers, and communities across the US, distributing grants to community-based programs and hosting a growing national conference.",
    websiteUrl: "https://www.nacrj.org/",
    tags: ["restorative-justice"],
    yearFounded: 2007,
    layer: 3,
  },

  // ── Layer 4: Economy ──────────────────────────────────────────────
  {
    name: "Mondragon Corporation",
    location: "Basque Country, Spain",
    description:
      "The world's largest federation of worker cooperatives — over 250 companies across finance, industry, retail, and education. Proves democratic worker ownership works at industrial scale.",
    websiteUrl: "https://www.mondragon-corporation.com/en/",
    tags: ["cooperative", "commons", "community-wealth"],
    yearFounded: 1956,
    layer: 4,
  },
  {
    name: "WIR Bank",
    location: "Basel, Switzerland",
    description:
      "A cooperative bank operating its own complementary currency (WIR franc) since the Great Depression, enabling tens of thousands of Swiss SMEs to trade using mutual credit alongside the national currency.",
    websiteUrl: "https://www.wir.ch/",
    tags: ["mutual-credit", "local-currency", "cooperative"],
    yearFounded: 1934,
    layer: 4,
  },
  {
    name: "Sardex",
    location: "Sardinia, Italy",
    description:
      "A business-to-business mutual credit network allowing Sardinian SMEs to trade by extending credit to one another rather than relying on bank loans, keeping local economies liquid.",
    websiteUrl: "https://www.sardex.net/",
    tags: ["mutual-credit", "local-currency"],
    yearFounded: 2010,
    layer: 4,
  },
  {
    name: "Grassroots Economics (Sarafu Network)",
    location: "Mombasa, Kenya",
    description:
      "Creates community inclusion currencies enabling trade among low-income communities in Kenyan informal settlements, generating income increases and keeping economic activity flowing.",
    websiteUrl: "https://www.grassrootseconomics.org/",
    tags: ["local-currency", "mutual-credit", "commons"],
    yearFounded: 2010,
    layer: 4,
  },
  {
    name: "TimeBanks USA",
    location: "Washington, D.C., USA",
    description:
      "Supports a network of over 200 time banks where members earn time credits by sharing skills and services. Everyone's hour is equally valuable, strengthening community reciprocity.",
    websiteUrl: "https://www.timebanks.org/",
    tags: ["time-banking", "commons"],
    yearFounded: 1995,
    layer: 4,
  },
  {
    name: "Ellen MacArthur Foundation",
    location: "Isle of Wight, United Kingdom",
    description:
      "The world's foremost circular economy organization, working with businesses and governments to accelerate the transition from linear take-make-waste to circular design, reuse, and regeneration.",
    websiteUrl: "https://www.ellenmacarthurfoundation.org/",
    tags: ["circular-economy"],
    yearFounded: 2010,
    layer: 4,
  },
  {
    name: "Fab City Global Initiative",
    location: "Barcelona, Spain (28 cities worldwide)",
    description:
      "A network of cities committed to becoming locally productive and globally connected, shifting toward circular models where materials are produced and recycled locally while knowledge flows globally.",
    websiteUrl: "https://fab.city/",
    tags: ["circular-economy", "commons", "cooperative"],
    yearFounded: 2014,
    layer: 4,
  },
  {
    name: "Platform Cooperativism Consortium",
    location: "New York City, USA",
    description:
      "Supports cooperatively owned digital platforms as alternatives to extractive gig-economy models — from food delivery in Thailand to taxi platforms in San Diego.",
    websiteUrl: "https://platform.coop/",
    tags: ["cooperative", "commons"],
    yearFounded: 2016,
    layer: 4,
  },

  // ── Layer 5: Education & Culture ──────────────────────────────────
  {
    name: "Barefoot College",
    location: "Tilonia, Rajasthan, India",
    description:
      "Trains rural women — many illiterate grandmothers — to become solar engineers, water testers, and health workers through hands-on methods. Has spread to 96 countries, proving practical skills training transforms villages.",
    websiteUrl: "https://barefoot.college/",
    tags: ["learning-by-doing", "skill-sharing", "community-learning"],
    yearFounded: 1972,
    layer: 5,
  },
  {
    name: "Fab Foundation",
    location: "Boston, Massachusetts, USA",
    description:
      "Supports a global network of over 2,000 digital fabrication labs in 126 countries where people learn by making things — from electronics to prosthetics — democratizing access to manufacturing tools.",
    websiteUrl: "https://fabfoundation.org/",
    tags: ["maker-space", "learning-by-doing", "open-knowledge"],
    yearFounded: 2009,
    layer: 5,
  },
  {
    name: "Summerhill School",
    location: "Leiston, Suffolk, England",
    description:
      "The world's oldest children's democracy, where all lessons are optional and the school is governed by weekly meetings with equal votes for every student and staff member. Operating since 1921.",
    websiteUrl: "https://www.summerhillschool.co.uk/",
    tags: ["democratic-education", "community-learning"],
    yearFounded: 1921,
    layer: 5,
  },
  {
    name: "Peer 2 Peer University (P2PU)",
    location: "Global (USA, Canada, Kenya, South Africa)",
    description:
      "Organizes free facilitated study groups called learning circles in public libraries, where people work through open educational resources together without a traditional teacher.",
    websiteUrl: "https://www.p2pu.org/",
    tags: ["open-knowledge", "community-learning", "skill-sharing"],
    yearFounded: 2009,
    layer: 5,
  },
  {
    name: "Fundacion Escuela Nueva",
    location: "Bogota, Colombia",
    description:
      "Replaced rote teaching with a cooperative, child-centered model in rural schools where students work through self-guided materials in small groups. Adopted by 12 countries at the same per-student cost.",
    websiteUrl: "https://escuelanueva.org/",
    tags: ["democratic-education", "community-learning", "learning-by-doing"],
    yearFounded: 1987,
    layer: 5,
  },
  {
    name: "Agastya International Foundation",
    location: "Bangalore, India",
    description:
      "One of the world's largest mobile hands-on science education programs, reaching over 12 million children across 19 Indian states through mobile lab vans, lab-on-bikes, and village science centers.",
    websiteUrl: "https://www.agastya.org/",
    tags: ["learning-by-doing", "community-learning"],
    yearFounded: 1999,
    layer: 5,
  },
  {
    name: "Open Knowledge Foundation",
    location: "London, England",
    description:
      "Builds tools and advocacy to make data and knowledge freely accessible, running projects like CKAN — the world's leading open-source data portal platform used by governments globally.",
    websiteUrl: "https://okfn.org/",
    tags: ["open-knowledge"],
    yearFounded: 2004,
    layer: 5,
  },
  {
    name: "Swaraj University",
    location: "Udaipur, Rajasthan, India",
    description:
      "A two-year learning community where young people design their own curriculum from scratch, drawing on 1,000+ mentors. No credentials required, no degrees issued — focused on self-awareness and ecological sustainability.",
    websiteUrl: "https://www.swarajuniversity.org/",
    tags: ["democratic-education", "learning-by-doing", "skill-sharing"],
    yearFounded: 2010,
    layer: 5,
  },

  // ── Layer 6: Energy & Environment ─────────────────────────────────
  {
    name: "Som Energia",
    location: "Girona, Spain",
    description:
      "Spain's first renewable energy cooperative. Members collectively invest in and consume 100% renewable energy, owning solar and wind projects as an alternative to conventional utility providers.",
    websiteUrl: "https://www.somenergia.coop",
    tags: ["energy-cooperative", "community-energy"],
    yearFounded: 2010,
    layer: 6,
  },
  {
    name: "Repowering London",
    location: "London, United Kingdom",
    description:
      "Not-for-profit energy cooperatives installing community-owned solar panels on social housing estates. Revenue partly funds energy efficiency for lower-income residents excluded from the clean energy transition.",
    websiteUrl: "https://www.repowering.org.uk",
    tags: ["community-solar", "energy-cooperative", "community-energy"],
    yearFounded: 2011,
    layer: 6,
  },
  {
    name: "Global Alliance for the Rights of Nature",
    location: "Quito, Ecuador",
    description:
      "An international network across 100+ countries working to establish legal systems recognizing ecosystems' rights to exist and regenerate. Played a key role in Ecuador's constitutional rights of nature.",
    websiteUrl: "https://www.garn.org",
    tags: ["rights-of-nature"],
    yearFounded: 2010,
    layer: 6,
  },
  {
    name: "Community Environmental Legal Defense Fund",
    location: "Mercersburg, Pennsylvania, USA",
    description:
      "A public interest law firm helping communities establish rights of nature in local law. Helped draft the first US rights of nature ordinances and assisted Ecuador's constitutional provisions.",
    websiteUrl: "https://celdf.org",
    tags: ["rights-of-nature"],
    yearFounded: 1995,
    layer: 6,
  },
  {
    name: "Te Pou Tupua (Whanganui River)",
    location: "Whanganui, New Zealand",
    description:
      "The governance body for the Whanganui River after it was recognized as a legal person in 2017. Two guardians speak for and enforce the river's rights after a 140-year Maori campaign.",
    websiteUrl: "https://www.tepoutupua.nz",
    tags: ["rights-of-nature"],
    yearFounded: 2017,
    layer: 6,
  },
  {
    name: "Precious Plastic",
    location: "Eindhoven, Netherlands (global network)",
    description:
      "Provides free open-source blueprints for small-scale plastic recycling machines. Over 500 workshops globally now shred, melt, and reshape plastic waste into new products, creating circular material flows.",
    websiteUrl: "https://www.preciousplastic.com",
    tags: ["circular-materials", "repair-economy"],
    yearFounded: 2013,
    layer: 6,
  },
  {
    name: "Savory Institute",
    location: "Boulder, Colorado, USA (global)",
    description:
      "Promotes Holistic Management for regenerative land stewardship through 51 regional hubs worldwide. Over 28,000 farmers trained, influencing management on more than 92 million acres of grasslands.",
    websiteUrl: "https://savory.global",
    tags: ["regenerative-land"],
    yearFounded: 2009,
    layer: 6,
  },
  {
    name: "Regeneration Canada",
    location: "Montreal, Canada",
    description:
      "Advances the regenerative agriculture movement across Canada by connecting farmers, researchers, and policymakers around farming practices that rebuild soil health and sequester carbon.",
    websiteUrl: "https://regenerationcanada.org",
    tags: ["regenerative-land", "regenerative-agriculture"],
    yearFounded: 2017,
    layer: 6,
  },
];

export function getExamplesByLayer(layer: number): Example[] {
  return EXAMPLES.filter((e) => e.layer === layer);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const e of EXAMPLES) {
    for (const t of e.tags) tags.add(t);
  }
  return Array.from(tags).sort();
}
