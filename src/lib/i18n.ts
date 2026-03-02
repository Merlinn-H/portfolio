export type Locale = "fr" | "en";

export const t = {
  fr: {
    nav: {
      projects: "Projets",
      skills: "Compétences",
      experience: "Parcours",
      gaming: "Gaming",
      contact: "Contact",
    },
    hero: {
      label: "Producteur Audiovisuel & Chargé de Projets Culturels",
      tagline: "Chaque projet est une histoire. Je suis là pour la raconter.",
      cta_projects: "Voir mes projets",
      cta_contact: "Me contacter",
      scroll: "Scroll",
    },
    projects: {
      label: "Portfolio",
      title: "Mes Projets",
      see_page: "→ Voir la page complète",
      explore: "— Cliquer pour explorer",
      films_count: "→ 3 films",
      productions: {
        label: "Production audiovisuelle",
        desc: "Réalisation, production audiovisuelle et conseil. Courts-métrages, clips, documentaires et podcasts.",
      },
      postmeridian: {
        label: "Studio de jeux vidéo",
        desc: "Fondé en 2024, Postmeridian est un studio de développement de jeux vidéo basé entre la France et le Canada, qui développe actuellement son premier projet original.",
        tags: ["Production", "Direction", "Unreal Engine", "Gestion d'équipe"],
      },
      films: {
        label: "Fiction",
        title: "Courts-métrages",
        desc: "Pineapple Pie, Au Cœur de l'Aliénation, Résonance — trois courts-métrages en tant qu'acteur, assistant réalisateur et chargé de production.",
        tags: ["2019 — 2023", "Assistant Réalisateur", "Chargé de Production", "Acteur"],
      },
    },
    skills: {
      label: "Expertise",
      title: "Compétences",
      categories: [
        {
          category: "Production & Logistique",
          skills: ["Planification de tournages", "Réservation logements & transports", "Gestion de budget", "Organisation plateau"],
        },
        {
          category: "Coordination d'équipes",
          skills: ["Fédération de talents", "Gestion des deadlines", "Communication avec les artistes", "Suivi de projet"],
        },
        {
          category: "Polyvalence & Leadership",
          skills: ["Adaptabilité", "Respect des deadlines", "Prise d'initiative", "Travail sous pression"],
        },
        {
          category: "Outils & Langues",
          skills: ["Anglais professionnel", "Espagnol technique", "Suite Adobe (Ps, Ai, Pr, Lr)", "DaVinci Resolve", "Canva · Google / Office", "Unreal Engine"],
        },
      ],
    },
    experience: {
      label: "Parcours",
      title: "Expériences",
      summary: "Professionnel de la production audiovisuelle et vidéoludique, spécialisé en coordination administrative et logistique de projets culturels et artistiques. Fort de 7 ans d'expérience en gestion d'équipes, suivi budgétaire et production de contenus, mon parcours allie rigueur administrative et créativité, avec une capacité à fédérer des talents autour de projets ambitieux.",
      items: [
        {
          title: "Fondateur & Producteur",
          company: "POSTMERIDIAN — Montpellier",
          period: "Mai 2024 — Actuellement",
          description: "Création et gestion d'un studio de développement de jeux vidéo (PC / Unreal Engine). Supervision artistique, budgétaire et logistique, coordination d'une équipe créative (graphistes, développeurs, compositeurs).",
        },
        {
          title: "Chargé de Production & Communication",
          company: "489Productions — Montpellier",
          period: "Avril 2023 — Actuellement",
          description: "Organisation et gestion de tournages (fiction, publicité, documentaire). Production de contenus digitaux. Suivi administratif : rédaction de contrats, suivi de factures, coordination avec les partenaires.",
        },
        {
          title: "Chargé / Directeur de Production",
          company: "JRCinéma · Productions Uriel Rosen · QUIDAM STUDIOS LTD. — Laissac",
          period: "Juin 2017 — Septembre 2023",
          description: "Coordination d'équipes, gestion des plannings et budgets, logistique de tournage. Aide à la conception de dossiers de financement (régions / CNC). Production de 4 courts-métrages dont 2 sélectionnés en festivals régionaux et nationaux.",
        },
        {
          title: "Chargé de Communication Digitale",
          company: "CarFT — Lyon",
          period: "Oct. 2022 — Mars 2023",
          description: "Développement et exécution de la stratégie de contenus. Production de +15 vidéos courtes et 2 formats longs. Gestion d'un calendrier éditorial pour une audience organique : 100K vues, 300K impressions.",
        },
      ],
    },
    gaming: {
      label: "Côté perso",
      title: "Jeux Vidéo",
      games: [
        { title: "Path of Exile", genre: "ARPG", description: "La complexité des systèmes qui s'entremêlent." },
        { title: "TFT", genre: "Auto-battler", description: "La stratégie sans me prendre la tête." },
        { title: "Into The Breach", genre: "Stratégie", description: "La micro stratégie où je me prends la tête et je dois réfléchir." },
        { title: "Factorio", genre: "Simulation", description: "THE FACTORY MUST GROW." },
      ],
    },
    contact: {
      label: "Contact",
      title: "Travaillons ensemble",
      desc: "Vous avez un projet audiovisuel ? Je suis disponible pour des collaborations et de nouvelles aventures créatives.",
    },
    productions_page: {
      back: "← Retour au portfolio",
      label: "Production audiovisuelle",
      about: "Studio de production audiovisuelle basé à Montpellier. Nous accompagnons artistes, marques et porteurs de projets de la première idée jusqu'à la livraison finale.",
      cta_label: "Vous avez un projet ? Parlons-en.",
      cta_button: "Nous contacter",
      services: [
        {
          number: "01",
          title: "Réalisation",
          description: "Courts-métrages, clips musicaux, documentaires. Conception et réalisation de vos projets de A à Z.",
        },
        {
          number: "02",
          title: "Production",
          description: "Production audiovisuelle et podcasts. Gestion complète du projet, du budget au rendu final.",
        },
        {
          number: "03",
          title: "Conseil",
          description: "Accompagnement et conseil en production audiovisuelle. On vous guide à chaque étape de votre projet.",
        },
      ],
    },
    films_page: {
      back: "← Retour au portfolio",
      title: "Courts-métrages",
      watch: "▶ Voir le film",
      close: "Fermer ✕",
      films: [
        {
          title: "Pineapple Pie",
          year: "2023",
          roles: ["Assistant Réalisateur", "Chargé de Production"],
          description: [
            "Court-métrage de fiction tourné avec un budget très limité. J'ai notamment sourcé une voiture spécifique pour le tournage et veillé au bon déroulement de chaque journée sur le plateau.",
          ],
          youtubeId: "jvVDXyiLuFI",
        },
        {
          title: "Au Cœur de l'Aliénation",
          year: "2021",
          roles: ["Acteur", "Chargé de Production", "Assistant de Pré-Production"],
          description: [
            "SynExplorer offre aux Êtres d'autres mondes une expérience virtuelle immersive : \"Vibrez-la, Vivez-la.\" Un nouveau havre de paix, mais où les formes imaginées sont encore instables.",
            "Afin de rendre ces créations palpables, tangibles et stables, les opérateurs abaissent la fréquence de la simulation.",
            "C'est alors qu'une forme non-créée prend le contrôle total de SynExplorer.",
          ],
          youtubeId: "3Ef50Mpe00M",
        },
        {
          title: "Résonance",
          year: "2019",
          roles: ["Acteur", "Directeur de Production"],
          description: [
            "Film expérimental — essai d'une caméra et perfectionnement de techniques de montage et d'effets visuels.",
          ],
          youtubeId: "FHO5qU7-4og",
        },
      ],
    },
    footer: "© 2025 Hugo Pezzo — Tous droits réservés",
  },
  en: {
    nav: {
      projects: "Projects",
      skills: "Skills",
      experience: "Experience",
      gaming: "Gaming",
      contact: "Contact",
    },
    hero: {
      label: "Film Producer & Cultural Project Manager",
      tagline: "Every project is a story. I'm here to tell it.",
      cta_projects: "See my projects",
      cta_contact: "Contact me",
      scroll: "Scroll",
    },
    projects: {
      label: "Portfolio",
      title: "My Projects",
      see_page: "→ See full page",
      explore: "— Click to explore",
      films_count: "→ 3 films",
      productions: {
        label: "Audiovisual production",
        desc: "Film production, audiovisual production and consulting. Short films, music videos, documentaries and podcasts.",
      },
      postmeridian: {
        label: "Video game studio",
        desc: "Founded in 2024, Postmeridian is a game development studio based between France and Canada, currently developing its first original project.",
        tags: ["Production", "Direction", "Unreal Engine", "Team Management"],
      },
      films: {
        label: "Fiction",
        title: "Short Films",
        desc: "Pineapple Pie, Au Cœur de l'Aliénation, Résonance — three short films as actor, assistant director and production manager.",
        tags: ["2019 — 2023", "Assistant Director", "Production Manager", "Actor"],
      },
    },
    skills: {
      label: "Expertise",
      title: "Skills",
      categories: [
        {
          category: "Production & Logistics",
          skills: ["Shoot planning", "Accommodation & transport booking", "Budget management", "Set organisation"],
        },
        {
          category: "Team Coordination",
          skills: ["Talent management", "Deadline management", "Artist communication", "Project tracking"],
        },
        {
          category: "Versatility & Leadership",
          skills: ["Adaptability", "Meeting deadlines", "Initiative", "Working under pressure"],
        },
        {
          category: "Tools & Languages",
          skills: ["Professional English", "Technical Spanish", "Adobe Suite (Ps, Ai, Pr, Lr)", "DaVinci Resolve", "Canva · Google / Office", "Unreal Engine"],
        },
      ],
    },
    experience: {
      label: "Experience",
      title: "Experience",
      summary: "Audiovisual and video game production professional, specialised in administrative coordination and logistics for cultural and artistic projects. With 7 years of experience in team management, budget tracking and content production, my career combines administrative rigour and creativity, with a proven ability to unite talent around ambitious projects.",
      items: [
        {
          title: "Founder & Producer",
          company: "POSTMERIDIAN — Montpellier",
          period: "May 2024 — Present",
          description: "Creation and management of a video game development studio (PC / Unreal Engine). Artistic, budgetary and logistical supervision, coordination of a creative team (graphic designers, developers, composers).",
        },
        {
          title: "Production & Communications Manager",
          company: "489Productions — Montpellier",
          period: "April 2023 — Present",
          description: "Organisation and management of shoots (fiction, advertising, documentary). Digital content production. Administrative follow-up: drafting contracts, invoice tracking, coordination with partners.",
        },
        {
          title: "Production Manager / Head of Production",
          company: "JRCinéma · Productions Uriel Rosen · QUIDAM STUDIOS LTD. — Laissac",
          period: "June 2017 — September 2023",
          description: "Team coordination, schedule and budget management, shoot logistics. Assistance with funding applications (regional bodies / CNC). Production of 4 short films, 2 selected at regional and national festivals.",
        },
        {
          title: "Digital Communications Manager",
          company: "CarFT — Lyon",
          period: "Oct. 2022 — Mar. 2023",
          description: "Development and execution of content strategy. Production of 15+ short videos and 2 long-form formats. Editorial calendar management for an organic audience: 100K views, 300K impressions.",
        },
      ],
    },
    gaming: {
      label: "Personal",
      title: "Video Games",
      games: [
        { title: "Path of Exile", genre: "ARPG", description: "The complexity of intertwining systems." },
        { title: "TFT", genre: "Auto-battler", description: "Strategy without taking it too seriously." },
        { title: "Into The Breach", genre: "Strategy", description: "The micro-strategy where I overthink every move." },
        { title: "Factorio", genre: "Simulation", description: "THE FACTORY MUST GROW." },
      ],
    },
    contact: {
      label: "Contact",
      title: "Let's work together",
      desc: "Got an audiovisual project? I'm available for collaborations and new creative adventures.",
    },
    productions_page: {
      back: "← Back to portfolio",
      label: "Audiovisual production",
      about: "Audiovisual production studio based in Montpellier. We accompany artists, brands and project owners from the first idea to the final delivery.",
      cta_label: "Got a project? Let's talk.",
      cta_button: "Contact us",
      services: [
        {
          number: "01",
          title: "Direction",
          description: "Short films, music videos, documentaries. Full conception and direction of your projects from A to Z.",
        },
        {
          number: "02",
          title: "Production",
          description: "Audiovisual production and podcasts. Complete project management, from budget to final delivery.",
        },
        {
          number: "03",
          title: "Consulting",
          description: "Guidance and consulting in audiovisual production. We support you at every stage of your project.",
        },
      ],
    },
    films_page: {
      back: "← Back to portfolio",
      title: "Short Films",
      watch: "▶ Watch the film",
      close: "Close ✕",
      films: [
        {
          title: "Pineapple Pie",
          year: "2023",
          roles: ["Assistant Director", "Production Manager"],
          description: [
            "Fiction short film shot on a very limited budget. I sourced a specific car for the shoot and ensured the smooth running of each day on set.",
          ],
          youtubeId: "jvVDXyiLuFI",
        },
        {
          title: "Au Cœur de l'Aliénation",
          year: "2021",
          roles: ["Actor", "Production Manager", "Pre-Production Assistant"],
          description: [
            "SynExplorer offers Beings from other worlds an immersive virtual experience: \"Feel it, Live it.\" A new haven of peace, but where imagined forms are still unstable.",
            "To make these creations tangible and stable, operators lower the simulation frequency.",
            "That is when an uncreated form takes total control of SynExplorer.",
          ],
          youtubeId: "3Ef50Mpe00M",
        },
        {
          title: "Résonance",
          year: "2019",
          roles: ["Actor", "Production Director"],
          description: [
            "Experimental film — testing a camera and perfecting editing and visual effects techniques.",
          ],
          youtubeId: "FHO5qU7-4og",
        },
      ],
    },
    footer: "© 2025 Hugo Pezzo — All rights reserved",
  },
} as const;
