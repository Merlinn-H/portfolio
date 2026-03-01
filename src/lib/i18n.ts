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
      films_count: "→ 3 films",
      productions: {
        label: "Production audiovisuelle",
        desc: "Réalisation, production audiovisuelle et conseil. Courts-métrages, clips, documentaires et podcasts.",
      },
      postmeridian: {
        label: "Studio de jeux vidéo",
        desc: "Fondation et direction d'un studio indépendant de développement de jeux vidéo sur PC (Unreal Engine). Supervision complète : artistique, budgétaire, logistique et coordination d'une équipe créative pluridisciplinaire.",
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
      label: "Audiovisual Producer & Cultural Project Manager",
      tagline: "Every project is a story. I'm here to tell it.",
      cta_projects: "See my projects",
      cta_contact: "Contact me",
      scroll: "Scroll",
    },
    projects: {
      label: "Portfolio",
      title: "My Projects",
      see_page: "→ See full page",
      films_count: "→ 3 films",
      productions: {
        label: "Audiovisual production",
        desc: "Film production, audiovisual production and consulting. Short films, music videos, documentaries and podcasts.",
      },
      postmeridian: {
        label: "Video game studio",
        desc: "Founding and managing an independent video game development studio for PC (Unreal Engine). Full oversight: artistic, budgetary, logistical and coordination of a multidisciplinary creative team.",
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
    footer: "© 2025 Hugo Pezzo — All rights reserved",
  },
} as const;
