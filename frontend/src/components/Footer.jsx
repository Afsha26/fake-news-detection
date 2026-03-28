import React from 'react';

const VARS = {
    primary500: 'var(--primary-500)',
    neutral100: 'var(--neutral-100)',
    neutral400: 'var(--neutral-400)',
    neutral800: 'var(--neutral-800)',
};

const Footer = () => {
    return (
        <footer className={`bg-[${VARS.neutral100}]`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center gap-6 mb-4 md:mb-0">
                        <a 
                            className={`text-sm font-medium text-[${VARS.neutral800}] hover:text-[${VARS.primary500}] transition-colors`} 
                            href="#"
                        >
                            Terms of Service
                        </a>
                        <a 
                            className={`text-sm font-medium text-[${VARS.neutral800}] hover:text-[${VARS.primary500}] transition-colors`} 
                            href="#"
                        >
                            Privacy Policy
                        </a>
                        <a 
                            className={`text-sm font-medium text-[${VARS.neutral800}] hover:text-[${VARS.primary500}] transition-colors`} 
                            href="#"
                        >
                            Contact Us
                        </a>
                    </div>
                    <p className={`text-sm text-[${VARS.neutral400}]`}>© 2024 TruthCheck. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;