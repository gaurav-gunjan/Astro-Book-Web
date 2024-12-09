import Modal from 'react-modal';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CrossSvg } from '../../assets/svg';
import Logo from '../../assets/images/logo/logo.png';
import LoginImage from '../../assets/images/auth/login-image.png';
import * as AuthActions from '../../redux/actions/authAction';

Modal.setAppElement('#root');

const AstrologerLoginModal = ({ isOpen, handleCloseModal }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [astroFieldDetail, setAstroFieldDetail] = useState({ email: '', password: '' });
    const handleInputFieldAstrolger = (e) => {
        const { name, value } = e.target;
        setAstroFieldDetail({ ...astroFieldDetail, [name]: value })
    };

    const handleLoginAstrolger = async () => {
        console.log(astroFieldDetail);
        const { email, password } = astroFieldDetail;

        const payload = {
            data: { email, password, webFcmToken: localStorage.getItem('fcm_token') },
            onComplete: () => {
                handleCloseModal()
                setAstroFieldDetail({ email: '', password: '' })
                navigate('/astrologer-dashboard/my-account')
            }
        }
        dispatch(AuthActions.astrologerLogin(payload));
    };

    return (
        <>
            <Modal isOpen={isOpen} className="modal-content" overlayClassName="modal-overlay" closeTimeoutMS={200} >
                <section className="relative flex items-center justify-center bg-gray-100 max-md:p-5">
                    <div onClick={() => handleCloseModal()} className='cursor-pointer absolute text-primary right-5 top-5' ><CrossSvg strokeWidth='3' /></div>

                    <article className="rounded-lg overflow-hidden max-w-4xl w-full">
                        <main className='flex'>
                            <div className='basis-[45%] hidden md:flex p-10 justify-center items-center'>
                                <img src={LoginImage} className="object-contain" />
                            </div>
                            <div className='basis-full md:basis-[55%] flex flex-col justify-center p-8'>
                                <div className='flex justify-center mb-8'>
                                    <img src={Logo} className="h-14" />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <input name='email' value={astroFieldDetail?.email} onChange={handleInputFieldAstrolger} type='email' placeholder='Email' className='w-full text-sm px-4 py-2 border border-gray-300  focus:border-primary rounded-md focus:outline-none' />

                                    <input name='password' value={astroFieldDetail?.password} onChange={handleInputFieldAstrolger} type='text' placeholder='Password' className='w-full text-sm px-4 py-2 border border-gray-300 focus:border-primary rounded-md focus:outline-none' />

                                    <button onClick={handleLoginAstrolger} className="w-full shadow-lg bg-primary hover:bg-primary focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded transition duration-300 transform hover:scale-95" type="submit">Login</button>

                                    <div className='text-[12px] text-grey'>By login, you agree to our <Link to={'terms-and-conditions'} onClick={() => handleCloseModal()} className='underline text-blue-700'>Terms of Use</Link> and <Link to={'privacy-policy'} onClick={() => handleCloseModal()} className='underline text-blue-700'>Privacy Policy</Link></div>
                                </div>
                            </div>
                        </main>
                    </article>
                </section>
            </Modal>
        </>
    )
}

export default AstrologerLoginModal;