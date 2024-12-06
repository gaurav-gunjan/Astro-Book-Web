import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as KundliActions from '../../../redux/actions/kundliAction';
import { kundliRequest } from '../../../utils/api-function';

const VimshottariDasha = ({ data }) => {
    const kundliPayload = data;
    const dispatch = useDispatch();
    const { kundliVimshottariDashaData } = useSelector(state => state?.kundliReducer);
    const [kundliSubVimshottariDashaData, setKundliSubVimshottariDashaData] = useState(null);
    const [kundliSubSubVimshottariDashaData, setKundliSubSubVimshottariDashaData] = useState(null);
    const [subDashaPath, setSubDashaPath] = useState(null);
    const [subSubDashaPath, setSubSubDashaPath] = useState(null);

    // Back button to go back to sub dasha list
    const handleBackToSubDasha = () => setSubSubDashaPath(null);

    // Back button to go back to main dasha list
    const handleBackToMainDasha = () => setSubDashaPath(null);


    useEffect(() => {
        //! Dispatching API For VimshottariDasha 
        dispatch(KundliActions.kundliGetVimshottariDasha(kundliPayload));
    }, []);

    //! Fetch sub dasha data
    const kundliGetVimshottariSubDasha = async (payload) => {
        const response = await kundliRequest(`https://json.astrologyapi.com/v1/sub_vdasha/${payload}`, kundliPayload);
        setSubDashaPath(payload);
        setKundliSubVimshottariDashaData(response)
        console.log('kundliGetVimshottariSubDasha', response);
    };

    //! Fetch sub sub dasha data
    const kundliGetVimshottariSubSubDasha = async (payload) => {
        const response = await kundliRequest(`https://json.astrologyapi.com/v1/sub_sub_vdasha/${subDashaPath}/${payload}`, kundliPayload);
        setSubSubDashaPath(payload);
        setKundliSubSubVimshottariDashaData(response)
        console.log('kundliGetVimshottariSubSubDasha', response);
    };

    return (
        <>
            {/* Render main Vimshottari dasha list */}
            <div className="text-lg font-bold mb-4">Vimshottari Maha Dasha</div>
            {!subDashaPath && !subSubDashaPath && kundliVimshottariDashaData?.map((value, index) => (
                <div key={index} className="cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4 mb-2 text-sm flex items-center justify-between" onClick={() => kundliGetVimshottariSubDasha(value?.planet)}>
                    <span>{value?.planet}</span> <span>{value?.end}</span>
                </div>
            ))}

            {/* Render sub dasha list */}
            {subDashaPath && !subSubDashaPath && (
                <>
                    <div className='flex items-center justify-between mb-4'>
                        <div className="text-base font-semibold">Vimshottari Antara Dasha</div>
                        <button className="bg-white hover:bg-white text-black border border-primary py-1 px-4 rounded-md text-sm" onClick={handleBackToMainDasha}>Back</button>
                    </div>
                    {kundliSubVimshottariDashaData?.map((value, index) => (
                        <div key={index} className="cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4 mb-2 text-sm flex items-center justify-between" onClick={() => kundliGetVimshottariSubSubDasha(value?.planet)}>
                            <span>{subDashaPath}/{value?.planet}</span> <span>{value?.end}</span>
                        </div>
                    ))}
                </>
            )}

            {/* Render sub sub dasha list */}
            {subSubDashaPath && (
                <>
                    <div className='flex items-center justify-between mb-4'>
                        <div className="text-base font-semibold">Vimshottari Prayantra Dasha</div>
                        <button className="bg-white hover:bg-white text-black border border-primary py-1 px-4 rounded-md text-sm" onClick={handleBackToSubDasha}>Back</button>
                    </div>
                    {kundliSubSubVimshottariDashaData?.map((value, index) => (
                        <div key={index} className="bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4 mb-2 text-sm flex items-center justify-between">
                            <span>{subDashaPath}/{subSubDashaPath}/{value?.planet}</span> <span>{value?.end}</span>
                        </div>
                    ))}
                </>
            )}
        </>

    );
};

export default VimshottariDasha;