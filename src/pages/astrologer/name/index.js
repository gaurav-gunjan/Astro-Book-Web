import Swal from 'sweetalert2';
import Modal from 'react-modal';
import ReactStars from 'react-stars';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Color } from '../../../assets/colors';
import { api_urls } from '../../../utils/api-urls';
import { IndianRupee } from '../../../utils/common-function';
import { toaster } from '../../../utils/services/toast-service';
import { CallSvg, ChatSvg, RightArrowHeadSvg } from '../../../assets/svg';
import RecordNotFound from '../../../components/features/RecordNotFound';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import AstrologerGallerySwiper from '../../../components/swiper/AstrologerGallerySwiper';
import * as AstrologerActions from '../../../redux/actions/astrologerAction';
import '../../../assets/css/swiper.css';

Modal.setAppElement('#root');

const SingleAstrologer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location?.state?.stateData;
    const astrologerId = stateData?._id;

    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state?.commonReducer);
    const { userCustomerDataById } = useSelector(state => state?.userReducer);
    const { astrologerDataById, astrologerReviewDataById } = useSelector(state => state?.astrologerReducer);

    const [isReadMore, setIsReadMore] = useState(false);
    const [slidesPerView, setSlidesPerView] = useState(4); //! For Swiper Slider 

    useEffect(() => {
        //! Dispatching API For Getting Single Astrologer
        dispatch(AstrologerActions.getAstrologerById({ astrologerId }));

        //! Dispatching API For Getting Single Astrologer Review
        dispatch(AstrologerActions.getAstrologerReviewById({ astrologerId: astrologerId }));

        const handleResize = () => {
            if (window.innerWidth <= 600) {
                setSlidesPerView(1);
            } else if (window.innerWidth <= 1000) {
                setSlidesPerView(2);
            } else if (window.innerWidth <= 1200) {
                setSlidesPerView(4);
            } else {
                setSlidesPerView(4);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <TopHeaderSection title={astrologerDataById?.astrologerName} />

            {isLoading ?
                <>
                    <section className='px-[100px] max-lg:px-[20px] pt-[50px] pb-[100px]'>
                        <article className='flex flex-col gap-[50px]'>
                            <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                                <main className='flex max-md:flex-col gap-[20px] rounded-xl'>
                                    <div className='rounded-xl h-[250px] max-md:h-[300px] max-md:w-full w-[250px]'><Skeleton height={'100%'} width={'100%'} /></div>

                                    <div className='flex flex-col justify-center gap-[15px] rounded-xl p-[15px]'>
                                        <div className='flex items-center gap-3'>
                                            <div className='h-7 w-20'><Skeleton height={'100%'} /></div>
                                            <div className='flex items-center gap-1'><div className='h-5 w-5'><Skeleton height={'100%'} /></div><div className='h-5 w-5'><Skeleton height={'100%'} /></div><div className='h-5 w-5'><Skeleton height={'100%'} /></div><div className='h-5 w-5'><Skeleton height={'100%'} /></div><div className='h-5 w-5'><Skeleton height={'100%'} /></div></div>
                                        </div>
                                        <div className='h-7 w-60'><Skeleton height={'100%'} /></div>
                                        <div className='h-7 w-40'><Skeleton height={'100%'} /></div>
                                        <hr />
                                        <div className='h-7 w-24'><Skeleton height={'100%'} /></div>
                                    </div>

                                    <div className='flex-1 flex flex-col justify-end items-end max-md:items-start gap-[20px] rounded-xl text-[13px]'>
                                        <div className='h-10 w-60'><Skeleton height={'100%'} style={{ borderRadius: '10px' }} /></div>
                                        <div className='h-10 w-60'><Skeleton height={'100%'} style={{ borderRadius: '10px' }} /></div>
                                    </div>
                                </main>

                                <main className='flex flex-col items-center gap-[15px] justify-center'>
                                    <div className='h-7 w-24'><Skeleton height={'100%'} /></div>
                                    <div className='h-40 w-full'><Skeleton height={'100%'} /></div>
                                </main>

                                <main className='flex flex-wrap gap-5 items-start'>
                                    <div className='flex-grow basis-[100%] max-sm:basis-[100%] flex flex-col gap-5'>
                                        <div className='border rounded-lg p-5 flex flex-col gap-4'>
                                            <div className='h-7 w-28'><Skeleton height={'100%'} /></div>
                                            <main className='flex flex-col gap-3'>
                                                {Array(5)?.fill('')?.map((value, index) => (<div key={index} className='h-20 w-full'><Skeleton height={'100%'} /></div>))}
                                            </main>
                                        </div>
                                    </div>
                                </main>
                            </SkeletonTheme>
                        </article>
                    </section>
                </>
                :
                <section className='bg-primary_bg_dark px-[100px] max-lg:px-[20px] pt-[50px] pb-[100px] text-black'>
                    <article className='flex flex-col gap-[50px] text-[15px]'>

                        <main className='flex gap-5 max-md:flex-col justify-between rounded-xl bg-[#F6F6F6] p-10 flex-1'>
                            <div className='flex max-md:flex-col gap-[20px]'>
                                <img className='max-md:rounded-xl rounded-full h-[150px] max-md:h-[300px] max-md:w-full w-[150px] border-2 border-primary_text_dark' src={api_urls + astrologerDataById?.profileImage} />

                                <div className='flex flex-col justify-center gap-1.5 text-lg rounded-xl p-[15px]'>
                                    <div className='line-clamp-1 font-semibold text-2xl capitalize'>{astrologerDataById?.astrologerName}</div>
                                    <div className='line-clamp-1'>{astrologerDataById?.skill?.length > 0 && astrologerDataById?.skill?.map(value => value?.skill)?.join(' , ')}</div>
                                    <div className='line-clamp-1'>{astrologerDataById?.language?.length > 0 ? astrologerDataById?.language?.join(' , ') : "Hindi"}</div>
                                    <div>Exp : {astrologerDataById?.experience} Years</div>
                                    <div><span className='font-semibold'>{IndianRupee(astrologerDataById?.chat_price)}</span>/min</div>
                                    <div className='flex items-center gap-5 my-3'>
                                        <div className='flex items-center gap-2'><ChatSvg /> 28k mins</div>
                                        <div className='flex items-center gap-2'><CallSvg /> 28k mins</div>
                                    </div>

                                    <div className='flex max-lg:flex-wrap gap-[20px]'>
                                        <button onClick={async () => {
                                            if (Number(userCustomerDataById?.wallet_balance) < Number(astrologerDataById?.call_price) * 5) {
                                                const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", confirmButtonColor: Color.primary, cancelButtonText: "Cancel", showCancelButton: true, cancelButtonColor: Color.darkgrey });
                                                if (result.isConfirmed) navigate('/recharge');
                                            } else {
                                                if (!("Notification" in window)) {
                                                    alert("This browser does not support desktop notifications.");
                                                } else if (Notification.permission === "granted") {
                                                    if (userCustomerDataById) {
                                                        navigate(`/astrologer/intake-form/${astrologerDataById?._id}?type=call`);
                                                    } else {
                                                        toaster.info({ text: 'Please login as a customer' })
                                                    }
                                                } else if (Notification.permission === "denied") {
                                                    alert("You have blocked notifications. Please enable them in your browser settings.");

                                                } else if (Notification.permission === "default") {
                                                    console.log('Requesting Notification Permission');
                                                    await Notification.requestPermission();
                                                }
                                            }
                                        }} disabled={astrologerDataById?.call_status != "online"} className={`flex items-center gap-2 bg-secondary text-black px-2 py-[7px] rounded-full w-[280px] ${astrologerDataById?.call_status != "online" && 'cursor-not-allowed'}`}><div className='bg-white p-2 rounded-full'><CallSvg h='25' w='25' /></div> <div className='line-clamp-1 text-center flex-1 pr-5'>Start Call</div></button>

                                        <button onClick={async () => {
                                            if (Number(userCustomerDataById?.wallet_balance) < Number(astrologerDataById?.chat_price) * 5) {
                                                const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", confirmButtonColor: Color.primary, cancelButtonText: "Cancel", showCancelButton: true, cancelButtonColor: Color.darkgrey });
                                                if (result.isConfirmed) navigate('/recharge');
                                            } else {
                                                if (!("Notification" in window)) {
                                                    alert("This browser does not support desktop notifications.");
                                                } else if (Notification.permission === "granted") {
                                                    if (userCustomerDataById) {
                                                        navigate(`/astrologer/intake-form/${astrologerDataById?._id}?type=chat`);
                                                    } else {
                                                        toaster.info({ text: 'Please login as a customer' })
                                                    }
                                                } else if (Notification.permission === "denied") {
                                                    alert("You have blocked notifications. Please enable them in your browser settings.");

                                                } else if (Notification.permission === "default") {
                                                    console.log('Requesting Notification Permission');
                                                    await Notification.requestPermission();
                                                }
                                            }
                                        }} disabled={astrologerDataById?.chat_status != "online"} className={`flex items-center gap-2 bg-secondary text-black px-2 py-[7px] rounded-full w-[280px] ${astrologerDataById?.chat_status != "online" && 'cursor-not-allowed'}`}><div className='bg-white p-2 rounded-full'><ChatSvg h='25' w='25' /></div> <div className='line-clamp-1 text-center flex-1 pr-5'>Start Chat</div></button>
                                    </div>
                                </div>
                            </div>

                            <button className='bg-primary text-white max-md:hidden px-[50px] py-[7px] rounded-[30px] self-start'>Follow</button>
                        </main>

                        <div className='px-20'>
                            <AstrologerGallerySwiper data={[
                                { image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' },
                                { image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' },
                                { image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' },
                                { image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' },
                                { image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' },
                                { image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' },
                                { image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' },
                                { image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' }
                            ]} slidesPerView={slidesPerView} navigation={true} pagination={false} />
                        </div>

                        <main className='flex flex-col gap-[15px]'>
                            <div className='text-center font-semibold text-2xl flex gap-3 items-center justify-center'>About me {isReadMore ? <div onClick={() => setIsReadMore(false)} className='-rotate-90 cursor-pointer'><RightArrowHeadSvg /></div> : <div onClick={() => setIsReadMore(true)} className='rotate-90 cursor-pointer'><RightArrowHeadSvg /></div>}</div>
                            <div className={`text-center px-10 text-grey tracking-wide ${isReadMore ? '' : 'line-clamp-2'} transition-all duration-500`}>{astrologerDataById?.long_bio}</div>
                        </main>

                        <main className='flex flex-wrap gap-5 items-start'>
                            {/* <div className='border rounded-lg basis-[100%] max-sm:basis-[100%] p-5'>
                            <div className='font-semibold'>Ratings & Reviews</div>
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <div className='text-5xl'>{astrologerDataById?.rating?.toFixed(2)}</div>
                                <ReactStars count={5} edit={false} value={astrologerDataById?.rating} size={24} color2={'#ffd700'} />
                            </div>
                        </div> */}

                            <div className='flex-grow basis-[100%] max-sm:basis-[100%] flex flex-col gap-5'>
                                <div className='font-semibold'>User Review</div>
                                <div className='rounded-lg p-5 flex flex-col gap-4 bg-[#F8F8F8]'>
                                    <main className='flex flex-col gap-3'>
                                        {astrologerReviewDataById.length > 0 ? astrologerReviewDataById.map((value, index) => (
                                            <main key={index} className='bg-white rounded-lg p-5 flex flex-col gap-2'>
                                                <div className='flex justify-between'>
                                                    <div className='flex gap-4 items-center'>
                                                        <div><img src={api_urls + 'uploads/' + value?.customer?.image} className='h-12 w-12 rounded-[50%]' /></div>
                                                        <div className='text-lg'>{value?.customer?.customerName}</div>
                                                    </div>
                                                    <div className='flex gap-0 text-gray-600'><ReactStars count={5} edit={false} value={value?.ratings} size={24} color2={'#ffd700'} /></div>
                                                </div>
                                                <div className='capitalize'>{value?.comments?.toLowerCase()}</div>
                                            </main>
                                        )) : <RecordNotFound />}
                                    </main>
                                </div>
                            </div>
                        </main>
                    </article>
                </section>
            }

            {/* <Modal isOpen={linkedProfileModal} className="modal-content-small" overlayClassName="modal-overlay-small" closeTimeoutMS={200} >
                <div className='bg-gray-100 text-white p-5 flex flex-col gap-2'>
                    <div className='text-center px-5 font-semibold flex justify-between items-center'>
                        <div className='p-3 px-4'></div>
                        <div className='flex flex-col items-center justify-end h-full'>
                            <div className='font-[500] text-2xl text-primary'>Linked<span className='text-primary_text_dark'> Profile</span></div>
                            <div className='flex items-center'><div className='w-[50px] h-[2px] bg-primary'></div><div className='w-[30px] h-[4px] bg-primary'></div><div className='w-[50px] h-[2px] bg-primary'></div></div>
                        </div>
                        <div onClick={() => setLinkedProfileModal(false)} className='cursor-pointer bg-primary p-2 rounded-full' ><CrossSvg h='12' w='12' strokeWidth='5' /></div>
                    </div>

                    <main className='flex flex-col gap-4 p-5'>
                        {linkedProfileData?.map((value, index) => (
                            <RadioButton key={index}
                                label={value?.firstName + ' ' + value?.lastName + ' - ' + value?.gender + ' - ' + DateDifference(moment(value?.dateOfBirth).format('YYYY-MM-DD'))}
                                name="custom-radio"
                                value={value?._id}
                                checked={selectedLinkedProfileData?._id === value?._id}
                                onChange={() => handleSelectedLinkedProfileData(value)}
                            />
                        ))}
                    </main>
                    <div onClick={() => {
                        if (selectedLinkedProfileData) setLinkedProfileModal(false)
                        else toaster.warning({ text: 'Please select a linked profile' });
                    }} className='bg-primary text-center py-1.5 rounded-[2px] cursor-pointer'>Select</div>
                </div>
            </Modal> */}
        </>
    )
}

export default SingleAstrologer;