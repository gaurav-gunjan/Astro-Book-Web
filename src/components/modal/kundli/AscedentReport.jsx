import React from 'react'

const AscedentReport = ({ data }) => {
    console.log('AscedentReport', data);

    return (
        <div className='flex flex-col gap-5'>
            <div className='text-primary text-lg font-semibold text-center'>{data?.kundliAscendentData?.ascendant}</div>
            <div className='text-justify'>{data?.kundliAscendentData?.report}</div>
        </div>
    )
}

export default AscedentReport;