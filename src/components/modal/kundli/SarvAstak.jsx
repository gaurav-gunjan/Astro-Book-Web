import React, { useState } from 'react'

const SarvAstak = ({ data }) => {
    const { kundliSarvAstakData } = data
    console.log("SarvAstak ::: ", kundliSarvAstakData);
    const [selectedTab, setSelectedTab] = useState(1);

    return (
        <div>
            <div className='flex gap-4 justify-around mb-5'>
                <div onClick={() => setSelectedTab(1)} className={`text-center py-1 px-5 rounded-md cursor-pointer ${selectedTab === 1 ? 'bg-primary text-white' : 'border border-primary'}`}>Table</div>
                <div onClick={() => setSelectedTab(2)} className={`text-center py-1 px-5 rounded-md cursor-pointer ${selectedTab === 2 ? 'bg-primary text-white' : 'border border-primary'}`}>Chart</div>
            </div>
            <div className='overflow-x-scroll'>
                <div className='flex flex-col gap-5 p-5'>
                    <div>Type : {kundliSarvAstakData?.sarvashtak?.ashtak_varga?.type}</div>
                    <div className='flex  gap-5'>
                        <div>Sign : {kundliSarvAstakData?.sarvashtak?.ashtak_varga?.sign}</div>
                        <div>Sign Id : {kundliSarvAstakData?.sarvashtak?.ashtak_varga?.sign_id}</div>
                    </div>
                </div>
                {selectedTab == 1 && <TableTab data={kundliSarvAstakData?.sarvashtak} />}
                {selectedTab == 2 && <ChartTab data={kundliSarvAstakData?.sarvashtakchart} />}
            </div>
        </div>
    )
}


const TableTab = ({ data }) => {
    const kundliSarvAstakData = data?.ashtak_points;
    const signs = Object.keys(kundliSarvAstakData);
    const planets = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'ascendant'];


    return <>
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
                    const planetValues = kundliSarvAstakData[sign];
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
    </>
}

const ChartTab = ({ data }) => {

    return <>
        <div
            className="flex justify-center items-center"
            dangerouslySetInnerHTML={{ __html: data?.svg }}
        />
    </>
}

export default SarvAstak