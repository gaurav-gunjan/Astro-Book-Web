import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../../utils/api-urls';
import { IndianRupee, SecondToHMS } from '../../../utils/common-function';
import { SwitchOffSvg, SwitchOnSvg, WalletSvg } from '../../../assets/svg';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import UserAstrologerWithdrawalRequest from '../../../components/modal/UserAstrologerWithdrawalRequest';
import * as UserActions from '../../../redux/actions/userAction';

const MyAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userAstrologerDataById, userAstrologerTransactionHistoryData } = useSelector(state => state?.userReducer);

    const [withdrawalModelOpen, setWithdrawalModelOpen] = useState(false);

    useEffect(() => {
        userAstrologerDataById && dispatch(UserActions?.getUserAstrologerTransactionHistory({ count: 5 }));
    }, [userAstrologerDataById]);

    return (
        <>
            <TopHeaderSection title={'My Account'} />

            <section className='px-[80px] py-7 max-sm:px-[20px]'>
                <article className='flex flex-col gap-5'>
                    <div className='py-5 px-5 bg-orange-100 border border-primary rounded-md flex items-center justify-between flex-wrap gap-10'>
                        <div className='flex gap-10 items-end justify-between flex-wrap'>
                            <img src={api_urls + userAstrologerDataById?.profileImage} className='h-40 w-40 object-contain border border-white rounded-md' />

                            <div className='text-[15px] pb-2'>
                                <div className='font-semibold text-lg text-primary'>{userAstrologerDataById?.astrologerName}</div>
                                <div>{userAstrologerDataById?.email}</div>
                                <div>{userAstrologerDataById?.phoneNumber}</div>
                                <div>{userAstrologerDataById?.gender}, {moment(userAstrologerDataById?.dateOfBirth)?.format('DD-MMM-YYYY')}</div>
                                <div>{userAstrologerDataById?.city + ','} {userAstrologerDataById?.state + ','} {userAstrologerDataById?.country + '-'} {userAstrologerDataById?.zipCode}</div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 min-w-64'>
                            <div className='flex items-center gap-2 cursor-pointer'><div className='basis-[75%] text-nowrap'>Change Chat Status: </div> <div onClick={() => dispatch(UserActions?.changeUserAstrologerChatStatus({ data: { astrologerId: userAstrologerDataById?._id, chat_status: userAstrologerDataById?.chat_status == "online" ? "offline" : "online" }, }))} className='basis-[20%]'>{userAstrologerDataById?.chat_status == "online" ? <SwitchOnSvg /> : <SwitchOffSvg />}</div> </div>
                            <div className='flex items-center gap-2 cursor-pointer'><div className='basis-[75%] text-nowrap'>Change Call Status: </div> <div onClick={() => dispatch(UserActions?.changeUserAstrologerCallStatus({ data: { astrologerId: userAstrologerDataById?._id, call_status: userAstrologerDataById?.call_status == "online" ? "offline" : "online" }, }))} className='basis-[20%]'>{userAstrologerDataById?.call_status == "online" ? <SwitchOnSvg /> : <SwitchOffSvg />}</div> </div>
                            {/* <div className='flex items-center gap-2 cursor-pointer'><div className='basis-[75%] text-nowrap'>Change Video Call Status: </div> <div onClick={() => dispatch(UserActions?.changeUserAstrologerVideoCallStatus({ data: { astrologerId: userAstrologerDataById?._id, video_call_status: userAstrologerDataById?.video_call_status == "online" ? "offline" : "online" }, }))} className='basis-[20%]'>{userAstrologerDataById?.video_call_status == "online" ? <SwitchOnSvg /> : <SwitchOffSvg />}</div> </div> */}
                        </div>
                    </div>

                    <div className='border border-primary rounded-md p-5 flex items-center justify-between flex-wrap gap-5 bg-orange-100'>
                        <div className='flex gap-5 items-center flex-wrap text-nowrap'>
                            <div className='flex items-center gap-3'><WalletSvg /> Today's Earning : {IndianRupee(userAstrologerDataById?.today_earnings?.earnings)}</div>
                            <div className='flex items-center gap-3'><WalletSvg /> Total Earning : {IndianRupee(userAstrologerDataById?.wallet_balance)}</div>
                        </div>

                        <div onClick={() => setWithdrawalModelOpen(true)} className='cursor-pointer bg-primary border border-primary hover:bg-orange-400 text-center text-sm rounded-md text-white font-light px-4 py-1.5 transition-all duration-500'>Withdraw</div>
                    </div>
                </article>
            </section>

            <section className='px-[80px] py-7 max-sm:px-[20px]'>
                <article>
                    <main>
                        <div className='bg-primary py-3 px-10 max-md:px-5 relative rounded-t-md'>
                            <div className='font-semibold text-white text-lg max-md:text-base tracking-wider text-center max-md:text-left'>Transaction History</div>
                            <button onClick={() => navigate('/astrologer-dashboard/transaction-history')} className='border border-primary px-8 max-md:px-5 py-1.5 rounded-md text-primary absolute right-5 top-2.5 max-md:top-[7px] bg-white text-sm'>See more</button>
                        </div>

                        <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                            <table className="w-full text-left border-separate border-spacing-2">
                                <thead>
                                    <tr className="text-sm shadow-md text-nowrap">
                                        <th className="p-[12px_9px] font-[600]">Customer Name</th>
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
                                    {userAstrologerTransactionHistoryData && userAstrologerTransactionHistoryData?.map((value, index) => (
                                        <tr key={index} className={`text-sm`}>
                                            <td className="w-[400px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{value?.customerId?.customerName}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.type}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{Number(value?.totalPrice)?.toFixed(2)}</td>
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

            {/* UserAstrologerWithdrawalRequest */}
            <UserAstrologerWithdrawalRequest isOpen={withdrawalModelOpen} handleClose={() => setWithdrawalModelOpen(false)} />
        </>
    )
}

export default MyAccount;