import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { Clock, MapPin, Users, DollarSign, AlertCircle } from 'lucide-react';
import { Match } from '../../data/matches';
import { format, parseISO } from 'date-fns';

interface MatchCardProps {
  match: Match;
  showActions?: boolean;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, showActions = true }) => {
  const { teams, venues } = useAppContext();
  const [showLineupTeam, setShowLineupTeam] = useState<'home' | 'away' | null>(null);

  const homeTeam = teams.find(team => team.id === match.homeTeamId);
  const awayTeam = teams.find(team => team.id === match.awayTeamId);
  const venue = venues[match.venue];

  if (!homeTeam || !awayTeam || !venue) {
    return <div>No se encontraron partidos</div>;
  }

  const formattedDate = format(parseISO(match.date), 'MMMM d, yyyy');

  const getElapsedMinutes = () => {
    if (match.status !== 'live') return null;
    const matchStart = new Date(`${match.date}T${match.time}`);
    const now = new Date();
    const diff = Math.floor((now.getTime() - matchStart.getTime()) / (1000 * 60));
    return diff > 0 ? `${diff}'` : "0'";
  };

  const getStatusBadge = () => {
    switch (match.status) {
      case 'live':
        return <span className="badge bg-red-500 text-white animate-pulse-slow">EN VIVO</span>;
      case 'completed':
        return <span className="badge bg-gray-500 text-white">COMPLETADO</span>;
      case 'postponed':
        return <span className="badge bg-yellow-500 text-white">POSPUESTO</span>;
      case 'canceled':
        return <span className="badge bg-red-600 text-white">CANCELADO</span>;
      default:
        return <span className="badge bg-green-500 text-white">PROGRAMADO</span>;
    }
  };

  return (
    <div className="flex justify-center px-4">
      <div className="w-full sm:max-w-xl lg:max-w-2xl card hover:shadow-lg transition-shadow duration-300 relative">

        {/* Estado del partido centrado arriba */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
          {getStatusBadge()}
        </div>

        <div className="p-4 pt-10"> {/* Espacio extra arriba por el estado */}
          {/* Fecha y hora */}
          <div className="flex justify-between items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>
                {formattedDate} | {match.time}
              </span>
            </div>

            {match.status === 'live' && (
              <div className="text-red-600 font-semibold">
                {getElapsedMinutes()}
              </div>
            )}
          </div>

          {/* Etapa del torneo */}
          <div className="mb-4 text-sm font-medium text-primary-600 dark:text-primary-400 text-center sm:text-left">
            {match.tournamentStage}
          </div>

          {/* Equipos */}
          <div className="flex items-center justify-between mb-6">
            <Link to={`/team/${homeTeam.id}`} className="flex flex-col items-center w-5/12">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-2">
                <img src={homeTeam.logo} alt={`${homeTeam.name} logo`} className="w-full h-full object-cover" />
              </div>
              <span className="text-center text-sm md:text-base font-semibold">{homeTeam.name}</span>
            </Link>

            <div className="text-3xl font-bold w-2/12 flex justify-center items-center space-x-4">
              {match.status === 'completed' || match.status === 'live' ? (
                <>
                  <span>{match.homeScore}</span>
                  <span>-</span>
                  <span>{match.awayScore}</span>
                </>
              ) : (
                <div className="text-lg font-medium">VS</div>
              )}
            </div>

            <Link to={`/team/${awayTeam.id}`} className="flex flex-col items-center w-5/12">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-2">
                <img src={awayTeam.logo} alt={`${awayTeam.name} logo`} className="w-full h-full object-cover" />
              </div>
              <span className="text-center text-sm md:text-base font-semibold">{awayTeam.name}</span>
            </Link>
          </div>

          {/* Lugar y detalles */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
              <MapPin size={16} className="mr-2" />
              <span>{venue.name}, {venue.city}</span>
            </div>

            {match.status === 'scheduled' && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Users size={16} className="mr-2" />
                  <span>Asientos disponibles: {match.remainingSeat}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <DollarSign size={16} className="mr-1" />
                  <span>${match.ticketPrice}</span>
                </div>
              </div>
            )}

            {match.status === 'postponed' && (
              <div className="flex items-center text-yellow-600 dark:text-yellow-400 mt-2">
                <AlertCircle size={16} className="mr-2" />
                <span>Este partido ha sido pospuesto. Nueva fecha por confirmar.</span>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          {showActions && match.status === 'scheduled' && match.remainingSeat > 0 && (
            <div className="mt-4">
              <Link to={`/reservations?matchId=${match.id}`} className="btn-primary w-full flex justify-center">
                Reservar asientos
              </Link>
            </div>
          )}

          {match.status === 'completed' && match.highlights && (
            <div className="mt-4">
              <Link to={`/results?matchId=${match.id}`} className="btn-secondary w-full flex justify-center">
                Ver aspectos destacados
              </Link>
            </div>
          )}

          {/* Alineaciones */}
          {(match.status === 'live' || match.status === 'completed') && (
            <div className="mt-6">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowLineupTeam(showLineupTeam === 'home' ? null : 'home')}
                  className={`btn-outline px-4 py-2 ${showLineupTeam === 'home' ? 'bg-primary-600 text-white' : ''}`}
                >
                  Alineación {homeTeam.name}
                </button>
                <button
                  onClick={() => setShowLineupTeam(showLineupTeam === 'away' ? null : 'away')}
                  className={`btn-outline px-4 py-2 ${showLineupTeam === 'away' ? 'bg-primary-600 text-white' : ''}`}
                >
                  Alineación {awayTeam.name}
                </button>
              </div>

              {showLineupTeam && match.lineups && (
                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4 max-w-2xl mx-auto">
                  <h4 className="font-semibold mb-2 text-center">
                    Alineación {showLineupTeam === 'home' ? homeTeam.name : awayTeam.name}
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    {(showLineupTeam === 'home' ? match.lineups.home : match.lineups.away).map((player, idx) => (
                      <li key={idx}>
                        <span className="font-medium">{player.name}</span> – <span className="text-sm italic text-gray-500">{player.position}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
