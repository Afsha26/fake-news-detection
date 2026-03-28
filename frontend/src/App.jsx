import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./Pages/Home"

// ----------------------------------------------------------------------
// ProtectedRoute Component: Ensures only logged-in users access the component
// ----------------------------------------------------------------------
const ProtectedRoute = ({ element: Element, isLoggedIn, onLogout }) => {
    // If logged in, render the Element (Home), passing the auth props down.
    // If not logged in, redirect to /Login.
    return isLoggedIn 
        ? <Element isLoggedIn={isLoggedIn} onLogout={onLogout} /> 
        : <Navigate to="/Login" replace />;
};

// ----------------------------------------------------------------------
// Main App Component
// ----------------------------------------------------------------------
function App() {
    // State initialization: Check localStorage for persistent login status
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Reads from localStorage to maintain login status across refreshes
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    // Effect to persist state to localStorage whenever isLoggedIn changes
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    // Function passed to the Login component on successful login
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    // Function passed to Home/Header component on logout button click
    const handleLogout = async () => {
        try {
            // 1. Call the Flask logout endpoint to clear the server session
            await fetch('http://localhost:5000/api/logout', {
                method: 'POST',
                // Crucial: ensures the session cookie is sent for Flask to clear the session
                credentials: 'include' 
            });

            // 2. Clear client-side state
            setIsLoggedIn(false);
            
            // Note: Redirection to /Login happens in the Header component after this.

        } catch (error) {
            console.error("Logout failed on API call:", error);
            // Even if API fails (e.g., server down), clear client state
            setIsLoggedIn(false); 
        }
    };

    return (
        <Router>
            <Routes>
                {/* Default route redirects based on login status */}
                <Route path="/" element={<Navigate to={isLoggedIn ? "/Home" : "/Login"} replace />} /> 
                
                {/* Public Routes */}
                <Route path="/SignUp" element={<SignUp />} />
                <Route 
                    path="/Login" 
                    // Pass the login handler to the Login component
                    element={<Login onLogin={handleLogin} />} 
                />
                
                {/* Protected Route */}
                <Route 
                    path="/Home" 
                    element={<ProtectedRoute 
                                element={Home} 
                                isLoggedIn={isLoggedIn} 
                                onLogout={handleLogout} // Pass the new logout handler
                            />} 
                />
            </Routes>
        </Router>
    );
}

export default App;
