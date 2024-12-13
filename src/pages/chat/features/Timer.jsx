import Swal from 'sweetalert2';
import CountDown from './CountDown';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as ChatActions from '../../../redux/actions/chatAction';
import { Color } from '../../../assets/colors';
import { ChatCloseSvg } from '../../../assets/svg';
import useNetworkStatus from '../../../components/hooks/useNetworkStatus';
import { database, ref, push, onValue, serverTimestamp, set } from '../../../config/firebase-config';

const Timer = ({ currentUser, messageChatId }) => {
    const isOnline = useNetworkStatus();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search);
    const chatId = searchParams.get('chatId');
    const profileId = searchParams.get('profileId');
    const user_type = localStorage.getItem('user_type');

    const handleEndChat = async () => {
        const result = await Swal.fire({
            icon: "warning", text: "Do you want to end this chat ?", showConfirmButton: true, timer: 20000,
            confirmButtonText: "Yes", confirmButtonColor: Color.primary, cancelButtonText: "No", showCancelButton: true, cancelButtonColor: Color.darkgrey
        });
        console.log('result', result);

        if (result.isConfirmed) {
            const message = {
                _id: Math.random().toString(36).substr(2, 9),
                text: `Chat has been ended by ${currentUser?.name}`,
                user: currentUser,
                createdAt: new Date().getTime(),
                addedAt: serverTimestamp(),
            };

            const chatNode = push(ref(database, `ChatMessages/${messageChatId}`));
            const newKey = chatNode.key;
            const chatRef = ref(database, `ChatMessages/${messageChatId}/${newKey}`);
            await set(chatRef, { ...message, pending: false, sent: true, received: false });

            setTimeout(() => {
                dispatch(ChatActions.endChatMessage({ chatId }));
            }, 2000);
        }
    };

    useEffect(() => {
        if (!isOnline) {
            console.log('Internet is disconnected', `Status : ${isOnline}`);
            dispatch(ChatActions.endChatMessage())
        } else {
            console.log('Internet is connected', `Status : ${isOnline}`);
        }
    }, [isOnline]);

    useEffect(() => {
        localStorage.setItem('chatId', chatId);
    }, [chatId]);

    return (
        <>
            <div className="flex items-center justify-around bg-primary shadow-xl px-4 py-2.5">
                <div className="pr-5 border-r border-gray-400">
                    {user_type == 'astrologer' ? <span onClick={() => window.open(`/chat/intake-details/${profileId}`)} className='bg-white rounded-md px-3 pt-[6px] pb-1 cursor-pointer'>Intake Form</span> : <span className="text-white font-medium">Rate: ₹ {localStorage?.getItem('Chat_price_during_chat')}/min</span>}
                </div>
                <div className="flex-1 flex items-center justify-between pl-5">
                    <span className="text-white font-medium">
                        <CountDown />
                    </span>
                    <span onClick={() => handleEndChat()} className="bg-red-600 p-2 rounded-full cursor-pointer">
                        <ChatCloseSvg color={Color?.white} />
                    </span>
                </div>
            </div>
        </>
    );
};

export default Timer;