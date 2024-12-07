import moment from "moment";
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api_urls } from '../../../utils/api-urls/index.js';
import { HomeSvg, ViewSvg } from "../../../assets/svg/index.js";
import TopHeaderSection from '../../../components/common/TopHeaderSection.jsx';

const categoryData = ['Vedic', 'Tarot', 'Vastu', 'Kundli', 'Sports', 'Festivals', 'Business'];


const BlogDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 600) }, [pathname]);
    const product = location.state && location.state.astroBlogData;

    return (
        <>
            <TopHeaderSection />

            <section className='px-[80px] max-md:px-[20px] pt-10 pb-5 text-center'>
                <h1 className='text-[37px] font-semibold tracking-wider'>Blog</h1>
                <p className='text-[#ADADAD] text-[28.4px] font-semibold tracking-wide'>Shop Best Online Astrology Products And Services</p>
            </section>

            <section className='px-[80px] max-md:px-[20px] pt-5 pb-14'>
                <article className='flex gap-5'>
                    <section className='flex-1 flex flex-col justify-start gap-5'>
                        <h2 className="text-[28.6px]">{product?.title}</h2>
                        <img src={api_urls + 'uploads/' + product?.image} className="w-full h-[548px] rounded-lg object-cover" />

                        <div className="text-[#272727] flex flex-col gap-10">
                            <p className="text-[25px] text-justify" dangerouslySetInnerHTML={{ __html: product?.description }}></p>
                            <p className="text-black" > Posted On - {moment(product?.createdAt).format("MMMM DD, YYYY")} | Posted By - {product?.created_by} |  Read By - 8965</p>
                        </div>
                    </section>

                    <div className='flex flex-col pl-5 border-l border-[#B0B0B0] basis-[15%]'>
                        <div className='flex items-center gap-4 border-b border-[#B0B0B0] border-dashed pb-5'>
                            <div className='bg-black h-14 w-14 rounded-full flex items-center justify-center'><HomeSvg w='35' h='35' /></div>
                            <div>
                                <div className='text-[21px]'>Categories</div>
                                <div className='text-[14px] text-[#B0B0B0]'>Select Topic</div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 py-8'>
                            <Link to={'/blog'} className='text-[21px]'>Home</Link>
                            {categoryData?.map((value, index) => (
                                <Link to={`/blog?category=${value}`} key={index} className='text-[21px]'>{value}</Link>
                            ))}
                        </div>
                    </div>
                </article>
            </section>



            <section className='px-[80px] max-md:px-[20px] pt-5 pb-14'>
                <h3 className='text-[37px] font-semibold tracking-wider text-center mb-5'>Recent Blog</h3>

                <main className='flex flex-wrap gap-[2.5%] gap-y-[40px]'>
                    {Array(3)?.fill('')?.map((value, index) => (
                        <div onClick={() => navigate('/blog/blog-details', { state: { astroBlogData: value } })} className='relative flex flex-col border border-primary pb-4 rounded-[24.61px] lg:basis-[31.5%] max-lg:basis-[47.5%] max-lg:flex-grow max-md:basis-full cursor-pointer h-[287.69px]'>
                            <img src={api_urls + 'uploads/' + value?.image} className='h-[178px] w-full rounded-t-[24.61px] border-b object-center' />
                            <div className='absolute top-[10px] right-[10px] flex items-center justify-between px-4 w-[95px] h-[23px] rounded-[18px] text-sm bg-white text-[#C9C9C9]'><ViewSvg /> <span className='text-black'>1869</span></div>

                            <div className="p-3 text-[#545353] flex flex-col gap-2.5">
                                <h2 className="text-[16.77px] font-semibold line-clamp-2 min-h-12">{value?.title}</h2>
                                <div className="flex items-center justify-between text-[15px]">
                                    <p>{value?.created_by}</p>
                                    <p>{moment(value?.createdAt)?.format('MMMM DD, YYYY')}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </section>
        </>
    );

}


export default BlogDetails