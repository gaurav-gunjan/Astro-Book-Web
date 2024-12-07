import moment from 'moment/moment.js';
import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../utils/api-urls/index.js';
import { HomeSvg, SearchSvg, ViewSvg } from '../../assets/svg';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as BlogActions from "../../redux/actions/blogAction";
import CustomPagination from '../../components/features/CustomPagination.jsx';

const Blog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astroBlogData, astroblogCategoryData } = useSelector(state => state?.blogreducer);

    let [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(searchParams);
    const page = query.get('page') || 1;
    const search = searchParams.get('search') || '';

    const handleSearch = async (text) => {
        setSearchParams(`page=1&search=${text.toLowerCase().split(' ').join('')}`);
    };

    useEffect(() => {
        //! Dispatching API for Get Blog Category
        dispatch(BlogActions.getAstroblogCategory());
    }, []);

    useEffect(() => {
        //! Dispatching API for Get Blog
        dispatch(BlogActions.getAstroblog({ page, size: 10, search }));
    }, [page, search]);

    return (
        <>
            <TopHeaderSection />

            <section className='px-[80px] max-md:px-[20px] pt-10 pb-5 text-center'>
                <h1 className='text-[37px] font-semibold tracking-wider'>Blog</h1>
                <p className='text-[#ADADAD] text-[28.4px] font-semibold tracking-wide'>Shop Best Online Astrology Products And Services</p>
            </section>

            <section className='px-[80px] max-md:px-[20px] pb-5'>
                <main className='flex justify-end'>
                    <div className='border border-[#DDDDDD] rounded-md flex items-center max-sm:w-[90vw]'>
                        <input type='search' value={search} onChange={(e) => handleSearch(e.target.value)} placeholder='Let’s find what you’re looking for..' className='outline-none px-3 py-3.5 text-[20.11px] rounded-md h-full w-[350px] max-xl:w-[330px] max-lg:w-[300px] max-md:w-[100%]' />
                        <button className='bg-[#F1B646] border-[#F1B646] rounded-e-md flex items-center justify-center p-2 px-3 w-[65px] h-full'><SearchSvg w='30' h='30' /></button>
                    </div>
                </main>
            </section>

            <section className='px-[80px] max-md:px-[20px] pt-5 pb-14'>
                <article className='flex gap-5'>
                    <div className='flex flex-col pr-5 border-r border-[#B0B0B0] basis-[15%]'>
                        <div className='flex items-center gap-4 border-b border-[#B0B0B0] border-dashed pb-5'>
                            <div className='bg-black h-14 w-14 rounded-full flex items-center justify-center'><HomeSvg w='35' h='35' /></div>
                            <div>
                                <div className='text-[21px]'>Categories</div>
                                <div className='text-[14px] text-[#B0B0B0]'>Select Topic</div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 py-8'>
                            <Link to={'/blog'} className='text-[21px]'>Home</Link>
                            {astroblogCategoryData?.map((value, index) => (
                                <Link to={`/blog?category=${value?.blog_category?.split(' ')?.join('-')?.toLowerCase()}`} key={index} className='text-[21px]'>{value?.blog_category}</Link>
                            ))}
                        </div>
                    </div>

                    <div className='flex-1'>
                        <main className='flex flex-wrap gap-[2.5%] gap-y-[40px]'>
                            {astroBlogData?.results?.map((value, index) => (
                                <div key={index} onClick={() => navigate('/blog/blog-details', { state: { astroBlogData: value } })} className='relative flex flex-col border border-primary pb-4 rounded-[24.61px] lg:basis-[31.5%] max-lg:basis-[47.5%] max-lg:flex-grow max-md:basis-full cursor-pointer h-[287.69px]'>
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
                        <CustomPagination count="10" totalDocuments={astroBlogData?.totalResults} />
                    </div>
                </article>
            </section>
        </>
    )
}

export default Blog;