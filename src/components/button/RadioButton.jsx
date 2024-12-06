import React from 'react';

const RadioButton = ({ label, value, name, checked, onChange, bgColor = 'bg-tealblue', borderColor = 'border-tealblue', w = 'w-5', h = 'h-5' }) => {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="hidden" />
            <span className={`${w} ${h} inline-block mr-2 border-2 border-gray-300 rounded-full ${checked ? `${bgColor} ${borderColor}` : ""}`}  ></span>
            <span className="text-gray-700">{label}</span>
        </label>
    );
};

export default RadioButton;