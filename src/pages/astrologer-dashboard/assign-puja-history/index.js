import React, { useEffect } from 'react';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { useDispatch, useSelector } from 'react-redux';
import * as UserActions from '../../../redux/actions/userAction';
import moment from 'moment/moment';
import { IndianRupee } from '../../../utils/common-function';
import { api_urls } from '../../../utils/api-urls';

const AssignPujaHistory = () => {
    const dispatch = useDispatch();
    const { userAstrologerDataById, userAstrologerAssignPujaHistoryData } = useSelector(state => state?.userReducer);

    useEffect(() => {
        userAstrologerDataById && dispatch(UserActions?.getUserAstrologerAssignPujaHistory());
    }, [userAstrologerDataById]);

    return (
        <>
            <TopHeaderSection title={'Puja History'} />

            <section className='px-[100px] py-7 max-sm:px-[20px]'>
                <article>
                    <main>
                        <div className='bg-primary py-3 flex  items-center justify-center px-10 relative rounded-t-md'>
                            <div className='font-semibold text-white text-lg tracking-wider text-center'>Assign Puja History</div>
                        </div>

                        <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                            <table className="w-full text-left border-separate border-spacing-2 text-nowrap">
                                <thead>
                                    <tr className="text-sm shadow-md text-nowrap">
                                        <th className="p-[12px_9px] font-[600]">Customer</th>
                                        <th className="p-[12px_9px] font-[600]">Puja</th>
                                        <th className="p-[12px_9px] font-[600]">Image</th>
                                        <th className="p-[12px_9px] font-[600]">Description</th>
                                        <th className="p-[12px_9px] font-[600]">Amount</th>
                                        <th className="p-[12px_9px] font-[600]">Puja Date</th>
                                        <th className="p-[12px_9px] font-[600]">Puja Time</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-800'>
                                    {userAstrologerAssignPujaHistoryData && userAstrologerAssignPujaHistoryData?.map((value, index) => (
                                        <tr key={index} className={`text-sm`}>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.customer?.customerName}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.poojaId?.pujaName}</td>
                                            <td><img src={api_urls + 'uploads/' + value?.poojaId?.image} className='h-24 w-full object-contain' /></td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-wrap h-full"><div className='h-24 w-96 overflow-y-scroll text-justify pr-3' >{value?.poojaId?.description}</div></td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize">{IndianRupee(value?.poojaId?.price)}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.poojaDate).format('DD MMM YYYY') || 'N/A'}</td>
                                            <td className="w-[200px] bg-[#F6F6F6] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.poojaTime).utc().format('hh:mm a') || 'N/A'}</td>
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

export default AssignPujaHistory;