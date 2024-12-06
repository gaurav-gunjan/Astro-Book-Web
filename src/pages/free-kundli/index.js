import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeleteSvg } from '../../assets/svg';
import { ParseDateTime } from '../../utils/common-function';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as KundliActions from '../../redux/actions/kundliAction';
import { Autocomplete } from '@react-google-maps/api';

const FreeKundli = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDataById } = useSelector(state => state?.userReducer);
    const { kundliData } = useSelector(state => state?.kundliReducer);

    const [activeTab, setActiveTab] = useState('generate');
    const [inputFieldDetail, setInputFieldDetail] = useState({
        name: '', gender: '', date_of_birth: '', time_of_birth: '', place_of_birth: '', latitude: '', longitude: ''
    });
    const autocompleteRef = useRef(null);

    //* Handle Input : Chat Intake Form Data
    const handleInputFieldDetail = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value })
    };

    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        if (place) {
            const location = place.geometry.location;
            setInputFieldDetail({
                ...inputFieldDetail,
                place_of_birth: place.formatted_address,
                latitude: location.lat(),
                longitude: location.lng(),
            });
        }
    };

    //* Handle Validation For Intake Form Data
    const handleValidation = () => {
        const { name, gender, date_of_birth, time_of_birth, place_of_birth, latitude, longitude } = inputFieldDetail;

        let isValid = true;

        if (!name) {
            toast.error('Please Enter Full Name')
            return isValid = false
        }
        if (!gender) {
            toast.error('Please Select Gender')
            return isValid = false
        }
        if (!date_of_birth) {
            toast.error('Please Enter Date Of Birth')
            return isValid = false
        }
        if (!time_of_birth) {
            toast.error('Please Enter Time Of Birth')
            return isValid = false
        }
        if (!place_of_birth) {
            toast.error('Please Enter Place Of Birth')
            return isValid = false
        }

        return isValid;
    }

    //! Handle Submit : Generate Kundli
    const handleSubmit = async (e) => {
        console.log({ ...inputFieldDetail, customerId: userCustomerDataById?._id, });
        const { name, gender, date_of_birth, time_of_birth, place_of_birth, latitude, longitude } = inputFieldDetail;

        if (handleValidation()) {
            const payload = {
                data: {
                    customerId: userCustomerDataById?._id, name, gender, dob: date_of_birth, tob: ParseDateTime(date_of_birth, time_of_birth), place: place_of_birth,
                    lat: latitude, lon: longitude,
                },
                customerId: userCustomerDataById?._id,
                onComplete: () => setInputFieldDetail({ ...inputFieldDetail, name: '', gender: '', date_of_birth: '', time_of_birth: '', place_of_birth: '', latitude: '', longitude: '' }),
                navigate
            }

            //! Dispatching API For Creating Kundli
            dispatch(KundliActions?.createKundli(payload));

        } else {
            console.log('Validation Error !!!');
        }
    };

    useEffect(() => {
        //! Dispatching API For Getting Kundli Data;
        userCustomerDataById && dispatch(KundliActions?.getKundli({ customerId: userCustomerDataById?._id }));
    }, [userCustomerDataById]);

    return (
        <>
            <TopHeaderSection title={'Free Kundli'} />

            <div className="w-full mt-10 mb-10 max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between border-b-2 mb-6">
                    <button onClick={() => setActiveTab('generate')} className={`w-1/2 py-2 text-center font-semibold rounded-t-lg ${activeTab === 'generate' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>GENERATE KUNDLI</button>
                    <button onClick={() => setActiveTab('saved')} className={`w-1/2 py-2 text-center font-semibold rounded-t-lg ${activeTab === 'saved' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`} >SAVED KUNDLI</button>
                </div>

                {activeTab === 'generate' ?
                    <>
                        <form className='px-5 my-8 flex flex-wrap justify-between gap-6'>
                            <div className='basis-[45%] max-md:basis-full flex flex-col gap-1'>
                                <label className='text-grey text-sm'>Full Name</label>
                                <input name='name' value={inputFieldDetail?.name} onChange={handleInputFieldDetail} type='text' placeholder='Full Name' className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm' />
                            </div>

                            <div className='basis-[45%] max-md:basis-full flex flex-col gap-1'>
                                <label className='text-grey text-sm'>Gender</label>
                                <select name="gender" value={inputFieldDetail?.gender} onChange={handleInputFieldDetail} id="gender" className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm'>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className='basis-[45%] max-md:basis-full flex flex-col gap-1'>
                                <label className='text-grey text-sm'>Date of Birth</label>
                                <input name='date_of_birth' value={inputFieldDetail?.date_of_birth} onChange={handleInputFieldDetail} type='date' className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm' />
                            </div>
                            <div className='basis-[45%] max-md:basis-full flex flex-col gap-1'>
                                <label className='text-grey text-sm'>Time of Birth</label>
                                <input name='time_of_birth' value={inputFieldDetail?.time_of_birth} onChange={handleInputFieldDetail} type='time' className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm' />
                            </div>

                            <div className='basis-[45%] max-md:basis-full flex flex-col gap-1'>
                                <label className='text-grey text-sm'>Place of Birth</label>
                                <Autocomplete
                                    onLoad={(ref) => (autocompleteRef.current = ref)}
                                    onPlaceChanged={handlePlaceSelect}
                                >
                                    <input
                                        type='text'
                                        name='place_of_birth'
                                        value={inputFieldDetail.place_of_birth}
                                        onChange={handleInputFieldDetail}
                                        className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm'
                                        placeholder='Enter place of birth'
                                    />
                                </Autocomplete>
                            </div>

                            <div onClick={(e) => {
                                if (userCustomerDataById) {
                                    handleSubmit(e);
                                } else {
                                    alert('Please login')
                                }
                            }} className='basis-full bg-primary text-center text-white rounded-lg p-2 text-sm cursor-pointer'>Generate Kundli</div>
                        </form>
                    </>
                    : <div className="flex flex-col gap-2">
                        {kundliData?.map((data, index) => (
                            <div key={index} className="shadow-lg p-4 bg-white flex justify-between">
                                <div onClick={() => navigate(`/free-kundli/${data?._id}`)} className='flex-1'>
                                    <div className="font-bold text-xl mb-2">{data?.name}</div>
                                    <p className="text-gray-700 text-base">
                                        {moment(data?.dob).format('DD-MMM-YYYY')} at {moment(data?.tob).format('hh:mm a')}
                                    </p>
                                    <p className="text-gray-700 text-base">{data?.place}</p>
                                </div>

                                <div onClick={() => dispatch(KundliActions?.deleteKundli({ kundliId: data?._id, customerId: userCustomerDataById?._id }))} className='cursor-pointer'><DeleteSvg /></div>
                            </div>
                        ))}

                        {kundliData?.length <= 0 && <div className='text-center py-5'>No Data Available</div>}
                    </div>
                }

            </div>
        </>
    )
}

export default FreeKundli;