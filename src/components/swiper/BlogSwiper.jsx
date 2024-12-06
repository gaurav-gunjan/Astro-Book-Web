import React from 'react';
import { useNavigate } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { api_urls } from '../../utils/api-urls';
import { RightArrowSvg } from '../../assets/svg';

const BlogSwiper = ({ slidesPerView, navigation, pagination, data }) => {
    const navigate = useNavigate();

    return (
        <>
            <Swiper
                slidesPerView={slidesPerView}
                grid={{ rows: 1, }}
                spaceBetween={30}
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
                        <div className='flex flex-col justify-center items-center border border-primary pb-4 rounded-lg'>
                            <img src={api_urls + 'uploads/' + value?.image} className='h-44 w-full rounded-t-lg border-b' />

                            <div className="p-3 flex flex-col items-center gap-2">
                                <div className="flex items-center justify-between text-sm text-gray-600 ">
                                    <div className="flex items-center"><span className="mr-1">👤</span>By - {value?.created_by}</div>
                                </div>
                                <h3 className="line-clamp-1 text-[17px] font-semibold text-center text-orange-600">{value?.title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: value?.description }} className="text-gray-700 text-sm line-clamp-1"></p>
                                <div onClick={() => navigate('/blog/blog-details', { state: { astroBlogData: value } })} className='bg-primary rounded-full px-7 py-1.5 text-white text-xs flex items-center cursor-pointer'>Read More <RightArrowSvg /></div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default BlogSwiper;