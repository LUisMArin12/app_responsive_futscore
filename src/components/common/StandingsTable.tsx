import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

interface TeamStanding {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

const StandingsTable: React.FC = () => {
  const { teams, matches } = useAppContext();
  
  // Calculate standings based on completed matches 
  const calculateStandings = (): TeamStanding[] => {
    const standings: Record<string, TeamStanding> = {};
    
    // Initialize standings for all teams
    teams.forEach(team => {
      standings[team.id] = {
        teamId: team.id,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0
      };
    });

    //Proceso de Partidos Completados 
    matches.filter(match => match.status === 'completed' && match.homeScore !== undefined && match.awayScore !== undefined).forEach(match => {
        const homeTeam = standings[match.homeTeamId];
        const awayTeam = standings[match.awayTeamId];
        if (homeTeam && awayTeam) {
            //Actualizar las estadisticas del equipo local
            homeTeam.played += 1;
            homeTeam.goalsFor += match.homeScore!
            homeTeam.goalsAgainst += match.awayScore!;

            //Actualizar las estadisticas del equipo visitante
            awayTeam.played += 1;
            homeTeam.goalsFor += match.homeScore!;
            homeTeam.goalsAgainst += match.awayScore!;

            //Determina los resultados de los partidos
            if (match.homeScore! > match.awayScore!) {
                //El equipo local gano
                homeTeam.won += 1;
                homeTeam.points += 3;
                awayTeam.lost += 1;
            }else if (match.homeScore! < match.awayScore!) {
                //El equipo visitante Gano
                awayTeam.won += 1;
                awayTeam.points+= 3;
                homeTeam.lost += 1;
            } else {
                //Empate
                homeTeam.drawn += 1;
                awayTeam.points += 1;
                awayTeam.drawn += 1;
                awayTeam.points += 1;
            }

        }
    });
    //convert to array and sort
    return Object.values(standings).sort((a, b) => {
        //sort by points (descending)
        if (a.points !== b.points) {
            return b.points - a.points
        }
        //Si los puntos son iguales, por diferencia de goles 
        const goalDiffA = a.goalsFor - a.goalsAgainst;
        const goalDiffB = b.goalsFor - b.goalsAgainst;

        if (goalDiffA !== goalDiffB){
            return goalDiffB - goalDiffA;
        }
        //si la diferencia de goles es igual entonces por goles metidos
        return b.goalsFor - a.goalsFor;
    });
};
const standings = calculateStandings();

return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs md:text-sm uppercase">
            <th className="py-3 px-4 text-left">Pos</th>
            <th className="py-3 px-4 text-left">Team</th>
            <th className="py-3 px-2 text-center">P</th>
            <th className="py-3 px-2 text-center">W</th>
            <th className="py-3 px-2 text-center">D</th>
            <th className="py-3 px-2 text-center">L</th>
            <th className="py-3 px-2 text-center">GF</th>
            <th className="py-3 px-2 text-center">GA</th>
            <th className="py-3 px-2 text-center">GD</th>
            <th className="py-3 px-2 text-center">Pts</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {standings.map((standing, index) => {
            const team = teams.find(t => t.id === standing.teamId);
            if (!team) return null;
            
            const goalDiff = standing.goalsFor - standing.goalsAgainst;
            const goalDiffClass = goalDiff > 0 ? 'text-green-600 dark:text-green-400' : 
                                goalDiff < 0 ? 'text-red-600 dark:text-red-400' : '';
            
            return (
              <tr 
                key={team.id} 
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
              >
                <td className="py-3 px-4 text-left">{index + 1}</td>
                <td className="py-3 px-4 text-left">
                  <Link to={`/team/${team.id}`} className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-medium hover:underline">{team.name}</span>
                  </Link>
                </td>
                <td className="py-3 px-2 text-center">{standing.played}</td>
                <td className="py-3 px-2 text-center">{standing.won}</td>
                <td className="py-3 px-2 text-center">{standing.drawn}</td>
                <td className="py-3 px-2 text-center">{standing.lost}</td>
                <td className="py-3 px-2 text-center">{standing.goalsFor}</td>
                <td className="py-3 px-2 text-center">{standing.goalsAgainst}</td>
                <td className={`py-3 px-2 text-center font-medium ${goalDiffClass}`}>
                  {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                </td>
                <td className="py-3 px-2 text-center font-bold">{standing.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;