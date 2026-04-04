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

  // ── Layer 7: Housing & Shelter ────────────────────────────────────
  {
    name: "Champlain Housing Trust",
    location: "Burlington, Vermont, USA",
    description:
      "The largest community land trust in the US, managing ~565 ownership units and over 2,200 rental units. Keeps homes permanently affordable by retaining community ownership of the land beneath them.",
    websiteUrl: "https://www.getahome.org",
    tags: ["community-land-trust", "affordable-housing", "cooperative-housing"],
    yearFounded: 1984,
    layer: 7,
  },
  {
    name: "Mietshäuser Syndikat",
    location: "Freiburg, Germany (nationwide)",
    description:
      "A cooperative network of 191 collectively owned housing projects permanently removed from the speculative market. Each project is co-owned by residents and the Syndikat, which holds veto power over privatization.",
    websiteUrl: "https://www.syndikat.org/en/",
    tags: ["cooperative-housing", "affordable-housing", "collective-ownership"],
    yearFounded: 1992,
    layer: 7,
  },
  {
    name: "FUCVAM",
    location: "Montevideo, Uruguay",
    description:
      "Latin America's oldest mutual-aid housing cooperative federation — over 500 cooperatives and ~100,000 people. Members collectively build their own homes through organized mutual labor under collective ownership.",
    websiteUrl: "https://www.fucvam.org.uy",
    tags: ["cooperative-housing", "mutual-aid", "self-build"],
    yearFounded: 1970,
    layer: 7,
  },
  {
    name: "London Community Land Trust",
    location: "London, United Kingdom",
    description:
      "London's first CLT, delivering permanently affordable homes with resale prices linked to local earnings rather than market rates — proving the model works even in the world's most expensive markets.",
    websiteUrl: "https://www.londonclt.org",
    tags: ["community-land-trust", "affordable-housing"],
    yearFounded: 2007,
    layer: 7,
  },
  {
    name: "WikiHouse",
    location: "London, United Kingdom (global chapters)",
    description:
      "An open-source construction system where anyone can download, customize, and digitally fabricate structural house components using a CNC router and plywood. Deployed from Brazilian favelas to UK suburbs.",
    websiteUrl: "https://www.wikihouse.cc",
    tags: ["open-source-architecture", "self-build", "affordable-housing"],
    yearFounded: 2011,
    layer: 7,
  },
  {
    name: "New Story",
    location: "Atlanta, USA (Haiti, Mexico, El Salvador, Bolivia)",
    description:
      "Provides dignified housing in the Global South, having housed over 15,200 people. Built the world's first 3D-printed housing community in Mexico, where homes cost ~$4,000 and print in 24 hours.",
    websiteUrl: "https://www.newstoryhomes.org",
    tags: ["affordable-housing", "dignified-shelter"],
    yearFounded: 2014,
    layer: 7,
  },
  {
    name: "CODI Baan Mankong Programme",
    location: "Bangkok, Thailand (nationwide)",
    description:
      "A community-driven slum upgrading programme channeling subsidies and loans directly to organized community groups. Has reached over 96,000 households in 1,800 communities across Thailand.",
    websiteUrl: "https://www.codi.or.th",
    tags: ["affordable-housing", "cooperative-housing"],
    yearFounded: 2003,
    layer: 7,
  },
  {
    name: "R50 Baugruppen",
    location: "Berlin, Germany",
    description:
      "A recognized example of Berlin's Baugruppen movement where future residents collectively commission their own building, eliminating developer profits and reducing costs 10-20% below market rate.",
    websiteUrl: "https://www.ifau.berlin/projects/r50-cohousing",
    tags: ["co-housing", "self-build", "cooperative-housing"],
    yearFounded: 2013,
    layer: 7,
  },

  // ── Layer 8: Technology & Infrastructure ──────────────────────────
  {
    name: "guifi.net",
    location: "Catalonia, Spain",
    description:
      "One of the largest community-owned telecom networks in the world with over 37,000 active nodes. Operates under a commons governance model where citizens collectively build and maintain wireless and fiber infrastructure.",
    websiteUrl: "https://guifi.net",
    tags: ["mesh-network", "community-broadband", "digital-commons"],
    yearFounded: 2004,
    layer: 8,
  },
  {
    name: "Freifunk",
    location: "Germany (nationwide)",
    description:
      "A grassroots initiative of ~400 local communities and over 41,000 access points providing free wireless internet. Volunteers install rooftop routers forming open mesh networks as a public commons.",
    websiteUrl: "https://freifunk.net",
    tags: ["mesh-network", "open-source", "digital-commons"],
    yearFounded: 2003,
    layer: 8,
  },
  {
    name: "NYC Mesh",
    location: "New York City, USA",
    description:
      "A volunteer-run community network with over 2,000 active nodes across all five boroughs, providing affordable neutral internet by building a decentralized mesh of rooftop antennas and fiber links.",
    websiteUrl: "https://www.nycmesh.net",
    tags: ["mesh-network", "community-broadband", "decentralized"],
    yearFounded: 2013,
    layer: 8,
  },
  {
    name: "Sarantaporo.gr",
    location: "Elassona, Greece",
    description:
      "A nonprofit wireless network connecting 15 remote mountain villages where commercial providers saw no profit incentive. Enables telemedicine, agricultural market access, and communication across previously isolated communities.",
    websiteUrl: "https://www.sarantaporo.gr",
    tags: ["mesh-network", "community-broadband"],
    yearFounded: 2013,
    layer: 8,
  },
  {
    name: "RS Fiber Cooperative",
    location: "South-central Minnesota, USA",
    description:
      "A member-owned cooperative formed by 10 townships and 17 cities to build fiber-optic broadband after incumbents refused to invest. A nationally recognized model for rural community-owned telecom.",
    websiteUrl: "https://www.rsfiber.coop",
    tags: ["community-broadband", "digital-commons"],
    yearFounded: 2012,
    layer: 8,
  },
  {
    name: "Local Contexts",
    location: "Navajo Nation / New York, USA",
    description:
      "Provides digital tools (TK and BC Labels) enabling Indigenous communities to assert governance over their data, collections, and genetic resources in digital environments. A foundational project in Indigenous data sovereignty.",
    websiteUrl: "https://localcontexts.org",
    tags: ["data-sovereignty", "digital-commons"],
    yearFounded: 2010,
    layer: 8,
  },
  {
    name: "Te Hiku Media",
    location: "Kaitaia, Aotearoa New Zealand",
    description:
      "A Maori media organization that built its own speech-to-text AI engine for te reo Maori while maintaining full Indigenous data sovereignty. Their Papa Reo platform helps smaller Indigenous communities build AI tools without surrendering data control.",
    websiteUrl: "https://tehiku.nz",
    tags: ["data-sovereignty", "open-source"],
    yearFounded: 1990,
    layer: 8,
  },

  // ── Layer 9: Water & Sanitation ───────────────────────────────────
  {
    name: "SAGUAPAC",
    location: "Santa Cruz de la Sierra, Bolivia",
    description:
      "The largest consumer-owned urban water cooperative in the world, serving over 1.4 million people with 97% coverage. Governed democratically by member-users, ranked among the best-performing water utilities in Latin America.",
    websiteUrl: "https://www.saguapac.com.bo/",
    tags: ["water-cooperative", "community-water", "sanitation"],
    yearFounded: 1979,
    layer: 9,
  },
  {
    name: "Fundacion Natura Bolivia",
    location: "Santa Cruz de la Sierra, Bolivia",
    description:
      "Pioneered Reciprocal Water Agreements where downstream users fund conservation for upstream landowners protecting watersheds. ~24,000 farmers protecting ~600,000 hectares across 80 Bolivian municipalities.",
    websiteUrl: "https://www.naturabolivia.org/",
    tags: ["watershed-protection", "community-water"],
    yearFounded: 2003,
    layer: 9,
  },
  {
    name: "WaterAid",
    location: "London, United Kingdom (30+ countries)",
    description:
      "Works alongside communities in the world's poorest regions to establish sustainable water, sanitation, and hygiene systems. A leading advocate for recognizing water and sanitation as fundamental human rights.",
    websiteUrl: "https://www.wateraid.org/",
    tags: ["sanitation", "community-water", "water-stewardship"],
    yearFounded: 1981,
    layer: 9,
  },
  {
    name: "Potters for Peace",
    location: "Managua, Nicaragua (50+ countries)",
    description:
      "Developed an open-source ceramic water filter using local clay and colloidal silver that eliminates ~99.88% of pathogens. Deliberately unpatented, with communities in 50+ countries manufacturing filters locally.",
    websiteUrl: "https://www.pottersforpeace.org/",
    tags: ["open-source-purification", "community-water"],
    yearFounded: 1986,
    layer: 9,
  },
  {
    name: "OHorizons",
    location: "New York, USA (Ecuador, Kenya, Mali)",
    description:
      "Created open-source Wood Mold technology for building BioSand water filters at one-tenth the cost of traditional methods. Communities manufacture their own household water purification using local materials.",
    websiteUrl: "https://www.ohorizons.org/",
    tags: ["open-source-purification", "community-water"],
    yearFounded: 2008,
    layer: 9,
  },
  {
    name: "Faircap",
    location: "Barcelona, Spain",
    description:
      "Develops open-source, low-cost water filters designed to fit standard plastic bottles using 0.1-micron membrane technology. Designs are published openly for communities and makerspaces to produce locally.",
    websiteUrl: "https://faircap.org/",
    tags: ["open-source-purification", "community-water"],
    yearFounded: 2015,
    layer: 9,
  },
  {
    name: "Water.org",
    location: "Kansas City, USA (11 countries)",
    description:
      "Uses WaterCredit — small affordable loans enabling families to finance their own water connections and sanitation facilities. Has reached over 60 million people across Africa, Asia, and Latin America.",
    websiteUrl: "https://water.org/",
    tags: ["community-water", "sanitation"],
    yearFounded: 2009,
    layer: 9,
  },
  {
    name: "Alliance for Water Stewardship",
    location: "Edinburgh, Scotland (global)",
    description:
      "A global multi-stakeholder organization that developed the International Water Stewardship Standard, certifying responsible water use by businesses, governments, and communities across dozens of countries.",
    websiteUrl: "https://a4ws.org/",
    tags: ["water-stewardship", "community-water"],
    yearFounded: 2009,
    layer: 9,
  },

  // ── Layer 10: Transportation & Mobility ───────────────────────────
  {
    name: "Barcelona Superblocks",
    location: "Barcelona, Spain",
    description:
      "A citywide program reclaiming street space from cars by reorganizing traffic into large blocks where interior streets prioritize pedestrians, cyclists, and public life. Expanded from one pilot to city-scale rollout.",
    websiteUrl: "https://ajuntament.barcelona.cat/superilles/en",
    tags: ["walkable-city", "car-free", "human-scaled"],
    yearFounded: 2016,
    layer: 10,
  },
  {
    name: "Bogota Ciclovia",
    location: "Bogota, Colombia",
    description:
      "The longest-running open-streets program in the world, closing 121+ km of roads to cars every Sunday so over one million residents can walk, cycle, and jog. Has inspired 400+ cities globally.",
    websiteUrl: "https://www.idrd.gov.co",
    tags: ["cycling-infrastructure", "car-free"],
    yearFounded: 1974,
    layer: 10,
  },
  {
    name: "Ghent Circulation Plan",
    location: "Ghent, Belgium",
    description:
      "Divided the city center into car-free sectors, creating Belgium's largest car-free zone. Bicycle use increased 25%, transit ridership grew 8%, and car traffic in residential streets dropped 58%.",
    websiteUrl: "https://stad.gent/en/mobility-ghent/circulation-plan",
    tags: ["car-free", "walkable-city", "human-scaled"],
    yearFounded: 2017,
    layer: 10,
  },
  {
    name: "Dutch Cycling Embassy",
    location: "Utrecht, Netherlands",
    description:
      "A public-private network exporting the Netherlands' cycling expertise to cities worldwide through training, workshops, and infrastructure design guidance for bike lanes, intersections, and urban planning.",
    websiteUrl: "https://dutchcycling.nl",
    tags: ["cycling-infrastructure", "human-scaled"],
    yearFounded: 2011,
    layer: 10,
  },
  {
    name: "Vauban District",
    location: "Freiburg, Germany",
    description:
      "A sustainable neighborhood of ~5,000 residents where 70% live car-free, streets have no parking, and walking/cycling account for most trips. Built on a former military base, served by tram.",
    websiteUrl: "https://www.freiburg.de/pb/,Lde/232441.html",
    tags: ["car-free", "walkable-city", "human-scaled"],
    yearFounded: 1998,
    layer: 10,
  },
  {
    name: "Shared Mobility Inc.",
    location: "Buffalo, New York, USA",
    description:
      "A transportation nonprofit operating carsharing, bikesharing, e-bike programs, and volunteer transport services. Specifically targets disadvantaged communities where commercial providers don't serve.",
    websiteUrl: "https://www.sharedmobility.org",
    tags: ["shared-mobility", "community-transit"],
    yearFounded: 2009,
    layer: 10,
  },
  {
    name: "Active Neighbourhoods Canada",
    location: "Montreal / Toronto / Calgary, Canada",
    description:
      "Uses participatory urban design to co-create walkable and bikeable neighborhoods with residents, giving locals direct input into how streets and public spaces are redesigned for active transportation.",
    websiteUrl: "https://participatoryplanning.ca/active-neighbourhoods-canada",
    tags: ["walkable-city", "cycling-infrastructure", "community-transit"],
    yearFounded: 2013,
    layer: 10,
  },

  // ── Layer 11: Communication & Media ───────────────────────────────
  {
    name: "The Bristol Cable",
    location: "Bristol, United Kingdom",
    description:
      "A member-owned media cooperative with over 4,000 community shareholders providing independent investigative local journalism. Pioneered a democratic ownership model where readers fund and shape the newsroom.",
    websiteUrl: "https://thebristolcable.org",
    tags: ["media-cooperative", "local-news", "independent-journalism"],
    yearFounded: 2014,
    layer: 11,
  },
  {
    name: "elDiario.es",
    location: "Madrid, Spain",
    description:
      "A major Spanish digital newspaper where over 70% of ownership belongs to newsroom staff. Sustains itself largely through reader memberships, covering 13 provinces as one of Spain's most influential independent outlets.",
    websiteUrl: "https://www.eldiario.es",
    tags: ["independent-journalism", "media-cooperative"],
    yearFounded: 2012,
    layer: 11,
  },
  {
    name: "Outlier Media",
    location: "Detroit, USA",
    description:
      "Uses SMS-based service journalism to deliver critical information on housing, utilities, and public services directly to residents who need it most. Demonstrates how journalism can function as a public utility.",
    websiteUrl: "https://outliermedia.org",
    tags: ["community-media", "local-news"],
    yearFounded: 2016,
    layer: 11,
  },
  {
    name: "News Literacy Project",
    location: "Washington, D.C., USA",
    description:
      "Equips educators and the public with tools to identify credible information and spot misinformation. Its Checkology platform is used by teachers in all 50 US states for K-12 news literacy education.",
    websiteUrl: "https://newslit.org",
    tags: ["media-literacy"],
    yearFounded: 2008,
    layer: 11,
  },
  {
    name: "AMARC",
    location: "Montreal, Canada (global network)",
    description:
      "International network supporting community radio with ~4,000 members across 130 countries. Facilitates cooperation between stations serving as essential voices for local, indigenous, and marginalized communities.",
    websiteUrl: "https://www.amarc-international.com",
    tags: ["community-media", "open-platform"],
    yearFounded: 1983,
    layer: 11,
  },
  {
    name: "Mastodon",
    location: "Germany (global, decentralized)",
    description:
      "A free, open-source decentralized social network operating as a federation of independently managed servers via ActivityPub. No central authority, no algorithmic manipulation, no advertising.",
    websiteUrl: "https://joinmastodon.org",
    tags: ["open-platform"],
    yearFounded: 2016,
    layer: 11,
  },
  {
    name: "Rappler",
    location: "Manila, Philippines",
    description:
      "Founded by Nobel Peace Prize laureate Maria Ressa, combining investigative journalism with technology and civic engagement. A leading independent voice in Southeast Asian journalism and global press freedom.",
    websiteUrl: "https://www.rappler.com",
    tags: ["independent-journalism"],
    yearFounded: 2012,
    layer: 11,
  },

  // ── Layer 12: Safety & Conflict Resolution ────────────────────────
  {
    name: "Cure Violence Global",
    location: "Chicago, USA (30+ countries)",
    description:
      "Treats violence as a contagious disease, deploying trained 'violence interrupters' to detect and defuse conflicts before they escalate. Endorsed by WHO as an evidence-based approach to violence reduction.",
    websiteUrl: "https://cvg.org",
    tags: ["violence-interruption", "community-safety", "trauma-informed"],
    yearFounded: 2000,
    layer: 12,
  },
  {
    name: "CAHOOTS",
    location: "Eugene, Oregon, USA",
    description:
      "Dispatches medic-and-crisis-worker teams to respond to non-criminal 911 calls involving mental health, substance use, and homelessness — without police. Has inspired similar programs in dozens of US cities.",
    websiteUrl: "https://whitebirdclinic.org/what-is-cahoots/",
    tags: ["alternatives-to-policing", "community-safety", "trauma-informed"],
    yearFounded: 1989,
    layer: 12,
  },
  {
    name: "Common Justice",
    location: "Brooklyn, New York, USA",
    description:
      "The first alternative-to-incarceration program in the US for violent felonies in adult courts. Uses restorative justice circles bringing together survivors and those who caused harm to reach accountability.",
    websiteUrl: "https://commonjustice.org",
    tags: ["restorative-justice", "alternatives-to-policing", "community-accountability"],
    yearFounded: 2008,
    layer: 12,
  },
  {
    name: "Advance Peace",
    location: "Richmond, California, USA",
    description:
      "Runs the Peacemaker Fellowship — 18-month mentorship for individuals most likely involved in gun violence. Combines life-skills, trauma support, and milestone stipends. Credited with significant reductions in firearm assaults.",
    websiteUrl: "https://www.advancepeace.org",
    tags: ["violence-interruption", "community-safety", "trauma-informed"],
    yearFounded: 2010,
    layer: 12,
  },
  {
    name: "Fambul Tok",
    location: "Sierra Leone",
    description:
      "Facilitates community-owned reconciliation in post-civil-war Sierra Leone through traditional bonfire ceremonies where victims and perpetrators share stories and seek forgiveness. Peace built from the grassroots up.",
    websiteUrl: "https://www.fambultok.org",
    tags: ["restorative-justice", "conflict-mediation", "community-accountability"],
    yearFounded: 2007,
    layer: 12,
  },
  {
    name: "Community Peace Programme (Zwelethemba)",
    location: "Cape Town, South Africa (180+ sites)",
    description:
      "Trains local Peace Committees to resolve disputes through dialogue instead of police intervention. 99% resolution rate, adapted in Argentina, Brazil, Canada, Australia, and Uganda. Has helped over 460,000 people.",
    websiteUrl: "https://www.ideaswork.org",
    tags: ["conflict-mediation", "alternatives-to-policing", "community-safety"],
    yearFounded: 1998,
    layer: 12,
  },
  {
    name: "Policing Alternatives & Diversion Initiative (PAD)",
    location: "Atlanta, Georgia, USA",
    description:
      "Provides community-based crisis response and diversion from jail for people whose police encounters stem from poverty, mental health, or substance use. Offers care navigation and a walk-in Diversion Center.",
    websiteUrl: "https://www.atlantapad.org",
    tags: ["alternatives-to-policing", "community-safety", "trauma-informed"],
    yearFounded: 2017,
    layer: 12,
  },

  // ── Layer 13: Human Rights ────────────────────────────────────────
  {
    name: "Human Rights Data Analysis Group (HRDAG)",
    location: "San Francisco, USA",
    description:
      "Applies rigorous statistical science to human rights data, working with truth commissions, international tribunals, and UN missions across 30+ years in Guatemala, Colombia, Syria, and beyond.",
    websiteUrl: "https://hrdag.org/",
    tags: ["open-data", "human-rights-monitoring"],
    yearFounded: 1991,
    layer: 13,
  },
  {
    name: "WITNESS",
    location: "Brooklyn, New York, USA",
    description:
      "Trains and supports people worldwide in using video and technology to document human rights abuses. Has partnered with 300+ groups in 80+ countries, turning footage into tools for justice.",
    websiteUrl: "https://www.witness.org/",
    tags: ["citizen-documentation", "human-rights-monitoring"],
    yearFounded: 1992,
    layer: 13,
  },
  {
    name: "Ushahidi",
    location: "Nairobi, Kenya",
    description:
      "An open-source crowdsourcing platform enabling communities to map and report incidents of violence, election fraud, and human rights abuses in real time. Over 35,000 deployments in 30 languages worldwide.",
    websiteUrl: "https://www.ushahidi.com/",
    tags: ["citizen-documentation", "open-data", "human-rights-monitoring"],
    yearFounded: 2008,
    layer: 13,
  },
  {
    name: "Access Now",
    location: "New York, USA (global offices)",
    description:
      "Defends digital rights of people at risk, operating a 24/7 Digital Security Helpline and running the annual RightsCon summit. Advocates against internet shutdowns, surveillance, and censorship worldwide.",
    websiteUrl: "https://www.accessnow.org/",
    tags: ["digital-rights", "human-rights-monitoring"],
    yearFounded: 2009,
    layer: 13,
  },
  {
    name: "BarefootLaw",
    location: "Kampala, Uganda",
    description:
      "Uses social media, mobile platforms, and AI to provide free legal information and assistance to underserved communities across Uganda who otherwise lack access to any form of legal support.",
    websiteUrl: "https://barefootlaw.org/",
    tags: ["community-legal-aid", "digital-rights"],
    yearFounded: 2012,
    layer: 13,
  },
  {
    name: "Human Rights Measurement Initiative (HRMI)",
    location: "Wellington, New Zealand",
    description:
      "Produces the world's most comprehensive country-level human rights performance dataset. Their freely accessible Rights Tracker platform is certified as a Digital Public Good by the UN.",
    websiteUrl: "https://humanrightsmeasurement.org/",
    tags: ["open-data", "human-rights-monitoring"],
    yearFounded: 2016,
    layer: 13,
  },
  {
    name: "Karapatan Alliance Philippines",
    location: "Quezon City, Philippines",
    description:
      "A grassroots human rights alliance conducting fact-finding missions and documentation of violations across the Philippines. Citizen-generated data used to hold duty-bearers accountable before national and international bodies.",
    websiteUrl: "https://www.karapatan.org/",
    tags: ["citizen-documentation", "human-rights-monitoring"],
    yearFounded: 1995,
    layer: 13,
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
