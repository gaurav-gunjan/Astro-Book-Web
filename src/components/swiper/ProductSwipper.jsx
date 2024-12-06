import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; //* Import Swiper React components
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; //* Import required modules
import { api_urls } from '../../utils/api-urls';
//! Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductSwipper = ({ slidesPerView, navigation, pagination, data }) => {
    const navigate = useNavigate();

    return (
        <>
            <Swiper
                slidesPerView={slidesPerView}
                grid={{ rows: 1, }}
                spaceBetween={30}
                autoplay={{ delay: 3000, disableOnInteraction: false, }}
                loop={true}
                keyboard={{ enabled: true }}
                className="mySwiper"
                pagination={pagination && { clickable: true }}
                navigation={navigation ? true : false}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {data?.map((value, index) => (
                    <SwiperSlide key={index}>
                        <div className='flex justify-center items-center py-10'>
                            <div className='w-64 rounded-lg shadow-lg bg-white flex flex-col items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105'>
                                <div className='relative h-44 w-44 overflow-hidden group flex items-center justify-center bg-white shadow-md m-2'>
                                    <img src={api_urls + 'uploads/' + value?.image} className='h-44 w-44 border-4 border-white transition-transform duration-300 ease-in-out transform group-hover:scale-110' />
                                </div>

                                <div className='flex flex-col items-center gap-2 px-7 pt-2 pb-8 bg-white rounded-b-lg w-full'>
                                    <div className='text-primary_dark font-bold text-base capitalize'>{value?.categoryName}</div>
                                    <div onClick={() => navigate("/astro-mall/products", { state: { productCategoryData: value }, })} className='bg-primary rounded-full px-7 py-1.5 text-white text-xs cursor-pointer'>View Detail</div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default ProductSwipper;