import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Gallery from "./components/sections/Gallery";
import Amenities from "./components/sections/Amenities";
import Location from "./components/sections/Location";
import Contact from "./components/sections/Contact";
import Reviews from "./components/sections/Reviews";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function MainContent() {
  useEffect(() => {
    document.title = "A Carpinteira - Lake House in Castelo de Bode";
    window.scrollTo(0, 0); // Scroll to top on refresh
  }, []);

  return (
    <div className="font-body text-brown-800 bg-cream-50 overflow-x-hidden">
      <Header />
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Hero />
          <About />
          <Gallery />
          <Amenities />
          <Location />
          <Reviews />
          <Contact />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
