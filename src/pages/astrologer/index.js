import ReactStars from 'react-stars';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { IndianRupee } from '../../utils/common-function';
import { CallSvg, ChatSvg, SearchSvg } from '../../assets/svg';
import { api_urls } from '../../utils/api-urls';
import PageHeading from '../../components/common/PageHeading';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import CustomPagination from '../../components/features/CustomPagination';
import * as AstrologerActions from '../../redux/actions/astrologerAction';
import * as CommonActions from '../../redux/actions/commonAction';
import { useState } from 'react';

const ChatWithAstrologer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state?.commonReducer);
    const { userCustomerDataById } = useSelector(state => state?.userReducer);
    const { astrologerData } = useSelector(state => state?.astrologerReducer);

    const [astrologerLocalData, setAstrologerLocalData] = useState([]);
    console.log('AstrologerLocalData :::', astrologerLocalData);

    let [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(searchParams);
    const page = query.get('page') || 1;
    const search = searchParams.get('search') || '';

    const handleSearch = async (text) => setSearchParams(`page=1&search=${text.toLowerCase().split(' ').join('')}`);

    useEffect(() => {
        //! Dispatching API For Getting Astrologer
        dispatch(AstrologerActions.getAstrologer({ page, search }));
    }, [page, search]);

    useEffect(() => {
        astrologerData && setAstrologerLocalData([])
    }, [astrologerData]);

    return (
        <>
            <TopHeaderSection title={'Chat with Astrologer'} />

            {/* {isLoading ?
                <section className='px-[100px] max-lg:px-[20px] pt-[50px] pb-[100px]'>
                    <article className='flex flex-col gap-[50px]'>
                        <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                            <main className='flex gap-4 flex-wrap items-center justify-between'>
                                <div className='h-11 w-56'><Skeleton height={'100%'} /></div>
                                <div className='h-8 w-48'><Skeleton height={'100%'} /></div>
                                <div className='flex gap-4 flex-wrap'>
                                    <div className='h-11 w-28'><Skeleton height={'100%'} /></div>
                                    <div className='h-11 w-60'><Skeleton height={'100%'} /></div>
                                </div>
                            </main>

                            <main className='flex flex-wrap justify-between max-md:flex-col gap-[20px] rounded-xl'>
                                {Array(6)?.fill('')?.map((Value, index) => (<div key={index} className='flex-grow rounded-xl h-[220px] max-md:h-[250px] max-md:w-full w-[370px]'><Skeleton height={'100%'} width={'100%'} /></div>))}
                            </main>

                            <div className="flex gap-5 justify-center py-16">
                                <div className='h-12 w-12'><Skeleton height={'100%'} width={'100%'} style={{ borderRadius: '100%' }} /></div>
                                <div className='h-12 w-12'><Skeleton height={'100%'} width={'100%'} style={{ borderRadius: '100%' }} /></div>
                                <div className='h-12 w-12'><Skeleton height={'100%'} width={'100%'} style={{ borderRadius: '100%' }} /></div>
                                <div className='h-12 w-12'><Skeleton height={'100%'} width={'100%'} style={{ borderRadius: '100%' }} /></div>
                                <div className='h-12 w-12'><Skeleton height={'100%'} width={'100%'} style={{ borderRadius: '100%' }} /></div>
                            </div>
                        </SkeletonTheme>
                    </article>
                </section>
                : 
            } */}

            <section className='px-[80px] py-7 max-sm:px-[20px]'>
                <article className='flex flex-col gap-7'>
                    <main className='flex gap-4 flex-wrap items-center justify-between'>
                        <PageHeading title={'Talk with Astrologer'} />

                        <div>{userCustomerDataById && <div>Available balance: {IndianRupee(userCustomerDataById?.wallet_balance)}</div>}</div>

                        <div className='flex gap-4 flex-wrap'>
                            <div onClick={() => navigate('/recharge')} className='border border-green-500 text-green-500 px-5 rounded-md flex items-center justify-center max-md:py-1 cursor-pointer'>Recharge</div>

                            <div className='border border-[#DDDDDD] rounded-md flex items-center max-sm:w-[90vw]'>
                                <input type='search' autoFocus value={search} onChange={(e) => handleSearch(e.target.value)} placeholder='Search here..' className='outline-none px-3 py-2.5 text-[16px] max-md:text-[16px] rounded-md h-full w-[200px] max-lg:w-[200px] max-md:w-[100%]' />
                                <button className='bg-[#F1B646] border-[#F1B646] rounded-e-md flex items-center justify-center p-2 px-3 w-[50px] h-full'><SearchSvg w='20' h='20' /></button>
                            </div>
                        </div>
                    </main>

                    <main className='flex flex-wrap gap-[2.5%] gap-y-[40px]'>
                        {astrologerData?.astrologer?.map((value, index) => (
                            <div key={index} className='basis-[31.5%] max-xl:basis-[47.5%] max-xl:flex-grow max-md:basis-full flex items-center gap-[20px] rounded-xl px-2 pt-1 pb-3 capitalize' style={{ boxShadow: "0 0 10px #bdb5b5" }}>
                                <div className='h-36 max-lg:h-32 w-36 max-lg:w-32 '><img className='h-full w-full rounded-full border border-[#F1B646]' src={api_urls + value?.profileImage} /></div>
                                <div className='flex-1'>
                                    <div className='flex flex-col items-end text-center'>
                                        <div className='text-center'><ReactStars count={5} edit={false} value={Number(value?.rating)} size={16} color2={'#ffd700'} /></div>
                                        <div className='line-clamp-1 text-[13.24px] text-black'>216 followers</div>
                                        <div className='line-clamp-1 text-[9px] text-[#828282] pr-3'>2121 orders</div>
                                    </div>
                                    <div>
                                        <div className='line-clamp-1 text-[18px]'>{value?.astrologerName}</div>
                                        <div className='line-clamp-1 text-[13.24px] text-[#828282]'>Exp :  {value?.experience} Years</div>
                                        <div className='line-clamp-1 text-[13.24px] text-[#828282]'>{value?.language.length > 0 ? value?.language.join(', ') : "Hindi"}</div>
                                        <div className='line-clamp-1 text-[13.24px] text-[#828282]'>{value?.skill?.length > 0 && value?.skill?.map(item => item?.skill)?.join(' , ')}</div>
                                    </div>

                                    <hr className='my-3' />
                                    <div className='flex items-center gap-2'>
                                        {['Chat', 'Call', 'Video']?.map((curr, index) => (
                                            <div onClick={() => {
                                                if (curr == 'Video') {
                                                    dispatch(CommonActions?.openDownloadOurAppModal());
                                                } else {
                                                    navigate(`/astrologer/${value?.astrologerName?.split(' ')[0]?.toLowerCase()}`, { state: { stateData: value } })
                                                }
                                            }} key={index} className='flex flex-col justify-center items-center px-3 flex-1 border border-[#27AE60] rounded-[7.49px] cursor-pointer'>
                                                <div className='text-[#27AE60] text-[13px]'>{curr}</div>
                                                <div className='text-[10px]'>25/min</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </main>

                    {astrologerData?.astrologer?.length <= 0 && (
                        <div className="flex justify-center items-center h-32 border-2 border-dashed border-gray-300 bg-gray-100 text-primary text-lg rounded-lg shadow-lg p-4">
                            <p className="text-gray-500">No Record Found</p>
                        </div>
                    )}

                    {!!astrologerData && astrologerData?.astrologer?.length > 0 && <CustomPagination count={astrologerData?.pagination?.limit} totalDocuments={astrologerData?.pagination?.total} />}
                </article>
            </section >
        </>
    )
}

export default ChatWithAstrologer;