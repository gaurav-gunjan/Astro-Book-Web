import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SearchSvg, WalletSvg } from '../../assets/svg';
import { DeepSearchSpace, IndianRupee } from '../../utils/common-function';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as UserActions from '../../redux/actions/userAction';
import PageHeading from '../../components/common/PageHeading';

const WalletHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDataById, userCustomerWalletHistoryData } = useSelector(state => state?.userReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(userCustomerWalletHistoryData, searchText);

    useEffect(() => {
        userCustomerDataById && dispatch(UserActions?.getUserCustomerWalletHistory());
    }, [userCustomerDataById]);

    return (
        <>
            <TopHeaderSection />

            <section className='px-[80px] max-md:px-[20px] py-10'>
                <main className='flex justify-between gap-5'>
                    <PageHeading title={'Wallet History'} />

                    <div className='border border-[#DDDDDD] rounded-md flex items-center max-sm:w-[90vw]'>
                        <input value={searchText} onChange={(e) => setSearchText(e?.target?.value)} type='search' placeholder='Search here..' className='outline-none px-3 text-[16px] max-md:text-[16px] rounded-md h-full w-[330px] max-xl:w-[300px] max-lg:w-[100%]' />
                        <button className='bg-[#F1B646] border-[#F1B646] rounded-e-md flex items-center justify-center p-2 px-3 w-[50px] h-full'><SearchSvg w='18' h='18' /></button>
                    </div>
                </main>
            </section>

            <section className='px-[80px] pb-10 max-sm:px-[20px]'>
                <article className='flex flex-col gap-5'>
                    <div>Check your balance, add money and see your complete transaction history here</div>

                    <div className='border border-primary rounded-md p-5 flex items-center justify-between gap-5 bg-[#E5D18E90]'>
                        <div className='flex items-center gap-7'><WalletSvg /> Wallet : {IndianRupee(userCustomerDataById?.wallet_balance)}</div>
                        <div onClick={() => navigate('/recharge')} className='cursor-pointer bg-primary border border-primary text-center text-sm rounded-md text-white font-semibold px-3 py-1.5 transition-all duration-500'>Add Money</div>
                    </div>
                </article>
            </section>

            <section className='px-[80px] pb-16 max-sm:px-[20px]'>
                <article>
                    <main>
                        <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                            <table className="w-full text-left border-separate text-nowrap">
                                <thead>
                                    <tr className="text-sm shadow-sm text-nowrap bg-[#F1B646]">
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
                                    {userCustomerWalletHistoryData && filteredData?.map((value, index) => (
                                        <tr key={index} className={`text-sm ${index % 2 !== 0 && 'bg-[#F6F6F6]'}`}>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.rechargePlanId?.amount || 'N/A'}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.rechargePlanId?.percentage || 0}%</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.gst}%</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.amount}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.totalAmount}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.type?.toLowerCase()}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.transactionType?.toLowerCase()}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.createdAt).format('DD MMM YYYY') || 'N/A'}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.createdAt).format('hh:mm a') || 'N/A'}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.payment_status || 'N/A'}</td>
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