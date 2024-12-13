import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../../utils/api-urls';
import { CalculateTimeDifference, IndianRupee, SecondToHMS } from '../../../utils/common-function';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import * as EcommerceActions from '../../../redux/actions/ecommerceActions';
import moment, { duration } from 'moment';

const PujaDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const pujaData = location.state && location?.state?.pujaData;
    console.log("Puja Data: ", pujaData);

    const [timeLeft, setTimeLeft] = useState(null);

    const { userCustomerDataById } = useSelector(state => state?.userReducer);

    const handleBookPuja = () => {
        const payload = {
            amount: pujaData?.price,
            data: {
                customerId: userCustomerDataById?._id, astrologerId: pujaData?.astrologerId?._id, amount: pujaData?.price, pujaId: pujaData?.poojaId?._id, pujaDate: pujaData?.poojaDate, pujaTime: pujaData?.poojaTime, duration: pujaData?.duration, price: pujaData?.price, adminCommission: pujaData?.adminCommission
            },
            user: userCustomerDataById,
            onComplete: () => navigate('/my-order?active-tab=book-history')
        };

        console.log("Book Puja Payload: ", payload);

        //! Dispatch API for Booking Puja
        dispatch(EcommerceActions?.bookApprovedCreatedPuja(payload));
    };

    useEffect(() => {
        !pujaData && navigate('/book-puja')

        const updateInterval = setInterval(() => {
            const difference = CalculateTimeDifference(pujaData?.poojaDate);
            setTimeLeft(difference);
        }, 1000);

        return () => clearInterval(updateInterval);
    }, []);

    return (
        <>
            <TopHeaderSection />

            <section className='px-[80px] py-7 max-sm:px-[20px]'>
                <main className='flex flex-wrap gap-7 pb-10 border-b border-black'>
                    <img src={api_urls + 'uploads/' + pujaData?.poojaId?.image} alt="puja" className='flex-1 rounded-md w-full h-auto sm:h-60 border-2 border-gray-500' />
                    <div className='flex-1 flex flex-col gap-3 items-start'>
                        <h4 className='text-lg sm:text-2xl font-bold'> {pujaData?.poojaId?.pujaName} </h4>
                        <h4 className='text-lg sm:text-xl font-[500]'>Price : <span className='text-[#009E43] text-base'>{IndianRupee(pujaData?.price)}</span></h4>
                        <h4 className='font-[500]'>Duration : <span className='text-[#009E43] text-base'>{SecondToHMS(pujaData?.duration)}</span></h4>
                        <div className='flex items-center gap-3'>
                            {!timeLeft ? <div className='animate-spin p-2 border-2 border-black -mt-1 mr-3'></div> : <div className='bg-black text-white text-sm font-[500] py-2 px-14'>{timeLeft} left</div>}
                            <div className='text-[#009E43] text-sm'>{moment(pujaData?.poojaDate)?.diff(moment?.utc(), 'hours')} hours left</div>
                            {/*   <div className='text-[#009E43] text-sm'>{moment('2024-12-10T20:00:00.000Z')?.local().diff(moment().local(), 'hours')} hours left</div>
                            <div className='text-[#009E43] text-sm'>{moment('2024-12-10T20:00:00.000Z').utcOffset(130).diff(moment().utcOffset(130), 'hours')} hours left</div>
                            <div>{moment("2024-12-10T20:00:00.000Z", "YYYYMMDD").fromNow()}</div> */}
                        </div>
                        {/* <div>{moment(pujaData?.poojaDate)?.utc()?.format('hh:mm:ss a')}</div>
                        <div>{moment(pujaData?.poojaDate)?.utc()?.format('DD MMM YYYY hh:mm:ss a')}</div>
                        <div>{moment(new Date())?.utc()?.format('DD MMM YYYY hh:mm:ss a')}</div>
                        <div>{moment(new Date())?.format('DD MMM YYYY hh:mm:ss a')}</div> */}
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
                                <div className='font-[500] text-lg'>{pujaData?.astrologerId?.astrologerName}</div>
                                <div className='text-xs'>{pujaData?.astrologerId?.skill?.map(item => item?.skill)?.join(' , ')}</div>
                            </div>
                        </div>
                        <div>{pujaData?.astrologerId?.long_bio} life</div>
                    </div>
                    {pujaData?.poojaId?.about?.map((value, index) => (
                        <div key={index} className={`basis-[47.5%] max-md:basis-full ${index % 2 == 0 && 'md:border-l border-black md:pl-5'}`}>
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