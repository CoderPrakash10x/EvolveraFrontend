import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/utility/PageLoader";

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import GalleryHome from "./pages/GalleryHome";
import GalleryEvent from "./pages/GalleryEvent";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import EventDetails from "./pages/EventDetails";
import Scrolltotop from './components/Scrolltotop';

/* ================= ROUTE ANIMATION WRAPPER ================= */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
    

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/gallery" element={<GalleryHome />} />
        <Route path="/gallery/:slug" element={<GalleryEvent />} />

        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    
    </AnimatePresence>
  );
}

/* ================= MAIN APP ================= */
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  /* ===== Splash Screen ===== */
  if (loading) return <PageLoader />;

  return (
    <Router>
              <Scrolltotop/>
      {/* FULL APP WRAPPER */}
      <div className="min-h-screen bg-black flex flex-col overflow-x-hidden">
        
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
