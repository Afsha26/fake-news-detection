import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../components/Header';
import Hero from '../components/Hero.jsx';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';

// Define the custom variables from your CSS for consistency
const VARS = {
  neutral50: 'var(--neutral-50)',
  neutral800: 'var(--neutral-800)',
};

// ACCEPT PROPS HERE
function Home({ isLoggedIn, onLogout }) {
  const [articleLink, setArticleLink] = useState('');
  // State to hold the result: { type: 'loading'|'error'|'success'|'fake', message: string, isFake: boolean }
  const [result, setResult] = useState(null); 
  const [randomNews, setRandomNews] = useState([]);
  // Initialize useNavigate hook
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!articleLink.trim()) {
      setResult({ type: 'error', message: 'Please paste an article text to verify.', isFake: null });
      return;
    }

    // 1. Show Loading State
    setResult({ type: 'loading', message: 'Verifying... Please wait.', isFake: null });

    try {
        // --- REAL API CALL TO FLASK /predict ---
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // *** CRITICAL FIX: credentials must be a top-level option, not in headers ***
            credentials: 'include', 
            body: JSON.stringify({ text: articleLink }),
        });

        // Handle Authentication Failure (if the cookie was rejected)
        if (response.status === 401) {
            // Assuming onLogout handles clearing client state (isLoggedIn)
            // and the app's main router handles the redirect based on isLoggedIn state change.
            if(onLogout) {
                await onLogout(); // Clear client state
            }
            // Explicitly redirect in case state change is too slow
            navigate('/login');
            return; // Stop execution
        }
        
        const data = await response.json();

        // Handle successful prediction
        if (response.ok) {

            const prediction = data.prediction;

            const isFake = (prediction === "Fake");
            const resultType = isFake ? 'fake' : 'success';

            setResult({
            type: resultType,
            message: `Prediction: ${prediction}`,
            isFake: isFake,
});
        } else {
            // Handle other server errors (e.g., Models not loaded - 500)
            setResult({
                type: 'error',
                message: data.error || 'Server error occurred during prediction.',
                isFake: null,
            });
        }

    } catch (error) {
      console.error('Network Error:', error);
      setResult({
        type: 'error',
        message: 'Failed to connect to the server. Check your Flask server.',
        isFake: null,
      });
    }
  };
  const fetchRandomNews = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/random-news");
    const data = await response.json();
    setRandomNews(data);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

  return (
    <div 
      className={`flex min-h-screen flex-col bg-[${VARS.neutral50}] text-[${VARS.neutral800}]`}
    >
      {/* PASS PROPS TO HEADER */}
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} /> 
      <main className="flex-grow">
        <Hero 
          articleLink={articleLink}
          setArticleLink={setArticleLink}
          handleSubmit={handleSubmit}
          result={result}
        />
        <div className="text-center mt-8">
          <button
            onClick={fetchRandomNews}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Show News
          </button>
        </div>
        {randomNews.length > 0 && (
          <div className="mt-8 px-10">
            <table className="border border-gray-300 w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Prediction</th>
                </tr>
              </thead>

              <tbody>
                {randomNews.map((news, index) => (
                  <tr key={index}>
                    <td className="border p-2">{news.title}</td>
                    <td className="border p-2 font-bold">{news.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <HowItWorks />
      </main>
      <Footer />
    </div>
    
  );
}

export default Home;
