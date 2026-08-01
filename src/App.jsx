import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ComparePanel from './components/ComparePanel';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import Mess from './pages/Mess';
import Nearby from './pages/Nearby';
import RoommateFinder from './pages/RoommateFinder';
import Community from './pages/Community';
import Compare from './pages/Compare';
import LoginRegister from './pages/LoginRegister';
import Profile from './pages/Profile';
import OwnerDashboard from './pages/OwnerDashboard';
import MessDashboard from './pages/MessDashboard';
import SeekerDashboard from './pages/SeekerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import AdminPanel from './pages/AdminPanel';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import './App.css';

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300">
          
          {/* Main Sticky Navigation */}
          <Navbar />
          
          {/* Main viewport area */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<RoomDetails />} />
              
              {/* /pgs shares Rooms listing filter page */}
              <Route path="/pgs" element={<Rooms />} />
              
              <Route path="/messes" element={<Mess />} />
              <Route path="/nearby" element={<Nearby />} />
              <Route path="/roommates" element={<RoommateFinder />} />
              <Route path="/community" element={<Community />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/seeker-dashboard" element={<SeekerDashboard />} />
              <Route path="/provider-dashboard" element={<ProviderDashboard />} />
              <Route path="/owner-dashboard" element={<ProviderDashboard />} />
              <Route path="/mess-dashboard" element={<ProviderDashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Fallback route handles 404s */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Core bottom elements */}
          <Footer />
          <Chatbot />
          <ComparePanel />

        </div>
      </HashRouter>
    </AppProvider>
  );
}
