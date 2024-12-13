import React, { useEffect } from 'react';
import CountDown from './CountDown';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as ChatActions from '../../../redux/actions/chatAction';
import Swal from 'sweetalert2';
import useNetworkStatus from '../../../components/hooks/useNetworkStatus';
import { Color } from '../../../assets/colors';
import { ChatCloseSvg } from '../../../assets/svg';

const Timer = () => {
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
            dispatch(ChatActions.endChatMessage({ chatId }));
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
            <div className="flex items-center justify-around bg-secondary shadow-xl px-4 py-2.5">
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