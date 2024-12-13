import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as UserActions from '../../redux/actions/userAction';
import { RightArrowSvg, SearchSvg } from '../../assets/svg';
import OrderHistoryProductDetailModal from '../../components/modal/OrderHistoryProductDetailModal';
import { api_urls } from '../../utils/api-urls';
import { DeepSearchSpace, IndianRupee, SecondToHMS } from '../../utils/common-function';
import PageHeading from '../../components/common/PageHeading';

const MyOrder = () => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(searchParams);
    const activeHead = query.get('active-tab') || 'Order History';

    const dispatch = useDispatch();
    const { userCustomerDataById, userCustomerOrderHistoryData, userCustomerPujaBookHistoryData } = useSelector(state => state?.userReducer);

    const [searchOrderHistoryText, setSearchOrderHistoryText] = useState('');
    const filteredOrderHistoryData = DeepSearchSpace(userCustomerOrderHistoryData, searchOrderHistoryText);
    const [searchPujaBookHistoryText, setSearchPujaBookHistoryText] = useState('');
    const filteredPujaBookHistoryData = DeepSearchSpace(userCustomerPujaBookHistoryData, searchPujaBookHistoryText);

    const [state, setState] = useState({ productModelOpen: false, productModelData: null });
    const { productModelOpen, productModelData } = state;

    useEffect(() => {
        userCustomerDataById && dispatch(UserActions?.getUserCustomerOrderHistory());
        userCustomerDataById && dispatch(UserActions?.getUserCustomerPujaBookHistory());
    }, [userCustomerDataById]);

    return (
        <>
            <TopHeaderSection title={'Order History'} />

            {activeHead == 'order-history' &&
                <>
                    <section className='px-[80px] max-md:px-[20px] py-10'>
                        <main className='flex justify-between gap-5'>
                            <PageHeading title={'Order History'} />

                            <div className='border border-[#DDDDDD] rounded-md flex items-center max-sm:w-[90vw]'>
                                <input value={searchOrderHistoryText} onChange={(e) => setSearchOrderHistoryText(e?.target?.value)} type='search' placeholder='Search here..' className='outline-none px-3 text-[16px] max-md:text-[16px] rounded-md h-full w-[330px] max-xl:w-[300px] max-lg:w-[100%]' />
                                <button className='bg-[#F1B646] border-[#F1B646] rounded-e-md flex items-center justify-center p-2 px-3 w-[50px] h-full'><SearchSvg w='18' h='18' /></button>
                            </div>
                        </main>
                    </section>

                    <main className='px-7 flex justify-center gap-4 pb-10'>
                        {['order-history', 'book-history']?.map((value, index) => <div onClick={() => setSearchParams(`active-tab=${value.toLowerCase().split(' ').join('-')}`)} key={index} className={`w-32 text-sm border text-center border-primary ${activeHead == value && 'bg-primary text-white'} hover:scale-105 py-2 rounded-md cursor-pointer flex items-center justify-center transition-all duration-300 capitalize`}>{value?.split('-')?.join(' ')}</div>)}
                    </main>

                    <section className='px-[80px] pb-16 max-sm:px-[20px]'>
                        <article>
                            <main>
                                <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                                    <table className="w-full text-left border-separate text-nowrap">
                                        <thead>
                                            <tr className="text-sm shadow-sm text-nowrap bg-[#F1B646]">
                                                <th className="p-[12px_9px] font-[600]">Invoice Id</th>
                                                <th className="p-[12px_9px] font-[600]">Amount</th>
                                                <th className="p-[12px_9px] font-[600]">Date</th>
                                                <th className="p-[12px_9px] font-[600]">Time</th>
                                                <th className="p-[12px_9px] font-[600]">Status</th>
                                                <th className="p-[12px_9px] font-[600] text-center">Product</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-gray-800'>
                                            {userCustomerOrderHistoryData && filteredOrderHistoryData?.map((value, index) => (
                                                <tr key={index} className={`text-sm ${index % 2 !== 0 && 'bg-[#F6F6F6]'}`}>
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.invoiceId}</td>
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.amount}</td>
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.createdAt).format('DD MMM YYYY') || 'N/A'}</td>
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.createdAt).format('hh:mm a') || 'N/A'}</td>
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.status?.toLowerCase()}</td>
                                                    <td onClick={() => setState({ productModelOpen: true, productModelData: value })} className="w-[100px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-center flex items-center justify-center cursor-pointer">{<RightArrowSvg />}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </main>
                        </article>
                    </section>
                </>
            }

            {activeHead == 'book-history' &&
                <>
                    <section className='px-[80px] max-md:px-[20px] py-10'>
                        <main className='flex justify-between gap-5'>
                            <PageHeading title={'Book History'} />

                            <div className='border border-[#DDDDDD] rounded-md flex items-center max-sm:w-[90vw]'>
                                <input value={searchPujaBookHistoryText} onChange={(e) => setSearchPujaBookHistoryText(e?.target?.value)} type='search' placeholder='Search here..' className='outline-none px-3 text-[16px] max-md:text-[16px] rounded-md h-full w-[330px] max-xl:w-[300px] max-lg:w-[100%]' />
                                <button className='bg-[#F1B646] border-[#F1B646] rounded-e-md flex items-center justify-center p-2 px-3 w-[50px] h-full'><SearchSvg w='18' h='18' /></button>
                            </div>
                        </main>
                    </section>

                    <main className='px-7 flex justify-center gap-4 pb-10'>
                        {['order-history', 'book-history']?.map((value, index) => <div onClick={() => setSearchParams(`active-tab=${value.toLowerCase().split(' ').join('-')}`)} key={index} className={`w-32 text-sm border text-center border-primary ${activeHead == value && 'bg-primary text-white'} hover:scale-105 py-2 rounded-md cursor-pointer flex items-center justify-center transition-all duration-300 capitalize`}>{value?.split('-')?.join(' ')}</div>)}
                    </main>

                    <section className='px-[80px] pb-16 max-sm:px-[20px]'>
                        <article>
                            <main>
                                <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                                    <table className="w-full text-left border-separate text-nowrap">
                                        <thead>
                                            <tr className="text-sm shadow-sm text-nowrap bg-[#F1B646]">
                                                <th className="p-[12px_9px] font-[600]">Astrologer</th>
                                                <th className="p-[12px_9px] font-[600]">Puja</th>
                                                <th className="p-[12px_9px] font-[600]">Image</th>
                                                <th className="p-[12px_9px] font-[600]">Amount</th>
                                                <th className="p-[12px_9px] font-[600]">Duration</th>
                                                <th className="p-[12px_9px] font-[600]">Puja Date</th>
                                                <th className="p-[12px_9px] font-[600]">Puja Time</th>
                                                <th className="p-[12px_9px] font-[600]">Invoice Id</th>
                                                <th className="p-[12px_9px] font-[600]">Order Id</th>
                                                <th className="p-[12px_9px] font-[600]">Images</th>
                                                <th className="p-[12px_9px] font-[600]">Video</th>
                                                <th className="p-[12px_9px] font-[600]">Payment Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-gray-800'>
                                            {userCustomerPujaBookHistoryData && filteredPujaBookHistoryData?.map((value, index) => (
                                                <tr key={index} className={`text-sm ${index % 2 !== 0 && 'bg-[#F6F6F6]'}`}>
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.astrologerId?.astrologerName}</td>
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.pujaId?.pujaName}</td>
                                                    <td className='w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize'><div className='flex items-center justify-center w-20'><img src={api_urls + 'uploads/' + value?.pujaId?.image} className='rounded-full w-10 h-10 object-contain bg-gray-300' /></div></td>
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{IndianRupee(value?.amount)}</td>
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{SecondToHMS(value?.duration || 0)}</td>
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.pujaDate)?.utc()?.format('DD MMM YYYY') || 'N/A'}</td>
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.pujaTime).utc().format('hh:mm a') || 'N/A'}</td>
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.invoice_id}</td>
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.orderId}</td>
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize"><div className='flex gap-3 h-full justify-center items-center w-60'>{value?.images?.map((image, idx) => <img key={idx} src={api_urls + image} className='h-10 w-10 rounded-full' />)}</div></td >
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.videos[0] &&  <video controls className='h-20 min-w-24'><source src={api_urls + value?.videos[0]} /></video>}</td >
                                                    <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value.payment_status || 'N/A'}</td>
                                                    {/* <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.status?.toLowerCase()}</td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </main>
                        </article>
                    </section>
                </>
            }


            {/* OrderHistoryProductDetailModal */}
            <OrderHistoryProductDetailModal isOpen={productModelOpen} handleClose={() => setState({ ...state, productModelOpen: false })} data={productModelData} />
        </>
    )
}

export default MyOrder;