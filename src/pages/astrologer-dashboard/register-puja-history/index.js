import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchSvg } from '../../../assets/svg';
import { api_urls } from '../../../utils/api-urls';
import PageHeading from '../../../components/common/PageHeading';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { DeepSearchSpace, IndianRupee, SecondToHMS } from '../../../utils/common-function';
import * as UserActions from '../../../redux/actions/userAction';

const RegisterPujaHistory = () => {
    const dispatch = useDispatch();
    const { userAstrologerDataById, userAstrologerRegisteredPujaHistoryData } = useSelector(state => state?.userReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(userAstrologerRegisteredPujaHistoryData, searchText);

    useEffect(() => {
        userAstrologerDataById && dispatch(UserActions?.getUserAstrologerRegisteredPujaHistory());
    }, [userAstrologerDataById]);

    return (
        <>
            <TopHeaderSection />

            <section className='px-[80px] max-md:px-[20px] py-10'>
                <main className='flex justify-between gap-5'>
                    <PageHeading title={'Register Puja History'} />

                    <div className='border border-[#DDDDDD] rounded-md flex items-center max-sm:w-[90vw]'>
                        <input value={searchText} onChange={(e) => setSearchText(e?.target?.value)} type='search' placeholder='Search here..' className='outline-none px-3 text-[16px] max-md:text-[16px] rounded-md h-full w-[330px] max-xl:w-[300px] max-lg:w-[100%]' />
                        <button className='bg-[#F1B646] border-[#F1B646] rounded-e-md flex items-center justify-center p-2 px-3 w-[50px] h-full'><SearchSvg w='18' h='18' /></button>
                    </div>
                </main>
            </section>

            <section className='px-[80px] pb-16 max-sm:px-[20px]'>
                <article>
                    <main>
                        <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                            <table className="w-full text-left border-separate text-nowrap">
                                <thead>
                                    <tr className="text-sm shadow-sm text-nowrap bg-[#F1B646]">
                                        <th className="p-[12px_9px] font-[600]">Puja</th>
                                        <th className="p-[12px_9px] font-[600]">Image</th>
                                        <th className="p-[12px_9px] font-[600]">Amount</th>
                                        <th className="p-[12px_9px] font-[600]">Duration</th>
                                        <th className="p-[12px_9px] font-[600]">Puja Date</th>
                                        <th className="p-[12px_9px] font-[600]">Puja Time</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-800'>
                                    {userAstrologerRegisteredPujaHistoryData && filteredData?.map((value, index) => (
                                        <tr key={index} className={`text-sm ${index % 2 !== 0 && 'bg-[#F6F6F6]'}`}>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.poojaId?.pujaName}</td>
                                            <td className='rounded-full flex items-center justify-center py-0.5'><img src={api_urls + 'uploads/' + value?.poojaId?.image} className='rounded-full w-10 h-10 object-contain bg-gray-300' /></td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-wrap h-full">{IndianRupee(value?.poojaId?.price)}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{SecondToHMS(value?.duration || 0)}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.pujaDate)?.utc().format('DD MMM YYYY') || 'N/A'}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.pujaTime).utc().format('hh:mm a') || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </article>
            </section>
        </>
    )
}

export default RegisterPujaHistory;



{/* <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-wrap h-full">
                                                <div className='h-32 overflow-y-scroll text-justify pr-3 flex flex-col gap-5' >
                                                    {value?.about?.map((item, index) => (
                                                        <div key={index}>
                                                            <div className='font-[500] mb-2 text-nowrap'>{item?.heading}</div>
                                                            <ul className='px-7'>{item?.bulletPoint?.map((bullet, index) => (
                                                                <li key={index} className='list-disc'>{bullet}</li>
                                                            ))}</ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td> */}