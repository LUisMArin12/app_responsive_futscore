import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TrendingUp, Trophy, List } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import MatchCard from '../components/common/MatchCard';
import StandingsTable from '../components/common/StandingsTable';

const Results: React.FC = () => {
  const location = useLocation();
  const { matches } = useAppContext();
  const [activeTab, setActiveTab] = useState<'results' | 'standings'>('results');

  const completedMatches = matches
    .filter(match => match.status === 'completed')
    .sort((a, b) => new Date(b.date + 'T' + b.time).getTime() - new Date(a.date + 'T' + a.time).getTime());

  const params = new URLSearchParams(location.search);
  const highlightedMatchId = params.get('matchId');
  const highlightedMatch = highlightedMatchId
    ? matches.find(m => m.id === highlightedMatchId)
    : null;

  return (
    <div className="pb-16 md:pb-0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <TrendingUp size={24} className="mr-2 text-primary-600 dark:text-primary-400" />
          Resultados del torneo
        </h1>

        <div className="flex border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 flex items-center transition-colors duration-300 ${
              activeTab === 'results'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <List size={18} className="mr-2" />
            <span>Resultados</span>
          </button>
          <button
            onClick={() => setActiveTab('standings')}
            className={`px-4 py-2 flex items-center transition-colors duration-300 ${
              activeTab === 'standings'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Trophy size={18} className="mr-2" />
            <span>Clasificación</span>
          </button>
        </div>
      </div>

      {activeTab === 'results' ? (
        <div>
          {/* Partido destacado */}
          {highlightedMatch && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-primary-600 dark:text-primary-400">
                <TrendingUp className="mr-2" size={20} />
                Lo más destacado del partido
              </h2>

              <div className="bg-gradient-to-r from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg border border-primary-100 dark:border-gray-700">
                <MatchCard match={highlightedMatch} showActions={false} />

                {highlightedMatch.highlights && (
                  <div className="mt-6">
                    <p className="text-lg text-gray-800 dark:text-gray-200 font-medium mb-4">
                      {highlightedMatch.highlights.summary}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <strong>Disparos</strong>
                        <p>{highlightedMatch.highlights.stats.shots.home} - {highlightedMatch.highlights.stats.shots.away}</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <strong>Posesión</strong>
                        <p>{highlightedMatch.highlights.stats.possession.home}% - {highlightedMatch.highlights.stats.possession.away}%</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <strong>Córners</strong>
                        <p>{highlightedMatch.highlights.stats.corners.home} - {highlightedMatch.highlights.stats.corners.away}</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <strong>Faltas</strong>
                        <p>{highlightedMatch.highlights.stats.fouls.home} - {highlightedMatch.highlights.stats.fouls.away}</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <strong>Tarjetas Amarillas</strong>
                        <p>{highlightedMatch.highlights.stats.yellowCards.home} - {highlightedMatch.highlights.stats.yellowCards.away}</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <strong>Tarjetas Rojas</strong>
                        <p>{highlightedMatch.highlights.stats.redCards.home} - {highlightedMatch.highlights.stats.redCards.away}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Partidos completados */}
          <h2 className="text-xl font-semibold mb-4">Partidos completados</h2>
          {completedMatches.length > 0 ? (
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedMatches.map(match => (
                    <MatchCard key={match.id} match={match} />
                  ))}
              </div>
            </div>
              ) : (

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Aún no hay partidas completadas. ¡Vuelve pronto!
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Clasificación del torneo</h2>
          <StandingsTable />
        </div>
      )}
    </div>
  );
};

export default Results;
