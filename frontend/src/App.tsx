import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Workspace from "./components/Workspace";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import Signup from "./components/Signup";
import "./App.css";
import { useState } from "react";
import AuthModal from "./components/AuthModal";

function App() {
  // Temporary login state - replace with your actual auth logic
  const isLoggedIn = false;
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    
    <div className="app-container">
      <nav className="navbar">
        <Link to="/" className="logo">
          QuizTube
        </Link>
        <div className="nav-right">
          {isLoggedIn ? (
            <div className="profile-icon">
              <img src="/default-avatar.svg" alt="Profile" />
            </div>
          ) : (
            // <Link to="/signup" className="signup-button">
            //   Sign Up
            // </Link>
            <button onClick={()=>setShowAuthModal(true)} className="signup-button">
              Sign Up
            </button>
          )}
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workspace/:id" element={<Workspace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </main>
    </div>
  );
}

export default App;
