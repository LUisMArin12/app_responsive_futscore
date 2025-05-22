export interface Venue {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  image: string;
  description: string;
}

export const venues: Record<string, Venue> = {
  "azteca": {
    id: "azteca",
    name: "Estadio Azteca",
    city: "Mexico City",
    country: "Mexico",
    capacity: 87523,
    image: "https://mxcity.mx/wp-content/uploads/2016/07/estadio-azteca.jpg",
    description: "El Estadio Azteca es el estadio más grande de México y ha sido sede de dos finales de la Copa Mundial de la FIFA."
  },
  "bernabeu": {
    id: "bernabeu",
    name: "Santiago Bernabéu",
    city: "Madrid",
    country: "Spain",
    capacity: 81044,
    image: "https://ep01.epimg.net/elpais/imagenes/2019/04/02/album/1554197022_570292_1554213907_noticia_normal.jpg",
    description: "El Santiago Bernabéu es la casa del Real Madrid y uno de los estadios de fútbol más famosos del mundo."
  },
  "campnou": {
    id: "campnou",
    name: "Camp Nou",
    city: "Barcelona",
    country: "Spain",
    capacity: 99354,
    image: "https://stadiumdb.com/img/news/2024/03/24Bar01.jpg",
    description: "El Camp Nou es el estadio más grande de Europa y la casa del FC Barcelona."
  },
  "olimpico": {
    id: "olimpico",
    name: "Estadio Olímpico Universitario",
    city: "Mexico City",
    country: "Mexico",
    capacity: 72000,
    image: "https://footballgroundguide.com/app/uploads/2020/11/Estadio-Ol%C3%ADmpico-Universitario.jpg",
    description: "Sede de los Pumas UNAM, este recinto histórico albergó eventos durante los Juegos Olímpicos de Verano de 1968."
  },
  "akron": {
    id: "akron",
    name: "Estadio Akron",
    city: "Guadalajara",
    country: "Mexico",
    capacity: 49850,
    image: "https://storage.googleapis.com/static.elsoldemexico.com.mx/elesto/2023/05/20230518_7366-scaled.jpg",
    description: "Un estadio moderno que sirve como casa de las Chivas Guadalajara."
  },
  "deportes": {
    id: "deportes",
    name: "Estadio Ciudad de los Deportes",
    city: "Mexico City",
    country: "Mexico",
    capacity: 36681,
    image: "https://mexicocity.cdmx.gob.mx/wp-content/uploads/2019/11/discover-3541-1-azul-estadio.jpg",
    description: "Hogar del Cruz Azul, este estadio tiene una rica historia en el fútbol mexicano."
  },
  "metropolitano": {
    id: "metropolitano",
    name: "Metropolitano Stadium",
    city: "Madrid",
    country: "Spain",
    capacity: 68456,
    image: "https://cdn.getyourguide.com/img/tour/6405cb06926f6.jpeg/148.jpg",
    description: "El estadio del Atlético de Madrid, conocido por su diseño moderno y excelente ambiente."
  },
  "sanchez": {
    id: "sanchez", 
    name: "Ramón Sánchez Pizjuán",
    city: "Seville",
    country: "Spain",
    capacity: 43883,
    image: "https://i.pinimg.com/originals/fe/da/33/feda33c71211a385319694c8a7dadc05.jpg",
    description: "La casa del Sevilla FC, conocida por su atmósfera intimidante durante las noches europeas."
  }
};