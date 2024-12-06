import React, { useState } from 'react';

const data = {
    jupiterReports: {
        planet: 'Jupiter',
        rashi_report: 'You desire to expand the world around you with pra…alate and of the lower nature should be observed.'
    },
    marsReports: {
        planet: 'Mars',
        rashi_report: 'Once you set your mind on a goal, your dedication,…ivated. Your tongue may be quite unruly at times.'
    },
    mercuryReports: {
        planet: 'Mercury',
        rashi_report: 'Your mind is connected with your memories, feeling…ntly. Mental focus and control must be developed.'
    },
    moonReports: {
        planet: 'Moon',
        rashi_report: 'You are very sensitive, cautious, and perhaps shy …to learn tolerance and to serve those around you.'
    },
    saturnReports: {
        planet: 'Saturn',
        rashi_report: 'You possess practical common sense, self-disciplin…aggravated if your plans are met with opposition.'
    },
    venusReports: {
        planet: 'Venus',
        rashi_report: 'You are very affectionate and have a strong sense of beauty…'
    }
};

const RashiReport = ({ data }) => {
    console.log('RashiReport', data);
    const [selectedReport, setSelectedReport] = useState(data?.moonReports);

    const handleReportClick = (report) => {
        console.log(report)
        setSelectedReport(report);
    };

    return (
        <>
            <div className="p-4">
                <div className="flex flex-wrap justify-between gap-2 p-5 shadow-md">
                    {Object.keys(data).map((key) => (
                        <div key={key} onClick={() => handleReportClick(data[key])} className={`cursor-pointer border border-primary text-sm px-4 py-2 rounded-md hover:bg-primary hover:text-white transition ${selectedReport.planet === data[key].planet && 'bg-primary text-white'}`}>{data[key].planet} Rashi</div>
                    ))}
                </div>

                {selectedReport && (
                    <div className="p-4 pt-10 rounded-md">
                        <h2 className="text-xl font-semibold mb-2 text-center">{selectedReport.planet}</h2>
                        <p>{selectedReport.rashi_report}</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default RashiReport;