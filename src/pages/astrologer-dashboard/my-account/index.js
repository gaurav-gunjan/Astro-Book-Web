import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../../utils/api-urls';
import { IndianRupee, SecondToHMS } from '../../../utils/common-function';
import { SearchSvg, SwitchOffSvg, SwitchOnSvg, WalletSvg } from '../../../assets/svg';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import UserAstrologerWithdrawalRequest from '../../../components/modal/UserAstrologerWithdrawalRequest';
import * as UserActions from '../../../redux/actions/userAction';
import PageHeading from '../../../components/common/PageHeading';

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
            <TopHeaderSection />

            <section className='px-[80px] py-7 max-sm:px-[20px]'>
                <article className='flex flex-col gap-5'>
                    <div className='py-5 px-5 bg-[#E5D18E90] border border-primary rounded-md flex items-center justify-between flex-wrap gap-10'>
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

                    <div className='border border-primary rounded-md p-5 flex items-center justify-between flex-wrap gap-5 bg-[#E5D18E90]'>
                        <div className='flex gap-5 items-center flex-wrap text-nowrap'>
                            <div className='flex items-center gap-3'><WalletSvg /> Today's Earning : {IndianRupee(userAstrologerDataById?.today_earnings?.earnings)}</div>
                            <div className='flex items-center gap-3'><WalletSvg /> Total Earning : {IndianRupee(userAstrologerDataById?.wallet_balance)}</div>
                        </div>

                        <div onClick={() => setWithdrawalModelOpen(true)} className='cursor-pointer bg-primary border border-primary hover:bg-orange-400 text-center text-sm rounded-md text-white font-light px-4 py-1.5 transition-all duration-500'>Withdraw</div>
                    </div>
                </article>
            </section>

            <section className='px-[80px] max-md:px-[20px] py-5'>
                <main className='flex justify-between gap-5'>
                    <PageHeading title={'Transaction History'} />

                    <div className='flex items-center gap-3'>
                        <div className='border border-[#DDDDDD] rounded-md flex items-center max-sm:w-[90vw]'>
                            <input type='search' placeholder='Search here..' className='outline-none px-3 text-[16px] max-md:text-[16px] rounded-md h-full w-[330px] max-xl:w-[300px] max-lg:w-[100%]' />
                            <button className='bg-[#F1B646] border-[#F1B646] rounded-e-md flex items-center justify-center p-2 px-3 w-[50px] h-full'><SearchSvg w='18' h='18' /></button>
                        </div>
                        <button onClick={() => navigate('/astrologer-dashboard/transaction-history')} className='border border-secondary px-8 max-md:px-5 py-1.5 rounded-md text-secondary hover:bg-secondary hover:text-black bg-white text-sm transition-all duration-500 ease-in'>See more</button>
                    </div>
                </main>
            </section>

            <section className='px-[80px] pb-10 max-sm:px-[20px]'>
                <article>
                    <main>
                        <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                            <table className="w-full text-left border-separate text-nowrap">
                                <thead>
                                    <tr className="text-sm shadow-sm text-nowrap bg-[#F1B646]">
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
                                        <tr key={index} className={`text-sm ${index % 2 !== 0 && 'bg-[#F6F6F6]'}`}>
                                            <td className="w-[400px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{value?.customerId?.customerName}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.type}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{Number(value?.totalPrice)?.toFixed(2)}</td>
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

            {/* UserAstrologerWithdrawalRequest */}
            <UserAstrologerWithdrawalRequest isOpen={withdrawalModelOpen} handleClose={() => setWithdrawalModelOpen(false)} />
        </>
    )
}

export default MyAccount;