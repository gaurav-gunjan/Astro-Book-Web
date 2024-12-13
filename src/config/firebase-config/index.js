import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, serverTimestamp, set } from "firebase/database";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import * as ChatActions from '../../redux/actions/chatAction';


const firebaseConfig = {
  apiKey: "AIzaSyCaWJBODsy4Iatao2cjl7QdoqyI23IG4hY",
  authDomain: "astrobook-96d06.firebaseapp.com",
  databaseURL: "https://astrobook-96d06-default-rtdb.firebaseio.com",
  projectId: "astrobook-96d06",
  storageBucket: "astrobook-96d06.firebasestorage.app",
  messagingSenderId: "1086555677086",
  appId: "1:1086555677086:web:33573b3a6069d103c2368f",
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
      const fcm_token = await getToken(messaging, { vapidKey: 'BL4pIx8Sbn6Va4hsWmj6kUZy4b2xQdnZktL-yoMLmnazNZNBRcY5S-_ofpYs5KG-5urWR_61-o_XYl6ModruJhI' });
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
          dispatch(ChatActions?.requestInitiatedByCustomer({ initiated: false, timer: 60 }));
          dispatch(ChatActions?.hideChatMessageInputField(false));
          break;

        default:
          break
      }
    }
  });
};

export { database, ref, push, onValue, serverTimestamp, set, messaging, generateTokenByRequestPermission, onMessageListener };