import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BagSvg, CallSvg, ChatSvg, CrossSvg, HamburgerSvg, LogoutSvg, PersonSvg, ProfileSvg, SupportSvg, TempleSvg, TransactionIndianSvg, WalletOutlineSvg, WalletSvg } from '../../assets/svg';
import DownloadApp from '../features/DownloadApp';
import CustomerLoginModal from '../modal/CustomerLoginModal';
import AstrologerLoginModal from '../modal/AstrologerLoginModal';
import * as AuthActions from '../../redux/actions/authAction';
import { generateTokenByRequestPermission } from '../../config/firebase-config';
import Logo from '../../assets/images/logo/logo.png';
import { api_urls } from '../../utils/api-urls';

Modal.setAppElement('#root');

const Header = () => {
    const navRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDataById, userAstrologerDataById } = useSelector(state => state?.userReducer);
    const [hamburger, setHamburger] = useState(false);
    const [shownav, setShownav] = useState(false);
    const [screenScroll, setScreenScroll] = useState(false);

    // Todo : Download App Modal 
    const [downloadAppModal, setDownloadAppModal] = useState(false);

    const handleOpenDownloadAppModal = () => {
        setShownav(!shownav)
        setDownloadAppModal(true)
    };
    const handleClosedownloadAppModal = () => setDownloadAppModal(false);

    //! Handle Resize and Scroll Event Listener 
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 500) {
                setShownav(false)
            }
        };

        const handleScroll = () => {
            if (window.scrollY > 60) setScreenScroll(true);
            else setScreenScroll(false);
        }

        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setShownav(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('scroll', handleScroll);

        if (shownav) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleScroll);
        };
    }, [shownav]);

    // Todo : Astrolger Login Start
    const [loginAstrologerModal, setLoginAstrologerModal] = useState(false);

    const handleOpenLoginAstrologerModal = async () => {
        setShownav(false);
        console.log('Astrologer login button clicked');

        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
        } else if (Notification.permission === "granted") {
            generateTokenByRequestPermission();
            setLoginAstrologerModal(true)

        } else if (Notification.permission === "denied") {
            alert("You have blocked notifications. Please enable them in your browser settings.");

        } else if (Notification.permission === "default") {
            console.log('Requesting Notification Permission');
            const permission = await Notification.requestPermission();
        }
    };

    const handleCloseLoginAstrologerModal = () => setLoginAstrologerModal(false);

    // Todo : Customer Login Start
    const [loginCustomerModal, setLoginCustomerModal] = useState(false);

    const handleOpenLoginCustomerModal = async () => {
        setShownav(false);
        console.log('Astrologer login button clicked');

        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
        } else if (Notification.permission === "granted") {
            generateTokenByRequestPermission();
            setLoginCustomerModal(true)

        } else if (Notification.permission === "denied") {
            alert("You have blocked notifications. Please enable them in your browser settings.");

        } else if (Notification.permission === "default") {
            console.log('Requesting Notification Permission');
            const permission = await Notification.requestPermission();
        }
    };
    const handleCloseLoginCustomerModal = () => setLoginCustomerModal(false);

    return (
        <>
            <header className={`bg-primary text-white fixed w-full z-[1000] top-0 transition-all duration-300 text-[15px] font-normal`}>
                <article>
                    <main className='flex flex-wrap justify-between items-center gap-5 relative z-10 px-[80px] max-md:px-[20px] py-[15px]'>
                        <Link to={'/'} ><img className='h-16 max-lg:h-10' src={Logo} /></Link>

                        <nav className='flex flex-col gap-2 items-end max-lg:hidden'>
                            <div className='flex items-center gap-[30px]'>
                                <NavLink to="/free-kundli" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-white" : "text-white"}>Free Kundli</NavLink>
                                <NavLink to="/kundli-matching" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-white" : "text-white"}>Kundli Matching</NavLink>
                                <NavLink to="/horoscope/daily" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-white" : "text-white"}>Horoscope</NavLink>
                                <NavLink to="" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-white" : "text-white"}>Eng</NavLink>
                                {!userCustomerDataById && !userAstrologerDataById && <div onClick={handleOpenLoginCustomerModal} className='flex items-center gap-1.5 cursor-pointer bg-[#F1B646] px-3.5 py-1 rounded-full'><div className='-mt-1'><PersonSvg /></div><div>Login</div></div>}

                                {userAstrologerDataById &&
                                    <div className='group relative text-black'>
                                        <div className='flex items-center gap-1 cursor-pointer'>{userAstrologerDataById?.profileImage ? <img src={api_urls + userAstrologerDataById?.profileImage} className='h-9 w-9 rounded-full' /> : <ProfileSvg />}</div>

                                        <div className='font-normal absolute overflow-hidden top-20 right-0 bg-white w-52 h-0 rounded-lg group-hover:h-[390px] transition-all duration-500 ease-in group-hover:border-b-[5px] border-primary shadow-2xl'>
                                            <div className='flex flex-col items-center gap-1.5 py-5'>
                                                {userAstrologerDataById?.profileImage ? <img src={api_urls + userAstrologerDataById?.profileImage} className='h-11 w-11 rounded-full' /> : <ProfileSvg h='40' w='40' />}
                                                <div className='text-[16px]'>{userAstrologerDataById?.astrologerName}</div>
                                                <div className='text-sm'>XXXXXX{userAstrologerDataById?.phoneNumber?.toString()?.substring(6, 10)}</div>
                                            </div>
                                            <div onClick={() => navigate('/astrologer-dashboard/my-account')} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer'><div>My Account</div></div>
                                            <div onClick={() => navigate('/astrologer-dashboard/wallet-history')} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer'><div>Wallet History</div></div>
                                            <div onClick={() => navigate('/astrologer-dashboard/transaction-history')} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer'><div>Transaction History</div></div>
                                            <div onClick={() => navigate('/astrologer-dashboard/register-puja-history')} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer'><div>Register Puja History</div></div>
                                            <div onClick={() => navigate('/astrologer-dashboard/book-puja-history')} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer'><div>Book Puja History</div></div>
                                            <div onClick={() => dispatch(AuthActions.userLogout({ onComplete: () => navigate('/') }))} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer'><div>Logout</div></div>
                                        </div>
                                    </div>
                                }

                                {userCustomerDataById &&
                                    <div className='group relative text-black'>
                                        <div className='flex items-center gap-1 cursor-pointer text-white'>{userCustomerDataById?.image ? <img src={api_urls + 'uploads/' + userCustomerDataById?.image} className='h-9 w-9 object-contain rounded-full' /> : <ProfileSvg />} <div className='capitalize'>{userCustomerDataById?.customerName}</div></div>

                                        <div className='font-normal absolute overflow-hidden top-20 right-0 bg-white w-52 h-0 rounded-lg group-hover:h-[390px] transition-all duration-500 ease-in group-hover:border-b-[5px] border-primary shadow-2xl'>
                                            <div className='flex flex-col items-center gap-3 py-5'>
                                                {userCustomerDataById?.image ? <img src={api_urls + 'uploads/' + userCustomerDataById?.image} className='h-11 w-11 object-contain rounded-full' /> : <ProfileSvg h='40' w='40' />}
                                                <div>XXXXXX{userCustomerDataById?.phoneNumber?.toString()?.substring(6, 10)}</div>
                                            </div>
                                            <div onClick={() => navigate('/my-account?active-tab=update-profile')} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer'><div>My Account</div></div>
                                            <div onClick={() => navigate('/wallet-history')} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer'><div>My Wallet</div></div>
                                            <div onClick={() => navigate('/transaction-history')} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer'><div>My Transaction</div></div>
                                            <div onClick={() => navigate('/my-order?active-tab=order-history')} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer'><div>My Order</div></div>
                                            <div onClick={() => navigate('/astro-mall')} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer'><div>Astromall</div></div>
                                            <div onClick={() => navigate('/book-puja')} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer'><div>Book Puja</div></div>
                                            <div onClick={() => dispatch(AuthActions.userLogout({ onComplete: () => navigate('/') }))} className='flex items-center gap-3 border-t py-2 px-5 cursor-pointer'><div>Logout</div></div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='flex items-center gap-[30px]'>
                                <NavLink to="/astrologer" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-white" : "text-white"}>Talk to Astrologer</NavLink>
                                {userCustomerDataById ? <NavLink to="/book-puja" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-white" : "text-white"}>Book a Puja</NavLink> : <NavLink to="/register-puja" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-white" : "text-white"}>Register Puja</NavLink>}
                                <NavLink to="/astro-mall" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-white" : "text-white"}>Astromall</NavLink>
                                <NavLink to="" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-white" : "text-white"}>Astrotalk Store</NavLink>
                                <NavLink to="/blog" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-white" : "text-white"}>Blog</NavLink>
                            </div>
                        </nav>

                        <div onClick={() => setShownav(!shownav)} className={`cursor-pointer lg:hidden ${shownav == true && 'invisible'}`}><HamburgerSvg h={'30'} w={'30'} /></div>
                    </main>


                    <main ref={navRef} className={`pb-40 flex flex-col gap-5 p-5 absolute h-full bg-white text-black border-r border-primary shadow-lg top-0 z-50 min-h-[100vh] w-[80vw] transition-all duration-500 overflow-y-scroll ${shownav ? 'left-0' : 'left-[-80vw]'}`}>

                        <div onClick={() => setShownav(!shownav)} className='flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer'>CLOSE <CrossSvg w={'20'} /></div>
                        <div className='text-center font-semibold text-sm'>WHAT ARE YOU LOOKING FOR?</div>

                        <div className='flex flex-col'>
                            {userCustomerDataById && <>
                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => setShownav(!shownav)} to="/my-account?active-tab=update-profile" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>My Account</NavLink>
                                </div>

                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => setShownav(!shownav)} to="/wallet-history" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>My Wallet</NavLink>
                                </div>

                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => setShownav(!shownav)} to="/transaction-history" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>My Transaction</NavLink>
                                </div>

                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => setShownav(!shownav)} to="/my-order?active-tab=order-history" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>My Order</NavLink>
                                </div>

                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => setShownav(!shownav)} to="/astro-mall" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Astromall</NavLink>
                                </div>

                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => setShownav(!shownav)} to="/book-puja" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Book Puja</NavLink>
                                </div>
                            </>}

                            {userAstrologerDataById && <>
                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => setShownav(!shownav)} to="/astrologer-dashboard/my-account" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>My Account</NavLink>
                                </div>

                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => setShownav(!shownav)} to="/astrologer-dashboard/wallet-history" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Wallet History</NavLink>
                                </div>

                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => setShownav(!shownav)} to="/astrologer-dashboard/transaction-history" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Transaction History</NavLink>
                                </div>

                                <div className='flex items-center  border-b py-4 px-1'>
                                    <NavLink onClick={() => setShownav(!shownav)} to="/astrologer-dashboard/assign-puja-history" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Assign Puja History</NavLink>
                                </div>
                            </>}

                            {userAstrologerDataById || userCustomerDataById ?
                                <>
                                    <div className='flex items-center gap-1  border-b py-4'>
                                        <div className='border-b-2 border-white'></div><div onClick={() => dispatch(AuthActions.userLogout({ onComplete: () => navigate('/') }))} className='cursor-pointer'>Logout</div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='flex items-center gap-1  border-b py-4'>
                                        <div className='border-b-2 border-white'></div><div onClick={handleOpenLoginCustomerModal} className='cursor-pointer'>Login as Customer</div>
                                    </div>
                                    <div className='flex items-center gap-1 border-b py-4'>
                                        <div className='border-b-2 border-white'></div><div onClick={handleOpenLoginAstrologerModal} className='cursor-pointer'>Login as Astrologer</div>
                                    </div>
                                </>
                            }
                        </div>
                    </main>
                </article>
            </header>
            {shownav && (<div className="fixed top-0 left-0 w-full h-full transition-all ease-in duration-300 bg-black bg-opacity-50 z-40" />)}

            {/* Astrologer Modal */}
            <AstrologerLoginModal isOpen={loginAstrologerModal} handleCloseModal={handleCloseLoginAstrologerModal} />

            {/* Customer Modal */}
            <CustomerLoginModal isOpen={loginCustomerModal} handleCloseModal={handleCloseLoginCustomerModal} />

            {/* Download App */}
            <DownloadApp isOpen={downloadAppModal} handleCloseModal={handleClosedownloadAppModal} />
        </>
    )
}

export default Header;