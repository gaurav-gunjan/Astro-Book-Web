import ReactStars from 'react-stars';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { IndianRupee } from '../../utils/common-function';
import { CallSvg, ChatSvg, SearchSvg } from '../../assets/svg';
import { api_urls } from '../../utils/api-urls';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import CustomPagination from '../../components/features/CustomPagination';
import * as AstrologerActions from '../../redux/actions/astrologerAction';

const ChatWithAstrologer = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state?.commonReducer);
    const { userCustomerDataById } = useSelector(state => state?.userReducer);
    const { astrologerData } = useSelector(state => state?.astrologerReducer);

    let [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(searchParams);
    const page = query.get('page') || 1;
    const search = searchParams.get('search') || '';

    const handleSearch = async (text) => setSearchParams(`page=1&search=${text.toLowerCase().split(' ').join('')}`);

    useEffect(() => {
        //! Dispatching API For Getting Astrologer 
        dispatch(AstrologerActions.getAstrologer({ page, search }));
    }, [page, search]);

    return (
        <>
            <TopHeaderSection title={'Chat with Astrologer'} />

            {isLoading ?
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
                <section className='px-[100px] py-7 max-sm:px-[20px]'>
                    <article className='flex flex-col gap-7'>
                        <main className='flex gap-4 flex-wrap items-center justify-between'>
                            <div className='bg-primary text-white px-8 py-2 font-semibold rounded-md flex items-center justify-center'>Chat with Astrologer</div>
                            <div>
                                {userCustomerDataById && <div>Available balance: {IndianRupee(userCustomerDataById?.wallet_balance)}</div>}
                            </div>
                            <div className='flex gap-4 flex-wrap'>
                                <div onClick={() => navigate('/recharge')} className='border border-green-500 text-green-500 px-5 rounded-md flex items-center justify-center max-md:py-1 cursor-pointer'>Recharge</div>
                                <div className='border border-primary rounded-md flex items-center max-sm:w-[90vw]'>
                                    <input type='search' value={search} onChange={(e) => handleSearch(e.target.value)} placeholder='Search...' className='outline-none px-3 py-2 rounded-md max-md:w-[100%]' />
                                    <div className='bg-primary border-primary rounded-e-md h-[100%] flex items-center justify-center p-2 px-3'><SearchSvg w='16' /></div>
                                </div>
                            </div>
                        </main>

                        <main className='flex flex-wrap gap-[2.5%] gap-y-[40px]'>
                            {astrologerData?.astrologer?.map((value, index) => (
                                <div key={index} onClick={() => navigate(`/astrologer/${value?.astrologerName?.split(' ')[0]?.toLowerCase()}`, { state: { stateData: value } })} className='lg:basis-[31.5%] max-lg:basis-[47.5%] max-lg:flex-grow max-md:basis-full flex gap-[20px] rounded-xl p-2 cursor-pointer capitalize' style={{ boxShadow: "0 0 10px #bdb5b5" }}>
                                    <div className='w-[130px] relative'>
                                        <div className={`absolute top-1 right-2 text-xs text-white ${value?.chat_status == "online" ? 'bg-green-600' : 'bg-red-600'} capitalize  px-2 py-0.5 rounded-lg`}>{value?.chat_status}</div>

                                        <img className='rounded-xl h-[110px] w-full' src={api_urls + value?.profileImage} />
                                        <div className='h-[90px] flex flex-col justify-center gap-[5px] rounded-xl text-[13px] text-white'>
                                            <div className='flex items-center gap-2'><div className='bg-primary p-2 rounded-full'><ChatSvg h='12' w='12' /></div> <div className='line-clamp-1 text-black'>{IndianRupee(value?.chat_price)} per min</div></div>
                                            <div className='flex items-center gap-2'><div className='bg-primary p-2 rounded-full'><CallSvg h='12' w='12' /></div> <div className='line-clamp-1 text-black'>{IndianRupee(value?.call_price)} per min</div></div>
                                        </div>
                                    </div>
                                    <div className='flex-1 flex flex-col justify-center gap-[15px] rounded-xl p-[15px] relative'>
                                        <div className='absolute right-2 -top-1'><ReactStars count={5} edit={false} value={Number(value?.rating)} size={20} color2={'#ffd700'} /></div>
                                        <div className='line-clamp-1 pt-2'>{value?.astrologerName}</div>
                                        <div className='bg-primary text-white rounded-lg px-[10px] py-[5px] line-clamp-1'>{value?.skill?.length > 0 && value?.skill?.map(item => item?.skill)?.join(' , ')}</div>
                                        <div>Experience : {value?.experience} Years</div>
                                        <hr />
                                        <div className='line-clamp-1'>{value?.language.length > 0 ? value?.language.join(' , ') : "Hindi"}</div>
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
                </section>
            }
        </>
    )
}

export default ChatWithAstrologer;