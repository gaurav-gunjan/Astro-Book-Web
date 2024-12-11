import moment from 'moment/moment';
import ReactModal from 'react-modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CrossSvg, SearchSvg, UploadSvg } from '../../../assets/svg';
import { api_urls } from '../../../utils/api-urls';
import { toaster } from '../../../utils/services/toast-service';
import PageHeading from '../../../components/common/PageHeading';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { DeepSearchSpace, IndianRupee, SecondToHMS } from '../../../utils/common-function';
import * as UserActions from '../../../redux/actions/userAction';

const AssignPujaHistory = () => {
    const dispatch = useDispatch();
    const { userAstrologerDataById, userAstrologerBookedPujaHistoryData } = useSelector(state => state?.userReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(userAstrologerBookedPujaHistoryData, searchText);

    const [modalData, setModalData] = useState({ ismodalOpen: false, modalData: null })
    // console.log("Modal data :::", modalData);

    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState({ file: '', bytes: '' });

    //! Handle Image 
    const handleImages = (event) => {
        const selectedFiles = event.target.files;
        console.log("Selected files: ", selectedFiles);

        if (selectedFiles?.length > 5) {
            toaster?.info({ text: "Please select file less than 5" });
        } else {
            if (selectedFiles && selectedFiles.length > 0) {
                const updatedImages = Array.from(selectedFiles).map(file => ({
                    file: URL.createObjectURL(file),
                    bytes: file
                }));
                setImages(updatedImages);
            }
        }
    };

    //! Handle Video
    const handleVideo = (event) => {
        const selectedFiles = event.target.files;
        console.log("Selected files: ", selectedFiles);

        if (selectedFiles?.length > 0) setVideo({ file: URL.createObjectURL(selectedFiles[0]), bytes: selectedFiles[0] });
        else toaster?.info({ text: "Please select a file" });
    };

    //! Handle Submit : Uplaoding File
    const handleSubmit = () => {
        console.log({ images, video, description, orderId: modalData?.modalData?.orderId });

        const formData = new FormData();

        formData.append('orderId', modalData?.modalData?.orderId);
        formData.append('description', description);
        formData.append('videos', video?.bytes);
        images.forEach((image, index) => {
            formData.append(`images`, image?.bytes);
        });

        const payload = {
            data: formData,
            onComplete: () => {
                setModalData({ ismodalOpen: false, modalData: null })
                setImages([]);
                setVideo({});
                setDescription('');
            }
        }

        //! Dispatching API For Uploading File
        dispatch(UserActions?.completeBookedPujaHistory(payload));
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
                                        <th className="p-[12px_9px] font-[600]">Upload File</th>
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
                                            <td className="w-[200px] p-[8px_10px] box-border text-[14px] outline-none capitalize text-wrap h-full cursor-pointer" onClick={() => setModalData({ ismodalOpen: true, modalData: value })}><UploadSvg /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </article>
            </section>


            <ReactModal isOpen={modalData?.ismodalOpen} className="modal-content-small" overlayClassName="modal-overlay-small" closeTimeoutMS={200}>
                <div className='bg-secondary py-2 px-5 flex gap-10 justify-between items-center'>
                    <div className='text-black'>Upload Files</div>
                    <div onClick={() => {
                        setModalData({ ismodalOpen: false, modalData: null })
                        setImages([]);
                        setVideo({});
                        setDescription('');
                    }} className='bg-red-600 text-white p-1.5 rounded-full cursor-pointer'><CrossSvg w='16' h='16' /></div>
                </div>
                <main className='p-10 flex flex-col gap-5'>
                    <input id='images' type='file' accept="image/*" multiple onChange={(event) => handleImages(event)} />
                    <div className='flex gap-2'>{images?.map((val, idx) => <img key={idx} src={val?.file} className='h-10 w-10 rounded-full' alt='Images' />)}</div>

                    <input id='images' type='file' accept="video/*" multiple onChange={(event) => handleVideo(event)} />

                    <input type='text' placeholder='description' value={description} onChange={(e) => setDescription(e?.target?.value)} className='outline-none border border-black px-5 py-1.5 rounded-sm' />
                    <button onClick={handleSubmit} className='bg-[#F1B646] text-black text-sm text-nowrap text-center px-10 py-2 font-[500] rounded-sm'>Submit</button>
                </main>
            </ReactModal>
        </>
    )
}

export default AssignPujaHistory;