import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as KundliActions from '../../../redux/actions/kundliAction';

const paths = [
    "M10 10L175 10L92.5 87.5L10 10",
    "M175 10L340 10L257.5 87.5L175 10",
    "M92.5 87.5L10 165L10 10",
    "M92.5 87.5L175 165L257.5 87.5L175 10",
    "M257.5 87.5L340 165L340 10",
    "M92.5,87.5L175,165L92.5,242.5L10,165",
    "M257.5,87.5L340,165L257.5,242.5L175,165",
    "M92.5,242.5L10,320L10,165",
    "M175,165L257.5,242.5L175,320L92.5,242.5",
    "M92.5,242.5L175,320L10,320",
    "M257.5,242.5L340,320L175,320",
    "M340,165L340,320L257.5,242.5",
];

const textPositions = [
    { x: 305, y: 90 },    // Box 1 
    { x: 257.5, y: 45 },   // Box 2
    { x: 175, y: 90 },     // Box 3
    { x: 92.5, y: 45 },    // Box 4
    { x: 45, y: 90 },    // Box 5
    { x: 90, y: 170 },     // Box 6
    { x: 45, y: 250 },    // Box 7
    { x: 92.5, y: 290 },     // Box 8
    { x: 175, y: 250 },    // Box 9
    { x: 257.5, y: 290 },   // Box 10
    { x: 305, y: 250 },  // Box 11
    { x: 260, y: 170 },    // Box 12
];

const chartOption = [
    { label: 'Chalit Chart', value: 'chalit' },
    { label: 'Moon Chart', value: 'MOON' },
    { label: 'Sun Chart', value: 'SUN' },
    { label: 'Birth Chart', value: 'D1' },
    { label: 'Hora Chart', value: 'D2' },
    { label: 'Dreshkan Chart', value: 'D3' },
    { label: 'Chathurthamasha Chart', value: 'D4' },
    { label: 'Panchmansha Chart', value: 'D5' },
    { label: 'Saptamansha Chart', value: 'D7' },
    { label: 'Ashtamansha Chart', value: 'D8' },
    { label: 'Navamansha Chart', value: 'D9' },
    { label: 'Dashamansha Chart', value: 'D10' },
    { label: 'Dwadashamsha Chart', value: 'D12' },
    { label: 'Shodashamsha Chart', value: 'D16' },
    { label: 'Vishamansha Chart', value: 'D20' },
    { label: 'Chaturvimshamsha Chart', value: 'D24' },
    { label: 'Bhamsha Chart', value: 'D27' },
    { label: 'Trishamansha Chart', value: 'D30' },
    { label: 'Khavedamsha Chart', value: 'D40' },
    { label: 'Akshvedansha Chart', value: 'D45' },
    { label: 'Shashtymsha Chart', value: 'D60' },
];

const Chart = ({ data }) => {
    const dispatch = useDispatch();
    const { kundliChartData } = useSelector(state => state?.kundliReducer);
    const chartData = kundliChartData?.sort((a, b) => a.sign - b.sign);

    useEffect(() => {

        //! Dispatching API For kundliGetChart 
        dispatch(KundliActions.kundliGetChart({ data: 'chalit', kundliPayload: data }));
    }, []);

    return (
        <div className='flex flex-col gap-5 justify-center items-center'>

            <select onChange={(e) => dispatch(KundliActions.kundliGetChart({ data: e.target.value, kundliPayload: data }))} name="chart_route" id="chart_route" className='border border-primary outline-none w-full rounded-md p-2 mb-20'>
                <option value={''}>select chart</option>
                {chartOption?.map((value, index) => <option key={index} value={value?.value}>{value?.label}</option>)}
            </select>

            <svg width="350" height="350" viewBox="0 0 350 350" className="horo-chart scale-150">
                {paths.map((d, index) => (
                    <path key={index} d={d} fill="none" stroke="red" />
                ))}
                {chartData?.map((signData, index) => {
                    const { sign, sign_name, planet_small } = signData;
                    const textPosition = textPositions[index];
                    return (
                        <g key={index} className="sign">
                            <text x={textPosition.x} y={textPosition.y} textAnchor="middle" fontWeight="bold" fontSize="10">
                                {sign} {sign_name}
                            </text>
                            {planet_small.map((planet, i) => (
                                <text key={i} x={textPosition.x} y={textPosition.y + (i + 1) * 12} textAnchor="middle" fontSize="8">
                                    {planet}
                                </text>
                            ))}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default Chart;
