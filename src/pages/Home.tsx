import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, CalendarDays, ClipboardList, TrendingUp, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import MatchCard from '../components/common/MatchCard';
import TeamCard from '../components/common/TeamCard';

const Home: React.FC = () => {
  const { matches, teams, venues } = useAppContext();
  const [expandedSection, setExpandedSection] = useState<string | null>("about");
  
  // Filter upcoming matches (next 3)
  const upcomingMatches = matches
    .filter(match => match.status === 'scheduled')
    .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime())
    .slice(0, 3);
  
  // Filter live matches
  const liveMatches = matches.filter(match => match.status === 'live');
  
  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-700 to-secondary-700 text-white rounded-lg overflow-hidden mb-8">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/47343/the-ball-stadion-horn-corner-47343.jpeg')] bg-cover bg-center"></div>
        <div className="relative p-6 md:p-10 z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <Trophy size={64} className="text-white mr-6 mb-4 md:mb-0" />
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-2">Torneo Internacional de Fútbol 2025</h1>
              <p className="text-lg md:text-xl text-white/80 mb-4">Vive la emocionante competición entre los mejores equipos de México y España.</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/schedules" className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Ver horario
                </Link>
                <Link to="/reservations" className="btn bg-secondary-600 text-white hover:bg-secondary-700">
                  Reservar entradas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partidos en Vivo */}
      {liveMatches.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <h2 className="text-xl font-bold">En vivo ahora</h2>
            </div>
            <Link to="/schedules" className="text-primary-600 dark:text-primary-400 hover:underline flex items-center">
              Ver todo <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {liveMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* Vista previa de los próximos partidos */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <CalendarDays size={20} className="mr-2" />
           Próximos partidos
          </h2>
          <Link to="/schedules" className="text-primary-600 dark:text-primary-400 hover:underline flex items-center">
            Ver todos <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingMatches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* Vista previa de los equipos */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Equipos participantes</h2>
          <button 
            onClick={() => toggleSection('teams')}
            className="text-primary-600 dark:text-primary-400 hover:underline flex items-center"
          >
            {expandedSection === 'teams' ? (
              <>Ocultar equipos <ChevronUp size={16} /></>
            ) : (
              <>Mostrar equipos <ChevronDown size={16} /></>
            )}
          </button>
        </div>
        
        {expandedSection === 'teams' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        )}
      </section>

      {/* Acerca del torneo */}
      <section className="mb-8">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer"
          onClick={() => toggleSection('about')}
        >
          <h2 className="text-xl font-bold">Acerca del torneo</h2>
          {expandedSection === 'about' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSection === 'about' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-3">Torneo Internacional de Fútbol 2025</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
             Bienvenidos al prestigioso Torneo Internacional de Fútbol, ​que reúne a equipos de élite de México y España. Este torneo celebra la rica tradición futbolística de ambos países y exhibe talento de talla mundial a través de las fronteras internacionales.
            </p>
            
            <h4 className="font-semibold mb-2">Formato del torneo:</h4>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
              <li>Fase de grupos con dos grupos (A y B)</li>
              <li>Los dos mejores equipos de cada grupo avanzan a la fase eliminatoria</li>
              <li>Cuartos de final, semifinales y final</li>
              <li>Partidos en estadios emblemáticos de México y España</li>
            </ul>
            
            <h4 className="font-semibold mb-2">Fechas clave:</h4>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
                <li>Fase de grupos: 1-15 de junio de 2025</li>
                <li>Cuartos de final: 18-19 de junio de 2025</li>
                <li>Semifinales: 22-23 de junio de 2025</li>
                <li>Final: 27 de junio de 2025</li>
            </ul>
            
            <Link to="/schedules" className="btn-primary inline-block mt-2">
              Ver calendario completo
            </Link>
          </div>
        )}
      </section>

      {/* Estadios */}
      <section className="mb-8">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer"
          onClick={() => toggleSection('venues')}
        >
          <h2 className="text-xl font-bold">Sedes del torneo</h2>
          {expandedSection === 'venues' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSection === 'venues' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(venues).slice(0, 4).map(venue => (
              <div key={venue.id} className="card overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={venue.image} 
                    alt={venue.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{venue.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {venue.city}, {venue.country} | Capacity: {venue.capacity.toLocaleString()}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {venue.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Enlaces rápidos */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/schedules" className="card p-4 hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
          <div className="flex items-center">
            <CalendarDays size={24} className="text-primary-600 dark:text-primary-400 mr-3" />
            <span className="font-semibold">Horarios de partidos</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </Link>
        
        <Link to="/reservations" className="card p-4 hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
          <div className="flex items-center">
            <ClipboardList size={24} className="text-primary-600 dark:text-primary-400 mr-3" />
            <span className="font-semibold">Reservar entradas</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </Link>
        
        <Link to="/results" className="card p-4 hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp size={24} className="text-primary-600 dark:text-primary-400 mr-3" />
            <span className="font-semibold">Resultados y clasificaciones</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </Link>
      </section>
    </div>
  );
};

export default Home;