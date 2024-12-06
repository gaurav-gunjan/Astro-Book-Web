import React, { useEffect } from 'react';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { useDispatch, useSelector } from 'react-redux';
import * as UserActions from '../../../redux/actions/userAction';
import moment from 'moment/moment';

const WalletHistory = () => {
    const dispatch = useDispatch();
    const { userAstrologerDataById, userAstrologerWalletHistoryData } = useSelector(state => state?.userReducer);

    useEffect(() => {
        userAstrologerDataById && dispatch(UserActions?.getUserAstrologerWalletHistory());
    }, [userAstrologerDataById]);

    return (
        <>
            <TopHeaderSection title={'Wallet History'} />

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
                                        <th className="p-[12px_10px] font-[600]">Total Amount</th>
                                        <th className="p-[12px_10px] font-[600]">Created Date</th>
                                        <th className="p-[12px_10px] font-[600]">Reason</th>
                                        <th className="p-[12px_10px] font-[600]">Status</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-800'>
                                    {userAstrologerWalletHistoryData && userAstrologerWalletHistoryData?.map((value, index) => (
                                        <tr key={index} className={`text-sm`}>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none">{value?.amount}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none">{moment(value?.createdAt)?.format("DD-MMM-YYYY")}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.reason || 'N/A'}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.status}</td>
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