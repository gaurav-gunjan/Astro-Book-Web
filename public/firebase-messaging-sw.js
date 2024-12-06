importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBxmEfOXUmA6uD6-7g_1RcKFuOrla2JPbQ",
    authDomain: "astrofriends-9383a.firebaseapp.com",
    databaseURL: "https://astrofriends-default-rtdb.firebaseio.com",
    projectId: "astrofriends",
    storageBucket: "astrofriends.appspot.com",
    messagingSenderId: "479840149158",
    appId: "1:479840149158:web:5b85c570ade3ed703b5e67"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


// messaging.onBackgroundMessage((payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: payload.notification.icon,
//         data: payload.data // Pass the additional data
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener('notificationclick', function (event) {
//     console.log('[firebase-messaging-sw.js] Notification click Received.');

//     event.notification.close(); // Close the notification

//     // Retrieve the additional data from the notification
//     const notificationData = event.notification.data;

//     // const url = `http://localhost:5500/chat/accept-reject?astroID=${notificationData.astroID}&chatId=${notificationData.chatId}&customerName=${notificationData.customerName}&invoiceId=${notificationData.invoiceId}&priority=${notificationData.priority}&profileId=${notificationData.profileId}&type=${notificationData.type}&user_id=${notificationData.user_id}&wallet_balance=${notificationData.wallet_balance}`;
//     let url;
//     switch (notificationData?.sent_to) {
//         case 'astrologer':
//             console.log('For Astrologer', notificationData?.sent_to)
//             url = `http://localhost:5500/chat/astrologer-accept-reject?user_id=${notificationData.user_id}&astroID=${notificationData.astroID}&chatId=${notificationData.chatId}&customerName=${notificationData.customerName}&invoiceId=${notificationData.invoiceId}&priority=${notificationData.priority}&profileId=${notificationData.profileId}&type=${notificationData.type}&wallet_balance=${notificationData.wallet_balance}`;
//             break;

//         case 'customer':
//             console.log('For Customer', notificationData?.sent_to)
//             url = `http://localhost:5500/chat/customer-accept-reject?user_id=${notificationData.user_id}&astroID=${notificationData.astroID}&chatId=${notificationData.chatId}&astrologerName=${notificationData.astrologerName}&chatPrice=${notificationData.chatPrice}&priority=${notificationData.priority}&type=${notificationData.type}`;
//             break;

//         default:
//             url = `http://localhost:5500/`;
//     }

//     // Open the URL with the additional data
//     event.waitUntil(
//         clients.openWindow(url)
//     );
// });

// messaging.onBackgroundMessage((payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);

//     // Customize notification here
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: payload.notification.image,
//         data: payload.data // Pass the additional data
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener('notificationclick', function (event) {
//     console.log('[firebase-messaging-sw.js] Notification click Received.');

//     event.notification.close(); // Close the notification

//     // Open the URL from the notification data
//     event.waitUntil(
//         clients.openWindow(event.notification.data.url)
//     );
// });