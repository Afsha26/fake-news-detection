import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const VARS = {
  primary500: 'var(--primary-500, #3B82F6)', // Added default values for clarity
  primary600: 'var(--primary-600, #2563EB)', // Added default values
  red500: 'var(--red-500, #EF4444)', // Added red styles for logout
  red600: 'var(--red-600, #DC2626)',
  neutral800: 'var(--neutral-800)',
  neutral900: 'var(--neutral-900)',
  
  neutral100: 'var(--neutral-100)',
};

const TruthCheckLogo = () => (
  <svg 
    className={`h-8 w-8 text-[${VARS.primary500}]`} 
    fill="none" 
    viewBox="0 0 48 48" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
  </svg>
);

// ACCEPT isLoggedIn and onLogout PROPS
// In Header.jsx

// ... (VARS and TruthCheckLogo remain the same) ...

// ACCEPT isLoggedIn and onLogout props
const Header = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        await onLogout(); 
        navigate('/Login'); 
    };
    
    // Conditional Button Rendering
    const AuthButton = () => {
        if (isLoggedIn) {
            return (
                <button 
                    onClick={handleLogoutClick}
                    // *** FIX HERE: Using standard Tailwind classes for clear visibility (light background, black text) ***
                    className={`flex min-w-[96px] items-center justify-center rounded-md h-10 px-5 
                                bg-gray-100 text-base font-bold shadow-sm border border-gray-300 
                                text-gray-900 hover:bg-gray-200 transition-colors 
                                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900`}
                >
                    {/* The text is now explicitly set to black/dark gray */}
                    <span>Log Out</span>
                </button>
            );
        } else {
            // Sign Up button remains the same (blue background, white text)
            return (
                <Link 
                    to="/SignUp" 
                    className={`flex min-w-[96px] items-center justify-center rounded-md h-10 px-5 bg-[${VARS.primary500}] text-white text-base font-bold shadow-sm hover:bg-[${VARS.primary600}] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[${VARS.primary500}]`}
                >
                    <span>Sign Up</span>
                </Link>
            );
        }
    };

// ... (rest of the component's return statement remains the same) ...

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3">
          <TruthCheckLogo />
          {/* Link to Home/Login */}
          <Link to={isLoggedIn ? "/Home" : "/Login"} className={`text-2xl font-bold text-[${VARS.neutral900}]`}>
               TruthCheck
           </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
            {/* Convert all 'a' tags to 'Link' tags and use router paths */}
          <Link className={`text-base font-medium text-[${VARS.neutral800}] hover:text-[${VARS.primary500}] transition-colors`} to="/Home">Home</Link>
          <Link className={`text-base font-medium text-[${VARS.neutral800}] hover:text-[${VARS.primary500}] transition-colors`} to="/About">About</Link>
          <Link className={`text-base font-medium text-[${VARS.neutral800}] hover:text-[${VARS.primary500}] transition-colors`} to="/Contact">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <AuthButton /> {/* Render the conditional button */}
          <button className={`md:hidden p-2 rounded-md text-[${VARS.neutral800}] hover:bg-[${VARS.neutral100}]`}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
