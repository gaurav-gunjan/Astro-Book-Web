import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZodiacImageWithName } from '../../../utils/static-data';
import TopHeaderSection from '../../../components/common/TopHeaderSection';

const dateHead = ['Yesterday', 'Today', 'Tomorrow'];

const DailyHoroscope = () => {
    const navigate = useNavigate();

    const [activeDateHead, setActiveDateHead] = useState('Today');

    return (
        <>
            <TopHeaderSection title={'Daily Horoscope'} />

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article>
                    <div className='text-center'>Confused about how your day would turn out to be? Find out if today is the day to make big decisions. Read your Daily Horoscope forecast and get insights regarding different aspects of your life to plan your day better.</div>

                    <main className='px-7 flex justify-center gap-4 py-[50px]'>
                        {dateHead?.map((value, index) => <div onClick={() => setActiveDateHead(value)} key={index} className={`w-28 border text-center border-primary ${activeDateHead == value && 'bg-primary text-white'} hover:scale-105 px-5 py-2 rounded-md cursor-pointer flex items-center justify-center transition-all duration-300`}>{value}</div>)}
                    </main>

                    <main className='pb-[50px] flex flex-wrap justify-between items-center gap-5'>
                        {ZodiacImageWithName?.map((value, index) => (
                            <div onClick={() => navigate(value?.zodiacSign, { state: { zodiacImage: value?.image, day: activeDateHead } })} key={index} className='xl:basis-[15%] max-lg:basis-[20%] max-md:basis-[30%] flex flex-col gap-3 items-center justify-center border px-5 py-4 rounded-lg shadow-xl cursor-pointer'>
                                <img src={value?.image} className='w-28 h-28' />
                                <div className='font-semibold text-primary'>{value?.title}</div>
                            </div>
                        ))}
                    </main>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article className='font-[400] text-[15.5px] text-gray-800'>
                    <div className='flex flex-col items-center gap-2 mb-10'>
                        <div className='text-3xl font-bold text-black uppercase text-center'>Why Should You Check Your Horoscope Daily?</div>
                        <div className='w-[150px] h-[3px] bg-primary'></div>
                    </div>

                    <main className='flex flex-col gap-4 text-justify'>
                        <div>If today is the right day for new beginnings? Or if this day will have opportunities or challenges in store?</div>
                        <div>Every day is like a new page in the book of our life. While some days are for hustle, on some days all you need to do is take a back seat and let situations reveal their outcome. What if there is a way from which you can get clarity about your day ahead and know what needs to be done. The daily Horoscope of an individual is a prediction about what different situations in your life such as regarding career, health, relationship, etc. are going to be like.</div>
                        <div>The position of celestial bodies like the Sun, the Moon, and planets change frequently and they often enter into new Houses and Zodiac signs leaving the former ones. With this movement, the life situations of an individual also get affected.</div>
                        <div>Daily Horoscope is created by deeply analyzing the position and effect of the celestial bodies on a particular day and how it affects different aspects of the life of an individual.</div>
                        <div>Your Daily Horoscope can help you decipher upcoming challenges and reveal opportunities coming towards you. You get better clarity about the roadblocks that are restricting you to get peace of mind and success. These predictions give you greater confidence about your day ahead and help you steer your life in the right direction by making the right decisions.</div>
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

export default DailyHoroscope;