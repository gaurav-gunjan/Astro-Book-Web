import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Modal from 'react-modal';
import ReactStars from 'react-stars';
import { toast } from 'react-toastify';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Profile from '../../../assets/images/logo/profile.jpg';
import RadioButton from '../../../components/button/RadioButton';
import { CallSvg, ChatSvg, CrossSvg, RightArrowHeadSvg, RightArrowSvg, StarSvg, SyncSvg, VerifySvg } from '../../../assets/svg';
import { api_urls } from '../../../utils/api-urls';
import { DateDifference, IndianRupee, ParseDateTime, YYYYMMDD } from '../../../utils/common-function';
import * as ChatActions from '../../../redux/actions/chatAction';
import * as AstrologerActions from '../../../redux/actions/astrologerAction';
import Swal from 'sweetalert2';
import DownloadApp from '../../../components/features/DownloadApp';
import OnlinePing from '../../../components/features/OnlinePing';
import OfflinePing from '../../../components/features/OfflinePing';
import { Color } from '../../../assets/colors';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { Autocomplete } from '@react-google-maps/api';
import { toaster } from '../../../utils/services/toast-service';

Modal.setAppElement('#root');

const SingleAstrologer = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0) }, [pathname]);

    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location?.state?.stateData;
    const astrologerId = stateData?._id;

    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state?.commonReducer);
    const { astrologerDataById, astrologerReviewDataById } = useSelector(state => state?.astrologerReducer);
    const reversedAstrologerReviewData = [...astrologerReviewDataById].reverse();
    const { linkedProfileData } = useSelector(state => state?.chatReducer);
    const { userCustomerDataById } = useSelector(state => state?.userReducer);
    const [isReadMore, setIsReadMore] = useState(false);

    //! Call Modal 
    const [callModal, setCallModal] = useState(false);
    const handleOpenCallModal = () => setCallModal(true);
    const handleCloseCallModal = () => setCallModal(false);

    // TODO : Linked profile
    const [linkedProfileModal, setLinkedProfileModal] = useState(false);
    const handleOpenLinkedProfileModal = () => setLinkedProfileModal(true);
    const [selectedLinkedProfileData, setSelectedLinkedProfileData] = useState(null);

    //* Handle Select : Linked Profile Data
    const handleSelectedLinkedProfileData = (data) => {
        setChatIntakeDetail({
            isNewProfile: false, first_name: data?.firstName, last_name: data?.lastName, gender: data?.gender, date_of_birth: moment(data?.dateOfBirth).format('YYYY-MM-DD'), time_of_birth: moment(data?.timeOfBirth).format('HH:mm'), place_of_birth: data?.placeOfBirth, marital_status: data?.maritalStatus, type_of_concern: data?.topic_of_concern, latitude: data?.latitude, longitude: data?.longitude, description: data?.description
        })
        setSelectedLinkedProfileData(data);
    };

    // TODO : Chat Intake Form 
    const [connectionType, setConnectionType] = useState(false);
    const [chatIntakeFormModal, setChatIntakeFormModal] = useState(false);
    const handleOpenChatIntakeFormModal = async (type) => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
        } else if (Notification.permission === "granted") {
            if (userCustomerDataById) {
                setChatIntakeFormModal(true);
                setConnectionType(type);
            } else {
                toaster.info({ text: 'Please login as a customer' })
            }
        } else if (Notification.permission === "denied") {
            alert("You have blocked notifications. Please enable them in your browser settings.");

        } else if (Notification.permission === "default") {
            console.log('Requesting Notification Permission');
            const permission = await Notification.requestPermission();
        }
    };

    const handleCloseChatIntakeFormModal = () => {
        setChatIntakeFormModal(false);
        setChatIntakeDetail({
            isNewProfile: true, first_name: '', last_name: '', gender: '', date_of_birth: '', time_of_birth: '', place_of_birth: '', marital_status: '', type_of_concern: '', latitude: '20.5937', longitude: '78.9629', description: ''
        })
        setSelectedLinkedProfileData({})
    };

    const [chatIntakeDetail, setChatIntakeDetail] = useState({
        isNewProfile: true, first_name: '', last_name: '', gender: '', date_of_birth: '', time_of_birth: '', place_of_birth: '', marital_status: '', type_of_concern: '', latitude: '', longitude: '', description: ''
    });
    const autocompleteRef = useRef(null);

    //* Handle Input : Chat Intake Form Data
    const handleChatIntakeDetail = (e) => {
        const { name, value } = e.target;
        setChatIntakeDetail({ ...chatIntakeDetail, [name]: value })
    };

    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        if (place) {
            const location = place.geometry.location;
            setChatIntakeDetail({
                ...chatIntakeDetail,
                place_of_birth: place.formatted_address,
                latitude: location.lat(),
                longitude: location.lng(),
            });
        }
    };

    //* Handle Validation For Intake Form Data
    const handleValidation = () => {
        const { first_name, last_name, gender, date_of_birth, time_of_birth, place_of_birth, marital_status, type_of_concern, description, latitude, longitude } = chatIntakeDetail;

        let isValid = true;

        if (!first_name) {
            toast.error('Please Enter First Name')
            return isValid = false
        }
        if (!last_name) {
            toast.error('Please Enter Last Name')
            return isValid = false
        }
        if (!gender) {
            toast.error('Please Select Gender')
            return isValid = false
        }
        if (!date_of_birth) {
            toast.error('Please Enter Date Of Birth')
            return isValid = false
        }
        if (!time_of_birth) {
            toast.error('Please Enter Time Of Birth')
            return isValid = false
        }
        if (!place_of_birth) {
            toast.error('Please Enter Place Of Birth')
            return isValid = false
        }
        if (!marital_status) {
            toast.error('Please Select Marital Status')
            return isValid = false
        }
        if (!type_of_concern) {
            toast.error('Please Select Type Of Concern')
            return isValid = false
        }
        if (!description) {
            toast.error('Please Enter Description')
            return isValid = false
        }

        return isValid;
    }

    //! Handle Submit : Chat Intake Form Data
    const handleSubmitChatIntakeForm = async () => {
        console.log({ ...chatIntakeDetail });

        if (handleValidation()) {
            const { isNewProfile, first_name, last_name, gender, date_of_birth, time_of_birth, place_of_birth, marital_status, type_of_concern, description, latitude, longitude } = chatIntakeDetail;

            const payload = {
                isNewProfile: isNewProfile,
                profileData: { firstName: first_name, lastName: last_name, gender: gender, dateOfBirth: date_of_birth, timeOfBirth: ParseDateTime(date_of_birth, time_of_birth), placeOfBirth: place_of_birth, maritalStatus: marital_status, topic_of_concern: type_of_concern, latitude, longitude, description },
                selectedProfileId: selectedLinkedProfileData?._id ?? null,
                chatPrice: Number(astrologerDataById?.chat_price) + Number(astrologerDataById?.commission_chat_price),
                astrologerId: astrologerId,
                // type: astrologerDataById?.type,
                type: connectionType,
                onComplete: () => {
                    handleCloseChatIntakeFormModal();
                    navigate('/astrologer');
                }
            }
            console.log("Payload ::: ", payload);

            //! Dispatch Chat Request : Send By Customer 
            dispatch(ChatActions.chatRequestSendByCustomer(payload));
        }
    };

    useEffect(() => {
        //! Dispatching API For Getting Single Astrologer
        dispatch(ChatActions.getLinkedProfileForChat({ customerId: localStorage.getItem('current_user_id') }))

        //! Dispatching API For Getting Single Astrologer
        dispatch(AstrologerActions.getAstrologerById({ astrologerId }))

        //! Dispatching API For Getting Single Astrologer Review
        dispatch(AstrologerActions.getAstrologerReviewById({ astrologerId: astrologerId }))
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

                        <main className='flex max-md:flex-col gap-[20px] rounded-xl'>
                            <div className=''>
                                <img className='rounded-xl h-[250px] max-md:h-[300px] max-md:w-full w-[250px] border-2 border-primary_text_dark' src={api_urls + astrologerDataById?.profileImage} />
                            </div>

                            <div className='flex flex-col justify-center gap-[15px] rounded-xl p-[15px]'>
                                <div className='flex items-center gap-3'>
                                    <div className='line-clamp-1 capitalize'>{astrologerDataById?.astrologerName}</div>
                                    <div><ReactStars count={5} edit={false} value={Number(astrologerDataById?.rating)} size={20} color2={'#ffd700'} /></div>
                                </div>
                                <div className='bg-primary text-white rounded-lg px-[10px] py-[5px] line-clamp-1'>{astrologerDataById?.skill?.length > 0 && astrologerDataById?.skill?.map(value => value?.skill)?.join(' , ')}</div>
                                <div>Experience : {astrologerDataById?.experience} Years</div>
                                <hr />
                                <div className='line-clamp-1'>{astrologerDataById?.language?.length > 0 ? astrologerDataById?.language?.join(' , ') : "Hindi"}</div>
                            </div>

                            <div className='flex-1 flex flex-col justify-end items-end max-md:items-start gap-[20px] rounded-xl text-[13px]'>
                                <button onClick={async () => {
                                    if (Number(userCustomerDataById?.wallet_balance) < Number(astrologerDataById?.chat_price) * 5) {
                                        console.log(Number(userCustomerDataById?.wallet_balance));
                                        console.log(Number(astrologerDataById?.chat_price) * 5);
                                        const result = await Swal.fire({
                                            icon: "warning", title: "Warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000,
                                            confirmButtonText: "Recharge", confirmButtonColor: Color.primary, cancelButtonText: "Cancel", showCancelButton: true, cancelButtonColor: Color.darkgrey
                                        });
                                        console.log('result', result)
                                        if (result.isConfirmed) {
                                            navigate('/recharge')
                                        }
                                    } else {
                                        handleOpenChatIntakeFormModal('Chat')
                                    }
                                }} disabled={astrologerDataById?.chat_status != "online"} className={`flex items-center gap-2 bg-primary text-white px-[25px] py-[7px] rounded-xl w-[220px] ${astrologerDataById?.chat_status != "online" && 'cursor-not-allowed'}`}><div className='bg-primary_card_bg_dark p-2 rounded-full'><ChatSvg h='12' w='12' /></div> <div className='line-clamp-1 mr-2'>{IndianRupee(astrologerDataById?.chat_price)} per min</div> <div>{astrologerDataById?.chat_status == "online" ? <OnlinePing /> : <OfflinePing />}</div></button>
                                <button onClick={async () => {
                                    if (Number(userCustomerDataById?.wallet_balance) < Number(astrologerDataById?.call_price) * 5) {
                                        console.log(Number(userCustomerDataById?.wallet_balance));
                                        console.log(Number(astrologerDataById?.call_price) * 5);
                                        const result = await Swal.fire({
                                            icon: "warning", title: "Warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000,
                                            confirmButtonText: "Recharge", confirmButtonColor: Color.primary, cancelButtonText: "Cancel", showCancelButton: true, cancelButtonColor: Color.darkgrey
                                        });
                                        console.log('result', result)
                                        if (result.isConfirmed) {
                                            navigate('/recharge')
                                        }
                                    } else {
                                        handleOpenChatIntakeFormModal('Call')
                                    }
                                }} disabled={astrologerDataById?.call_status != "online"} className={`flex items-center gap-2 bg-primary text-white px-[25px] py-[7px] rounded-xl w-[220px] ${astrologerDataById?.call_status != "online" && 'cursor-not-allowed'}`}><div className='bg-primary_card_bg_dark p-2 rounded-full'><CallSvg h='12' w='12' /></div> <div className='line-clamp-1 mr-2'>{IndianRupee(astrologerDataById?.call_price)} per min</div> <div>{astrologerDataById?.call_status == "online" ? <OnlinePing /> : <OfflinePing />}</div></button>
                            </div>
                        </main>

                        <main className='flex flex-col gap-[15px]'>
                            <div className='text-center font-semibold text-xl flex gap-3 items-center justify-center'>About me {isReadMore ? <div onClick={() => setIsReadMore(false)} className='-rotate-90 cursor-pointer'><RightArrowHeadSvg /></div> : <div onClick={() => setIsReadMore(true)} className='rotate-90 cursor-pointer'><RightArrowHeadSvg /></div>}</div>
                            <div className={`text-justify text-grey tracking-wide ${isReadMore ? '' : 'line-clamp-2'} transition-all duration-500`}>{astrologerDataById?.long_bio}</div>
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
                                <div className='border rounded-lg p-5 flex flex-col gap-4'>
                                    <div className='font-semibold'>User Review</div>
                                    <main className='flex flex-col gap-3'>
                                        {reversedAstrologerReviewData.length > 0 ? reversedAstrologerReviewData.map((value, index) => (
                                            <main key={index} className='border rounded-lg p-5 flex flex-col gap-2' style={{ boxShadow: "0 0 5px #bdb5b5" }}>
                                                <div className='flex justify-between'>
                                                    <div className='flex gap-4 items-center'>
                                                        <div><img src={api_urls + 'uploads/' + value?.customer?.image} className='h-10 w-10 rounded-[50%]' /></div>
                                                        <div>{value?.customer?.customerName}</div>
                                                    </div>
                                                    <div className='flex gap-0 text-gray-600'><ReactStars count={5} edit={false} value={value?.ratings} size={24} color2={'#ffd700'} /></div>
                                                </div>
                                                <div className='capitalize'>{value?.comments?.toLowerCase()}</div>
                                            </main>
                                        )) :
                                            <div className="flex justify-center items-center h-32 border-2 border-dashed border-gray-300 bg-gray-100 text-primary text-lg rounded-lg shadow-lg p-4">
                                                <p className="text-gray-500">No Record Found</p>
                                            </div>}
                                    </main>
                                </div>
                            </div>
                        </main>
                    </article>
                </section>
            }

            <Modal isOpen={chatIntakeFormModal} className="modal-content" overlayClassName="modal-overlay" closeTimeoutMS={200}>
                <section className="relative shadow-2xl p-3 overflow-hidden bg-gray-200">
                    <article>
                        <main className='px-10 py-10 text-[14px] text-[#666373] flex flex-col gap-8'>
                            <div onClick={() => handleCloseChatIntakeFormModal()} className='cursor-pointer bg-primary absolute top-4 right-4 flex items-center gap-2 text-white text-sm py-1 px-3 rounded-full'>Back to website <RightArrowSvg h='18' w='18' /> </div>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-col items-center justify-end h-full'>
                                    <div className='font-[500] text-3xl text-black'>Intake<span className='text-primary_text_dark'> Form</span></div>
                                    <div className='flex items-center'><div className='w-[50px] h-[2px] bg-primary'></div><div className='w-[30px] h-[4px] bg-primary'></div><div className='w-[50px] h-[2px] bg-primary'></div></div>
                                </div>
                                <div className='text-[#666373] text-center'>Help Our Astrologer Know a little bit about you. Your details will kept completely confidentail.</div>
                            </div>
                            <div className='flex max-lg:flex-col gap-[20px] max-lg:gap-[15px]'>
                                <div className='basis-[45%] max-lg:basis-full flex-grow flex flex-col gap-[15px]'>
                                    <div className='flex items-center gap-2'>
                                        <input name='first_name' value={chatIntakeDetail?.first_name} onChange={(e) => handleChatIntakeDetail(e)} placeholder='First Name' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' /> <div onClick={() => handleOpenLinkedProfileModal(true)} className='text-green-600 bg-white h-full max-lg:h-[35px] w-10 rounded-sm flex items-center justify-center cursor-pointer'><SyncSvg /></div>
                                    </div>
                                    <input name='last_name' value={chatIntakeDetail?.last_name} onChange={(e) => handleChatIntakeDetail(e)} placeholder='Last Name' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                    <select name='gender' value={chatIntakeDetail?.gender} onChange={(e) => handleChatIntakeDetail(e)} placeholder='Gender' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' >
                                        <option value="" className='text-gray-400'>----------Select Gender----------</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <input name='date_of_birth' value={chatIntakeDetail?.date_of_birth} onChange={(e) => handleChatIntakeDetail(e)} placeholder='Date of Birth' type='date' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                    <input name='time_of_birth' value={chatIntakeDetail?.time_of_birth} onChange={(e) => handleChatIntakeDetail(e)} placeholder='Time of Birth' type='time' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                    <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceSelect} >
                                        <input name='place_of_birth' value={chatIntakeDetail?.place_of_birth} onChange={(e) => handleChatIntakeDetail(e)} placeholder='Place of Birth' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                    </Autocomplete>
                                </div>
                                <div className='basis-[45%] max-lg:basis-full flex-grow flex flex-col gap-[15px]'>
                                    <select name='marital_status' value={chatIntakeDetail?.marital_status} onChange={(e) => handleChatIntakeDetail(e)} placeholder='marital status' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' >
                                        <option value="" className='text-gray-400'>----------Select Marital Status----------</option>
                                        <option value="Married">Married</option>
                                        <option value="Unmarried">Unmarried</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <select name='type_of_concern' value={chatIntakeDetail?.type_of_concern} onChange={(e) => handleChatIntakeDetail(e)} placeholder='type of concern' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' >
                                        <option value="" className='text-gray-400'>----------Select Type of Concern----------</option>
                                        <option value="Career">Career</option>
                                        <option value="Business">Business</option>
                                    </select>
                                    <textarea name='description' rows={6} value={chatIntakeDetail?.description} onChange={(e) => handleChatIntakeDetail(e)} placeholder='Description' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                    <div onClick={() => handleSubmitChatIntakeForm()} className='cursor-pointer bg-primary border border-primary hover:bg-orange-400 text-center text-white font-semibold rounded-sm px-5 py-2 transition-all duration-500'>Start {connectionType}</div>
                                </div>
                            </div>
                        </main>
                    </article>
                </section>
            </Modal>

            <Modal isOpen={linkedProfileModal} className="modal-content-small" overlayClassName="modal-overlay-small" closeTimeoutMS={200} >
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
            </Modal>

            {/* Download App */}
            <DownloadApp isOpen={callModal} handleCloseModal={handleCloseCallModal} />
        </>
    )
}

export default SingleAstrologer;