import React, { useState } from 'react';
import Navbar from './assets/dashboard/navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomepageDashboard from './components/dashboard/homepage/homepageDashboard';
import GalleryDashboard from './components/dashboard/gallery/galleryDashboard';
import LoginDashboard from "./components/dashboard/login/loginDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomepageDashboard />} />
        <Route path="/login" element={<LoginDashboard />} />
        <Route path="/gallery" element={<GalleryDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
