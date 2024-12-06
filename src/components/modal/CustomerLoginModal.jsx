import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CrossSvg, EditSvg } from '../../assets/svg';
import Logo from '../../assets/images/logo/logo.png';
import LoginImage from '../../assets/images/auth/Login-Image.png';
import { toaster } from '../../utils/services/toast-service';
import * as AuthActions from '../../redux/actions/authAction';

Modal.setAppElement('#root');

const CustomerLoginModal = ({ isOpen, handleCloseModal }) => {
    const dispatch = useDispatch();

    const { customerLoginInputFieldDetail } = useSelector(state => state?.authReducer);
    const [otpScreen, setOtpScreen] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    const handleLoginInputField = (value, country) => dispatch(AuthActions?.customerLoginInputField({ phone_number: value, country_code_length: country?.dialCode?.length })); //* Handle Input Field : Login

    const handleLogin = () => {
        if (customerLoginInputFieldDetail?.phone_number?.length > 5) {
            dispatch(AuthActions.customerLogin({
                data: { phoneNumber: String(customerLoginInputFieldDetail?.phone_number)?.substring(customerLoginInputFieldDetail?.country_code_length) },
                onComplete: () => (setOtpScreen(true), setResendTimer(30))
            }));
        } else {
            toaster.warning({ text: "Please provide phone number" });
        }
    };

    //! Resend OTP 
    const handleResendOtp = () => {
        setResendTimer(30);
        setCustomerOtp(null);
        dispatch(AuthActions.customerLogin({
            data: { phoneNumber: String(customerLoginInputFieldDetail?.phone_number)?.substring(customerLoginInputFieldDetail?.country_code_length) },
            onComplete: () => (setOtpScreen(true), setResendTimer(30))
        }));
    };

    const [customerOtp, setCustomerOtp] = useState(); //* Otp Field

    const handleSubmitOtp = () => {
        if (customerOtp && customerOtp?.length == 4) {
            dispatch(AuthActions.customerLoginOtp({
                data: { phoneNumber: String(customerLoginInputFieldDetail?.phone_number)?.substring(2), webFcmToken: localStorage.getItem('fcm_token'), device_id: 'device_id', otp: customerOtp, },
                onComplete: () => (setOtpScreen(false), handleCloseModal(), setCustomerOtp(''), setResendTimer(30), dispatch(AuthActions?.customerLoginInputField({ phone_number: '', country_code_length: '' })))
            }));
        } else {
            toaster.warning({ text: "Please Enter OTP" });
        }
    };

    useEffect(() => {
        let intervalId;
        if (resendTimer > 0) intervalId = setInterval(() => { setResendTimer(prev => prev - 1); }, 1000);

        return () => clearInterval(intervalId);
    }, [resendTimer]);

    return (
        <Modal isOpen={isOpen} className="modal-content" overlayClassName="modal-overlay" closeTimeoutMS={200}>
            <section className="relative flex items-center justify-center bg-gray-100 max-md:p-5">
                <div onClick={() => (handleCloseModal(), setOtpScreen())} className='cursor-pointer absolute text-primary right-5 top-5'> <CrossSvg strokeWidth='3' />
                </div>
                <article className="rounded-lg overflow-hidden max-w-4xl w-full">
                    <main className='flex'>
                        <div className='basis-[45%] hidden md:flex p-10 justify-center items-center'>
                            <img src={LoginImage} className="object-contain" />
                        </div>
                        <div className='basis-full md:basis-[55%] flex flex-col justify-center p-8'>
                            <div className='flex justify-center mb-8'>
                                <img src={Logo} className="h-14" />
                            </div>
                            {otpScreen ?
                                <main className='flex flex-col gap-4'>
                                    <div className='text-center text-xl'>OTP Verification</div>
                                    <div className='text-gray-800 flex flex-col gap-1'>
                                        <div className='text-center text-nowrap'>A OTP(One Time Password) has been sent to</div>
                                        <div className='text-center flex items-center justify-center gap-1'>{customerLoginInputFieldDetail?.phone_number?.substring(customerLoginInputFieldDetail?.country_code_length)}.<div onClick={() => setOtpScreen(false)} className='bg-primary text-white rounded-full p-1.5  cursor-pointer'><EditSvg h='12' w='12' /></div></div>
                                        {/* <div className='px-10 text-center'>Please enter the OTP in the field below to verify your phone.</div> */}
                                    </div>
                                    <div className='flex flex-col items-center justify-center gap-3 mt-5'>
                                        <OtpInput value={customerOtp} onChange={setCustomerOtp} numInputs={4} renderSeparator={<span>-</span>} renderInput={(props) => (<input {...props} onKeyDown={(e) => e.key === 'Enter' && handleSubmitOtp()} className='border-2 outline-none text-center rounded-md' style={{ height: '40px', width: '40px' }} />)} />
                                    </div>
                                    <div className=' text-green-700 text-sm text-right'>
                                        {resendTimer > 0 ?
                                            `Resend OTP in ${resendTimer} seconds`
                                            :
                                            <button onClick={handleResendOtp} className='text-green-700  text-sm  cursor-pointer hover:text-green-600'>Resend OTP</button>
                                        }
                                    </div>
                                    <button onClick={handleSubmitOtp} className="w-full shadow-lg bg-primary hover:bg-primary focus:shadow-outline focus:outline-none text-white text-sm py-2 px-4 rounded transition duration-300 transform hover:scale-95" type="submit">Submit</button>
                                </main>
                                :
                                <div className='flex flex-col gap-4'>
                                    <div className='text-black'>You will receive a 4 digit code for verification</div>
                                    <PhoneInput country={'in'} placeholder='Enter mobile no' value={customerLoginInputFieldDetail?.phone_number} onChange={handleLoginInputField} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} inputStyle={{ width: '100%', height: '45px', fontSize: "15px", backgroundColor: "#FFF" }} />
                                    <button onClick={handleLogin} className="w-full shadow-lg bg-primary hover:bg-primary focus:shadow-outline focus:outline-none text-white text-sm py-2 px-4 rounded transition duration-300 transform hover:scale-95" type="submit">GET OTP</button>

                                    <div className='text-[12px] text-grey'>By login, you agree to our <Link to={'terms-and-conditions'} onClick={() => handleCloseModal()} className='underline text-blue-700'>Terms of Use</Link> and <Link to={'privacy-policy'} onClick={() => handleCloseModal()} className='underline text-blue-700'>Privacy Policy</Link></div>
                                </div>
                            }
                        </div>
                    </main>
                </article>
            </section>
        </Modal>
    );
};

export default CustomerLoginModal;