import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../../utils/api-urls';
import { IndianRupee } from '../../../utils/common-function';
import { toaster } from '../../../utils/services/toast-service';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import * as EcommerceActions from '../../../redux/actions/ecommerceActions';

const PujaDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const puja = location.state && location?.state?.pujaData;
    const { userCustomerDataById } = useSelector(state => state?.userReducer);

    const [pujaDateTime, setPujaDateTime] = useState(null);

    const handleBookPuja = () => {
        if (!pujaDateTime) {
            toaster?.info({ text: 'Please enter date and time' })
            return
        };

        const payload = {
            amount: puja?.price,
            data: { userId: userCustomerDataById?._id, pujaId: puja?._id, date: pujaDateTime, time: pujaDateTime, mode: 'online' },
            user: userCustomerDataById,
            onComplete: () => navigate('/my-order?active-tab=book-history')
        };

        console.log("Book Puja Payload: ", payload);

        //! Dispatch API for Booking Puja
        dispatch(EcommerceActions?.bookPuja(payload));
    };

    return (
        <>
            <TopHeaderSection title={puja?.pujaName} />

            <section className='px-5 py-7 sm:px-10 md:px-20 lg:px-[100px]'>
                <main className='flex flex-wrap gap-7'>
                    <img src={api_urls + 'uploads/' + puja?.image} alt="puja" className='basis-[30%] rounded-md w-full h-auto sm:h-96 border-2 border-gray-500' />
                    <div className='flex-1 flex flex-col items-start'>
                        <h4 className='text-lg sm:text-xl font-bold'> {puja?.pujaName} </h4>
                        <div className='text-gray-600 font-bold py-2 flex gap-2 items-center'>MRP: <div className='flex gap-2 items-center text-primary'>{IndianRupee(puja?.price)}</div></div>

                        <div className='flex items-center gap-5 mt-4'>
                            <input onChange={(e) => setPujaDateTime(e?.target?.value)} type='datetime-local' className='outline-none border border-black px-3 py-1 rounded-md' />
                            <button onClick={() => handleBookPuja()} className='bg-primary hover:bg-orange-400 text-white text-sm py-2 px-4 rounded transition-all duration-300 ease-in'>Book Puja</button>
                        </div>

                        <div className='bg-gray-200 p-4 my-4 rounded-lg flex flex-col gap-2 flex-1'>
                            <h4 className='font-[500] text-lg text-gray-800'>What is {puja?.pujaName}?</h4>
                            <div className='text-[15px] text-justify'>{puja?.description}</div>
                        </div>
                    </div>
                </main>

                {/* <div className='bg-gray-200 p-4 my-4 rounded-lg flex flex-col gap-2'>
                    <h4 className='font-[500] text-lg text-gray-800'>What is {puja?.pujaName}?</h4>
                    <div className='text-[15px]'>{puja?.description}</div>
                </div> */}
            </section>
        </>
    )
}

export default PujaDetails;