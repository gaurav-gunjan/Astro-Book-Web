import moment from 'moment';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SecondToHMS } from '../../utils/common-function';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as UserActions from '../../redux/actions/userAction';

const TransactionHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDataById, userCustomerTransactionHistoryData } = useSelector(state => state?.userReducer);

    useEffect(() => {
        userCustomerDataById && dispatch(UserActions?.getUserCustomerTransactionHistory());
    }, [userCustomerDataById]);

    return (
        <>
            <TopHeaderSection title={'Transaction History'} />

            <section className='px-[100px] py-7 max-sm:px-[20px]'>
                <article>
                    <main>
                        <div className='bg-primary py-3 flex  items-center justify-center px-10 relative rounded-t-md'>
                            <div className='font-semibold text-white text-lg tracking-wider text-center'>Transaction History</div>
                        </div>

                        <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                            <table className="w-full text-left border-separate border-spacing-2">
                                <thead>
                                    <tr className="text-sm shadow-md text-nowrap">
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
                                        <tr key={index} className={`text-sm`}>
                                            <td className="w-[400px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{value?.astrologerId?.astrologerName}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.type}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.totalPrice}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{SecondToHMS(value?.duration)}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.createdAt).format('DD MMM YYYY') || 'N/A'}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{value?.type == 'call' || value?.type == 'VideoCall' ? moment(value?.startTime).format('hh:mm:ss a') : moment(Number(value?.startTime)).format('hh:mm:ss a')}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(Number(value?.endTime)).format('hh:mm:ss a')}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{Number(value?.adminPrice)?.toFixed(2)}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{Number(value?.partnerPrice)?.toFixed(2)}</td>
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