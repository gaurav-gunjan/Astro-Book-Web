import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { api_urls } from '../../utils/api-urls/index.js';
import { RightArrowHeadSvg, SearchSvg } from '../../assets/svg';
import { DeepSearchSpace } from '../../utils/common-function/index.js';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as EcommerceAction from "../../redux/actions/ecommerceActions.js"

const BookPuja = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pujaData } = useSelector(state => state?.ecommerceReducer);
    const { isLoading } = useSelector(state => state?.commonReducer);

    const [searchText, setSearchText] = useState('');
    const handleSearch = (event) => setSearchText(event?.target?.value);
    const filteredData = DeepSearchSpace(pujaData, searchText);

    useEffect(function () {
        //! Dispatching API for Get Puja
        dispatch(EcommerceAction.getPuja());
    }, []);

    return (
        <>
            <TopHeaderSection title={'Book puja shop'} />

            {isLoading ?
                <section className='px-[100px] max-lg:px-[20px] pt-[50px] pb-[100px]'>
                    <article className='flex flex-col gap-[50px]'>
                        <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                            <main className='flex gap-4 flex-wrap items-center justify-between'>
                                <div className='h-11 w-56'><Skeleton height={'100%'} /></div>
                                <div className='h-11 w-96 max-md:w-full'><Skeleton height={'100%'} /></div>
                            </main>

                            <main className='flex flex-wrap justify-between max-md:flex-col gap-x-5 gap-y-24 rounded-xl'>
                                {Array(6)?.fill('')?.map((index) => (<div key={index} className='flex-grow rounded-xl h-[220px] max-md:h-[250px] max-md:w-full w-[370px]'>
                                    <div className='flex items-center gap-4 mb-5'>
                                        <div className='h-10 w-10'><Skeleton height={'100%'} style={{ borderRadius: '100%' }} /></div>
                                        <div className='flex-1 h-1 mb-4'><Skeleton height={2} width={'100%'} /></div>
                                    </div>

                                    <Skeleton height={'94%'} width={'100%'} />
                                </div>))}
                            </main>
                        </SkeletonTheme>
                    </article>
                </section>
                :
                <section className='px-[100px] py-7 max-sm:px-[20px]'>
                    <article className='flex flex-col gap-7'>
                        <main className='flex gap-4 flex-wrap items-center justify-between'>
                            <div className='bg-primary text-white px-8 py-2 font-semibold rounded-md flex items-center justify-center'>Book a Puja</div>

                            <div className='flex gap-4 flex-wrap'>
                                <div className='border border-primary rounded-md flex items-center max-sm:w-[90vw]'>
                                    <input onChange={handleSearch} type='search' placeholder='Search...' className='outline-none px-3 py-2 rounded-md max-md:w-[100%] md:w-[300px]' />
                                    <div className='bg-primary border-primary rounded-e-md h-[100%] flex items-center justify-center p-2 px-3'><SearchSvg w='16' /></div>
                                </div>
                            </div>
                        </main>

                        <main className='flex flex-wrap gap-[2.5%] gap-y-[40px]'>
                            {filteredData && filteredData?.map((value, index) => (
                                <div key={index} className='lg:basis-[31.5%] max-lg:basis-[47.5%] max-lg:flex-grow max-md:basis-full rounded-xl capitalize bg-transparent'>
                                    <div className='mb-3 flex items-center'>
                                        <div className='text-xs text-center'>
                                            <div className='h-8 w-8 rounded-full border flex items-center justify-center'>{moment(value?.createdAt)?.format('DD')}</div>
                                            <div>{moment(value?.createdAt)?.format('MMM')}</div>
                                        </div>
                                        <div className='w-full h-0.5 bg-primary'></div>
                                    </div>

                                    <div className='bg-white rounded-lg' style={{ boxShadow: "0 0 10px #bdb5b5" }}>
                                        <div className='h-44 w-full bg-cover bg-no-repeat rounded-t-lg flex items-end' style={{ backgroundImage: `url('${api_urls + 'uploads/' + value?.image}')` }}>
                                            <div className='text-white text-sm px-5 py-3 bg-black bg-opacity-40 w-full'>
                                                <div>{value?.pujaName}</div>
                                                <div className='capitalize text-xs line-clamp-1'>{value?.description}</div>
                                            </div>
                                        </div>

                                        <div className='text-gray-600 text-[14px] flex justify-between px-5 py-2 font-[500]'>
                                            <div className=''>{moment(value?.createdAt)?.format('DD MMM YYYY')}</div>
                                            <div onClick={() => navigate(`${value?.pujaName?.toLowerCase()?.split(' ')?.join('-')}`, { state: { pujaData: value } })} className='flex items-center  cursor-pointer'>Book Now <RightArrowHeadSvg w={20} h={20} /></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </main>

                        {filteredData?.length <= 0 && (
                            <div className="flex justify-center items-center h-32 border-2 border-dashed border-gray-300 bg-gray-100 text-primary text-lg rounded-lg shadow-lg p-4">
                                <p className="text-gray-500">No Record Found</p>
                            </div>
                        )}
                    </article>
                </section>
            }
        </>
    )
}

export default BookPuja;