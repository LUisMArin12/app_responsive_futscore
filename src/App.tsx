import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import Schedules from './pages/Schedules';
import Reservations from './pages/Reservations';
import Results from './pages/Results';
import TeamInfo from './pages/TeamInfo';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close sidebar when changing routes
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen flex flex-col`}>
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/schedules" element={<Schedules />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/results" element={<Results />} />
              <Route path="/team/:teamId" element={<TeamInfo />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;