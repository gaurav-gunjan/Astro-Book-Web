import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete } from '@react-google-maps/api';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as ProfileActions from '../../redux/actions/profileAction';
import { toaster } from '../../utils/services/toast-service';

const KundliMatching = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDataById } = useSelector(state => state?.userReducer);

    //! Male 
    const [maleInputField, setMaleInputField] = useState({ name: '', birth_date_time: '', place_of_birth: '' });
    const handleMaleInputField = (event) => setMaleInputField({ ...maleInputField, [event?.target?.name]: event?.target?.value });

    const autocompleteRefMale = useRef(null);
    const handleMalePlaceSelect = () => {
        const place = autocompleteRefMale?.current?.getPlace();
        try {
            if (place) {
                const location = place.geometry.location;
                setMaleInputField({ ...maleInputField, place_of_birth: place?.formatted_address, latitude: location?.lat(), longitude: location?.lng(), });
            }
        } catch (error) {
            toaster?.info({ text: 'Select Place' })
        }
    };

    //! Female 
    const [femaleInputField, setFemaleInputField] = useState({ name: '', birth_date_time: '', place_of_birth: '' });
    const handleFemaleInputField = (event) => setFemaleInputField({ ...femaleInputField, [event?.target?.name]: event?.target?.value });

    const autocompleteRefFemale = useRef(null);
    const handleFemalePlaceSelect = () => {
        const place = autocompleteRefFemale.current.getPlace();
        try {
            if (place) {
                const location = place.geometry.location;
                setFemaleInputField({ ...femaleInputField, place_of_birth: place.formatted_address, latitude: location.lat(), longitude: location.lng(), });
            }
        } catch (error) {
            toaster?.info({ text: 'Select Place' })
        }
    };

    //! Error 
    const [inputFieldError, setInputFieldError] = useState({ email: '', password: '' });
    const handleInputFieldError = (name, value) => setInputFieldError({ ...inputFieldError, [name]: value });

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;

        if (!maleInputField?.name) {
            toaster.error({ text: `Please enter boy's name` });
            handleInputFieldError(`boysName`, `Please enter boy's name`);
            return isValid = false;
        }
        if (!maleInputField?.birth_date_time) {
            toaster.error({ text: `Please enter boy's birth date & time` });
            handleInputFieldError(`boysDOB`, `Please enter boy's birth date & time`);
            return isValid = false;
        }
        if (!maleInputField?.place_of_birth) {
            toaster.error({ text: `Please select boy's place of birth` });
            handleInputFieldError(`boysPlaceOfBirth`, `Please select boy's place of birth`);
            return isValid = false;
        }
        if (!femaleInputField?.name) {
            toaster.error({ text: `Please enter girl's name` });
            handleInputFieldError(`girlsName`, `Please enter girl's name`);
            return isValid = false;
        }
        if (!femaleInputField?.birth_date_time) {
            toaster.error({ text: `Please enter girl's birth date & time` });
            handleInputFieldError(`girlsDOB`, `Please enter girl's birth date & time`);
            return isValid = false;
        }
        if (!femaleInputField?.place_of_birth) {
            toaster.error({ text: `Please select girl's place of birth` });
            handleInputFieldError(`girlsPlaceOfBirth`, `Please select girl's place of birth`);
            return isValid = false;
        }

        return isValid;
    };

    // Todo : Handle Submit
    const handleGetReport = () => {
        console.log({ maleInputField, femaleInputField });

        if (userCustomerDataById) {
            const payload = {
                data: {
                    customerId: userCustomerDataById?._id,
                    maleKundliData: {
                        name: maleInputField?.name,
                        dob: maleInputField?.birth_date_time,
                        tob: maleInputField?.birth_date_time,
                        place: maleInputField?.place_of_birth,
                        lat: maleInputField?.latitude,
                        lon: maleInputField?.longitude
                    },
                    femaleKundliData: {
                        name: femaleInputField?.name,
                        dob: femaleInputField?.birth_date_time,
                        tob: femaleInputField?.birth_date_time,
                        place: femaleInputField?.place_of_birth,
                        lat: femaleInputField?.latitude,
                        lon: femaleInputField?.longitude
                    }
                },
                onComplete: (id) => navigate(`/kundli-matching/reports/${id}`)
            }
            //! Dispatch API For Create Profile
            handleValidation() && dispatch(ProfileActions.createKundliMatchingProfile(payload));
        } else {
            toaster.info({ text: 'Please Login' })
        }
    };

    return (
        <>
            <TopHeaderSection title={'Kundli Matching'} />

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article className='flex flex-col items-center justify-center gap-5 text-center font-[400] text-[15px] text-gray-800'>
                    <div className='text-3xl font-bold text-black'>Kundli Matching | Kundli Match for Marriage | Horoscope Matching</div>
                    <div>Have you finalized the person you wish to get married to and want to do the Kundali matching?</div>
                    <div>Do you want to check if the person with whom you are vibing well is compatible enough, as per astrology, to get married?</div>
                    <div className='text-justify'>Before proceeding to marriage, which is a turning point for any individual, Kundali Milan is performed to ensure a good compatibility in the future between the couple. A compatibility score of 18 and above is usually considered auspicious for a successful marriage. However, gun milan should not be the only criteria to judge the forecast of marriage as planetary positions and their effect on compatibility are also significant factors. It is suggested the prospective couple gets the Kundali matching by name and date of birth details assessed further by expert astrologers to study if the aspects essential for great compatibility are matched well. So, let us find a general outline of the Kundli Milan for marriage and check the compatibility between couples.</div>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article className='flex flex-col items-center justify-center gap-5 text-center font-[400] text-[15px] text-gray-800'>
                    <div className='text-2xl font-bold text-black'>Enter Details to Get Free Online Kundali Matching Report For Marriage</div>
                    <div>Anytime Astro is a premium online horoscope-matching site that can help you check Kundali Milan by name and date of birth. Here, the team of expert astrologers analyze the compatibility of both the partners and present accurate results based upon the Ashtakoots or eight categories considered to check the var vadhu gun milan.</div>
                    <div>So, what keeps you waiting, check your marriage compatibility by entering below the details of both partners, such as name, birth date, birth time, and birthplace for horoscope matching by date of birth.</div>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article className='flex flex-col border rounded-lg shadow-xl '>
                    <div className='text-center bg-primary text-white py-2 px-5 font-semibold rounded-t-lg'>Enter Details</div>
                    <main className='flex gap-4 p-5'>
                        <form className='flex-1 px-5 my-8 flex flex-col gap-6'>
                            <div className='flex flex-col gap-1'>
                                <label className='text-grey text-sm'>Boy Name</label>
                                <input name='name' value={maleInputField?.name} onChange={handleMaleInputField} onFocus={(e) => handleInputFieldError('boysName', null)} type='text' placeholder='Name' className={`w-[100%] outline-none border border-greybg ${inputFieldError?.boysName && 'border-red-600'} focus:border-green-500 px-5 py-[10px] rounded-sm text-sm`} />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='text-grey text-sm'> Birth Date & Time</label>
                                <input name='birth_date_time' value={maleInputField?.birth_date_time} onChange={handleMaleInputField} onFocus={(e) => handleInputFieldError('boysDOB', null)} type='datetime-local' className={`w-[100%] outline-none border border-greybg ${inputFieldError?.boysDOB && 'border-red-600'} focus:border-green-500 px-5 py-[10px] rounded-sm text-sm`} />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='text-grey text-sm'>Place of Birth</label>
                                <Autocomplete
                                    onLoad={(ref) => (autocompleteRefMale.current = ref)}
                                    onPlaceChanged={handleMalePlaceSelect}
                                >
                                    <input
                                        type='text'
                                        name='place_of_birth'
                                        value={maleInputField.place_of_birth}
                                        onChange={handleMaleInputField} onFocus={(e) => handleInputFieldError('boysPlaceOfBirth', null)}
                                        className={`w-[100%] outline-none border border-greybg ${inputFieldError?.boysPlaceOfBirth && 'border-red-600'} focus:border-green-500 px-5 py-[10px] rounded-sm text-sm`}
                                        placeholder='Enter place of birth'
                                    />
                                </Autocomplete>
                            </div>
                        </form>

                        <form className='flex-1 px-5 my-8 flex flex-col gap-6'>
                            <div className='flex flex-col gap-1'>
                                <label className='text-grey text-sm'>Girl Name</label>
                                <input name='name' value={femaleInputField?.name} onChange={handleFemaleInputField} onFocus={(e) => handleInputFieldError('girlsName', null)} type='text' placeholder='Name' className={`w-[100%] outline-none border border-greybg ${inputFieldError?.girlsName && 'border-red-600'} focus:border-green-500 px-5 py-[10px] rounded-sm text-sm`} />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='text-grey text-sm'> Birth Date & Time</label>
                                <input name='birth_date_time' value={femaleInputField?.birth_date_time} onChange={handleFemaleInputField} onFocus={(e) => handleInputFieldError('girlsDOB', null)} type='datetime-local' className={`w-[100%] outline-none border border-greybg ${inputFieldError?.girlsDOB && 'border-red-600'} focus:border-green-500 px-5 py-[10px] rounded-sm text-sm`} />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label className='text-grey text-sm'>Place of Birth</label>
                                <Autocomplete
                                    onLoad={(ref) => (autocompleteRefFemale.current = ref)}
                                    onPlaceChanged={handleFemalePlaceSelect}
                                >
                                    <input
                                        type='text'
                                        name='place_of_birth'
                                        value={femaleInputField.place_of_birth}
                                        onChange={handleFemaleInputField} onFocus={(e) => handleInputFieldError('girlsPlaceOfBirth', null)}
                                        className={`w-[100%] outline-none border border-greybg ${inputFieldError?.girlsPlaceOfBirth && 'border-red-600'} focus:border-green-500 px-5 py-[10px] rounded-sm text-sm`}
                                        placeholder='Enter place of birth'
                                    />
                                </Autocomplete>
                            </div>
                        </form>
                    </main>
                    <div onClick={() => handleGetReport()} className='bg-primary text-white px-5 py-1.5 rounded-full self-end mr-5 mb-10 cursor-pointer'>Get Report</div>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article className='flex flex-col items-center justify-center gap-5 text-center font-[400] text-[15px] text-gray-800'>
                    <div className='text-2xl font-bold text-black'>Kundali Matching Analysis</div>
                    <div>Got the Patrika Matching analysis, but not sure about what it means. Rest assured, connect with expert astrologers instantly over call or chat to ensure minute details about your compatibility and also receive recommendations to fix any issues that might hinder in marital life.</div>
                    <div>Connect with astrologers now!</div>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article className='font-[400] text-[15px] text-gray-800'>
                    <div className='flex flex-col items-center gap-2 mb-10'>
                        <div className='text-3xl font-bold text-black uppercase text-center'>Online Kundali Matching Process (How it works?)</div>
                        <div className='w-[150px] h-[3px] bg-primary'></div>
                    </div>
                    <div>The process for Kundli Milan for marriage works as follows -</div>

                    <main className='flex flex-col gap-3 py-5 text-justify'>
                        <div><span className='text-gray-900 font-semibold'>Step 1: </span>Enter the details of both partners, such as their name, birthdate, birthplace, and birth time. Make sure you enter the correct details for an accurate Janam Kundli matching.</div>
                        <div><span className='text-gray-900 font-semibold'>Step 2: </span>The system will generate a horoscope matching for marriage based on the details provided.</div>
                        <div><span className='text-gray-900 font-semibold'>Step 3: </span>Gun Milan by name and other birth-related details are analyzed for both potential partners by the software. The compatibility score is generated based on eight factors, namely Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi.</div>
                        <div><span className='text-gray-900 font-semibold'>Step 4: </span>Based on the scores of each guna, the compatibility gets calculated. The higher the score, the higher the compatibility, and vice versa. However, other factors are also considered while analyzing, which can be done by expert astrologers.</div>
                        <div><span className='text-gray-900 font-semibold'>Step 5: </span>The system then produces a detailed analysis concerning each factor and offers precautions or recommendations if required.</div>
                        <div><span className='text-gray-900 font-semibold'>Step 6: </span>It is recommended to consult expert astrologers for further clarifications and insights.</div>
                    </main>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article className='font-[400] text-[15px] text-gray-800'>
                    <div className='flex flex-col items-center gap-2 mb-10'>
                        <div className='text-3xl font-bold text-black uppercase text-center'>Benefits of Online Kundali Matching or Online Horoscope Matching</div>
                        <div className='w-[150px] h-[3px] bg-primary'></div>
                    </div>
                    <div>The online free kundali matching site provides the following benefits -</div>

                    <ul className='list-disc pl-10 pt-5 text-justify'>
                        <li>Check your compatibility anytime, anywhere! You no longer need to book an appointment with the astrologers when you can do online kundali matching for marriage.</li>
                        <li>Online kundli matching for marriage helps you save a lot of time and effort, as you don't need to travel to meet the astrologers traditionally in person.</li>
                        <li>Various online Kundali matching apps offer personalized consultation services, too, and give clarity on compatibility concerns.</li>
                        <li>The online Janam Patrika milan can deliver results in no time, which can present a great help considering arranged marriages.</li>
                        <li>The free kundali matching presents a detailed analysis of all the compatibility factors, thus helping to make informed decisions.</li>
                        <li>Even the best kundli matching apps seem more affordable than the customary methods, thus making them accessible to a wide range of populations.</li>
                        <li>Lesser chances of errors as online free kundali matching uses algorithms established to eliminate human biases and provide transparency.</li>
                    </ul>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article className='flex justify-between items-center bg-primary text-white'>
                    <main className='flex-1 flex items-center justify-center flex-col gap-5 max-lg:gap-2 text-center px-10 max-lg:px-4 py-4'>
                        <div className='text-3xl max-lg:text-xl'>ARE YOU GETTING MARRIED TO THE RIGHT PERSON?</div>
                        <div>Get answers to all your questions right here.</div>
                        <div onClick={() => navigate('/astrologer')} className='cursor-pointer bg-red-900 flex items-center gap-1.5 px-4 py-2 rounded-full hover:bg-white hover:text-black hover:shadow-xl border-2 border-red-900 transition-all duration-300 ease-in'>Ask An Astrologer Now</div>
                    </main>
                    <img src='https://astroway.diploy.in/public/frontend/astrowaycdn/astroway/web/content/images/ads/indian-bride-ads.png' className='pr-10 py-4 h-72 max-lg:h-60 max-md:h-52' />
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] py-[50px]'>
                <article className='font-[400] text-[15px] text-gray-800'>
                    <div className='flex flex-col items-center gap-2 mb-10'>
                        <div className='text-3xl font-bold text-black uppercase text-center'>Finding the Right Partner Through Kundli Matching</div>
                        <div className='w-[150px] h-[3px] bg-primary'></div>
                    </div>
                    <div>The Hindu culture has always favored Kundali matching by date of birth to check the compatibility among the prospective partners. Let us explore the reasons why Kundli matching helps to find an ideal partner for having a successful and lasting marriage -</div>

                    <ul className='list-disc pl-10 pt-5 text-justify'>
                        <li>The temperament, health, financials, intellect, and family of partners can be evaluated by horoscope matching by name and other birth details.</li>
                        <li>In the Kundali Milan by date of birth, the eight vital aspects are evaluated by considering behavior, personality, and spirituality.</li>
                        <li>A higher gun milan means stronger compatibility and vice between the partners.</li>
                        <li>The Kundali matching by name and other birth details provides an analysis of more than just the compatibility score, such as the potential strengths and weaknesses.</li>
                        <li>Based on the results, one can consult astrologers to seek personalized guidance, yet clarifying concerns.</li>
                    </ul>
                </article>
            </section >
        </>
    )
}

export default KundliMatching;