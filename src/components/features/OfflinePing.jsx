import React from 'react';
import { VerifySvg } from '../../assets/svg';

const OfflinePing = () => {
    return (
        <div className='relative flex items-center justify-center'>
            <div className='h-[12px] w-[12px] bg-red-600 rounded-full animate-ping absolute'></div>
            <div className='h-[10px] w-[10px] bg-red-600 rounded-full relative z-10'></div>
        </div>
    )
}

export default OfflinePing;