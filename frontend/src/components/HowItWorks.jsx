import React from 'react';

const VARS = {
    primary500: 'var(--primary-500)',
    primary100: 'var(--primary-100)',
    neutral800: 'var(--neutral-800)',
    neutral900: 'var(--neutral-900)',
};

const HowItWorksCard = ({ icon, title, description }) => (
    <div className="text-center">
        <div 
            className={`flex items-center justify-center h-16 w-16 rounded-full bg-[${VARS.primary100}] text-[${VARS.primary500}] mx-auto mb-4`}
        >
            {/* Material Symbols Icon */}
            <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <h3 className={`text-xl font-bold text-[${VARS.neutral900}] mb-2`}>{title}</h3>
        <p className={`text-base text-[${VARS.neutral800}]`}>{description}</p>
    </div>
);

const HowItWorks = () => {
    return (
        <section className="bg-white py-20 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className={`text-3xl md:text-4xl font-bold text-[${VARS.neutral900}]`}>How It Works</h2>
                    <p className={`mt-4 text-lg text-[${VARS.neutral800}]`}>
                        A simple three-step process to truth.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <HowItWorksCard
                        icon="content_paste"
                        title="1. Paste Text"
                        description="Copy the text of the news article you want to check and paste it into the search bar above."
                    />
                    <HowItWorksCard
                        icon="insights"
                        title="2. Analyze"
                        description="Our system analyzes the article's source, content, and cross-references it with a vast database."
                    />
                    <HowItWorksCard
                        icon="verified"
                        title="3. Get Verified"
                        description="Receive a comprehensive credibility report, empowering you to make informed decisions."
                    />
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;