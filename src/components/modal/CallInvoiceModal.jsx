import React from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import * as ChatActions from '../../redux/actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';

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

const CallInvoiceModal = () => {
    const dispatch = useDispatch();
    const { callInvoiceData, callInvoiceVisibility } = useSelector(state => state?.chatReducer);

    const handleCloseInvoice = () => {
        const payload = {
            data: callInvoiceData?.invoice?.astrologer,
            ratingVisible: true
        }
        dispatch(ChatActions.setAstrologerRatingVisibility(payload))

        dispatch(ChatActions.setCallInvoiceVisibility(false))
        dispatch(ChatActions.setCallInvoiceData(null))
    };

    return (
        <>
            <Modal isOpen={callInvoiceVisibility} className="modal-content-small" overlayClassName="modal-overlay-small" closeTimeoutMS={200}>
                <div className='p-5 flex flex-col gap-5'>
                    <div className='flex justify-between items-center  gap-40'>
                        <div>Call Invoice</div>
                        <div onClick={() => handleCloseInvoice()} className='bg-red-600 text-white px-4 py-1 rounded-md cursor-pointer'>Close</div>
                    </div>

                    <div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-medium">Invoice ID: </span>
                            <span className="text-lg font-medium uppercase">{callInvoiceData?.invoice?.astrologerInvoice}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-medium">Order Date: </span>
                            <span className="text-lg font-medium">{moment(callInvoiceData?.invoice?.createdAt).format('DD MMM YYYY')}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-medium">Order Time: </span>
                            <span className="text-lg font-medium">{moment(callInvoiceData?.invoice?.createdAt).format('hh:mm A')}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-medium">Duration</span>
                            <span className="text-lg font-medium">{secondsToHMS(callInvoiceData?.invoice?.durationInSeconds ?? 0)}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-medium">Call Price</span>
                            <span className="text-lg font-medium">{showNumber(callInvoiceData?.invoice?.callPrice ?? 0)}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-medium">Total Charge</span>
                            <span className="text-lg font-medium">{showNumber(callInvoiceData?.invoice?.totalCallPrice)}</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CallInvoiceModal;