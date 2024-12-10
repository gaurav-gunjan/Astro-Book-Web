import React from 'react';

const PageHeading = ({ title }) => {
    return (
        <div className='bg-[#F1B646] text-black px-12 max-md:px-10 py-2 font-[500] text-[16px] rounded-md flex items-center justify-center self-start text-nowrap'>{title}</div>
    )
}

export default PageHeading;