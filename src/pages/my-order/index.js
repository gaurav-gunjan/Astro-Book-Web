import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as UserActions from '../../redux/actions/userAction';
import { RightArrowSvg } from '../../assets/svg';
import OrderHistoryProductDetailModal from '../../components/modal/OrderHistoryProductDetailModal';
import { api_urls } from '../../utils/api-urls';
import { IndianRupee, SecondToHMS } from '../../utils/common-function';

const MyOrder = () => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(searchParams);
    const activeHead = query.get('active-tab') || 'Order History';

    const dispatch = useDispatch();
    const { userCustomerDataById, userCustomerOrderHistoryData, userCustomerPujaBookHistoryData } = useSelector(state => state?.userReducer);

    const [state, setState] = useState({ productModelOpen: false, productModelData: null });
    const { productModelOpen, productModelData } = state;

    useEffect(() => {
        userCustomerDataById && dispatch(UserActions?.getUserCustomerOrderHistory());
        userCustomerDataById && dispatch(UserActions?.getUserCustomerPujaBookHistory());
    }, [userCustomerDataById]);

    return (
        <>
            <TopHeaderSection title={'Order History'} />

            <main className='px-7 flex justify-center gap-4 py-[20px]'>
                {['order-history', 'book-history']?.map((value, index) => <div onClick={() => setSearchParams(`active-tab=${value.toLowerCase().split(' ').join('-')}`)} key={index} className={`w-32 text-sm border text-center border-primary ${activeHead == value && 'bg-primary text-white'} hover:scale-105 py-2 rounded-md cursor-pointer flex items-center justify-center transition-all duration-300 capitalize`}>{value?.split('-')?.join(' ')}</div>)}
            </main>

            <section className='px-[100px] py-7 max-sm:px-[20px]'>
                <article>

                    {activeHead == 'order-history' && <main>
                        <div className='bg-primary py-3 flex  items-center justify-center px-10 relative rounded-t-md'>
                            <div className='font-semibold text-white text-lg tracking-wider text-center'>Order History</div>
                        </div>

                        <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                            <table className="w-full text-left border-separate border-spacing-2">
                                <thead>
                                    <tr className="text-sm shadow-md text-nowrap">
                                        <th className="p-[12px_9px] font-[600]">Invoice Id</th>
                                        <th className="p-[12px_9px] font-[600]">Amount</th>
                                        <th className="p-[12px_9px] font-[600]">Date</th>
                                        <th className="p-[12px_9px] font-[600]">Time</th>
                                        <th className="p-[12px_9px] font-[600]">Status</th>
                                        <th className="p-[12px_9px] font-[600] text-center">Product</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-800'>
                                    {userCustomerOrderHistoryData && userCustomerOrderHistoryData?.map((value, index) => (
                                        <tr key={index} className={`text-sm`}>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.invoiceId}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.amount}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.createdAt).format('DD MMM YYYY') || 'N/A'}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.createdAt).format('hh:mm a') || 'N/A'}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.status?.toLowerCase()}</td>
                                            <td onClick={() => setState({ productModelOpen: true, productModelData: value })} className="w-[100px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-center flex items-center justify-center cursor-pointer">{<RightArrowSvg />}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>}

                    {activeHead == 'book-history' && <main>
                        <div className='bg-primary py-3 flex  items-center justify-center px-10 relative rounded-t-md'>
                            <div className='font-semibold text-white text-lg tracking-wider text-center'>Book History</div>
                        </div>

                        <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                            <table className="w-full text-left border-separate border-spacing-2 text-nowrap">
                                <thead>
                                    <tr className="text-sm shadow-md text-nowrap">
                                        <th className="p-[12px_9px] font-[600]">Astrologer</th>
                                        <th className="p-[12px_9px] font-[600]">Puja</th>
                                        <th className="p-[12px_9px] font-[600]">Image</th>
                                        <th className="p-[12px_9px] font-[600]">Amount</th>
                                        <th className="p-[12px_9px] font-[600]">Duration</th>
                                        <th className="p-[12px_9px] font-[600]">Puja Date</th>
                                        <th className="p-[12px_9px] font-[600]">Puja Time</th>
                                        <th className="p-[12px_9px] font-[600]">Invoice Id</th>
                                        <th className="p-[12px_9px] font-[600]">Order Id</th>
                                        <th className="p-[12px_9px] font-[600]">Payment Status</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-800'>
                                    {userCustomerPujaBookHistoryData && userCustomerPujaBookHistoryData?.map((value, index) => (
                                        <tr key={index} className={`text-sm`}>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.astrologerId?.astrologerName}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.pujaId?.pujaName}</td>
                                            <td className='rounded-full flex items-center justify-center py-0.5'><img src={api_urls + 'uploads/' + value?.pujaId?.image} className='rounded-full w-10 h-10 object-contain bg-gray-300' /></td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{IndianRupee(value?.amount)}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{SecondToHMS(value?.duration || 0)}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.pujaDate)?.utc()?.format('DD MMM YYYY') || 'N/A'}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.pujaTime).utc().format('hh:mm a') || 'N/A'}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.invoice_id}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.orderId}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value.payment_status || 'N/A'}</td>
                                            {/* <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.status?.toLowerCase()}</td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>}
                </article>
            </section>

            {/* OrderHistoryProductDetailModal */}
            <OrderHistoryProductDetailModal isOpen={productModelOpen} handleClose={() => setState({ ...state, productModelOpen: false })} data={productModelData} />
        </>
    )
}

export default MyOrder;