import moment from "moment";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api_urls } from '../../../utils/api-urls/index.js';
import { HomeSvg, ViewSvg } from "../../../assets/svg/index.js";
import TopHeaderSection from '../../../components/common/TopHeaderSection.jsx';
import * as BlogActions from "../../../redux/actions/blogAction";

const BlogDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 600) }, [pathname]);
    const product = location.state && location.state.astroBlogData;
    const dispatch = useDispatch();
    const { astroblogCategoryData, recentAstroBlogData } = useSelector(state => state?.blogreducer);

    const handleViewBlog = (data) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dispatch(BlogActions?.incrementAstroBlogViewCount({ blogId: data?._id }))
        navigate('/blog/blog-details', { state: { astroBlogData: data } })
        dispatch(BlogActions.getRecentAstroblog({ page: 1, limit: 4 }));
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })

        //! Dispatching API for Get Blog Category
        dispatch(BlogActions.getAstroblogCategory());

        //! Dispatching API for Get Recent Blog
        dispatch(BlogActions.getRecentAstroblog({ page: 1, limit: 4 }));
    }, []);

    return (
        <>
            <TopHeaderSection />


            <section className='px-[80px] max-md:px-[20px] pt-10 pb-5 text-center'>
                <h1 className='text-[30px] max-md:text-[25px] font-[500] tracking-wider'>Blog</h1>
                <p className='text-[#ADADAD] text-[24px] max-md:text-[20px] font-[500] tracking-wide'>Shop Best Online Astrology Products And Services</p>
            </section>

            <section className='px-[80px] max-md:px-[20px] pt-5 pb-14'>
                <article className='flex max-md:flex-col-reverse gap-5'>
                    <section className='flex-1 flex flex-col justify-start gap-5'>
                        <h2 className="text-[20px]">{product?.title}</h2>
                        <img src={api_urls + 'uploads/' + product?.image} className="w-full h-[300px] max-h-[300px] rounded-lg object-contain" />

                        <div className="text-[#272727] flex flex-col gap-10">
                            <p className="text-[18px] text-justify" dangerouslySetInnerHTML={{ __html: product?.description }}></p>
                            <p className="text-black" > Posted On - {moment(product?.createdAt).format("MMMM DD, YYYY")} | Posted By - {product?.created_by} |  Read By - 8965</p>
                        </div>
                    </section>

                    <div className='flex flex-col pl-5 max-md:pl-0 border-l border-[#B0B0B0] max-md:border-none basis-[15%]'>
                        <div className='flex items-center gap-4 border-b border-[#B0B0B0] border-dashed pb-5 max-lg:hidden'>
                            <div className='bg-black h-14 w-14 rounded-full flex items-center justify-center'><HomeSvg w='35' h='35' /></div>
                            <div>
                                <div className='text-[21px]'>Categories</div>
                                <div className='text-[14px] text-[#B0B0B0]'>Select Topic</div>
                            </div>
                        </div>
                        <div className='flex flex-col max-lg:flex-row text-nowrap gap-3 pt-8 text-[17px] max-md:py-5 max-lg:overflow-x-scroll'>
                            <Link to={'/blog'}>Home</Link>
                            {astroblogCategoryData?.map((value, index) => (
                                <Link to={`/blog?page=1&search=&category=${value?.blog_category?.split(' ')?.join('-')?.toLowerCase()}&id=${value?._id}`} key={index}>{value?.blog_category}</Link>
                            ))}
                        </div>
                    </div>
                </article>
            </section>



            <section className='px-[80px] max-md:px-[20px] pt-5 pb-14'>
                <h3 className='text-[30px] max-md:text-[25px] font-[500] tracking-wider text-center mb-5'>Recent Blog</h3>

                <main className='flex flex-wrap gap-[1.33%] gap-y-[40px]'>
                    {recentAstroBlogData && recentAstroBlogData?.map((value, index) => (
                        <div key={index} onClick={() => handleViewBlog(value)} className='relative flex flex-col border border-primary rounded-[24.61px] lg:basis-[24%] max-lg:basis-[47.5%] max-lg:flex-grow max-md:basis-full cursor-pointer'>
                            <img src={api_urls + 'uploads/' + value?.image} className='h-[150px] w-full rounded-t-[24.61px] border-b object-center' />
                            <div className='absolute top-[10px] right-[10px] flex items-center justify-between px-4 w-[95px] h-[23px] rounded-[18px] text-sm bg-white text-[#C9C9C9]'><ViewSvg /> <span className='text-black'>{value?.viewsCount}</span></div>

                            <div className="px-3 pt-2.5 pb-4 text-[#545353] flex flex-col gap-2">
                                <h2 className="text-[16px] font-[500] line-clamp-2">{value?.title}</h2>
                                <div className="flex items-center justify-between text-[12px]">
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