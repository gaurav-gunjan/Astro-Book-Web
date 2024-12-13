import React from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import * as ChatActions from '../../redux/actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';
import { CrossSvg } from '../../assets/svg';
import Logo from '../../assets/images/logo/logo.png';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const secondsToHMS = (seconds) => {
    // Assuming you have a function to convert seconds to HH:MM:SS format
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}:${m}:${s}`;
};

const showNumber = (number) => {
    // Assuming you have a function to format numbers
    return new Intl.NumberFormat().format(number);
};

const ChatInvoiceAstrologerModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { chatInvoiceData, astrologerChatInvoiceVisibility } = useSelector(state => state?.chatReducer);
    console.log('chatInvoiceData', chatInvoiceData);

    const handleCloseInvoice = () => {
        dispatch(ChatActions.setAstrologerChatInvoiceVisibility(false))
        dispatch(ChatActions.setChatInvoiceData(null))
        navigate('/', { replace: true });
    }

    return (
        <>
            <Modal isOpen={astrologerChatInvoiceVisibility} className="modal-content-small" overlayClassName="modal-overlay-small" closeTimeoutMS={200}>
                <div className='p-5 flex flex-col gap-5'>
                    <div className='flex justify-between items-center gap-40'>
                        <img src={Logo} className='h-10' />
                        <div onClick={() => handleCloseInvoice()} className='bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-md cursor-pointer'><CrossSvg h='16' w='16' /></div>
                    </div>

                    <div className='border-b-2 border-primary'></div>

                    <div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-semibold">Invoice ID: </span>
                            <span className="text-base text-gray-500 font-400 uppercase">{chatInvoiceData?.transactionId || 'Astrbook 01'}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-semibold">Order Date: </span>
                            <span className="text-base text-gray-500 font-400">{moment(chatInvoiceData?.createdAt).format('DD MMM YYYY')}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-semibold">Order Time: </span>
                            <span className="text-base text-gray-500 font-400">{moment(chatInvoiceData?.createdAt).format('hh:mm A')}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-semibold">Duration</span>
                            <span className="text-base text-gray-500 font-400">{secondsToHMS(chatInvoiceData?.durationInSeconds ?? 0)}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-semibold">Chat Price</span>
                            <span className="text-base text-gray-500 font-400">{showNumber(chatInvoiceData?.chatPrice ?? 0)}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-semibold">Your Charge</span>
                            <span className="text-base text-gray-500 font-400">{showNumber(chatInvoiceData?.totalChatPrice) - showNumber(chatInvoiceData?.commissionPrice)}</span>
                        </div>
                    </div>
                </div>
                <div className='text-nowrap px-5 max-md:px-1 pb-3'>
                    <p className='text-center text-xs text-gray-600'>If you have any concerns, please connect with our Customer</p>
                    <p className='text-center text-xs text-gray-600'>Support via Website or Mobile Application. We will be</p>
                    <p className='text-center text-xs text-gray-600'>glad to assist you!</p>
                    <p className='text-center text-xs text-primary'>Thank You!</p>
                </div>
            </Modal>
        </>
    )
}

export default ChatInvoiceAstrologerModal;