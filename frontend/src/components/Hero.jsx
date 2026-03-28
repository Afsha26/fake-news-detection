import React from 'react';

const VARS = {
  primary500: 'var(--primary-500)',
  primary600: 'var(--primary-600)',
  neutral800: 'var(--neutral-800)',
  neutral900: 'var(--neutral-900)',
  neutral400: 'var(--neutral-400)',
  neutral200: 'var(--neutral-200)',
};

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  const isHidden = result.type === null;
  const isError = result.type === 'error';
  const isFake = result.type === 'fake';
  const isSuccess = result.type === 'success';

  // Conditional Tailwind Classes
  const containerClasses = [
    'max-w-2xl mx-auto mt-8',
    isHidden ? 'hidden' : 'block',
  ].join(' ');

  const boxClasses = [
    'bg-white p-6 rounded-lg shadow-lg border-[var(--neutral-200)] border',
    isError ? 'bg-red-50' : isFake ? 'bg-red-50' : isSuccess ? 'bg-green-50' : '',
  ].join(' ');

  const headingClasses = [
    'text-2xl font-bold mb-4 text-center',
    isError ? 'text-red-600' : isFake ? 'text-red-600' : isSuccess ? 'text-green-600' : `text-[${VARS.neutral900}]`,
  ].join(' ');

  const contentClasses = [
    'text-center text-lg font-bold',
    isError ? 'text-red-600' : isFake ? 'text-red-600' : isSuccess ? 'text-green-600' : `text-[${VARS.neutral800}]`,
  ].join(' ');

  const headingText = isError || result.type === 'loading' ? 'Analysis Status' : 'Analysis Result';
  
  return (
    <div id="result-container" className={containerClasses}>
      <div className={boxClasses}>
        <h3 id="result-heading" className={headingClasses}>{headingText}</h3>
        <div id="result-content" className={contentClasses}>{result.message}</div>
      </div>
    </div>
  );
};

const Hero = ({ articleLink, setArticleLink, handleSubmit, result }) => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className={`text-4xl md:text-6xl font-extrabold text-[${VARS.neutral900}] tracking-tighter mb-6`}>
          Combat Misinformation with a Click
        </h1>
        <p className={`max-w-2xl mx-auto text-lg md:text-xl text-[${VARS.neutral800}] mb-10`}>
          Paste the text of any news article below to instantly check its credibility. Our AI-powered tool helps you separate fact from fiction.
        </p>
        <div className="max-w-2xl mx-auto">
          <form id="prediction-form" className="relative" onSubmit={handleSubmit}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              {/* Material Symbols Icon: link */}
              <span className={`material-symbols-outlined text-[${VARS.neutral400}]`}></span>
            </div>
            <input
              id="article-link-input"
              className={`form-input w-full pl-12 pr-32 py-4 text-base rounded-md border-[${VARS.neutral200}] shadow-sm focus:border-[${VARS.primary500}] focus:ring focus:ring-[${VARS.primary500}] focus:ring-opacity-50 transition`}
              placeholder="Paste article text here..."
              type="text"
              value={articleLink}
              onChange={(e) => setArticleLink(e.target.value)}
            />
            <button
              className={`absolute inset-y-0 right-0 flex items-center justify-center rounded-r-md h-full px-6 bg-[${VARS.primary500}] text-white font-bold text-base hover:bg-[${VARS.primary600}] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[${VARS.primary500}]`}
              type="submit"
            >
              Verify
            </button>
          </form>
          
          <ResultDisplay result={result} />
        </div>
      </div>
    </section>
  );
};

export default Hero;