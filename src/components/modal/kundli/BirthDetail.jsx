import React from 'react';
import moment from 'moment';

const BirthDetail = ({ data, kundliData, intakeData }) => {

    return (
        <div className="px-7 py-5 flex flex-col gap-4 bg-white rounded-lg">
            <div className="flex items-start">
                <div className="basis-[40%] font-medium text-gray-700">Name</div>
                <div className="basis-[60%] text-gray-900">{kundliData ? kundliData?.name : intakeData?.firstName + ' ' + intakeData?.lastName}</div>
            </div>
            <div className="flex items-start">
                <div className="basis-[40%] font-medium text-gray-700">Date</div>
                <div className="basis-[60%] text-gray-900">{kundliData ? moment(kundliData?.dob).format('DD MMM YYYY') : moment.utc(intakeData?.dateOfBirth).format('MMM Do YYYY')}</div>
            </div>
            <div className="flex items-start">
                <div className="basis-[40%] font-medium text-gray-700">Time</div>
                <div className="basis-[60%] text-gray-900">{kundliData ? moment(kundliData?.tob).format('hh:mm A') : moment.utc(intakeData?.timeOfBirth).format('HH:mm A')}</div>
            </div>
            <div className="flex items-start">
                <div className="basis-[40%] font-medium text-gray-700">Place</div>
                <div className="basis-[60%] text-gray-900">{kundliData ? kundliData?.place : intakeData?.placeOfBirth}</div>
            </div>
            <div className="flex items-start">
                <div className="basis-[40%] font-medium text-gray-700">Latitude</div>
                <div className="basis-[60%] text-gray-900">{data?.kundliBirthDetailData?.latitude}</div>
            </div>
            <div className="flex items-start">
                <div className="basis-[40%] font-medium text-gray-700">Longitude</div>
                <div className="basis-[60%] text-gray-900">{data?.kundliBirthDetailData?.longitude}</div>
            </div>
            <div className="flex items-start">
                <div className="basis-[40%] font-medium text-gray-700">Time Zone</div>
                <div className="basis-[60%] text-gray-900">+05.30</div>
            </div>
            <div className="flex items-start">
                <div className="basis-[40%] font-medium text-gray-700">Ayanamsha</div>
                <div className="basis-[60%] text-gray-900">{data?.kundliBirthDetailData?.ayanamsha}</div>
            </div>
            <div className="flex items-start">
                <div className="basis-[40%] font-medium text-gray-700">Sunrise</div>
                <div className="basis-[60%] text-gray-900">{data?.kundliBirthDetailData?.sunrise}</div>
            </div>
            <div className="flex items-start">
                <div className="basis-[40%] font-medium text-gray-700">Sunset</div>
                <div className="basis-[60%] text-gray-900">{data?.kundliBirthDetailData?.sunset}</div>
            </div>
        </div>
    )
}

export default BirthDetail;