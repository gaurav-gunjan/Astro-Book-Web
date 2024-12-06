import React from 'react'

const CheckBoxActive = ({ w = 'w-5', h = 'h-5' }) => {
    return (
        <div className={`rounded-[50%] border border-tealblue bg-tealblue ${w} ${h}`}></div>
    )
}

export default CheckBoxActive;