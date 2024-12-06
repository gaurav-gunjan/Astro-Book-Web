import React, { useState } from 'react';

const AstakVarga = ({ data }) => {
    console.log('AstakVarga', data);

    const [selectedTab, setSelectedTab] = useState('Table');
    const [selectedBody, setSelectedBody] = useState('ascendant'); // Default to 'ascendant'

    const celestialBodies = ['ascendant', 'jupiter', 'mars', 'sun', 'moon', 'mercury', 'venus', 'saturn'];

    const getChartKey = (body) => `${body}chart`;

    return (
        <div className='overflow-x-scroll'>
            <div className='flex gap-4 justify-around mb-5'>
                {celestialBodies.map((body) => (
                    <div key={body}
                        onClick={() => setSelectedBody(body)}
                        className={`text-center py-1 px-5 rounded-md cursor-pointer ${selectedBody === body ? 'bg-primary text-white' : 'border border-primary'}`}
                    >
                        {body.charAt(0).toUpperCase() + body.slice(1)}
                    </div>
                ))}
            </div>
            <div className='flex gap-4 justify-around mb-5'>
                <div onClick={() => setSelectedTab('Table')} className={`text-center py-1 px-5 rounded-md cursor-pointer ${selectedTab === 'Table' ? 'bg-primary text-white' : 'border border-primary'}`}>Table</div>
                <div onClick={() => setSelectedTab('Chart')} className={`text-center py-1 px-5 rounded-md cursor-pointer ${selectedTab === 'Chart' ? 'bg-primary text-white' : 'border border-primary'}`}>Chart</div>
            </div>
            <div className=''>
                <div className='flex flex-col gap-5 p-5'>
                    <div>Type : {data[`${selectedBody}Reports`]?.ashtak_varga?.type}</div>
                    <div className='flex  gap-5'>
                        <div>Sign : {data[`${selectedBody}Reports`]?.ashtak_varga?.sign}</div>
                        <div>Sign Id : {data[`${selectedBody}Reports`]?.ashtak_varga?.sign_id}</div>
                    </div>
                </div>
                {selectedTab === 'Table' && <TableTab data={data[`${selectedBody}Reports`]} />}
                {selectedTab === 'Chart' && <div className='pt-10 pb-20'><ChartTab data={data[getChartKey(selectedBody)]} /></div>}
            </div>
        </div>
    );
}

const TableTab = ({ data }) => {
    const kundliAstakVargaData = data?.ashtak_points;
    const signs = kundliAstakVargaData ? Object.keys(kundliAstakVargaData) : [];
    const planets = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'ascendant'];

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
                <tr>
                    <th className="border border-gray-200 px-4 py-2 text-start">Sign</th>
                    {planets.map((planet) => (
                        <th key={planet} className="border border-gray-200 px-4 py-2 capitalize">{planet}</th>
                    ))}
                    <th className="border border-gray-200 px-4 py-2">Total</th>
                </tr>
            </thead>
            <tbody>
                {signs.map((sign, index) => {
                    const planetValues = kundliAstakVargaData[sign];
                    const total = planets.reduce((sum, planet) => sum + (planetValues[planet] || 0), 0);

                    return (
                        <tr key={index} className="odd:bg-white even:bg-gray-50">
                            <td className="border border-gray-200 px-4 py-2 capitalize">{sign}</td>
                            {planets.map((planet) => (
                                <td key={planet} className="border border-gray-200 px-4 py-2">{planetValues[planet]}</td>
                            ))}
                            <td className="border border-gray-200 px-4 py-2">{total}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

const ChartTab = ({ data }) => {
    return (
        <div
            className="flex justify-center items-center scale-125"
            dangerouslySetInnerHTML={{ __html: data?.svg }}
        />
    );
}

export default AstakVarga;
