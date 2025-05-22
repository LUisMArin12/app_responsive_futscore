import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { Team } from '../../data/teams';

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <Link to={`/team/${team.id}`} className="block">
      <div 
        className="card hover:shadow-lg transition-all duration-300 overflow-hidden"
        style={{ 
          borderTop: `4px solid ${team.primaryColor}`,
          borderBottom: `4px solid ${team.secundaryColor}`
        }}
      >
        <div className="h-40 overflow-hidden">
          <img 
            src={team.logo} 
            alt={`${team.name} logo`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-lg md:text-xl font-bold mb-2">{team.name}</h3>
          
          <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span>{team.country} - {team.league}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>Fundado: {team.foundedYear}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <span 
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
              style={{ 
                backgroundColor: team.primaryColor,
                color: '#ffffff',
              }}
            >
              Ver Equipo
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;