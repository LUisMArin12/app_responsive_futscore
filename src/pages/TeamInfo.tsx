import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, Trophy } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const TeamInfo: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { teams, matches } = useAppContext();
  const [teamMatches, setTeamMatches] = useState<typeof matches>([]);
  
  const team = teams.find(t => t.id === teamId);
  
  useEffect(() => {
    if (teamId) {
      // Get all matches for this team
      const filteredMatches = matches.filter(
        match => match.homeTeamId === teamId || match.awayTeamId === teamId
      );
      
      // Sort by date
      filteredMatches.sort((a, b) => {
        return new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime();
      });
      
      setTeamMatches(filteredMatches);
    }
  }, [teamId, matches]);
  
  if (!team) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg text-gray-600 dark:text-gray-400">Equipo no encontrado.</p>
        <Link to="/" className="mt-4 btn-primary">
         Volver a la página de inicio
        </Link>
      </div>
    );
  }
  
  // Calculate team statistics
  const calculateStats = () => {
    const completedMatches = teamMatches.filter(match => match.status === 'completed');
    
    let wins = 0;
    let draws = 0;
    let losses = 0;
    let goalsScored = 0;
    let goalsConceded = 0;
    
    completedMatches.forEach(match => {
      if (match.homeScore === undefined || match.awayScore === undefined) return;
      
      // For home matches
      if (match.homeTeamId === teamId) {
        if (match.homeScore > match.awayScore) wins++;
        else if (match.homeScore < match.awayScore) losses++;
        else draws++;
        
        goalsScored += match.homeScore;
        goalsConceded += match.awayScore;
      }
      // For away matches
      else {
        if (match.awayScore > match.homeScore) wins++;
        else if (match.awayScore < match.homeScore) losses++;
        else draws++;
        
        goalsScored += match.awayScore;
        goalsConceded += match.homeScore;
      }
    });
    
    return {
      played: completedMatches.length,
      wins,
      draws,
      losses,
      goalsScored,
      goalsConceded
    };
  };
  
  const stats = calculateStats();

  return (
    <div className="pb-16 md:pb-0">
      <Link to="/" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-6">
        <ArrowLeft size={20} className="mr-1" />
       Regresar al torneo
      </Link>
      
      {/* Team Header */}
      <div 
        className="relative rounded-lg overflow-hidden mb-8 bg-gradient-to-r from-gray-900 to-gray-800"
        style={{ 
          backgroundImage: `linear-gradient(to right, ${team.primaryColor}dd, ${team.secundaryColor}dd)`,
        }}
      >
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center text-white">
          {/* Team Logo */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white p-1 shadow-lg mb-4 md:mb-0 md:mr-6">
            <img 
              src={team.logo} 
              alt={`${team.name} logo`}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          
          {/* Team Info */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-shadow">{team.name}</h1>
            <div className="flex flex-col md:flex-row md:items-center text-sm md:text-base opacity-90 mb-2">
              <div className="flex items-center justify-center md:justify-start">
                <MapPin size={16} className="mr-1" />
                <span>{team.country}</span>
              </div>
              <span className="hidden md:block mx-2">•</span>
              <span>{team.league}</span>
              <span className="hidden md:block mx-2">•</span>
              <div className="flex items-center justify-center md:justify-start">
                <Calendar size={16} className="mr-1" />
                <span>Est. {team.foundedYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Description */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Acerca de {team.name}</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              {team.description}
            </p>
            
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Users size={20} className="mr-2 text-primary-600 dark:text-primary-400" />
              <span>Estadio local: {team.stadium}</span>
            </div>
          </div>
          
          {/* Team Matches */}
          <div className="card p-6 mt-6">
            <h2 className="text-xl font-bold mb-4">Partidos del torneo</h2>
            
            {teamMatches.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {teamMatches.map(match => {
                  const isHome = match.homeTeamId === teamId;
                  const opponentId = isHome ? match.awayTeamId : match.homeTeamId;
                  const opponent = teams.find(t => t.id === opponentId);
                  
                  return (
                    <div key={match.id} className="py-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center">
                            <span className={`mr-2 font-semibold ${isHome ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                              {isHome ? 'vs' : '@'}
                            </span>
                            <Link to={`/team/${opponentId}`} className="font-medium hover:underline">
                              {opponent?.name}
                            </Link>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {match.date} • {match.time} • {match.tournamentStage}
                          </div>
                        </div>
                        
                        <div>
                          {match.status === 'completed' ? (
                            <div className="font-bold text-lg">
                              {isHome ? match.homeScore : match.awayScore} - {isHome ? match.awayScore : match.homeScore}
                            </div>
                          ) : (
                            <Link 
                              to={match.status === 'scheduled' ? `/reservations?matchId=${match.id}` : `/schedules`}
                              className={`btn ${match.status === 'scheduled' ? 'btn-primary' : 'btn-secondary'} text-sm py-1`}
                            >
                              {match.status === 'scheduled' ? 'Reserve' : 'Details'}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
              Aún no hay partidos programados para este equipo.
              </p>
            )}
          </div>
        </div>
        
        {/* Team Stats */}
        <div className="lg:col-span-1">
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Trophy size={20} className="mr-2 text-primary-600 dark:text-primary-400" />
              Estadísticas del torneo
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.played}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Juegos</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.wins}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Ganados</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{stats.draws}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Empatados</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.losses}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Perdidos</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold">{stats.goalsScored}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Goles a favor</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold">{stats.goalsConceded}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Goles encontra</div>
              </div>
            </div>
            
            {/* Tournament Progress */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Progreso del torneo</h3>
              <div className="relative pt-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-primary-600">
                      Fase de grupos
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block">
                      Final
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mt-1 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                  <div
                    style={{ width: "35%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Team Colors */}
          <div className="card p-6">
            <h3 className="font-semibold mb-3">Colores del equipo</h3>
            <div className="flex space-x-2">
              <div 
                className="w-12 h-12 rounded-md"
                style={{ backgroundColor: team.primaryColor }}
                title="Primary Color"
              ></div>
              <div 
                className="w-12 h-12 rounded-md"
                style={{ backgroundColor: team.secundaryColor }}
                title="Secondary Color"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;