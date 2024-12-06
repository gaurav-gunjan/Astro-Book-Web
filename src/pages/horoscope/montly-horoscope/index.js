import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ZodiacImageWithName } from '../../../utils/static-data';
import TopHeaderSection from '../../../components/common/TopHeaderSection';

const MonthlyHoroscope = () => {
    const navigate = useNavigate();

    return (
        <>
            <TopHeaderSection title={'Monthly Horoscope'} />

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article>
                    <div className='text-center'>Confused about how your day would turn out to be? Find out if today is the day to make big decisions. Read your Daily Horoscope forecast and get insights regarding different aspects of your life to plan your day better.</div>

                    <main className='py-[50px] flex flex-wrap justify-between items-center gap-5'>
                        {ZodiacImageWithName?.map((value, index) => (
                            <div onClick={() => navigate(value?.zodiacSign, { state: { zodiacImage: value?.image } })} key={index} className='xl:basis-[15%] max-lg:basis-[20%] max-md:basis-[30%] flex flex-col gap-3 items-center justify-center border px-5 py-4 rounded-lg shadow-xl cursor-pointer'>
                                <img src={value?.image} className='w-28 h-28' />
                                <div className='font-semibold text-primary'>{value?.title}</div>
                            </div>
                        ))}
                    </main>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] py-[50px]'>
                <article className='flex justify-between items-center bg-primary text-white'>
                    <main className='flex-1 flex items-center justify-center flex-col gap-5 max-lg:gap-2 text-center px-10 max-lg:px-4 py-4'>
                        <div className='text-3xl max-lg:text-xl'>WILL YOU BE RICH AND SUCCESSFUL IN FUTURE?</div>
                        <div>Know what’s written in your stars!</div>
                        <div onClick={() => navigate('/astrologer')} className='cursor-pointer bg-red-900 flex items-center gap-1.5 px-4 py-2 rounded-full hover:bg-white hover:text-black hover:shadow-xl border-2 border-red-900 transition-all duration-300 ease-in'>Ask An Astrologer Now</div>
                    </main>
                    <img src='https://astroway.diploy.in/public/frontend/astrowaycdn/astroway/web/content/images/ads/success-future.png' className='pr-10 py-4 h-72 max-lg:h-60 max-md:h-52' />
                </article>
            </section>
        </>
    )
}

export default MonthlyHoroscope;