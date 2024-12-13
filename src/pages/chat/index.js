import axios from 'axios';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { database, ref, push, onValue, serverTimestamp, set } from '../../config/firebase-config';
import Timer from './features/Timer';
import { api_urls } from '../../utils/api-urls';
import ChatBg from '../../assets/images/chat/chat-bg.png';
import { AttachmentBtnSvg, SendBtnSvg } from '../../assets/svg';
import ChatImageModal from '../../components/modal/ChatImageModal';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import { generateRandomNumber, GroupMessagesByDate } from '../../utils/common-function';

const Chat = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const customer_id = searchParams.get('customer');
    const astrologer_id = searchParams.get('astrologer');
    const profileId = searchParams.get('profileId');
    const [inputField, setInputField] = useState('');

    const current_user_id = localStorage.getItem('current_user_id');
    const current_user_data = JSON.parse(localStorage.getItem('current_user_data'));
    const currentUser = {
        _id: localStorage.getItem('user_type') === 'astrologer' ? `astro_${current_user_id}` : `customer_${current_user_id}`,
        name: current_user_data?.astrologerName || current_user_data?.customerName,
    };

    //! Image Modal Start 
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const handleOpenImage = (message) => {
        setSelectedContent(message);
        setModalOpen(true)
    };

    const handleCloseImage = () => {
        setSelectedContent(null);
        setModalOpen(false)
    };
    //! Image Modal End

    const [intakeDetail, setIntakeDetail] = useState({});
    const [intakeInsertedCount, setIntakeInsertedCount] = useState(0);
    const [messages, setMessages] = useState([]);
    const groupedMessages = GroupMessagesByDate(messages);
    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);

    const chat_id = `customer_${customer_id}_astro_${astrologer_id}`;

    // Todo : Get Message From Database 
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

    //! Handle Send : Text
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

    //! Handle Send : Image
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

    //! Handle Send Intake Detail To Chat 
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
        console.log('Intale User', localStorage.getItem('user_type'));
        console.log('Intake Count', intakeInsertedCount);

        intakeDetail && intakeInsertedCount == 1 && localStorage.getItem('user_type') === 'customer' && storeIntake();
    }, [intakeInsertedCount]);

    //! Handle Reload Screen and Get Intake Detail
    useEffect(() => {
        const fetchIntakeDetail = async () => {
            try {
                const { data } = await axios.post(api_urls + 'api/customers/get_linked_profile', { profileId });
                if (data?.success) {
                    setIntakeDetail(data?.data);
                    setIntakeInsertedCount(1);
                }
            } catch (error) {
                console.log("Get Linked Profile Failed!!!");
            }
        };

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // Required for modern browsers
        };

        profileId && fetchIntakeDetail();
        // window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    //! Scroll Down the Chat 
    useEffect(() => {
        const scrollToBottom = () => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        };

        scrollToBottom();
    }, [messages]);

    return (
        <>
            <TopHeaderSection />

            <div className="flex flex-col max-md:h-[calc(100vh-70.5px)] h-[calc(100vh-94.5px)]">
                <Timer currentUser={currentUser} messageChatId={chat_id} />

                <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4" style={{ backgroundImage: `url(${ChatBg})` }}>
                    {Object.keys(groupedMessages).map((date, index) => (
                        <div key={index}>
                            <div className='text-center text-green-600'>You are now connected! Please start the conversation.</div>
                            <div className="text-center my-4 text-gray-500">{moment(date).format('MMMM Do, YYYY')}</div>

                            {groupedMessages[date].map((message, index) => (
                                <div key={index} className={`flex ${message.user.id === currentUser._id ? 'justify-end' : 'justify-start'} my-2`}>
                                    <div onClick={() => { if (message?.image) handleOpenImage(message) }}>
                                        {!message.image ?
                                            <div className={`relative max-w-xs p-3 rounded-lg shadow-md ${message.user.id === currentUser._id ? 'bg-[#6f6d4f] text-white' : 'bg-white text-black'} break-words`}>
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
        </>
    );
};

export default Chat;