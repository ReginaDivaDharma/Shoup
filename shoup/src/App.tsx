// import React from 'react';
// import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './assets/dashboard/navbar';

import HomepageDashboard from './components/dashboard/homepage/homepageDashboard';
import GalleryDashboard from './components/dashboard/gallery/galleryDashboard';
import LoginDashboard from "./components/dashboard/login/loginDashboard";


function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/" element={<HomepageDashboard />} />
        <Route path="/login" element={<LoginDashboard />} />
        <Route path="/gallery" element={<GalleryDashboard />} />
    </Routes>

    </BrowserRouter>
  );
}

export default App;
