import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchSvg } from '../../../assets/svg';
import { api_urls } from '../../../utils/api-urls';
import PageHeading from '../../../components/common/PageHeading';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { DeepSearchSpace, IndianRupee, SecondToHMS } from '../../../utils/common-function';
import * as UserActions from '../../../redux/actions/userAction';
import { toaster } from '../../../utils/services/toast-service';

const AssignPujaHistory = () => {
    const dispatch = useDispatch();
    const { userAstrologerDataById, userAstrologerBookedPujaHistoryData } = useSelector(state => state?.userReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(userAstrologerBookedPujaHistoryData, searchText);

    const [images, setImages] = useState([]);
    const handleImages = (event, id) => {
        console.log("ID ::: ", id);
        const selectedFiles = event.target.files;
        console.log("Selected files: ", selectedFiles);

        if (selectedFiles?.length > 5) {
            toaster?.info({ text: "Please select file less than 5" });
        } else {
            if (selectedFiles && selectedFiles.length > 0) {
                const updatedImages = { ...images }; // Clone the current images state

                updatedImages[id] = Array.from(selectedFiles).map(file =>
                    ({ file: URL.createObjectURL(file), bytes: file })
                );

                setImages(updatedImages);
            }
        }
    };

    // const handleImages = (event, index) => {
    //     console.log("Index ::: ", index);
    //     const selectedFiles = event.target.files;
    //     console.log("Selected files: ", selectedFiles);

    //     if (selectedFiles?.length > 5) {
    //         toaster?.info({ text: "Please select file less than 5" });
    //     } else {
    //         if (selectedFiles && selectedFiles.length > 0) {
    //             const updatedImages = [...images];
    //             console.log("Updated Images: ", updatedImages);

    //             updatedImages[index] = Array.from(selectedFiles).map(file =>
    //                 ({ file: URL.createObjectURL(file), bytes: file })
    //             );

    //             setImages(updatedImages);
    //         }
    //     }

    // };

    // setImages(prevImages => [...prevImages, ...updatedImages]);

    useEffect(() => {
        userAstrologerDataById && dispatch(UserActions?.getUserAstrologerBookedPujaHistory());
    }, [userAstrologerDataById]);

    return (
        <>
            <TopHeaderSection />

            <section className='px-[80px] max-md:px-[20px] py-10'>
                <main className='flex justify-between gap-5'>
                    <PageHeading title={'Book Puja History'} />

                    <div className='border border-[#DDDDDD] rounded-md flex items-center max-sm:w-[90vw]'>
                        <input value={searchText} onChange={(e) => setSearchText(e?.target?.value)} type='search' placeholder='Search here..' className='outline-none px-3 text-[16px] max-md:text-[16px] rounded-md h-full w-[330px] max-xl:w-[300px] max-lg:w-[100%]' />
                        <button className='bg-[#F1B646] border-[#F1B646] rounded-e-md flex items-center justify-center p-2 px-3 w-[50px] h-full'><SearchSvg w='18' h='18' /></button>
                    </div>
                </main>
            </section>

            <section className='px-[80px] pb-16 max-sm:px-[20px]'>
                <article>
                    <main>
                        <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                            <table className="w-full text-left border-separate text-nowrap">
                                <thead>
                                    <tr className="text-sm shadow-sm text-nowrap bg-[#F1B646]">
                                        <th className="p-[12px_9px] font-[600]">Customer</th>
                                        <th className="p-[12px_9px] font-[600]">Puja</th>
                                        <th className="p-[12px_9px] font-[600]">Image</th>
                                        <th className="p-[12px_9px] font-[600]">Amount</th>
                                        <th className="p-[12px_9px] font-[600]">Duration</th>
                                        <th className="p-[12px_9px] font-[600]">Puja Date</th>
                                        <th className="p-[12px_9px] font-[600]">Puja Time</th>
                                        <th className="p-[12px_9px] font-[600]">Invoice Id</th>
                                        <th className="p-[12px_9px] font-[600]">Your Price</th>
                                        <th className="p-[12px_9px] font-[600]">Admin Price</th>
                                        {/* <th className="p-[12px_9px] font-[600]">Upload Image</th>
                                        <th className="p-[12px_9px] font-[600]">Upload Video</th> */}
                                    </tr>
                                </thead>
                                <tbody className='text-gray-800'>
                                    {userAstrologerBookedPujaHistoryData && filteredData?.map((value, index) => (
                                        <tr key={index} className={`text-sm ${index % 2 !== 0 && 'bg-[#F6F6F6]'}`}>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.customerId?.customerName || 'N/A'}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.pujaId?.pujaName}</td>
                                            <td className='rounded-full flex items-center justify-center py-0.5'><img src={api_urls + 'uploads/' + value?.pujaId?.image} className='rounded-full w-10 h-10 object-contain bg-gray-300' /></td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-wrap h-full">{IndianRupee(value?.amount)}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{SecondToHMS(value?.duration || 0)}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.pujaDate)?.utc()?.format('DD MMM YYYY') || 'N/A'}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-nowrap">{moment(value?.pujaTime)?.utc()?.format('hh:mm a') || 'N/A'}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize">{value?.invoice_id || 'N/A'}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-wrap h-full">{IndianRupee(value?.astrologerPrice)}</td>
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-wrap h-full">{IndianRupee(value?.adminCommission)}</td>
                                            {/* <td className='flex flex-col gap-3 pb-3 px-2' onClick={() => console.log('td ::: ', value?._id, index)}>
                                                <input id='images' hidden type='file' accept="image/*" multiple onClick={() => console.log('Inside', value?._id, index)} className='m-0 p-0 hidden' onChange={(event) => handleImages(event, value?._id)} />
                                                <label htmlFor='images' className='cursor-pointer bg-secondary px-1 py-0.5 rounded-md text-xs text-center' >Choose Images</label>
                                                <div className='flex gap-2 w-[100px]'>{images[value?._id]?.map((val, idx) => <img key={idx} src={val?.file} className='h-5 w-5 rounded-full' alt='Images' />)}</div>
                                            </td>
                                            <td><input type='file' accept="video/*" /></td> */}
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