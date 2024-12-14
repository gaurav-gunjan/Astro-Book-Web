import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BotSvg, EmailSvg, FacebookSvg, InstagramSvg, LinkedinSvg, SecureSvg, YoutubeSvg } from '../../assets/svg';
import { generateTokenByRequestPermission } from '../../config/firebase-config';
import AstrologerLoginModal from '../modal/AstrologerLoginModal';

const Footer = ({ scrollToSection }) => {
    const { userCustomerDataById, userAstrologerDataById } = useSelector(state => state?.userReducer);
    // Todo : Astrolger Login Start
    const [loginAstrologerModal, setLoginAstrologerModal] = useState(false);

    const handleOpenLoginAstrologerModal = async () => {
        console.log('Astrologer login button clicked');

        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
        } else if (Notification.permission === "granted") {
            generateTokenByRequestPermission();
            setLoginAstrologerModal(true)

        } else if (Notification.permission === "denied") {
            alert("You have blocked notifications. Please enable them in your browser settings.");

        } else if (Notification.permission === "default") {
            console.log('Requesting Notification Permission');
            const permission = await Notification.requestPermission();
        }
    };

    const handleCloseLoginAstrologerModal = () => setLoginAstrologerModal(false);

    return (
        <>
            <footer className='bg-[#363636] text-[#DDDDDD] text-[15px] font-[400] px-[150px] max-lg:px-[20px] py-[50px] pb-[70px] max-lg:py-[20px]'>
                <div className='flex flex-col gap-2 border-b border-[#7D7D7D] pb-3 mb-5'>
                    <span className='text-[17px] font-[500] border-b-2 border-[#F0DF20] inline-block pb-1 self-start'>About AstroBook</span>
                    <div className='text-justify'><span className='font-[500]'>AstroBook</span> is the best astrology website for online Astrology predictions. Talk to Astrologer on call and get answers to all your worries by seeing the future life through Astrology Kundli Predictions from the best Astrologers from India. Get best future predictions related to Marriage, love life, Career or Health over call, chat, query or report.</div>
                </div>
                <article className='flex flex-wrap justify-between gap-x-[1%] gap-y-10'>
                    <main className='max-lg:basis-[45%] max-md:basis-full basis-[24%] flex flex-col gap-7'>
                        <main className='flex flex-col gap-3'>
                            <span className='text-[17px] font-[500] border-b-2 border-[#F0DF20] inline-block pb-1 self-start'>Horoscope</span>
                            <Link to='/horoscope/daily'>Horoscope 2024</Link>
                            <Link to='horoscope/daily'>Today's Horoscope</Link>
                            <Link to='horoscope/daily'>Today's Love Horoscope</Link>
                            <Link to='horoscope/daily'>Yesterday's Horoscope</Link>
                            <Link to='horoscope/daily'>Tomorrow's Horoscope</Link>
                            <Link to='/horoscope/monthly'>Weekly Horoscope</Link>
                            <Link to='/horoscope/monthly'>Monthly Horoscope</Link>
                            <Link to='/horoscope/monthly'>Yearly Horoscope</Link>
                        </main>

                        <main className='flex flex-col gap-3'>
                            <span className='text-[17px] font-[500] border-b-2 border-[#F0DF20] inline-block pb-1 self-start'>Shubh Muhurat 2024</span>
                            <Link to='/astrologer'>Annanprashan Muhurat 2024</Link>
                            <Link to='/astrologer'>Naamkaran Muhurat 2024</Link>
                            <Link to='/astrologer'>Car/Bike Muhurat 2024</Link>
                            <Link to='/astrologer'>Marriage Muhurat 2024</Link>
                            <Link to='/astrologer'>Gold Buying Muhurat 2024</Link>
                            <Link to='/astrologer'>Bhoomi Pujan Muhurat 2024</Link>
                            <Link to='/astrologer'>Griha Pravesh Muhurat 2024</Link>
                            <Link to='/astrologer'>Mundan Muhurat 2024</Link>
                        </main>
                    </main>

                    <main className='max-lg:basis-[45%] max-md:basis-full basis-[24%] flex flex-col gap-3'>
                        <span className='text-[17px] font-[500] border-b-2 border-[#F0DF20] inline-block pb-1 self-start'>Important Links</span>
                        <Link to='/astro-mall'>Astromall</Link>
                        <Link to='/'>Astrotalk Store</Link>
                        <Link to='/'>Today Panchang</Link>
                        <Link to='/astrologer'>Live Astrologers</Link>
                        <Link to='/free-kundli'>How to read kundali</Link>
                        <Link to='/free-kundli'>Free Kundli</Link>
                        <Link to='/kundli-matching'>Kundli Matching</Link>
                        <Link to='/astrologer'>Chat with Astrologer</Link>
                        <Link to='/astrologer'>Talk to Astrologer</Link>
                        <Link to='/'>AstroBook Reviews</Link>
                        <Link to='/'>Astrology Yoga</Link>
                        <Link to='/'>Kaalsarp Doshas</Link>
                        <Link to='/'>Child Astrology</Link>
                        <Link to='/'>Ascendant Sign Gemstone</Link>
                        <Link to='/'>Nakshatras Constellations</Link>
                        <Link to='/'>Numerology</Link>
                        <Link to='/'>Mantras</Link>
                        <Link to='/'>Astrological remedies for job</Link>
                        <Link to='/'>Promotion</Link>
                    </main>

                    <main className='max-lg:basis-[45%] max-md:basis-full basis-[24%] flex flex-col gap-7'>
                        <main className='flex flex-col gap-3'>
                            <span className='text-[17px] font-[500] border-b-2 border-[#F0DF20] inline-block pb-1 self-start'>Important Links</span>
                            <Link to='/blog'>Blog</Link>
                            <Link to='/'>Planetary Transit 2024</Link>
                            <Link to='/'>Collaboration</Link>
                            <Link to='/'>Tarot</Link>
                            <Link to='/'>Zodiac Signs</Link>
                            <Link to='/'>Vastu Shastra</Link>
                            <Link to='/'>Solar Eclipse 2024</Link>
                            <Link to='/'>Lunar Eclipse 2024</Link>
                            <Link to='/'>Festival Calendar 2024</Link>
                            <Link to='/'>Vrat Calendar 2024</Link>
                            <Link to='/'>Mole Astrology</Link>
                            <Link to='/'>Love Calculator</Link>
                            <Link to='/'>AstroBook Sitemap</Link>
                        </main>

                        {!userCustomerDataById && !userAstrologerDataById && <main className='flex flex-col gap-3'>
                            <span className='text-[17px] font-[500] border-b-2 border-[#F0DF20] inline-block pb-1 self-start'>Astrologer</span>
                            <div onClick={handleOpenLoginAstrologerModal} className='cursor-pointer'>Astrologer Login</div>
                            {/* <Link to=''>Astrologer Registration</Link> */}
                        </main>}

                        <main className='flex flex-col gap-3'>
                            <span className='text-[17px] font-[500] border-b-2 border-[#F0DF20] inline-block pb-1 self-start'>Corporate Info</span>
                            <Link to='/'>Refund & Cancellation Policy</Link>
                        </main>
                    </main>

                    <main className='max-lg:basis-[45%] max-md:basis-full basis-[24%] flex flex-col gap-7'>
                        <main className='flex flex-col gap-3'>
                            <span className='text-[17px] font-[500] border-b-2 border-[#F0DF20] inline-block pb-1 self-start'>Corporate Info</span>
                            <Link to='/terms-of-use'>Terms & Conditions</Link>
                            <Link to='/privacy-policy'>Privacy Policy</Link>
                            <Link to='/'>Disclaimer</Link>
                            <Link to='/about-us'>About Us</Link>
                            <Link to='/'>Pricing Policy</Link>
                        </main>

                        <main className='flex flex-col gap-3'>
                            <span className='text-[17px] font-[500] border-b-2 border-[#F0DF20] inline-block pb-1 self-start'>Contact us</span>
                            <div className='flex items-center gap-1'><BotSvg /> We are available 24x7 on chat </div>
                            <a href="mailto:contact@astrobook.com">Support, <span className='text-[#F0DF20]'>click to start chat</span></a>
                            <a href="mailto:contact@astrobook.com" className='flex items-center gap-1 cursor-pointer'><EmailSvg /> Email ID: contact@astrobook.com</a>
                        </main>

                        <div className='flex gap-1.5 items-center justify-between'>
                            <FacebookSvg />
                            <InstagramSvg />
                            <LinkedinSvg />
                            <YoutubeSvg />
                        </div>

                        <main className='flex flex-col gap-3'>
                            <span className='text-[17px] font-[500] border-b-2 border-[#F0DF20] inline-block pb-1 self-start'>Secure</span>
                            <div className='flex items-center'><SecureSvg /> Private & Confidential</div>
                            <div className='flex items-center'><SecureSvg /> Verified Astrologers</div>
                            <div className='flex items-center'><SecureSvg /> Secure Payments</div>
                        </main>
                    </main>
                </article>
            </footer>

            {/* Astrologer Modal */}
            <AstrologerLoginModal isOpen={loginAstrologerModal} handleCloseModal={handleCloseLoginAstrologerModal} />
        </>
    )
}

export default Footer;