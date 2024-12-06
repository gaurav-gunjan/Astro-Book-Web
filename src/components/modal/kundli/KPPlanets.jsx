import React from 'react'

const KPPlanets = ({ data }) => {
    console.log("Kp Planets ::: ", data);

    return (
        <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
                <tr>
                    <th className="border border-gray-200 px-4 py-2">Planet</th>
                    <th className="border border-gray-200 px-4 py-2">Degree</th>
                    <th className="border border-gray-200 px-4 py-2">SL</th>
                    <th className="border border-gray-200 px-4 py-2">NL</th>
                    <th className="border border-gray-200 px-4 py-2">SB</th>
                    <th className="border border-gray-200 px-4 py-2">SS</th>
                </tr>
            </thead>
            <tbody>
                {data?.kundliKPPlanetData?.planets?.map((value, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">{value?.planet_name}</td>
                        <td className="border border-gray-200 px-4 py-2">
                            {value?.planet_name.slice(0, 3)}{' '}
                            {`${Math.floor(((Math.floor(value?.norm_degree))))}° ${Math.floor((value?.norm_degree % 1) * 60)}' ${Math.floor(((value?.norm_degree % 1) * 60) % 1 * 60)}"`}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">{value?.sign_lord.slice(0, 2)}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.nakshatra_lord.slice(0, 2)}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.sub_lord.slice(0, 2)}</td>
                        <td className="border border-gray-200 px-4 py-2">{value?.sub_sub_lord.slice(0, 2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default KPPlanets;