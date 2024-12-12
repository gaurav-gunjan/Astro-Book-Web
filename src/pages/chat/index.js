import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { database, ref, push, onValue, serverTimestamp, set } from '../../config/firebase-config'; // Update with your actual firebase config import
import Timer from './features/Timer';
import { api_urls } from '../../utils/api-urls';
import { AttachmentBtnSvg, SendBtnSvg } from '../../assets/svg';
import { generateRandomNumber } from '../../utils/common-function';
import ChatImageModal from '../../components/modal/ChatImageModal';
import SocketService from '../../utils/services/socket-service';
import ChatBg from '../../assets/svg/chat-bg.svg';

const Chat = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const customer_id = searchParams.get('customer');
    const astrologer_id = searchParams.get('astrologer');
    const profileId = searchParams.get('profileId');
    const { socketConnectionStatus } = useSelector(state => state?.commonReducer);
    const [inputField, setInputField] = useState('');

    const current_user_id = localStorage.getItem('current_user_id');
    const current_user_data = JSON.parse(localStorage.getItem('current_user_data'));
    const currentUser = {
        _id: localStorage.getItem('user_type') === 'astrologer' ? `astro_${current_user_id}` : `customer_${current_user_id}`,
        name: current_user_data?.astrologerName || current_user_data?.customerName,
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const handleOpenImage = (message) => {
        setSelectedContent(message);
        setModalOpen(true)
    };

    const handleCloseImage = (message) => {
        setSelectedContent(null);
        setModalOpen(false)
    };

    const [messages, setMessages] = useState([]);
    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);

    const chat_id = `customer_${customer_id}_astro_${astrologer_id}`;
    const localRequestedData = JSON.parse(localStorage.getItem('chat_requested_data'));

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        const messagesRef = ref(database, `ChatMessages/${chat_id}`);
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const loadedMessages = [];

            for (let key in data) {
                const message = data[key];
                loadedMessages.push({
                    ...message,
                    createdAt: new Date(message.createdAt),
                    user: { id: message?.user?._id, name: message?.user?.name },
                });
            }
            setMessages(loadedMessages);
        });
    }, [chat_id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const [intakeDetail, setIntakeDetail] = useState({});
    const [intakeInsertedCount, setIntakeInsertedCount] = useState(0);

    useEffect(() => {
        const fetchIntakeDetail = async () => {
            try {
                const { data } = await axios.post(api_urls + 'api/customers/get_linked_profile', { profileId });
                if (data?.success) {
                    setIntakeDetail(data?.data);
                    const { firstName, lastName, dateOfBirth, timeOfBirth, placeOfBirth, maritalStatus, latitude, longitude, topic_of_concern, description } = data?.data;
                    setIntakeInsertedCount(1)
                }
            } catch (error) {
                console.log("Error");
            }
        };

        profileId && fetchIntakeDetail();
    }, []);

    useEffect(() => {
        const storeIntake = async () => {
            const { firstName, lastName, dateOfBirth, timeOfBirth, placeOfBirth, maritalStatus, latitude, longitude, topic_of_concern, description } = intakeDetail;

            const message = {
                _id: Math.random().toString(36).substr(2, 9),
                text: `Firstname: ${firstName},  Lastname: ${lastName}, DOB: ${moment(dateOfBirth)?.format('DD MMM YYYY')}, TOB: ${moment(timeOfBirth)?.format('hh:mm a')}, POB: ${placeOfBirth}, Marital Status: ${maritalStatus}, Latitude:${latitude}, Longitude:${longitude}, Topic of concer:${topic_of_concern}, description: ${description}`,
                user: currentUser,
                createdAt: new Date().getTime(),
                addedAt: serverTimestamp(),
            };

            const chatNode = push(ref(database, `ChatMessages/${chat_id}`));
            const newKey = chatNode.key;
            const chatRef = ref(database, `ChatMessages/${chat_id}/${newKey}`);
            await set(chatRef, { ...message, pending: false, sent: true, received: false });
        }


        intakeDetail && intakeInsertedCount == 1 && storeIntake()
    }, [intakeInsertedCount]);

    const handleSend = async (text) => {
        if (!text.trim()) return;

        const message = {
            _id: Math.random().toString(36).substr(2, 9),
            text,
            user: currentUser,
            createdAt: new Date().getTime(),
            addedAt: serverTimestamp(),
        };

        const chatNode = push(ref(database, `ChatMessages/${chat_id}`));
        const newKey = chatNode.key;
        const chatRef = ref(database, `ChatMessages/${chat_id}/${newKey}`);
        await set(chatRef, { ...message, pending: false, sent: true, received: false });

        setInputField('');
    };

    const handleFileChange = async (e) => {
        console.log("Handle File Change Outside ::: ", e.target.files[0]);
        if (e.target.files[0] && e.target.files.length > 0) {
            console.log("Handle File Change Inside ::: ", e.target.files[0]);

            try {
                // const formData = { fileType: 'image', filePath: e.target.files[0] }
                const formData = new FormData();
                formData.append('fileType', 'image');
                formData.append('filePath', e.target.files[0])
                const { data } = await axios.post(api_urls + 'api/customers/store-file', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                console.log("API Data ::: ", data);

                if (data?.success) {
                    const message = { _id: generateRandomNumber(), text: '', image: api_urls + data?.data?.filePath, user: currentUser, createdAt: new Date().getTime(), addedAt: serverTimestamp(), };
                    console.log('message', message);
                    const chatNode = push(ref(database, `ChatMessages/${chat_id}`));
                    const newKey = chatNode.key;
                    const chatRef = ref(database, `ChatMessages/${chat_id}/${newKey}`);

                    await set(chatRef, { ...message, pending: false, sent: true, received: false });
                } else {
                    console.log("Error")
                }
            } catch (error) {
                console.log("Error  ::: ", error);
            }
        }
    };

    const groupMessagesByDate = () => {
        const grouped = messages.reduce((acc, message) => {
            const messageDate = moment(message.createdAt).format('YYYY-MM-DD');
            if (!acc[messageDate]) {
                acc[messageDate] = [];
            }
            acc[messageDate].push(message);
            return acc;
        }, {});
        return grouped;
    };

    const groupedMessages = groupMessagesByDate();

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // Required for modern browsers
        };

        // Add the event listener
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <>
            <div className='h-[94.5px] max-md:h-[70.5px]'></div>

            <div className='flex'>
                {localStorage.getItem('user_type') == 'astrologer' && <div className='basis-[30%] max-md:hidden min-h-full bg-gray-100 border-r border-primary'>
                    <div className="px-4 py-[11px] text-lg font-semibold bg-primary text-white border-r">Intake Data</div>
                    <div className="grid grid-cols-2 gap-4 px-4 py-5">
                        <div>
                            <label className="block font-medium text-gray-700">First Name</label>
                            <p className="text-gray-900">{intakeDetail?.firstName}</p>
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Last Name</label>
                            <p className="text-gray-900">{intakeDetail?.lastName}</p>
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Date of Birth</label>
                            <p className="text-gray-900">{moment(intakeDetail?.dateOfBirth)?.format('DD-MMM-YYYY')}</p>
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Time of Birth</label>
                            <p className="text-gray-900">{moment(intakeDetail?.timeOfBirth)?.format('hh:mm a')}</p>
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Topic of Concern</label>
                            <p className="text-gray-900">{intakeDetail?.topic_of_concern}</p>
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Marital Status</label>
                            <p className="text-gray-900">{intakeDetail?.maritalStatus}</p>
                        </div>
                        <div className="col-span-2">
                            <label className="block font-medium text-gray-700">Place of Birth</label>
                            <p className="text-gray-900">{intakeDetail?.placeOfBirth}</p>
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Latitude</label>
                            <p className="text-gray-900">{intakeDetail?.latitude}</p>
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Longitude</label>
                            <p className="text-gray-900">{intakeDetail?.longitude}</p>
                        </div>
                        <div className="col-span-2">
                            <label className="block font-medium text-gray-700">Description</label>
                            <p className="text-gray-900">{intakeDetail?.description}</p>
                        </div>
                    </div>
                </div>}

                <div className="flex-1 flex flex-col max-md:h-[calc(100vh-70.5px)] h-[calc(100vh-94.5px)]">
                    <Timer requestedData={localRequestedData} />

                    <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 bg-gray-100" style={{ backgroundImage: `url(${ChatBg})` }}>
                        {Object.keys(groupedMessages).map((date, index) => (
                            <div key={index}>
                                <div className='text-center text-green-600'>You are now connected! Please start the conversation.</div>
                                <div className="text-center my-4 text-gray-500">{moment(date).format('MMMM Do, YYYY')}</div>

                                {groupedMessages[date].map((message, index) => (
                                    <div key={index} className={`flex ${message.user.id === currentUser._id ? 'justify-end' : 'justify-start'} my-2`}>
                                        <div onClick={() => { if (message?.image) handleOpenImage(message) }}>
                                            {!message.image ?
                                                <div className={`relative max-w-xs p-3 rounded-lg shadow-md ${message.user.id === currentUser._id ? 'bg-primary text-white' : 'bg-white text-black'} break-words`}>
                                                    <div className='text-[14px]'>{message.text}</div>
                                                    <div className={`text-xs text-end mt-1`}>{moment(message.createdAt).format('h:mm A')}</div>
                                                </div>
                                                :
                                                <div className='relative max-w-80 cursor-pointer'>
                                                    <img src={message.image} alt="attachment" className="mt-2 max-h-40 rounded-lg" />
                                                    <div className="text-xs text-white absolute z-10 right-2 bottom-2">{moment(message.createdAt).format('h:mm A')}</div>
                                                </div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="flex-shrink-0 p-4 bg-white border-t flex items-center">
                        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                        <button onClick={() => fileInputRef.current.click()} className="p-2 text-primary rounded-lg"><AttachmentBtnSvg /></button>
                        <input type="text" value={inputField} placeholder="Type a message" className="flex-grow p-2 mx-2 border border-gray-300 rounded-lg outline-none" onChange={(e) => setInputField(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { handleSend(e.target.value); e.target.value = ''; setInputField('') } }} />
                        <button onClick={() => handleSend(inputField)} className="p-2 text-primary rounded-lg"><SendBtnSvg /></button>
                    </div>

                    <ChatImageModal visible={modalOpen} image={selectedContent?.image} handleClose={handleCloseImage} />
                </div>
            </div>
        </>
    );
};

export default Chat;