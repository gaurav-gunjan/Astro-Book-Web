import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TopHeaderSection from '../../../../components/common/TopHeaderSection';
import * as AstrologyApiActions from '../../../../redux/actions/astrologyApiAction';

const HoroscopeDetails = () => {
    const dispatch = useDispatch();
    const { zodiacSign } = useParams();
    const location = useLocation();
    const zodiacImage = location?.state?.zodiacImage;
    const day = location?.state?.day;

    const { isLoading } = useSelector(state => state?.commonReducer);
    const { dailyHoroscopeData } = useSelector(state => state?.astrologyApiReducer);

    useEffect(() => {
        dispatch(AstrologyApiActions.getDailyHoroscope({ zodiacSign, day }));

        return () => dispatch(AstrologyApiActions.setDailyHoroscope(null));
    }, []);

    return (
        <>
            <TopHeaderSection title={zodiacSign} />

            <section className='px-[100px] max-lg:px-[20px] py-[50px]'>
                <article>
                    <div className="relative flex justify-center mb-[50px]">
                        <hr className="w-full" />
                        <div><img src={zodiacImage} alt="logo img" className="absolute h-10 -translate-y-1/2 bg-white px-4" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }} /></div>
                    </div>

                    {isLoading ?
                        <main className='flex flex-col gap-7'>
                            {Array(5).fill('').map((value, index) => (
                                <div className='flex flex-col gap-2' key={index}>
                                    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                                        <div className='h-7 w-60'><Skeleton height={'100%'} /></div>
                                        <div className='h-5'><Skeleton height={'100%'} /></div>
                                        <div className='h-5'><Skeleton height={'100%'} /></div>
                                        <div className='h-5'><Skeleton height={'100%'} /></div>
                                    </SkeletonTheme>
                                </div>
                            ))}
                        </main>
                        :
                        <main className='flex flex-col gap-4 text-[15.5px] text-gray-800 text-justify '>
                            {dailyHoroscopeData && Object.keys(dailyHoroscopeData)?.map(((value, index) => (
                                <div key={index}>
                                    <div className='text-lg font-semibold capitalize'>{value}</div>
                                    <div>{dailyHoroscopeData[value]}</div>
                                </div>
                            )))}
                        </main>}
                </article>
            </section>
        </>
    )
}

export default HoroscopeDetails;