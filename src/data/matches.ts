// matches.ts
import { format, addDays } from 'date-fns';

export interface Player {
  name: string;
  position: string;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  time: string;
  venue: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'canceled';
  homeScore?: number;
  awayScore?: number;
  remainingSeat: number;
  ticketPrice: number;
  tournamentStage: string;
  highlights?: {
    summary: string;
    stats: {
      shots: { home: number; away: number };
      possession: { home: number; away: number };
      corners: { home: number; away: number };
      fouls: { home: number; away: number };
      yellowCards: { home: number; away: number };
      redCards: { home: number; away: number };
    };
  };
  liveElapsedMinutes?: number;
  lineups?: {
    home: Player[];
    away: Player[];
  };
}

const generateDate = (daysFromToday: number) => {
  return format(addDays(new Date(), daysFromToday), 'yyyy-MM-dd');
};

export const matches: Match[] = [
  {
    id: "match-1",
    homeTeamId: "club-america",
    awayTeamId: "pumas-unam",
    date: generateDate(2),
    time: "15:00",
    venue: "azteca",
    status: "canceled",
    remainingSeat: 85,
    ticketPrice: 150,
    tournamentStage: "Group A"
  },
  {
    id: "match-2",
    homeTeamId: "real-madrid",
    awayTeamId: "barcelona",
    date: generateDate(3),
    time: "18:30",
    venue: "bernabeu",
    status: "scheduled",
    remainingSeat: 120,
    ticketPrice: 200,
    tournamentStage: "Group B"
  },
  {
    id: "match-3",
    homeTeamId: "atletico-madrid",
    awayTeamId: "sevilla",
    date: generateDate(4),
    time: "20:00",
    venue: "metropolitano",
    status: "scheduled",
    remainingSeat: 75,
    ticketPrice: 120,
    tournamentStage: "Group B"
  },
  {
    id: "match-4",
    homeTeamId: "cruz-azul",
    awayTeamId: "chivas",
    date: generateDate(5),
    time: "19:15",
    venue: "deportes",
    status: "scheduled",
    remainingSeat: 110,
    ticketPrice: 130,
    tournamentStage: "Group A"
  },
  // Partidos completados
  {
  id: "match-5",
  homeTeamId: "barcelona",
  awayTeamId: "atletico-madrid",
  date: generateDate(-3),
  time: "18:00",
  venue: "campnou",
  status: "completed",
  homeScore: 3,
  awayScore: 1,
  remainingSeat: 0,
  ticketPrice: 175,
  tournamentStage: "Group B",
  lineups: {
    home: [
      { name: "Marc-André ter Stegen", position: "Portero" },
      { name: "Jordi Alba", position: "Defensa" },
      { name: "Ronald Araújo", position: "Defensa" },
      { name: "Gerard Piqué", position: "Defensa" },
      { name: "Sergi Roberto", position: "Defensa" },
      { name: "Frenkie de Jong", position: "Mediocampista" },
      { name: "Sergio Busquets", position: "Mediocampista" },
      { name: "Pedri", position: "Mediocampista" },
      { name: "Ousmane Dembélé", position: "Delantero" },
      { name: "Robert Lewandowski", position: "Delantero" },
      { name: "Ansu Fati", position: "Delantero" }
    ],
    away: [
      { name: "Jan Oblak", position: "Portero" },
      { name: "Kieran Trippier", position: "Defensa" },
      { name: "Stefan Savić", position: "Defensa" },
      { name: "José María Giménez", position: "Defensa" },
      { name: "Renan Lodi", position: "Defensa" },
      { name: "Marcos Llorente", position: "Mediocampista" },
      { name: "Koke", position: "Mediocampista" },
      { name: "Rodrigo De Paul", position: "Mediocampista" },
      { name: "Ángel Correa", position: "Delantero" },
      { name: "João Félix", position: "Delantero" },
      { name: "Antoine Griezmann", position: "Delantero" }
    ]
  },
  highlights: {
    summary: "Barcelona dominó con gran posesión y efectividad al frente.",
    stats: {
      shots: { home: 14, away: 7 },
      possession: { home: 62, away: 38 },
      corners: { home: 6, away: 3 },
      fouls: { home: 9, away: 14 },
      yellowCards: { home: 2, away: 3 },
      redCards: { home: 0, away: 1 }
    }
  }
},
  {
    id: "match-6",
    homeTeamId: "real-madrid",
    awayTeamId: "sevilla",
    date: generateDate(-2),
    time: "17:30",
    venue: "bernabeu",
    status: "completed",
    homeScore: 2,
    awayScore: 2,
    remainingSeat: 0,
    ticketPrice: 100,
    tournamentStage: "Group B",
    lineups: {
      home: [
        { name: "Thibaut Courtois", position: "Portero" },
        { name: "Dani Carvajal", position: "Defensa" },
        { name: "Éder Militão", position: "Defensa" },
        { name: "David Alaba", position: "Defensa" },
        { name: "Ferland Mendy", position: "Defensa" },
        { name: "Luka Modrić", position: "Mediocampista" },
        { name: "Toni Kroos", position: "Mediocampista" },
        { name: "Federico Valverde", position: "Mediocampista" },
        { name: "Vinícius Jr.", position: "Delantero" },
        { name: "Karim Benzema", position: "Delantero" },
        { name: "Rodrygo", position: "Delantero" }
      ],
      away: [
        { name: "Yassine Bounou", position: "Portero" },
        { name: "Jules Koundé", position: "Defensa" },
        { name: "Gonzalo Montiel", position: "Defensa" },
        { name: "Diego Carlos", position: "Defensa" },
        { name: "Marcos Acuña", position: "Defensa" },
        { name: "Ivan Rakitić", position: "Mediocampista" },
        { name: "Joan Jordán", position: "Mediocampista" },
        { name: "Óliver Torres", position: "Mediocampista" },
        { name: "Lucas Ocampos", position: "Delantero" },
        { name: "Youssef En-Nesyri", position: "Delantero" },
        { name: "Papú Gómez", position: "Delantero" }
      ]
    },
    highlights: {
      summary: "Partido parejo con muchas llegadas y buen ritmo de juego.",
      stats: {
        shots: { home: 11, away: 10 },
        possession: { home: 54, away: 46 },
        corners: { home: 5, away: 4 },
        fouls: { home: 10, away: 12 },
        yellowCards: { home: 1, away: 2 },
        redCards: { home: 0, away: 0 }
      }
    }
  },
  {
    id: "match-7",
    homeTeamId: "atletico-madrid",
    awayTeamId: "real-madrid",
    date: generateDate(7),
    time: "20:45",
    venue: "metropolitano",
    status: "scheduled",
    remainingSeat: 150,
    ticketPrice: 190,
    tournamentStage: "Group B"
  },
  {
    id: "match-8",
    homeTeamId: "sevilla",
    awayTeamId: "barcelona",
    date: generateDate(9),
    time: "16:30",
    venue: "sanchez",
    status: "scheduled",
    remainingSeat: 95,
    ticketPrice: 160,
    tournamentStage: "Group B"
  },
  {
    id: "match-9",
    homeTeamId: "barcelona",
    awayTeamId: "pumas-unam",
    date: generateDate(14),
    time: "20:00",
    venue: "campnou",
    status: "scheduled",
    remainingSeat: 200,
    ticketPrice: 220,
    tournamentStage: "Quarterfinals"
  },
  {
    id: "match-10",
    homeTeamId: "sevilla",
    awayTeamId: "chivas",
    date: generateDate(15),
    time: "19:30",
    venue: "sanchez",
    status: "scheduled",
    remainingSeat: 180,
    ticketPrice: 210,
    tournamentStage: "Quarterfinals"
  },
  {
    id: "match-11",
    homeTeamId: "club-america",
    awayTeamId: "cruz-azul",
    date: generateDate(0),
    time: "17:28",
    venue: "azteca",
    status: "live",
    homeScore: 2,
    awayScore: 1,
    remainingSeat: 0,
    ticketPrice: 250,
    tournamentStage: "Exhibition Match",
    liveElapsedMinutes: 56,
    lineups: {
      home: [
        { name: "Luis Angel Malagon", position: "Portero" },
        { name: "Kevin Álvarez", position: "Defensa" },
        { name: "Sebastián Cáceres", position: "Defensa" },
        { name: "Igor Lichnovsky", position: "Defensa" },
        { name: "Luis Fuentes", position: "Defensa" },
        { name: "Jonathan Dos Santos", position: "Mediocampista" },
        { name: "Álvaro Fidalgo", position: "Mediocampista" },
        { name: "Diego Valdés", position: "Mediocampista" },
        { name: "Leo Suárez", position: "Delantero" },
        { name: "Henry Martín", position: "Delantero" },
        { name: "Julián Quiñones", position: "Delantero" }
      ],
      away: [
        { name: "Jesús Corona", position: "Portero" },
        { name: "Juan Escobar", position: "Defensa" },
        { name: "Carlos Salcedo", position: "Defensa" },
        { name: "Víctor Guzmán", position: "Defensa" },
        { name: "Sebastián Córdova", position: "Mediocampista" },
        { name: "Joao Maleck", position: "Mediocampista" },
        { name: "Fernando Beltrán", position: "Mediocampista" },
        { name: "Jesús Angulo", position: "Delantero" },
        { name: "Oribe Peralta", position: "Delantero" },
        { name: "Santiago Giménez", position: "Delantero" },
        { name: "Ulises Rivas", position: "Delantero" }
      ]
    }
  }
];
