import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as BlogActions from "../../redux/actions/blogAction";
import * as EcommerceActions from "../../redux/actions/ecommerceActions";
import * as AstrologerActions from "../../redux/actions/astrologerAction";
import { BagSvg, CallSvg, ChatSvg, VideoSvg } from '../../assets/svg/index.js';
import LandingBanner from '../../assets/svg/landing-banner.svg';
import LandingAstrologerSection from '../../assets/svg/landing-astrologer-image.svg';
import AstrologyServiceSwiper from '../../components/swiper/AstrologyServiceSwiper.jsx';
import ExpertAstrologerSwiper from '../../components/swiper/ExpertAstrologerSwiper.jsx';
import '../../assets/css/swiper.css';
import TodayHoroscope from '../../assets/images/landing-page/service/Today-Horoscope.png';
import FreeKundli from '../../assets/images/landing-page/service/Free-Kundli.png';
import MatchMaking from '../../assets/images/landing-page/service/Match-Making.png';
import Remedies from '../../assets/images/landing-page/service/Remedies.png';
import MobileRight from '../../assets/images/landing-page/service/Mobile-Right.png';
import MobileLeft from '../../assets/images/landing-page/service/Mobile-Left.png';
import { Color } from '../../assets/colors/index.js';

const serviceData = [
    { path: 'astrologer', title: 'Talk To Astrologer', icon: <CallSvg h='50' w='50' />, description: 'Donec porttitor euismod dignissim. Nullam a lacinia ipsum, nec dignissim purus. ' },
    { path: 'astrologer', title: 'Chat With Astrologer', icon: <ChatSvg h='50' w='50' />, description: 'Donec porttitor euismod dignissim. Npsum, nec dignissim purus. ' },
    { path: 'astrologer', title: 'Video With Astrologer', icon: <VideoSvg h='55' w='55' />, description: 'Donec porttitor euismod dignissim. Nullam a lacinia ipsum, nec dignissim purus. ' },
    { path: 'astro-mall', title: 'Astro Shop', icon: <BagSvg h='50' w='50' />, description: 'Donec porttitor euismod dignissim. Nullam a lacinia ipsum, nec dignissim purus. ' }
];

const complimentryAstrologyService = [
    { title: 'Today Horoscope', image: TodayHoroscope },
    { title: 'Free Kundli', image: FreeKundli },
    { title: 'Match Making', image: MatchMaking },
    { title: 'Remedies', image: Remedies },
]

const LandingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { astroBlogData } = useSelector(state => state?.blogreducer);
    const { callIntakeDetailData } = useSelector(state => state?.chatReducer);
    const { astrologerData } = useSelector(state => state?.astrologerReducer);
    const { productCategoryData } = useSelector(state => state?.ecommerceReducer);
    const { userCustomerDataById, userAstrologerDataById } = useSelector(state => state?.userReducer);

    //! For Swiper Slider 
    const [slidesPerView, setSlidesPerView] = useState(3);
    const [astrologyServiceSlidesPerView, setAstrologyServiceSlidesPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) {
                setSlidesPerView(1);
                setAstrologyServiceSlidesPerView(1);
            } else if (window.innerWidth <= 1000) {
                setSlidesPerView(2);
                setAstrologyServiceSlidesPerView(2);
            } else if (window.innerWidth <= 1200) {
                setSlidesPerView(4);
                setAstrologyServiceSlidesPerView(2);
            } else {
                setSlidesPerView(5);
                setAstrologyServiceSlidesPerView(4);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        //! Dispatching API for Get Blogs
        dispatch(BlogActions.getAstroblog(''));

        //! Dispatching API for Get Astrologers
        dispatch(AstrologerActions.getAstrologer());

        //! Dispatching API for Get Categories
        dispatch(EcommerceActions.getProductCategory());
    }, [dispatch]);

    return (
        <section className='min-h-full min-w-full'>
            <div className='h-[94.4px] max-lg:h-[70.4px] bg-primary'></div>

            {callIntakeDetailData?.visible && <div onClick={() => navigate(`chat/intake-details/${callIntakeDetailData?.profileId}`)} className='p-5 py-2 right-[50px] bottom-[50px] bg-primary fixed z-[1000] cursor-pointer rounded-md text-white'>Intake Detail</div>}

            <section><img src={LandingBanner} /></section>

            <section className='py-[35px] bg-gradient-to-b from-[#F1B646] to-white text-[#616161]'>
                <article>
                    <div className='px-[130px] max-lg:px-[20px] '><AstrologyServiceSwiper data={serviceData} slidesPerView={astrologyServiceSlidesPerView} navigation={false} pagination={false} /></div>

                    <div className='text-[33px] max-md:text-[22px] max-md:hidden font-[600] tracking-tight uppercase text-[#363636] text-center mt-10 mb-10'>Complimentary astrology services</div>

                    <div className='relative bg-gradient-to-b from-[#F9E0B1] to-white rounded-t-full w-full flex flex-col gap-10 pt-28 max-md:mt-10 pb-24 max-md:pt-20'>
                        <div>
                            <div className='text-[33px] max-md:text-[18px] md:hidden font-[600] tracking-tight uppercase text-[#363636] text-center'>Complimentary</div>
                            <div className='text-[33px] max-md:text-[18px] md:hidden font-[600] tracking-tight uppercase text-[#363636] text-center'>astrology services</div>
                        </div>
                        <img src={MobileLeft} className='absolute left-0 bottom-5 max-xl:hidden' />

                        <main className='flex justify-center items-center gap-10'>
                            {complimentryAstrologyService?.slice(0, 2)?.map((value, index) => (
                                <div className='flex flex-col gap-10 max-md:gap-2  max-lg:gap-5 items-center py-10 max-md:py-5 h-[349px] max-md:h-[160px] max-lg:h-[250px] w-[327px] max-md:w-[160px] max-lg:w-[250px] rounded-[22.47px] bg-white overflow-hidden'>
                                    <img src={value?.image} className='h-32 max-md:h-16 max-lg:h-20 w-32 max-md:w-16 max-lg:w-20' />
                                    <div className={`text-[#363636] text-[30px] max-md:text-[14px] max-lg:text-[20px] h-full font-semibold ${index % 2 === 0 && 'bg-[#F9E0B1]'} w-full text-center flex flex-col items-center justify-center py-2 max-md:py-1.5`}>
                                        <div>{value?.title?.split(' ')[0]}</div>
                                        <div>{value?.title?.split(' ')[1]}</div>
                                    </div>
                                </div>
                            ))}
                        </main>
                        <main className='flex justify-center items-center gap-10'>
                            {complimentryAstrologyService?.slice(2, 4)?.map((value, index) => (
                                <div className='flex flex-col gap-10 max-md:gap-2  max-lg:gap-5 items-center py-10 max-md:py-5 h-[349px] max-md:h-[160px] max-lg:h-[250px] w-[327px] max-md:w-[160px] max-lg:w-[250px] rounded-[22.47px] bg-white overflow-hidden'>
                                    <img src={value?.image} className='h-32 max-md:h-16 max-lg:h-20 w-32 max-md:w-16 max-lg:w-20' />
                                    <div className={`text-[#363636] text-[30px] max-md:text-[14px] max-lg:text-[20px] h-full font-semibold ${index % 2 !== 0 && 'bg-[#F9E0B1]'} w-full text-center flex flex-col items-center justify-center py-2 max-md:py-1.5`}>
                                        <div>{value?.title?.split(' ')[0]}</div>
                                        <div>{value?.title?.split(' ')[1]}</div>
                                    </div>
                                </div>
                            ))}
                        </main>
                        <img src={MobileRight} className='absolute right-0 -top-10 max-xl:hidden' />
                    </div>
                </article>
            </section>

            <section className='bg-[#FFEDCA]'>
                <img src={LandingAstrologerSection} />
                <article className='px-[10px] max-lg:px-[20px] py-[50px] pb-[120px]'>
                    <div className='flex flex-col items-center gap-1 mb-0 text-white'>
                        <div className='text-[33px] max-md:text-[22px] font-[600] tracking-tight uppercase text-[#363636]'>Our Astrologers</div>
                        <div className='text-base max-md:text-[16px] font-[500] text-[#616161] text-center'>13000+ Best Astrologers from India for Online Consultation</div>
                    </div>

                    <ExpertAstrologerSwiper data={astrologerData?.astrologer} slidesPerView={slidesPerView} navigation={false} pagination={false} />
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] py-[50px] bg-white text-[#616161] text-justify'>
                <div className='text-center my-8 text-lg'>Astrology reveals the will of the God</div>

                <div className='flex flex-col gap-2'>
                    <div>Astrology is a predictive science with its own sets of methods, claims and findings that have forever inspired and allowed people with insights into different aspects of their life. Astrology, with its wows and hows, is contentful and approving enough to make people a believer of the same. And thankfully, it continues to do so despite the world shifting bases from what they believe in and what they don’t.</div>
                    <div>If one has to go into the technicalities of astrology, it is the study of different cosmic objects, which are usually stars and planets, that have an effect on the lives of the people. You must be aware that there are as many as 8 planets in the solar system. However, If I ask an online astrologer near me about the planets in astrology, they will tell me that there are as many as 9 planets in astrology also called Navagrahas. And surprisingly, the planet Earth, in astrology, is not counted among the nine planets.</div>
                    <div>The 9 planets in astrology are Sun (Surya), Moon (Chandra), Mars (Mangala), Mercury (Budha), Jupiter (Brihaspati), Venus (Shukra), Saturn (Shani), Rahu (north node of the moon), and Ketu (south node of the moon).</div>
                    <div>Among these planets, some planets are called friendly planets, meaning the presence of them brings positivity to your life. And then, there are also planets that have a negative influence on humans. The latter would be planets like Rahu and Ketu. Their presence in one’s Kundli is said to bring pain and misery. However, there is another aspect one needs to be aware of. It’s the fact that the presence of Ketu in one’s horoscope is not always bad and similarly, the presence of Jupiter in one’s Kundli might not be the best every time.</div>
                    <div>It all depends on which houses these planets are sitting in. If you ever had the opportunity to talk to an astrologer online, then s/he must have told you about houses in astrology and the movements of planets in the same. There are as many as 12 houses in Kundli. And all of these houses represent one thing or the other. You can check your free kundali online.</div>
                    <div>For example, the first house, which any online astrology consultation would tell you is also the ascendant of the person, is the house of self. It represents a person’s personality and physical traits. Similarly, the fifth house in the Vedic horoscope, also known as Putra Bhava is the house of creativity, playfulness, joy, pleasure, and romance. If, for example, a good planet, like Jupiter, is camping in the fifth house, your love life will excel. Likewise, if Rahu is camping in the same house, then you might feel the need for online astrology consultation to deal with the woes.</div>
                    <div>Then there are other things in astrology like elements, the Moon sign of an individual, numerology, tarot and so much more that is impossible to wind up here.</div>
                    <div className='font-semibold text-[#454545]'>Online Astrology Consultation & Services</div>
                    <div>The online footprint of things and people has grown over the years. And Astrotalk, as a brand, is using the best of it to cater online astrology services to anyone and everyone across the length and breadth of the globe. Astrotalk, over the years, has nurtured as a community of the best astrologers who have their expertise in Vedic Astrology, tarot card reading, Vastu Shastra, numerology, Reiki healing, Palmistry, and many more subjects.</div>
                    <div>The motive behind providing astrology predictions online is simply helping people save time, money, and pain to find astrologers in the hustle and bustle of the city lights. Besides, to ensure credibility, Astrotalk has, over the years, worked extensively to add value to customer service. And a good chunk of credit for this goes to the astrologers who work for 100% customer satisfaction using their knowledge to deliver impeccable astrology consultancy.</div>
                    <div>Surely, not everything in life should revolve around money, so we at Astrotalk, besides online astrology, also organize various events that help one get a better understanding of online astrology prediction and more related themes. These events range from free astrology predictions sessions to live events involving Aartis and Pujas that happen across India at some of the most renowned temples. It's a way for us to connect with people.</div>
                    <div className='font-semibold text-[#454545]'>Online Astrologer</div>
                    <div>A huge chunk of credit for what we are today goes to the force of online astrologers we have got on board. Astrologers come from different walks of life and only the best, who has a piece of extensive knowledge in their field, make it to this platform for your convenience. As the Astrologers work with us, they are scrutinized in the form of ratings that the customers give them. The better the rating, the better the service. Talking about service, there are multiple ways to avail the same. Either you can talk to the astrologer over a call or simply chat with them at your convenience. And guess what, the first chat with an astrologer can be availed at a 50% discount.</div>
                    <div>The astrologers, we have on board, understand the essence of the 5000-year old science and try their best to do justice with it. Besides sharing their knowledge with you, they also share videos, write up and other rich content with us that is available across our social media pages and in the blog section of our website. These writings on Muhurats, upcoming festivals, online astrology prediction will quench the thirst of your pious soul for online astrology knowledge.</div>
                    <div className='font-semibold text-[#454545]'>Stay Updated With Daily Horoscope Predictions & Zodiac Signs</div>
                    <div>We as a brand are new in the online astrology consultation arena but, at the same time, also empowered to offer our visitors the best invariably. So within a short span of time, we have created a space to offer even the minutest details on astrological elements like transits, astrology daily horoscope for different zodiac signs, updates on upcoming auspicious dates, and much more.</div>
                    <div>While astrology's daily horoscope allows one an opportunity to realign their day as per what the stars have for them in the box, having knowledge of muhurats, among other astrology services, on the other hand, ensures you are well updated on the best times of the day. So much information under one roof? Well, that’s what our purpose has been over the years and we continue to refine it.</div>
                    <div className='font-semibold text-[#454545]'>Why Choose Our Astrology Experts?</div>
                    <div>In a nutshell, Astrotalk and our experts could be your partner and guide when it comes to astrology. Be it a question on horoscope or numerology, tarot card reading or even connecting you with a foreign astrologer, we have practitioners to answer all your starry queries.</div>
                    <div>At last, what do you need to do to get in touch with our astrologers? Simply, login to the Astrotalk app, and guess what? There is a free astrology online session waiting for you. Once you have finished your free astrology predictions session, and you want to stay with us for longer (which you would) then you can recharge your wallet, and connect with live astrologers to receive instant astrology consultation.</div>
                    <div>The best way to choose the best astrologers is to select the category and choose the top astrologers as per the ratings given to them by people like you. One can completely trust our service to be of supreme quality. And just in case you bump into a nag during astrology online consultation, you will be heard by our customer service team invariably.</div>
                    <div>Astrotalk connects you with the best astrologer in India. If want to get the best astrological consultation from one of the best Indian astrologers online, search for the phrase “best astrologer near me” on Google, and you will find Indian astrologers online. Astrotalk connects you with the best astrologers in India, the USA, Canada, Australia or we can say that you can connect with the best astrologers in the world by using the Astrotalk website and App. If you are looking for the best astrologers in Noida, Delhi/NCR, Gurgaon, etc., Astrotalk is the best online platform for you. We have the best astrologers online for marriage, career, health, etc. Astrotalk is your ultimate destination if you want to talk to astrologer online, chat with astrologers, check free kundali, match making, daily horoscopes, gems, and rudraksha shopping, etc.</div>
                </div>
            </section>
        </section>
    )
}

export default LandingPage;