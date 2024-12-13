import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { api_urls } from '../../utils/api-urls/index.js';
import { RightArrowHeadSvg, SearchSvg } from '../../assets/svg/index.js';
import { DeepSearchSpace } from '../../utils/common-function/index.js';
import PageHeading from '../../components/common/PageHeading.jsx';
import RecordNotFound from '../../components/features/RecordNotFound.jsx';
import TopHeaderSection from '../../components/common/TopHeaderSection.jsx';
import * as EcommerceActions from "../../redux/actions/ecommerceActions";
import * as UserActions from "../../redux/actions/userAction";

const RegisterPuja = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state?.commonReducer);
    const { userAstrologerDataById, userAstrologerRegisteredPujaHistoryData } = useSelector(state => state?.userReducer);
    const { createdPujaData } = useSelector(state => state?.ecommerceReducer);
    
    const [searchText, setSearchText] = useState('');
    const handleSearch = (event) => setSearchText(event?.target?.value);
    const filteredData = DeepSearchSpace(createdPujaData, searchText);

    useEffect(function () {
        //! Dispatching API for Get Created Puja
        dispatch(EcommerceActions?.getCreatedPuja());

        //! Dispatching API for Get User Astrologer Registered Puja History
        dispatch(UserActions?.getUserAstrologerRegisteredPujaHistory());
    }, []);

    return (
        <>
            <TopHeaderSection />

            {isLoading ?
                <section className='px-[100px] max-lg:px-[20px] pt-[50px] pb-[100px]'>
                    <article className='flex flex-col gap-[50px]'>
                        <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                            <main className='flex gap-4 flex-wrap items-center justify-between'>
                                <div className='h-11 w-56'><Skeleton height={'100%'} /></div>
                                <div className='h-11 w-96 max-md:w-full'><Skeleton height={'100%'} /></div>
                            </main>

                            <main className='flex flex-wrap justify-between max-md:flex-col gap-x-5 gap-y-24 rounded-xl'>
                                {Array(6)?.fill('')?.map((value, index) => (
                                    <div key={index} className='flex-grow rounded-xl h-[220px] max-md:h-[250px] max-md:w-full w-[370px]'>
                                        <div className='flex items-center gap-4 mb-5'>
                                            <div className='h-10 w-10'><Skeleton height={'100%'} style={{ borderRadius: '100%' }} /></div>
                                            <div className='flex-1 h-1 mb-4'><Skeleton height={2} width={'100%'} /></div>
                                        </div>

                                        <Skeleton height={'94%'} width={'100%'} />
                                    </div>
                                ))}
                            </main>
                        </SkeletonTheme>
                    </article>
                </section>
                :
                <>
                    <section className='px-[80px] max-md:px-[20px] py-10'>
                        <main className='flex justify-between max-md:flex-wrap gap-5'>
                            <PageHeading title={'Register Puja'} />

                            <div className='border border-[#DDDDDD] rounded-md flex items-center max-sm:w-[90vw]'>
                                <input type='search' onChange={handleSearch} placeholder='Let’s find what you’re looking for..' className='outline-none px-3 text-[16px] max-md:text-[16px] rounded-md h-full w-[330px] max-xl:w-[300px] max-lg:w-[100%]' />
                                <button className='bg-[#F1B646] border-[#F1B646] rounded-e-md flex items-center justify-center p-2 px-3 w-[50px] h-full'><SearchSvg w='20' h='20' /></button>
                            </div>
                        </main>
                    </section>

                    <section className='px-[80px] max-md:px-[20px] pb-10'>
                        <main className='flex flex-wrap gap-[2.5%] gap-y-[40px]'>
                            {filteredData && filteredData?.map((value, index) => {
                                const matchedRegisteredPuja = userAstrologerRegisteredPujaHistoryData?.find(item => item?.poojaId?._id == value?._id)

                                return (<div key={index} onClick={() => navigate(`${value?.pujaName?.toLowerCase()?.split(' ')?.join('-')}`, { state: { pujaData: value } })} className='lg:basis-[31.5%] max-lg:basis-[47.5%] max-lg:flex-grow max-md:basis-full rounded-xl capitalize bg-transparent cursor-pointer'>
                                    <div className='mb-3 flex items-center'>
                                        <div className='text-xs text-center'>
                                            <div className='h-8 w-8 rounded-full border flex items-center justify-center'>{moment(value?.createdAt)?.format('DD')}</div>
                                            <div>{moment(value?.createdAt)?.format('MMM')}</div>
                                        </div>
                                        <div className='w-full h-0.5 bg-primary'></div>
                                    </div>

                                    <div className='relative bg-white rounded-lg' style={{ boxShadow: "0 0 10px #bdb5b5" }}>
                                        {matchedRegisteredPuja?.poojaId?._id == value?._id && <div className='absolute top-1 right-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded-md'>Registered</div>}

                                        <div className='h-44 w-full bg-cover bg-no-repeat rounded-t-lg flex items-end' style={{ backgroundImage: `url('${api_urls + 'uploads/' + value?.image}')` }}>
                                            <div className='text-white text-sm px-5 py-3 bg-black bg-opacity-40 w-full'>
                                                <div>{value?.pujaName}</div>
                                                <div className='capitalize text-xs line-clamp-1'>{value?.description}</div>
                                            </div>
                                        </div>

                                        <div className='text-gray-600 text-[14px] flex justify-between px-5 py-2 font-[500]'>
                                            <div className=''>{moment(value?.createdAt)?.format('DD MMM YYYY')}</div>
                                            <div className='flex items-center'>Book Now <RightArrowHeadSvg w={20} h={20} /></div>
                                        </div>
                                    </div>
                                </div>)
                            })}
                        </main>

                        {filteredData?.length <= 0 && (<RecordNotFound />)}
                    </section>
                </>
            }
        </>
    )
}

export default RegisterPuja;