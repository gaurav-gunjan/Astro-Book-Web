import Modal from 'react-modal';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CrossSvg } from '../../assets/svg';
import { toaster } from '../../utils/services/toast-service';
import * as UserActions from '../../redux/actions/userAction';

Modal.setAppElement('#root');

const UserAstrologerWithdrawalRequest = ({ isOpen, handleClose }) => {
    const dispatch = useDispatch();
    const { userAstrologerDataById } = useSelector(state => state?.userReducer);
    const [inputFieldDetail, setInputFieldDetail] = useState({ amount: '', reason: '' });

    //* Handle Input
    const handleInputFieldDetail = (e) => setInputFieldDetail({ ...inputFieldDetail, [e?.target?.name]: e?.target?.value });

    //* Handle Validation For Intake Form Data
    const handleValidation = () => {
        const { amount, reason } = inputFieldDetail;
        let isValid = true;

        if (!amount) {
            toaster.warning({ text: 'Please enter amount' });
            return isValid = false
        }
        if (amount > userAstrologerDataById?.wallet_balance) {
            toaster.warning({ text: `Please enter amount less than wallet balance, Your balance : ${userAstrologerDataById?.wallet_balance?.toFixed(2)}` });
            return isValid = false
        }
        if (!reason) {
            toaster.warning({ text: 'Please enter reason' });
            return isValid = false
        }

        return isValid;
    }

    const handleSubmit = () => {
        console.log('Withdrawal Request ::: ', inputFieldDetail);
        const { amount, reason } = inputFieldDetail;

        const payload = {
            data: {
                astrologerId: userAstrologerDataById?._id, amount, reason
            },
            onComplete: () => {
                handleClose();
                setInputFieldDetail({ amount: '', reason: '' });
            }
        }

        handleValidation() && dispatch(UserActions?.userAstrologerWithdrawalRequest(payload));
    };

    return (
        <Modal isOpen={isOpen} className="modal-content-small" overlayClassName="modal-overlay-small" closeTimeoutMS={200}>
            <div className='p-5 flex flex-col gap-5'>
                <div className='flex justify-between items-center gap-32'>
                    <div>Withdrawal Request</div>
                    <div onClick={() => {
                        handleClose()
                        setInputFieldDetail({ amount: '', reason: '' });
                    }} className='bg-red-600 text-white w-7 h-7 flex items-center justify-center rounded-full cursor-pointer'><CrossSvg h='17' w='17' /></div>
                </div>

                <div className='flex flex-col gap-[15px]'>
                    <input name='amount' onChange={handleInputFieldDetail} placeholder='Amount' type='number' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-primary outline-none w-full rounded-sm px-5 py-1.5' />
                    <textarea name='reason' onChange={handleInputFieldDetail} placeholder='Reason' rows={5} className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-primary outline-none w-full rounded-sm px-5 py-1.5' />
                </div>

                <div onClick={handleSubmit} className='bg-secondary text-white py-1.5 pt-2 rounded-sm text-center cursor-pointer text-[15px]'>Submit</div>
            </div>
        </Modal>
    )
}

export default UserAstrologerWithdrawalRequest;