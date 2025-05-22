import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { format, parseISO, isToday, isTomorrow, isYesterday, isThisWeek, isAfter } from 'date-fns';
import { Filter, CalendarRange } from 'lucide-react';
import MatchCard from '../components/common/MatchCard';

interface FilterOptions {
  status: 'all' | 'scheduled' | 'live' | 'completed';
  timeframe: 'all' | 'today' | 'tomorrow' | 'thisWeek' | 'upcoming';
  team: string;
}

const Schedules: React.FC = () => {
  const { matches, teams } = useAppContext();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: 'all',
    timeframe: 'all',
    team: 'all',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [groupedMatches, setGroupedMatches] = useState<Record<string, typeof matches>>({});

  // Apply filters and group matches by date
  useEffect(() => {
    const filteredMatches = matches.filter(match => {
      const matchDate = parseISO(match.date);
      
      // Status filter
      if (filterOptions.status !== 'all' && match.status !== filterOptions.status) {
        return false;
      }
      
      // Timeframe filter
      if (filterOptions.timeframe === 'today' && !isToday(matchDate)) {
        return false;
      }
      if (filterOptions.timeframe === 'tomorrow' && !isTomorrow(matchDate)) {
        return false;
      }
      if (filterOptions.timeframe === 'thisWeek' && (!isThisWeek(matchDate) || isToday(matchDate) || isTomorrow(matchDate))) {
        return false;
      }
      if (filterOptions.timeframe === 'upcoming' && !isAfter(matchDate, new Date())) {
        return false;
      }
      
      // Team filter
      if (filterOptions.team !== 'all' && match.homeTeamId !== filterOptions.team && match.awayTeamId !== filterOptions.team) {
        return false;
      }
      
      return true;
    });
    
    // Group by date
    const grouped: Record<string, typeof matches> = {};
    filteredMatches.forEach(match => {
      const dateKey = match.date;
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(match);
    });
    
    // Sort dates
    const sortedGrouped: Record<string, typeof matches> = {};
    Object.keys(grouped)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .forEach(key => {
        sortedGrouped[key] = grouped[key];
      });
    
    setGroupedMatches(sortedGrouped);
  }, [matches, filterOptions]);

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    setFilterOptions(prev => ({ ...prev, [field]: value }));
  };

  const formatDateHeader = (dateStr: string) => {
    const date = parseISO(dateStr);
    
    if (isToday(date)) {
      return 'Today';
    } else if (isTomorrow(date)) {
      return 'Tomorrow';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    }
    
    return format(date, 'EEEE, MMMM d, yyyy');
  };

  return (
    <div className="pb-16 md:pb-0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <CalendarRange size={24} className="mr-2" />
          Horarios de partidos
        </h1>
        
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="btn-outline flex items-center"
        >
          <Filter size={18} className="mr-2" />
          <span>Filtrar</span>
        </button>
      </div>
      
      {/* Filters */}
      {isFilterOpen && (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Estado del partido
              </label>
              <select 
                className="input"
                value={filterOptions.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="scheduled">Programado</option>
                <option value="live">En vivo</option>
                <option value="completed">Completadp</option>
              </select>
            </div>
            
            {/* Timeframe Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Periodo de tiempo
              </label>
              <select 
                className="input"
                value={filterOptions.timeframe}
                onChange={(e) => handleFilterChange('timeframe', e.target.value)}
              >
                <option value="all">Todas las fechas</option>
                <option value="today">Hoy</option>
                <option value="tomorrow">Mañana</option>
                <option value="thisWeek">Esta semana</option>
                <option value="upcoming">Próximo</option>
              </select>
            </div>
            
            {/* Team Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Equipo
              </label>
              <select 
                className="input"
                value={filterOptions.team}
                onChange={(e) => handleFilterChange('team', e.target.value)}
              >
                <option value="all">All Teams</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
      
      {/* Match List */}
      {Object.keys(groupedMatches).length > 0 ? (
        Object.entries(groupedMatches).map(([date, dateMatches]) => (
          <div key={date} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 pl-2 border-l-4 border-primary-500">
              {formatDateHeader(date)}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dateMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No se encontraron coincidencias para los filtros seleccionados. Pruebe con otras opciones de filtro.
          </p>
        </div>
      )}
    </div>
  );
};

export default Schedules;