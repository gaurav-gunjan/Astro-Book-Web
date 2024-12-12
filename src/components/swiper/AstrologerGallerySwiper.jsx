import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; //* Import Swiper React components
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; //* Import required modules
//! Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const AstrologerGallerySwiper = ({ slidesPerView, navigation, pagination, data }) => {

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
                        <div className='flex justify-center items-center cursor-pointer'>
                            <div key={index} className='bg-white w-[200px] h-[200px] rounded-xl'>
                                <img src={value?.image} className='h-full w-full rounded-xl' />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default AstrologerGallerySwiper;