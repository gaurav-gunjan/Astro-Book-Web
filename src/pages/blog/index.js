import moment from 'moment/moment.js';
import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../utils/api-urls/index.js';
import { HomeSvg, SearchSvg, ViewSvg } from '../../assets/svg';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import CustomPagination from '../../components/features/CustomPagination.jsx';
import * as BlogActions from "../../redux/actions/blogAction";
import RecordNotFound from '../../components/features/RecordNotFound.jsx';

const Blog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astroBlogData, astroblogCategoryData } = useSelector(state => state?.blogreducer);

    let [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(searchParams);
    const page = query.get('page') || 1;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const id = searchParams.get('id') || '';

    const handleSearch = async (text) => setSearchParams(`page=1&search=${text.toLowerCase().split(' ').join('')}&category=${category}&id=${id}`);

    const handleViewBlog = (data) => {
        dispatch(BlogActions?.incrementAstroBlogViewCount({ blogId: data?._id }))
        navigate('/blog/blog-details', { state: { astroBlogData: data } })
    };

    useEffect(() => {
        //! Dispatching API for Get Blog Category
        dispatch(BlogActions.getAstroblogCategory());
    }, []);

    useEffect(() => {
        //! Dispatching API for Get Blog
        dispatch(BlogActions.getAstroblog({ page, limit: 9, search, categoryId: id }));
    }, [page, search, id]);

    return (
        <>
            <TopHeaderSection />

            <section className='px-[80px] max-md:px-[20px] py-10'>
                <main className='flex justify-between max-md:flex-wrap gap-5'>
                    <div className='bg-[#F1B646] text-black px-12 max-md:px-10 py-2 font-[500] text-[20px] rounded-md flex items-center justify-center self-start text-nowrap'>Blog</div>

                    <div className='border border-[#DDDDDD] rounded-md flex items-center max-sm:w-[90vw]'>
                        <input type='search' value={search} onChange={(e) => handleSearch(e.target.value)} placeholder='Let’s find what you’re looking for..' className='outline-none px-3 py-3.5 text-[16px] max-md:text-[16px] rounded-md h-full w-[330px] max-xl:w-[300px] max-lg:w-[100%]' />
                        <button className='bg-[#F1B646] border-[#F1B646] rounded-e-md flex items-center justify-center p-2 px-3 w-[50px] h-full'><SearchSvg w='20' h='20' /></button>
                    </div>
                </main>
            </section>

            <section className='px-[80px] max-md:px-[20px] pt-5 pb-14'>
                <article className='flex gap-5 max-lg:flex-col'>
                    <div className='flex flex-col pr-5 max-md:pr-0 border-r border-[#B0B0B0] max-md:border-none basis-[15%]'>
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

                    <div className='flex-1'>
                        <main className='flex flex-wrap gap-[2.5%] gap-y-[40px]'>
                            {astroBlogData?.results?.map((value, index) => (
                                <div key={index} onClick={() => handleViewBlog(value)} className='relative flex flex-col border border-primary rounded-[24.61px] lg:basis-[31.5%] max-lg:basis-[47.5%] max-lg:flex-grow max-md:basis-full cursor-pointer'>
                                    <img src={api_urls + 'uploads/' + value?.image} className='h-[175px] w-full rounded-t-[24.61px] border-b object-center' />
                                    <div className='absolute top-[10px] right-[10px] flex items-center justify-between px-4 w-[95px] h-[23px] rounded-[18px] text-sm bg-white text-[#C9C9C9]'><ViewSvg /> <span className='text-black'>{value?.viewsCount}</span></div>

                                    <div className="px-3 pt-2.5 pb-4 text-[#545353] flex flex-col gap-2">
                                        <h2 className="text-[16.77px] font-[500] line-clamp-2">{value?.title}</h2>
                                        <div className="flex items-center justify-between text-[14px]">
                                            <p>{value?.created_by}</p>
                                            <p>{moment(value?.createdAt)?.format('MMMM DD, YYYY')}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </main>

                        {astroBlogData?.results?.length <= 0 && (<RecordNotFound />)}

                        {astroBlogData?.results?.length > 0 && (
                            <section className='pt-14 flex justify-end'>
                                <CustomPagination count="9" totalDocuments={astroBlogData?.totalResults} />
                            </section>
                        )}
                    </div>
                </article>
            </section>
        </>
    )
}

export default Blog;