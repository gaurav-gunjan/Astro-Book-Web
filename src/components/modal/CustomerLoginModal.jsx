import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CrossSvg, EditSvg } from '../../assets/svg';
import LoginImage from '../../assets/images/auth/login-image.png';
import AuthBg from '../../assets/images/auth/auth-bg.png';
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

    const [minHeight, setMinHeight] = useState('initial');

    useEffect(() => {
        const handleResize = () => setMinHeight(window.innerHeight * 0.95);

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Modal isOpen={isOpen} className="modal-content" overlayClassName="modal-overlay" closeTimeoutMS={200} style={{ content: { minHeight: minHeight, backgroundColor: 'transparent' } }}>
            <div className='h-20 bg-transparent'></div>
            <section className="relative flex justify-center bg-white rounded-lg">
                <div onClick={() => (handleCloseModal(), setOtpScreen())} className='cursor-pointer absolute text-primary right-5 top-5 z-10'> <CrossSvg strokeWidth='3' /></div>
                <main className="rounded-lg max-w-4xl w-full flex bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${AuthBg})` }}>
                    <div className='basis-full md:basis-[55%] flex flex-col p-8 max-md:px-0 pt-16 pb-32'>
                        {otpScreen ?
                            <main className='flex flex-col gap-4 px-10 text-center'>
                                <div className='text-black text-[30px] font-[500]'>OTP Verification</div>
                                <div className='text-gray-800 flex flex-col gap-1'>
                                    <div className='text-[#757373] text-nowrap'>A OTP(One Time Password) has been sent to</div>
                                    <div className='text-[#757373] flex items-center justify-center gap-1'>{customerLoginInputFieldDetail?.phone_number?.substring(customerLoginInputFieldDetail?.country_code_length)}.<div onClick={() => setOtpScreen(false)} className='bg-[#F1B646] text-white rounded-full p-1.5  cursor-pointer'><EditSvg h='12' w='12' /></div></div>
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
                                <button onClick={handleSubmitOtp} className="w-full h-[45px] shadow-lg bg-[#F1B646] hover:bg-[#F1B64699] focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded-[10px] transition duration-300 transform hover:scale-95]" type="submit">Submit</button>
                            </main>
                            :
                            <div className='flex flex-col items-center gap-5 px-10 text-center'>
                                <div>
                                    <div className='text-black text-[30px] font-[500]'>Continue with Phone</div>
                                    <div className='text-[#757373] px-10'>You will receive a 4 digit code for verification</div>
                                </div>
                                <PhoneInput country={'in'} placeholder='Enter mobile no' value={customerLoginInputFieldDetail?.phone_number} onChange={handleLoginInputField} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} inputStyle={{ width: '100%', height: '55px', fontSize: "15px", backgroundColor: "#FFF", borderRadius: '10px' }} />
                                <button onClick={handleLogin} className="w-full h-[45px] shadow-lg bg-[#F1B646] hover:bg-[#F1B64699] focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded-[10px] transition duration-300 transform hover:scale-95]" type="submit">GET OTP</button>

                                <div className='text-[14px] font-[500] text-[#0858F7]'>By Signing, you agree to our <Link to={'terms-of-use'} onClick={() => handleCloseModal()} className='underline'>Terms of Use</Link> and <Link to={'privacy-policy'} onClick={() => handleCloseModal()} className='underline'>Privacy Policy</Link></div>
                            </div>
                        }
                    </div>

                    <div className='basis-[45%] hidden md:flex justify-center'>
                        <div className='absolute -top-20'><img className="object-contain w-[80%] h-[80%]" src={LoginImage} /></div>
                    </div>
                </main>
            </section>
        </Modal>
    );
};

export default CustomerLoginModal;