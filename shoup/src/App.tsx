import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './assets/dashboard/navbar';

import HomepageDashboard from './components/dashboard/homepage/homepageDashboard';
import GalleryDashboard from './components/dashboard/gallery/galleryDashboard';
import LoginDashboard from "./components/dashboard/login/loginDashboard";
import ManageGallery from "./components/dashboard/manageGallery/manageGallery";


function App() {
  return (
    <BrowserRouter>
    <Navbar 
        
    />
    <Routes>
        <Route path="/" element={<HomepageDashboard />} />
        <Route path="/login" element={<LoginDashboard />} />
        <Route path="/gallery" element={<GalleryDashboard />} />
        <Route path="/managegallery" element={<ManageGallery />} />
    </Routes>

    </BrowserRouter>
  );
}

export default App;
