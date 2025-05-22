import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { teams } from '../data/teams';
import { matches } from '../data/matches';
import { venues } from '../data/venues';

interface AppContextType {
  teams: typeof teams;
  matches: typeof matches;
  venues: typeof venues;
  reservations: Reservation[];
  addReservation: (reservation: Reservation) => void;
}

interface Reservation {
  id: string;
  matchId: string;
  name: string;
  email: string;
  seats: number;
  createdAt: Date;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const savedReservations = localStorage.getItem('reservations');
    return savedReservations ? JSON.parse(savedReservations) : [];
  });

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = (reservation: Reservation) => {
    setReservations((prev) => [
      ...prev,
      { ...reservation, id: crypto.randomUUID(), createdAt: new Date() },
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        teams,
        matches,
        venues,
        reservations,
        addReservation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
