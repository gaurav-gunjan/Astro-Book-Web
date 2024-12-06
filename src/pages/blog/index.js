import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../utils/api-urls/index.js';
import * as BlogActions from "../../redux/actions/blogActions.js";
import { RightArrowSvg } from '../../assets/svg';
import TopHeaderSection from '../../components/common/TopHeaderSection';

const Blog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astroBlogData } = useSelector(state => state?.blogreducer);

    useEffect(() => {
        //! Dispatching API for Get Blogs
        dispatch(BlogActions.getAstroBlogs(''));
    }, []);

    return (
        <>
            <TopHeaderSection title={'Blog'} />

            <section className='px-[80px] max-md:px-[20px] pt-5 pb-14'>
                <main className='flex flex-wrap gap-[2.5%] gap-y-[40px]'>
                    {/* flex justify-around max-md:justify-center gap-5 flex-wrap  */}
                    {astroBlogData?.map((value, index) => (
                        <div className='flex flex-col justify-center items-center border border-primary pb-4 rounded-lg lg:basis-[31.5%] max-lg:basis-[47.5%] max-lg:flex-grow max-md:basis-full'>
                            <img src={api_urls + 'uploads/' + value?.image} className='h-44 w-full rounded-t-lg border-b object-contain' />

                            <div className="p-3 flex flex-col items-center gap-2">
                                <div className="flex items-center justify-between text-sm text-gray-600 ">
                                    <div className="flex items-center"><span className="mr-1">👤</span>By - {value?.created_by}</div>
                                </div>
                                <h3 className="line-clamp-1 text-[17px] font-semibold text-center text-orange-600">{value?.title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: value?.description }} className="text-gray-700 text-sm line-clamp-1"></p>
                                <div onClick={() => navigate('/blog/blog-details', { state: { astroBlogData: value } })} className='bg-primary rounded-full px-7 py-1.5 text-white text-xs flex items-center cursor-pointer'>Read More <RightArrowSvg /></div>
                            </div>
                        </div>
                    ))}
                </main>
            </section>
        </>
    )
}

export default Blog;