import React, { useState } from 'react';

const Planets = ({ data }) => {
    console.log('Planets', data);

    return (
        <div className="grid grid-cols-1 gap-4">
            {Object.values(data).map(planet => (
                <PlanetDetails key={planet.id} planet={planet} />
            ))}
        </div>
    )
}

const PlanetDetails = ({ planet }) => {
    const { name, fullDegree, normDegree, nakshatra, signLord, nakshatraLord, house, nakshatra_pad, isRetro } = planet;

    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="bg-white mb-4 min-w-[450px]">
            <div className="flex justify-between items-center cursor-pointer  rounded-lg p-4 border border-primary" onClick={toggleDetails}>
                <div className='flex flex-1 gap-4 text-sm'>
                    <div className="basis-[20%] font-bold">{name}</div>
                    <div className="basis-[20%] ">{`${Math.floor(normDegree)}° ${Math.floor((normDegree % 1) * 60)}' ${Math.floor(((normDegree % 1) * 60) % 1 * 60)}"`}</div>
                    <div className="basis-[25%] font-bold">{nakshatra}</div>
                    <div className="basis-[10%] font-bold">{nakshatra_pad}</div>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${showDetails ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showDetails ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                </svg>
            </div>

            {showDetails && (
                <div className="mt-4 text-sm flex flex-wrap justify-center items-center gap-4 max-w-[450px] p-5">
                    <div className='shadow-md rounded-md min-w-[100px] max-w-[100px] min-h-16 flex flex-col justify-center items-center'>
                        <div>Sign Lord</div>
                        <div>{signLord}</div>
                    </div>
                    <div className='shadow-md rounded-md min-w-[100px] max-w-[100px] min-h-16 flex flex-col justify-center items-center'>
                        <div>Nakshatra</div>
                        <div>{nakshatra}</div>
                    </div>
                    <div className='shadow-md rounded-md min-w-[100px] max-w-[100px] min-h-16 flex flex-col justify-center items-center'>
                        <div>Nak.Lord</div>
                        <div>{nakshatraLord}</div>
                    </div>
                    <div className='shadow-md rounded-md min-w-[100px] max-w-[100px] min-h-16 flex flex-col justify-center items-center'>
                        <div>House</div>
                        <div>{house}</div>
                    </div>
                    <div className='shadow-md rounded-md min-w-[100px] max-w-[100px] min-h-16 flex flex-col justify-center items-center'>
                        <div>Nak.Pad</div>
                        <div>{nakshatra_pad}</div>
                    </div>
                    <div className='shadow-md rounded-md min-w-[100px] max-w-[100px] min-h-16 flex flex-col justify-center items-center'>
                        <div>Retro Grade</div>
                        <div>{isRetro ? 'Yes' : 'No'}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Planets;