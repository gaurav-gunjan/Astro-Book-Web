import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeleteSvg, SearchSvg } from '../../assets/svg';
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
            <TopHeaderSection />

            <section className='px-[80px] max-md:px-[20px] py-10'>
                <main className='flex justify-between max-md:flex-wrap gap-5'>
                    <div className='bg-[#F1B646] text-black px-12 max-md:px-10 py-2.5 font-[500] text-[16px] rounded-md flex items-center justify-center self-start text-nowrap'>Free Kundli</div>

                    <div className='border border-[#DDDDDD] rounded-md flex items-center max-sm:w-[90vw]'>
                        <input type='search' placeholder='Serach Kundli By Name..' className='outline-none px-3 py-2 text-[16px] max-md:text-[16px] rounded-md h-full w-[330px] max-xl:w-[300px] max-lg:w-[100%]' />
                        <button className='bg-[#F1B646] border-[#F1B646] rounded-e-md flex items-center justify-center p-2 px-3 w-[50px] h-full'><SearchSvg w='20' h='20' /></button>
                    </div>
                </main>
            </section>

            <section className='px-[80px] max-md:px-[20px] py-10'>
                <article>
                    <main className='flex gap-[5%]'>
                        <div className='flex-1 border-r pr-[5%]'>
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
                        </div>

                        <div className='flex-1 flex-col gap-2'>
                            {kundliData?.map((data, index) => (
                                <div key={index} className="p-4 bg-white flex justify-between">
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
                    </main>
                </article>
            </section>
        </>
    )
}

export default FreeKundli;