import React, { useEffect, Suspense, lazy } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { LoadScript } from '@react-google-maps/api';
import { google_api_keys } from './utils/constants';
import { database, generateTokenByRequestPermission, onMessageListener, onValue, ref } from './config/firebase-config';
import SocketService from './utils/services/socket-service';
import * as UserActions from './redux/actions/userAction';
import * as ChatActions from './redux/actions/chatAction';

// TODO : Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Loading from './components/features/Loading';
import NotFound from './components/features/NotFound';
import RatingModal from './components/modal/RatingModal';
import ChatInvoiceModal from './components/modal/ChatInvoiceModal';
import CallInvoiceModal from './components/modal/CallInvoiceModal';
import PageBlock from './components/features/PageBlock';
import ScrollToTop from './components/features/ScrollToTop';
import NewsLetter from './components/common/NewsLetter';

//! Lazy Load Pages
const LandingPage = lazy(() => import('./pages/landing-page'));

//! Customer
const CustomerMyAccount = lazy(() => import('./pages/my-account'));
const CustomerTransactionHistory = lazy(() => import('./pages/transaction-history'));
const CustomerWalletHistory = lazy(() => import('./pages/wallet-history'));
const CustomerMyOrder = lazy(() => import('./pages/my-order'));

//! Recharge 
const Recharge = lazy(() => import('./pages/recharge'));
const PaymentDetail = lazy(() => import('./pages/recharge/payment-detail'));

//! Astrologer Dashboard
const AstrologerMyAccount = lazy(() => import('./pages/astrologer-dashboard/my-account'));
const AstrologerTransactionHistory = lazy(() => import('./pages/astrologer-dashboard/transaction-history'));
const AstrologerWalletHistory = lazy(() => import('./pages/astrologer-dashboard/wallet-history'));
const AstrologerRegisterPujaHistory = lazy(() => import('./pages/astrologer-dashboard/register-puja-history'));
const AstrologerBookPujaHistory = lazy(() => import('./pages/astrologer-dashboard/book-puja-history'));

//! Astrologer
const Astrologer = lazy(() => import('./pages/astrologer'));
const SingleAstrologer = lazy(() => import('./pages/astrologer/name'));
const IntakeForm = lazy(() => import('./pages/astrologer/intake-form'));
const CustomerAcceptReject = lazy(() => import('./pages/chat/customer-accept-reject'));
const AstrologerAcceptReject = lazy(() => import('./pages/chat/astrologer-accept-reject'));
const Chat = lazy(() => import('./pages/chat'));
const IntakeDetails = lazy(() => import('./pages/chat/intake-details'));

//! Free Kundli 
const FreeKundli = lazy(() => import('./pages/free-kundli'));
const KundliId = lazy(() => import('./pages/free-kundli/kundliId'));

//! Kundli Matching 
const KundliMatching = lazy(() => import('./pages/kundli-matching'));
const KundliMatchingReports = lazy(() => import('./pages/kundli-matching/reports'));

//! Horoscope 
const DailyHoroscope = lazy(() => import('./pages/horoscope/daily-horoscope'));
const DailyHoroscopeDetails = lazy(() => import('./pages/horoscope/daily-horoscope/horoscope-details'));
const MonthlyHoroscope = lazy(() => import('./pages/horoscope/montly-horoscope'));
const MonthlyHoroscopeDetails = lazy(() => import('./pages/horoscope/montly-horoscope/horoscope-details'));
const YearlyHoroscope = lazy(() => import('./pages/horoscope/yearly-horoscope'));

//! Book Puja
const BookPuja = lazy(() => import('./pages/book-puja'));
const BookPujaDetails = lazy(() => import('./pages/book-puja/puja-details'));
const RegisterPuja = lazy(() => import('./pages/register-puja'));
const RegisterPujaDetails = lazy(() => import('./pages/register-puja/puja-details'));

//! Astromall 
const AstroMall = lazy(() => import('./pages/astro-mall'));
const Products = lazy(() => import('./pages/astro-mall/products'));
const ProductDetails = lazy(() => import('./pages/astro-mall/products/product-details'));
const Cart = lazy(() => import('./pages/astro-mall/cart'));
const Address = lazy(() => import('./pages/astro-mall/address'));

//! Blog 
const Blog = lazy(() => import('./pages/blog'));
const BlogDetails = lazy(() => import('./pages/blog/blog-details'));

//! Static Page 
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy'));
const TermsOfUse = lazy(() => import('./pages/terms-of-use'));
const AboutUs = lazy(() => import('./pages/about-us'));

const App = () => {
  const { requestInitiatedByCustomer } = useSelector(state => state?.chatReducer);

  const location = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    generateTokenByRequestPermission();

    // Listen for foreground messages
    onMessageListener(navigate, dispatch);

    SocketService.initializeSocket(dispatch, navigate);

  }, [dispatch, navigate]);

  useEffect(() => {
    const user_type = localStorage.getItem('user_type');
    const current_user_id = localStorage.getItem('current_user_id');

    if (user_type == 'customer') {
      dispatch(UserActions.getUserCustomerById({ customerId: current_user_id }));

      const messagesRef = ref(database, `CurrentCall/${current_user_id}`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          dispatch(ChatActions.callIntakeDetailData({ visible: true, profileId: data?.formId }))
        } else {
          dispatch(ChatActions.callIntakeDetailData({ visible: false, profileId: null }))
        }
      });
    }

    if (user_type == 'astrologer') {
      dispatch(UserActions.getUserAstrologerById({ astrologerId: current_user_id }));

      const messagesRef = ref(database, `CurrentCall/${current_user_id}`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          dispatch(ChatActions.callIntakeDetailData({ visible: true, profileId: data?.formId }))
        } else {
          dispatch(ChatActions.callIntakeDetailData({ visible: false, profileId: null }))
        }
      });
    }
  }, []);

  //! Scrolling 
  const scrollToSection = (sectionId) => {
    console.log("Section ID ::: ", sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // If the section is not found, navigate to the home page
      navigate('/');
      setTimeout(() => {
        const homeSection = document.getElementById(sectionId);
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <>
      <LoadScript googleMapsApiKey={google_api_keys} libraries={['places']} loadingElement={<Loading />}>
        <Suspense fallback={<Loading />}>
          <Header />
          <ScrollToTop>
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path='/' element={<LandingPage />} />

              {/* Customer */}
              <Route path='/my-account' element={<CustomerMyAccount />} />
              <Route path='/transaction-history' element={<CustomerTransactionHistory />} />
              <Route path='/wallet-history' element={<CustomerWalletHistory />} />
              <Route path='/my-order' element={<CustomerMyOrder />} />

              {/* Recharge */}
              <Route path='/recharge' element={<Recharge />} />
              <Route path='/recharge/payment-details' element={<PaymentDetail />} />

              {/* Astrologer Dashboard */}
              <Route path='/astrologer-dashboard/my-account' element={<AstrologerMyAccount />} />
              <Route path='/astrologer-dashboard/transaction-history' element={<AstrologerTransactionHistory />} />
              <Route path='/astrologer-dashboard/wallet-history' element={<AstrologerWalletHistory />} />
              <Route path='/astrologer-dashboard/register-puja-history' element={<AstrologerRegisterPujaHistory />} />
              <Route path='/astrologer-dashboard/book-puja-history' element={<AstrologerBookPujaHistory />} />

              {/* Astrologer */}
              <Route path='/astrologer' element={<Astrologer />} />
              <Route path='/astrologer/:name' element={<SingleAstrologer />} />
              <Route path='/astrologer/intake-form/:astrologerId' element={<IntakeForm />} />
              <Route path='/chat/customer-accept-reject' element={<CustomerAcceptReject />} />
              <Route path='/chat/astrologer-accept-reject' element={<AstrologerAcceptReject />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/chat/intake-details/:profileId' element={<IntakeDetails />} />

              {/* Free Kundli */}
              <Route path='/free-kundli' element={<FreeKundli />} />
              <Route path='/free-kundli/:kundliId' element={<KundliId />} />

              {/* Kundli Matching */}
              <Route path='/kundli-matching' element={<KundliMatching />} />
              <Route path='/kundli-matching/reports/:profileId' element={<KundliMatchingReports />} />

              {/* Horoscope */}
              <Route path='/horoscope/daily' element={<DailyHoroscope />} />
              <Route path='/horoscope/daily/:zodiacSign' element={<DailyHoroscopeDetails />} />
              <Route path='/horoscope/monthly' element={<MonthlyHoroscope />} />
              <Route path='/horoscope/monthly/:zodiacSign' element={<MonthlyHoroscopeDetails />} />
              <Route path='/horoscope/yearly' element={<YearlyHoroscope />} />

              {/* Book Puja */}
              <Route path='/book-puja' element={<BookPuja />} />
              <Route path='/book-puja/:name' element={<BookPujaDetails />} />

              {/* Register Puja */}
              <Route path='/register-puja' element={<RegisterPuja />} />
              <Route path='/register-puja/:name' element={<RegisterPujaDetails />} />

              {/* Astromall */}
              <Route path='/astro-mall' element={<AstroMall />} />
              <Route path='/astro-mall/products' element={<Products />} />
              <Route path='/astro-mall/products/:name' element={<ProductDetails />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/cart/address' element={<Address />} />

              {/* Blog */}
              <Route path='/blog' element={<Blog />} />
              <Route path='/blog/blog-details' element={<BlogDetails />} />

              {/* Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/about-us" element={<AboutUs />} />
            </Routes>
          </ScrollToTop>
        </Suspense>
        {location?.pathname !== '/chat' || location?.pathname !== '/astrologer/intake-form' && <NewsLetter />}
        {location?.pathname !== '/chat' || location?.pathname !== '/astrologer/intake-form' && <Footer scrollToSection={scrollToSection} />}

        <ChatInvoiceModal />
        <CallInvoiceModal />
        <RatingModal />
        {requestInitiatedByCustomer?.initiated && <PageBlock />}
        <ToastContainer />
      </LoadScript>
    </>
  )
}

export default App;