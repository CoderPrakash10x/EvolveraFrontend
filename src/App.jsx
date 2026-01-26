import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

/* ===== PUBLIC ===== */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/utility/PageLoader";
import Scrolltotop from "./components/Scrolltotop";

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import GalleryHome from "./pages/GalleryHome";
import GalleryEvent from "./pages/GalleryEvent";
import Team from "./pages/Team";
import Contact from "./pages/Contact";

/* ===== ADMIN ===== */
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedAdmin from "./pages/admin/ProtectedAdmin";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import EventsAdmin from "./pages/admin/Events";
import CreateEvent from "./pages/admin/CreateEvent";
import RegistrationsHome from "./pages/admin/RegistrationsHome";
import RegistrationsByEvent from "./pages/admin/RegistrationsByEvent";
import GalleryAdmin from "./pages/admin/Gallery";
import TeamAdmin from "./pages/admin/Team";
import CreateGallery from "./pages/admin/CreateGallery";
import CreateTeamMember from "./pages/admin/CreateTeamMember";

/* ================= ROUTES ================= */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/gallery" element={<GalleryHome />} />
        <Route path="/gallery/:slug" element={<GalleryEvent />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />

        {/* ===== ADMIN LOGIN ===== */}
       <Route path="/admin/login" element={<Login />} />

<Route
  path="/admin"
  element={
    <ProtectedAdmin>
      <AdminLayout />
    </ProtectedAdmin>
  }
>
  <Route index element={<Dashboard />} />

  <Route path="events" element={<EventsAdmin />} />
  <Route path="events/create" element={<CreateEvent />} />

  <Route path="registrations" element={<RegistrationsHome />} />
<Route path="registrations/:eventId" element={<RegistrationsByEvent />} />

  <Route path="gallery" element={<GalleryAdmin />} />
  
        <Route path="gallery/create" element={<CreateGallery />} />
  <Route path="team" element={<TeamAdmin />} />
<Route path="team/create" element={<CreateTeamMember />} />
</Route>


      </Routes>
    </AnimatePresence>
  );
}

/* ================= LAYOUT ================= */
function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-black flex flex-col overflow-x-hidden">
      {!isAdmin && <Navbar />}

      <main className="flex-grow">
        <AnimatedRoutes />
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
}

/* ================= APP ================= */
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <Router>
      <Scrolltotop />
      <Layout />
    </Router>
  );
}

export default App;
