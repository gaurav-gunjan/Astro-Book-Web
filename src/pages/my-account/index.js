import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete } from '@react-google-maps/api';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import { toaster } from '../../utils/services/toast-service';
import { website_name } from '../../utils/constants';
import * as AuthActions from '../../redux/actions/authAction';
import { api_urls } from '../../utils/api-urls';
import Logo from '../../assets/images/logo/logo.png';

const MyAccount = () => {
    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(searchParams);
    const activeHead = query.get('active-tab') || 'Change Picture';

    const { userCustomerDataById } = useSelector(state => state?.userReducer);

    const autocompleteRef = useRef(null);
    const [inputFieldDetail, setInputFieldDetail] = useState({ first_name: '', last_name: '', email: '', phone: '', gender: '', date_of_birth: '', time_of_birth: '', date_of_birth_and_time: '', place_of_birth: '', marital_status: '', type_of_concern: '', latitude: '', longitude: '', description: '' });
    const [image, setImage] = useState({ file: '', byte: '' })

    //* Handle Image 
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        else setImage({ file: URL.createObjectURL(file), byte: file })
    };

    //* Handle Input
    const handleInputFieldDetail = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value })
    };

    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        try {
            if (place) {
                const location = place.geometry.location;
                setInputFieldDetail({ ...inputFieldDetail, place_of_birth: place.formatted_address, latitude: location.lat(), longitude: location.lng(), });
            }
        } catch (error) {
            toaster?.info({ text: 'Select Place' })
        }
    };

    //* Handle Validation For Intake Form Data
    const handleValidation = () => {
        const { first_name, last_name, email, gender, date_of_birth, time_of_birth, date_of_birth_and_time, place_of_birth, marital_status, type_of_concern, description, latitude, longitude } = inputFieldDetail;

        let isValid = true;

        if (!first_name) {
            toaster.warning({ text: 'Please Enter First Name' });
            return isValid = false
        }
        if (!last_name) {
            toaster.warning({ text: 'Please Enter Last Name' });
            return isValid = false
        }
        if (!email) {
            toaster.warning({ text: 'Please Enter Email' });
            return isValid = false
        }
        if (!gender) {
            toaster.warning({ text: 'Please Select Gender' });
            return isValid = false
        }
        // if (!date_of_birth) {
        //     toaster.warning({ text: 'Please Enter Date Of Birth' });
        //     return isValid = false
        // }
        // if (!time_of_birth) {
        //     toaster.warning({ text: 'Please Enter Time Of Birth' });
        //     return isValid = false
        // }
        if (!date_of_birth_and_time) {
            toaster.warning({ text: 'Please Enter Date Of Birth And Time' });
            return isValid = false
        }
        if (!place_of_birth) {
            toaster.warning({ text: 'Please Enter Place Of Birth' });
            return isValid = false
        }
        // if (!marital_status) {
        //     toaster.warning({ text: 'Please Select Marital Status' });
        //     return isValid = false
        // }
        // if (!type_of_concern) {
        //     toaster.warning({ text: 'Please Select Type Of Concern' });
        //     return isValid = false
        // }
        // if (!description) {
        //     toaster.warning({ text: 'Please Enter Description' });
        //     return isValid = false
        // }

        return isValid;
    }

    //! Handle Submit : Update Profile
    const handleSubmit = async () => {
        console.log({ ...inputFieldDetail });
        const { first_name, last_name, email, gender, date_of_birth, time_of_birth, date_of_birth_and_time, place_of_birth, marital_status, type_of_concern, description, latitude, longitude } = inputFieldDetail;

        const payload = {
            customerId: userCustomerDataById?._id,
            firstName: first_name?.trim(),
            lastName: last_name?.trim(),
            email, gender,
            dateOfBirth: date_of_birth_and_time,
            timeOfBirth: date_of_birth_and_time,
            placeOfBirth: place_of_birth,
            maritalStatus: marital_status,
            topic_of_concern: type_of_concern,
            description, latitude, longitude,
        };

        //! Dispatching API To Update Customer Profile 
        handleValidation() && dispatch(AuthActions?.customerUpdateProfile(payload));
    };

    //! Handle Submit : Change Profile Picture
    const handleChangePicture = () => {
        if (image?.file) {
            const formdata = new FormData();
            formdata.append('customerId', userCustomerDataById?._id);
            formdata.append('image', image?.byte);

            const payload = {
                data: formdata,
                customerId: userCustomerDataById?._id
            }

            //! Dispatching API To Update Customer Profile Picture
            dispatch(AuthActions?.customerChangePicture(payload));

        } else {
            toaster.warning({ text: 'Please Select Profile Picture' });
        }
    };

    useEffect(() => {
        userCustomerDataById && setInputFieldDetail({ ...inputFieldDetail, first_name: userCustomerDataById?.customerName?.split(' ')[0], last_name: userCustomerDataById?.customerName?.split(' ')[1] || '', email: userCustomerDataById?.email || '', phone: userCustomerDataById?.phoneNumber || '', gender: userCustomerDataById?.gender || '', date_of_birth_and_time: userCustomerDataById?.dateOfBirth || '', place_of_birth: userCustomerDataById?.address?.birthPlace || '', marital_status: userCustomerDataById?.maritalStatus || '', type_of_concern: userCustomerDataById?.topic_of_concern || '', latitude: userCustomerDataById?.address?.latitude || '', longitude: userCustomerDataById?.address?.longitude || '', description: userCustomerDataById?.description || '' });

        userCustomerDataById && userCustomerDataById?.image && setImage({ file: api_urls + 'uploads/' + userCustomerDataById?.image });
    }, [userCustomerDataById]);

    return (
        <>
            <TopHeaderSection title={'My Account'} />

            <section className='px-[100px] py-7 max-sm:px-[20px]'>
                <article className='shadow-xl p-3 py-10 overflow-hidden bg-[#EFEFEF] rounded-md relative'>
                    <div className='text-[#666373] text-center text-sm'>View and update your profile in your {website_name} Astro account.</div>
                    <main className='px-7 flex justify-center gap-4 py-[20px]'>
                        {['update-profile', 'change-picture']?.map((value, index) => <div onClick={() => setSearchParams(`active-tab=${value.toLowerCase().split(' ').join('-')}`)} key={index} className={`w-32 text-sm border text-center border-primary ${activeHead == value && 'bg-primary text-white'} hover:scale-105 py-2 rounded-md cursor-pointer flex items-center justify-center transition-all duration-300 capitalize`}>{value?.split('-')?.join(' ')}</div>)}
                    </main>


                    {activeHead == 'update-profile' && <main className='px-10 py-5 text-[14px] text-[#666373] flex flex-col gap-8'>
                        <div className='flex max-lg:flex-col gap-[20px] max-lg:gap-[15px]'>
                            <div className='basis-[45%] max-lg:basis-full flex-grow flex flex-col gap-[15px]'>
                                <input name='first_name' value={inputFieldDetail?.first_name} onChange={(e) => handleInputFieldDetail(e)} placeholder='First Name' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                <input name='last_name' value={inputFieldDetail?.last_name} onChange={(e) => handleInputFieldDetail(e)} placeholder='Last Name' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                <input name='email' type='email' value={inputFieldDetail?.email} onChange={(e) => handleInputFieldDetail(e)} placeholder='Email' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                <input name='phone' readOnly value={inputFieldDetail?.phone} placeholder='Phone' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                <select name='gender' value={inputFieldDetail?.gender} onChange={(e) => handleInputFieldDetail(e)} placeholder='Gender' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-[7px]' >
                                    <option value="" className='text-gray-400'>----------Select Gender----------</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <input name='date_of_birth_and_time' value={inputFieldDetail?.date_of_birth_and_time} onChange={(e) => handleInputFieldDetail(e)} placeholder='Date of Birth' type='datetime-local' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-[7PX]' />
                                {/* <input name='time_of_birth' value={inputFieldDetail?.time_of_birth} onChange={(e) => handleInputFieldDetail(e)} placeholder='Time of Birth' type='time' cla ssName='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-[7PX]' /> */}
                                <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceSelect} >
                                    <input name='place_of_birth' value={inputFieldDetail?.place_of_birth} onChange={(e) => handleInputFieldDetail(e)} placeholder='Place of Birth' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                </Autocomplete>
                            </div>
                            <div className='basis-[45%] max-lg:basis-full flex-grow flex flex-col gap-[15px]'>
                                <select name='marital_status' value={inputFieldDetail?.marital_status} onChange={(e) => handleInputFieldDetail(e)} placeholder='marital status' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-[7px]' >
                                    <option value="" className='text-gray-400'>----------Select Marital Status----------</option>
                                    <option value="Married">Married</option>
                                    <option value="Unmarried">Unmarried</option>
                                    <option value="Other">Other</option>
                                </select>
                                <select name='type_of_concern' value={inputFieldDetail?.type_of_concern} onChange={(e) => handleInputFieldDetail(e)} placeholder='type of concern' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-[7px]' >
                                    <option value="" className='text-gray-400'>----------Select Type of Concern----------</option>
                                    <option value="Career">Career</option>
                                    <option value="Business">Business</option>
                                </select>
                                <textarea name='description' rows={8} value={inputFieldDetail?.description} onChange={(e) => handleInputFieldDetail(e)} placeholder='Description' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-[8px]' />
                                <div onClick={() => handleSubmit()} className='cursor-pointer bg-primary border border-primary hover:bg-orange-400 text-center text-white font-semibold rounded-sm px-5 py-2 transition-all duration-500'>Update Profile</div>
                            </div>
                        </div>
                    </main>}

                    {activeHead == 'change-picture' && <main className='px-10 py-5 text-[14px] text-[#666373] flex flex-col gap-8'>
                        <div className='flex items-center max-lg:flex-col gap-[50px] max-lg:gap-[15px]'>
                            <div className='h-40 w-40 border border-white rounded-md'><img src={image?.file ? image?.file : Logo} alt='Profile' className='h-full w-full object-contain' /></div>
                            <div className='flex flex-col flex-1 gap-5'>
                                <input type='file' onChange={handleImage} className='cursor-pointer bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                <div onClick={() => handleChangePicture()} className='self-end cursor-pointer bg-primary border border-primary hover:bg-orange-400 text-center text-white font-semibold rounded-md px-5 py-2 transition-all duration-500'>Change Picture</div>
                            </div>
                        </div>
                    </main>}
                </article>
            </section>
        </>
    )
}

export default MyAccount;