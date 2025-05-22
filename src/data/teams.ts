export interface Team {
    id: string,
    name: string,
    country: string,
    league: string,
    logo: string,
    primaryColor: string,
    secundaryColor: string,
    foundedYear: number,
    stadium: string,
    description: string
}

export const teams: Team[] = [
    //Liga MX Teams
    {
        id: "club-america",
        name: "Club América",
        country: "Mexico",
        league: "Liga MX",
        logo: "https://logodownload.org/wp-content/uploads/2018/10/america-mexico-logo-1.png",
        primaryColor: "#FFF200",
        secundaryColor: "#000051",
        foundedYear: 1916,
        stadium: "Estadio Azteca",
        description: "El Club América es uno de los clubes de fútbol más exitosos de México, conocido por su rica historia y su apasionada base de fanáticos, asi como sus campeonatos."
    },
    {
    id: "pumas-unam",
    name: "Pumas UNAM",
    country: "Mexico",
    league: "Liga MX",
    logo: "https://i.pinimg.com/originals/bf/34/42/bf3442790954e0de3a353dcc2ec783be.jpg",
    primaryColor: "#001D42",
    secundaryColor: "#FFC72C",
    foundedYear: 1954,
    stadium: "Estadio Olímpico Universitario",
    description: "Pumas UNAM es el club oficial de fútbol de la Universidad Nacional Autónoma de México, representando la excelencia académica y el logro deportivo."
  },
  {
    id: "cruz-azul",
    name: "Cruz Azul",
    country: "Mexico",
    league: "Liga MX",
    logo: "https://pnghq.com/wp-content/uploads/download-free-cruz-azul-logo-png-images-62226-1024x1024.png",
    primaryColor: "#005EB8",
    secundaryColor: "#FFFFFF",
    foundedYear: 1927,
    stadium: "Estadio Ciudad de los Deportes",
    description: "Cruz Azul es uno de los clubes de fútbol más históricos de México, fundado originalmente por la empresa cementera Cemento Cruz Azul."
  },
  {
    id: "chivas",
    name: "Chivas Guadalajara",
    country: "Mexico",
    league: "Liga MX",
    logo: "https://image.pngaaa.com/367/516367-middle.png",
    primaryColor: "#CD1406",
    secundaryColor: "#FFFFFF",
    foundedYear: 1906,
    stadium: "Estadio Akron",
    description: "El Club Deportivo Guadalajara, comúnmente conocido como Chivas, es uno de los equipos más populares de México, conocido por alinear exclusivamente a jugadores mexicanos."
  },

  // Spanish Teams
  {
    id: "barcelona",
    name: "FC Barcelona",
    country: "Spain",
    league: "La Liga",
    logo: "https://pngimg.com/uploads/fcb_logo/fcb_logo_PNG14.png", 
    primaryColor: "#004D98",
    secundaryColor: "#A50044",
    foundedYear: 1899,
    stadium: "Camp Nou",
    description: "El FC Barcelona es uno de los clubes de fútbol más exitosos del mundo, conocido por su estilo de juego distintivo y su compromiso con el desarrollo de la juventud."
  },
  {
    id: "real-madrid",
    name: "Real Madrid",
    country: "Spain",
    league: "La Liga",
    logo: "https://clipart-library.com/newhp/kissclipart-real-madrid-logo-clipart-real-madrid-c-f-la-liga-cc44d0e943adf7b5.png",
    primaryColor: "#FFFFFF",
    secundaryColor: "#EFB810",
    foundedYear: 1902,
    stadium: "Santiago Bernabéu",
    description: "El Real Madrid tiene el récord de más títulos de la Copa de Europa y la Liga de Campeones de la UEFA, y es uno de los clubes de fútbol más ricos del mundo."
  },
  {
    id: "atletico-madrid",
    name: "Atlético Madrid",
    country: "Spain",
    league: "La Liga",
    logo: "https://images.mantosdofutebol.com.br/wp-content/uploads/2023/06/Escudo-do-Atletico-de-Madrid-2024-2025-a.jpg",
    primaryColor: "#CD1406",
    secundaryColor: "#000051",
    foundedYear: 1903,
    stadium: "Metropolitano Stadium",
    description: "El Atlético de Madrid es conocido por su pasión y su espíritu competitivo, desafiando constantemente al Barcelona y al Real Madrid por la supremacía del fútbol español."
  },
  {
    id: "sevilla",
    name: "Sevilla FC",
    country: "Spain",
    league: "La Liga",
    logo: "https://tse1.mm.bing.net/th?id=OIP.Sm4efxur-Xu73qE5XCLUzwHaHa&pid=Api&P=0&h=180",
    primaryColor: "#E20E0E",
    secundaryColor: "#FFFFFF",
    foundedYear: 1890,
    stadium: "Ramón Sánchez Pizjuán",
    description: "El Sevilla FC se ha ganado una reputación de excelencia en la UEFA Europa League, ganando la competición en múltiples ocasiones."
  }
];