import React, { useState } from 'react';

const HouseReport = ({ data }) => {
    console.log('HouseReport', data);
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
                        <div key={key} onClick={() => handleReportClick(data[key])} className={`cursor-pointer border border-primary text-sm px-4 py-2 rounded-md hover:bg-primary hover:text-white transition ${selectedReport.planet === data[key].planet && 'bg-primary text-white'}`}>{data[key].planet} House</div>
                    ))}
                </div>

                {selectedReport && (
                    <div className="p-4 pt-10 rounded-md">
                        <h2 className="text-xl font-semibold mb-2 text-center">{selectedReport.planet}</h2>
                        <p>{selectedReport.house_report}</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default HouseReport;