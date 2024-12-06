import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { WalletSvg } from '../../assets/svg';
import { IndianRupee } from '../../utils/common-function';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as UserActions from '../../redux/actions/userAction';

const WalletHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDataById, userCustomerWalletHistoryData } = useSelector(state => state?.userReducer);

    useEffect(() => {
        userCustomerDataById && dispatch(UserActions?.getUserCustomerWalletHistory());
    }, [userCustomerDataById]);

    return (
        <>
            <TopHeaderSection title={'Wallet History'} />

            <section className='px-[100px] py-7 max-sm:px-[20px]'>
                <article className='flex flex-col gap-5'>
                    <div>Check your balance, add money and see your complete transaction history here</div>

                    <div className='border border-primary rounded-md p-5 flex items-center justify-between gap-5 bg-orange-100'>
                        <div className='flex items-center gap-7'><WalletSvg /> Wallet : {IndianRupee(userCustomerDataById?.wallet_balance)}</div>
                        <div onClick={() => navigate('/recharge')} className='cursor-pointer bg-primary border border-primary hover:bg-orange-400 text-center text-sm rounded-md text-white font-semibold px-3 py-1.5 transition-all duration-500'>Add Money</div>
                    </div>

                    <main>

                    </main>

                </article>
            </section>

            <section className='px-[100px] py-7 max-sm:px-[20px]'>
                <article>
                    <main>
                        <div className='bg-primary py-3 flex  items-center justify-center px-10 relative rounded-t-md'>
                            <div className='font-semibold text-white text-lg tracking-wider text-center'>Wallet History</div>
                        </div>

                        <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                            <table className="w-full text-left border-separate border-spacing-2">
                                <thead>
                                    <tr className="text-sm shadow-md text-nowrap">
                                        <th className="p-[10px_10px] font-[600]">Recharge Amt.</th>
                                        <th className="p-[10px_10px] font-[600]">Exptra Profilt(%)</th>
                                        <th className="p-[10px_10px] font-[600]">Recharge GST (%)</th>
                                        <th className="p-[10px_10px] font-[600]">Total Amount</th>
                                        <th className="p-[10px_10px] font-[600]">Wallet Credit Amt.</th>
                                        <th className="p-[10px_10px] font-[600]">Type</th>
                                        <th className="p-[10px_10px] font-[600]">Txn. Type</th>
                                        <th className="p-[10px_10px] font-[600]">Date</th>
                                        <th className="p-[10px_10px] font-[600]">Time</th>
                                        <th className="p-[10px_10px] font-[600]">Status</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-800'>
                                    {userCustomerWalletHistoryData && userCustomerWalletHistoryData?.map((value, index) => (
                                        <tr key={index} className={`text-sm`}>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.rechargePlanId?.amount || 'N/A'}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.rechargePlanId?.percentage || 0}%</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.gst}%</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.amount}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.totalAmount}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.type?.toLowerCase()}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.transactionType?.toLowerCase()}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.createdAt).format('DD MMM YYYY') || 'N/A'}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.createdAt).format('hh:mm a') || 'N/A'}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.payment_status || 'N/A'}</td>
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

export default WalletHistory;