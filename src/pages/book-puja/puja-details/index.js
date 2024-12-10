import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../../utils/api-urls';
import { IndianRupee } from '../../../utils/common-function';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import * as EcommerceActions from '../../../redux/actions/ecommerceActions';

const aboutPuja = [
    { heading: 'What are the benefits?', bulletPoint: ['Helps in better bonding with partner', 'Helps in increasing faithfulness with partner', 'Stabilizes your emotional energy system', 'Fulfils desired relationship goals'] },
    { heading: 'What are the benefits?', bulletPoint: ['Helps in better bonding with partner', 'Helps in increasing faithfulness with partner', 'Stabilizes your emotional energy system', 'Fulfils desired relationship goals'] },
    { heading: 'What are the benefits?', bulletPoint: ['Helps in better bonding with partner', 'Helps in increasing faithfulness with partner', 'Stabilizes your emotional energy system', 'Fulfils desired relationship goals'] }
];

const PujaDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const puja = location.state && location?.state?.pujaData;
    const { userCustomerDataById } = useSelector(state => state?.userReducer);

    const handleBookPuja = () => {
        const payload = {
            amount: puja?.price,
            data: { userId: userCustomerDataById?._id, pujaId: puja?._id, mode: 'online' },
            user: userCustomerDataById,
            onComplete: () => navigate('/my-order?active-tab=book-history')
        };

        console.log("Book Puja Payload: ", payload);

        //! Dispatch API for Booking Puja
        dispatch(EcommerceActions?.bookApprovedCreatedPuja(payload));
    };

    useEffect(() => {
        !puja && navigate('/book-puja')
    }, []);

    return (
        <>
            <TopHeaderSection />

            <section className='px-[80px] py-7 max-sm:px-[20px]'>
                <main className='flex flex-wrap gap-7 pb-10 border-b border-black'>
                    <img src={api_urls + 'uploads/' + puja?.image} alt="puja" className='flex-1 rounded-md w-full h-auto sm:h-60 border-2 border-gray-500' />
                    <div className='flex-1 flex flex-col gap-3 items-start'>
                        <h4 className='text-lg sm:text-2xl font-bold'> {puja?.pujaName} </h4>
                        <h4 className='text-lg sm:text-xl font-[500]'>Price : <span className='text-[#009E43] text-base'>{IndianRupee(puja?.price)}</span></h4>
                        <div className='flex items-center gap-3'>
                            <div className='bg-black text-white text-sm font-[500] py-2 px-14'>05h : 19m : 49s left</div>
                            <div className='text-[#009E43]'>05 hours left</div>
                        </div>
                        <button onClick={() => handleBookPuja()} className='bg-black hover:bg-primary text-white text-sm font-[500] py-3.5 px-14 transition-all duration-300 ease-in'>Buy Now</button>
                    </div>
                </main>
            </section>

            <section className='px-[80px] py-7 max-sm:px-[20px] pb-20'>
                <main className='flex flex-wrap gap-[5%] gap-y-7'>
                    <div className='basis-[47.5%] max-md:basis-full flex flex-col gap-2'>
                        <div className='flex items-center gap-4'>
                            <div className='h-16 w-16 bg-gray-300 rounded-full'><img className='h-full w-full rounded-full' src='https://s3-alpha-sig.figma.com/img/3e6f/c5da/488d2a0afab2720b1f710e9bc4a3feaf?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LJV9-Kz1oIjUN4aogomlSfELDx4f1MMudzsRS0XaCvm5PEWuwYJ80kWPKRc~ZKD5pxohZz3BpeGFGOHcVHX8tVz1IdOKarXiIwJY7wdnAgPuIIq8LBhqa1ypHaIhjLBKkyzXX4wV1vu9LXmUQjdinKYDHOlb8ZIPbH~eb1MdpQYPOunwDERcYUTpER6P4LZBqzv1sGzZro-IkO5m0WZlhLts0vmHgCoOA090gt8ihDBKLuhK8Yy~JK0exh7ZNoKAQCZJrfMSurPSouCovlqETczsprQs9ZnJzKpkx7sPNpY~AVjRgnwqplnEnQYDOwGNFjTjE0XvFKrIJKaSnCUwFg__' /></div>
                            <div>
                                <div className='font-[500] text-lg'>Rama</div>
                                <div className='text-xs'>Psychic Expert</div>
                            </div>
                        </div>
                        <div>Rama understands the problems of the customers and gives them clarity and insight regarding life</div>
                    </div>
                    {aboutPuja?.map((value, index) => (
                        <div key={index} className={`basis-[47.5%] max-md:basis-full ${index % 2 == 0 && 'md:border-l border-black pl-5'}`}>
                            <div className='text-lg font-[500] mb-2.5'>{value?.heading}</div>
                            <ul className='px-8'>{value?.bulletPoint?.map((bullet, index) => (
                                <li key={index} className='list-disc'>{bullet}</li>
                            ))}</ul>
                        </div>
                    ))}
                </main>
            </section>
        </>
    )
}

export default PujaDetails;