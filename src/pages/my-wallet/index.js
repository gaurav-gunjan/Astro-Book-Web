import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { WalletSvg } from '../../assets/svg';
import { IndianRupee } from '../../utils/common-function';
import TopHeaderSection from '../../components/common/TopHeaderSection';

const MyWallet = () => {
    const navigate = useNavigate();
    const { userCustomerDataById } = useSelector(state => state?.userReducer);

    return (
        <>
            <TopHeaderSection title={'Your Transactions'} />

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
                            <div className='font-semibold text-white text-lg tracking-wider text-center'>Transaction History</div>
                        </div>

                        <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                            <table className="w-full text-left border-separate border-spacing-2">
                                <thead>
                                    <tr className="text-center text-sm shadow-md text-nowrap">
                                        <th className="p-[12px_15px] font-[600]">Customer Name</th>
                                        <th className="p-[12px_15px] font-[600]">Service Type</th>
                                        <th className="p-[12px_15px] font-[600]">Total Amount</th>
                                        <th className="p-[12px_15px] font-[600]">Duration</th>
                                        <th className="p-[12px_15px] font-[600]">Date & Time</th>
                                        <th className="p-[12px_15px] font-[600]">Platform Charges</th>
                                        <th className="p-[12px_15px] font-[600]">Astrologer Earning</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-800'>
                                    {Array(5)?.fill('')?.map((value, index) => (
                                        <tr key={index} className={`text-sm`}>
                                            <td className="w-[400px] bg-[#F6F6F6] text-center p-[8px_10px] box-border text-[14px] outline-none">Test</td>
                                            <td className="w-[200px] bg-[#F6F6F6] text-center p-[8px_10px] box-border text-[14px] outline-none">Test</td>
                                            <td className="w-[200px] bg-[#F6F6F6] text-center p-[8px_10px] box-border text-[14px] outline-none">Test</td>
                                            <td className="w-[200px] bg-[#F6F6F6] text-center p-[8px_10px] box-border text-[14px] outline-none">Test</td>
                                            <td className="w-[200px] bg-[#F6F6F6] text-center p-[8px_10px] box-border text-[14px] outline-none">Test</td>
                                            <td className="w-[200px] bg-[#F6F6F6] text-center p-[8px_10px] box-border text-[14px] outline-none">Test</td>
                                            <td className="w-[200px] bg-[#F6F6F6] text-center p-[8px_10px] box-border text-[14px] outline-none">Test</td>
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

export default MyWallet;