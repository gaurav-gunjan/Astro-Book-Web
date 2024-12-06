import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TopHeaderSection from '../common/TopHeaderSection';

const NotFound = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0) }, [pathname]);

    return (
        <>
            <TopHeaderSection />

            <div className="flex items-center justify-center py-20 max-md:min-h-96">
                <div className="flex flex-col gap-8 items-center">
                    <h1 className="text-7xl max-md:text-7xl font-extrabold animate-bounce  text-[#F0DF20]">404</h1>
                    <p className="text-2xl max-md:text-lg text-primary">Oops! You are lost.</p>
                    <Link to="/" className="px-8 py-3 bg-white text-primary font-semibold rounded-lg shadow-md hover:bg-primary hover:text-white transition-all duration-500 ease-in">Go Home</Link>
                </div>
            </div>
        </>
    );
};

export default NotFound;