import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, serverTimestamp, set } from "firebase/database";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import * as ChatActions from '../../redux/actions/chatAction';


const firebaseConfig = {
  apiKey: "AIzaSyCQfNwyaJLTcz5kFU-RRSnzg61X48J8FB0",
  authDomain: "astrofriends-64b40.firebaseapp.com",
  databaseURL: "https://astrofriends-64b40-default-rtdb.firebaseio.com",
  projectId: "astrofriends-64b40",
  storageBucket: "astrofriends-64b40.appspot.com",
  messagingSenderId: "385098140264",
  appId: "1:385098140264:web:f5a3fb220c4fa5304609dd",
};

//! Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

//! Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

const generateTokenByRequestPermission = async () => {
  try {
    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      const fcm_token = await getToken(messaging, { vapidKey: "BEoX5kK5ssSuT4eaUXRx_CuugpMtCltEall_DDTZFQZECf12hUKSHdkTcRHxVLIEtvXirmU3C_RWtc0hYB9QsPI" });
      console.log('FCM Token', fcm_token);
      localStorage.setItem('fcm_token', fcm_token);
      return fcm_token;
    } else if (permission === 'denied') {
    }
  } catch (error) {
    console.log(error)
  }
};

//! Handle foreground messages
const onMessageListener = (navigate, dispatch) => {
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    const notificationOptions = { data: payload.data, body: payload.data.title };
    const notificationData = notificationOptions.data;
    console.log("NotificationData :: ", notificationData);
    console.log('Profile Id ::: ', notificationData?.profileId);

    if (notificationData?.type == 'call_invoice') {
      dispatch(ChatActions?.setCallInvoiceVisibility(true));
      dispatch(ChatActions?.setCallInvoiceData(JSON.parse(notificationData?.data)))
    } else {
      let url;
      switch (notificationData?.sent_to) {
        case 'astrologer':
          console.log('For Astrologer', notificationData?.sent_to)
          url = `/chat/astrologer-accept-reject?user_id=${notificationData.user_id}&astroID=${notificationData.astroID}&chatId=${notificationData.chatId}&customerName=${notificationData.customerName}&invoiceId=${notificationData.invoiceId}&priority=${notificationData.priority}&profileId=${notificationData.profileId}&type=${notificationData.type}&wallet_balance=${notificationData.wallet_balance}`;
          navigate(url, '_blank');
          console.log('Url ::: ', url);
          break;

        case 'customer':
          console.log('For Customer', notificationData?.sent_to)
          // url = `/chat/customer-accept-reject?user_id=${notificationData.user_id}&astroID=${notificationData.astroID}&chatId=${notificationData.chatId}&astrologerName=${notificationData.astrologerName}&chatPrice=${notificationData.chatPrice}&priority=${notificationData.priority}&type=${notificationData.type}`;
          navigate(`/chat?customer=${notificationData.user_id}&astrologer=${notificationData.astroID}&chatId=${notificationData?.chatId}&profileId=${notificationData?.profileId}`, { replace: true })
          dispatch(ChatActions?.requestInitiatedByCustomer({ initiated: false, timer: 60 }))
          break;

        default:
          break
      }
    }
  });
};

export { database, ref, push, onValue, serverTimestamp, set, messaging, generateTokenByRequestPermission, onMessageListener };