import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; //* Import Swiper React components
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; //* Import required modules
import { api_urls } from '../../utils/api-urls';
import { CallSvg, ChatSvg, VideoSvg } from '../../assets/svg';
import { IndianRupee } from '../../utils/common-function';
//! Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Color } from '../../assets/colors';

const ExpertAstrologerSwiper = ({ slidesPerView, navigation, pagination, data }) => {
    const navigate = useNavigate();

    return (
        <>
            <Swiper
                slidesPerView={slidesPerView}
                grid={{ rows: 1, }}
                spaceBetween={15}
                autoplay={{ delay: 3000, disableOnInteraction: false, }}
                loop={true}
                // centeredSlides={true}
                keyboard={{ enabled: true }}
                className="mySwiper"
                pagination={pagination && { clickable: true }}
                navigation={navigation ? true : false}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {data?.map((value, index) => (
                    <SwiperSlide key={index}>
                        <div onClick={() => navigate(`/astrologer/${value?.astrologerName?.split(' ')[0]?.toLowerCase()}`, { state: { stateData: value } })} className='flex justify-center items-center py-10'>
                            <div className='relative w-72 rounded-[30px] shadow-lg bg-white flex flex-col gap-2 items-center justify-center transition-transform duration-300 py-5 ease-in-out hover:scale-105 border-[5px] overflow-hidden'>
                                <div className='bg-black text-[#F1B646] px-10 py-0.5 absolute z-10 -rotate-[40deg] top-[22px] -left-[36px]'>*Celebrity*</div>
                                <div className='relative h-44 w-44 overflow-hidden group flex items-center justify-center bg-white rounded-full shadow-md border-[5px] border-[#F1B646]'>
                                    <img src={api_urls + value?.profileImage} className='h-44 w-44 rounded-full border-4 border-white transition-transform duration-300 ease-in-out transform group-hover:scale-110' />
                                </div>

                                <div className='text-black text-lg capitalize text-[25px] max-md:text-[20px]'>{value?.astrologerName}</div>
                                <div className='text-[#7A7575] text-[20px] max-md:text-[16px]'>{IndianRupee(42, 0)}/min</div>
                                <div className='flex items-center gap-3'>
                                    <div className='bg-[#F1B646] p-2.5 rounded-full text-white cursor-pointer'><ChatSvg w='25' h='25' color={Color?.white} /></div>
                                    <div className='bg-[#F1B646] p-2.5 rounded-full text-white cursor-pointer'><CallSvg w='25' h='25' color={Color?.white} /></div>
                                    <div className='bg-[#F1B646] p-2.5 rounded-full text-white cursor-pointer'><VideoSvg w='26' h='26' color={Color?.white} /></div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default ExpertAstrologerSwiper;