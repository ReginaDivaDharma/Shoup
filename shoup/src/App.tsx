import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './assets/components/navbar';

import HomepageDashboard from './dashboard/homepage/homepageDashboard';
import GalleryDashboard from './dashboard/gallery/galleryDashboard';
import LoginDashboard from "./dashboard/login/loginDashboard";
import ManageGallery from "./dashboard/manageGallery/manageGallery";


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
