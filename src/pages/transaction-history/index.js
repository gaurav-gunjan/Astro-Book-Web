import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeepSearchSpace, SecondToHMS } from '../../utils/common-function';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as UserActions from '../../redux/actions/userAction';
import { SearchSvg } from '../../assets/svg';
import PageHeading from '../../components/common/PageHeading';

const TransactionHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDataById, userCustomerTransactionHistoryData } = useSelector(state => state?.userReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(userCustomerTransactionHistoryData, searchText);

    useEffect(() => {
        userCustomerDataById && dispatch(UserActions?.getUserCustomerTransactionHistory());
    }, [userCustomerDataById]);

    return (
        <>
            <TopHeaderSection />

            <section className='px-[80px] max-md:px-[20px] py-10'>
                <main className='flex justify-between gap-5'>
                    <PageHeading title={'Transaction History'} />

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
                                        <th className="p-[12px_9px] font-[600]">Astrologer Name</th>
                                        <th className="p-[12px_9px] font-[600]">Service Type</th>
                                        <th className="p-[12px_9px] font-[600]">Total Amount</th>
                                        <th className="p-[12px_9px] font-[600]">Duration</th>
                                        <th className="p-[12px_9px] font-[600]">Date</th>
                                        <th className="p-[12px_9px] font-[600]">Start Time</th>
                                        <th className="p-[12px_9px] font-[600]">End Time</th>
                                        <th className="p-[12px_9px] font-[600]">Platform Charges</th>
                                        <th className="p-[12px_9px] font-[600]">Astrologer Earning</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-800'>
                                    {userCustomerTransactionHistoryData && userCustomerTransactionHistoryData?.map((value, index) => (
                                        <tr key={index} className={`text-sm ${index % 2 !== 0 && 'bg-[#F6F6F6]'}`}>
                                            <td className="w-[400px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{value?.astrologerId?.astrologerName}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.type}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.totalPrice}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{SecondToHMS(value?.duration)}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.createdAt).format('DD MMM YYYY') || 'N/A'}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{value?.type == 'call' || value?.type == 'VideoCall' ? moment(value?.startTime).format('hh:mm:ss a') : moment(Number(value?.startTime)).format('hh:mm:ss a')}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(Number(value?.endTime)).format('hh:mm:ss a')}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{Number(value?.adminPrice)?.toFixed(2)}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{Number(value?.partnerPrice)?.toFixed(2)}</td>
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

export default TransactionHistory;