import axios from "axios";
import { api_urls } from "../api-urls";
import { access_token, razorpay_live_key, razorpay_test_key } from "../constants";
import { encode as btoa } from 'base-64';
import Swal from "sweetalert2";
import { toaster } from "../services/toast-service";

if (typeof global.btoa === 'undefined') global.btoa = btoa;

export const getAPI = async (url) => {
    const token = localStorage.getItem(access_token);

    const response = await axios.get(api_urls + url, { headers: { Authorization: 'Bearer ' + token } })
    return response;
}

export const postAPI = async (url, payload) => {
    const token = localStorage.getItem(access_token);

    const response = await axios.post(api_urls + url, payload, { headers: { Authorization: 'Bearer ' + token } });
    return response;
}

export const putAPI = async (url, payload) => {
    const token = localStorage.getItem(access_token);

    const response = await axios.put(api_urls + url, payload, { headers: { Authorization: 'Bearer ' + token } });
    return response;
}

export const deleteAPI = async (url) => {
    const token = localStorage.getItem(access_token);

    const response = await axios.delete(api_urls + url, { headers: { Authorization: 'Bearer ' + token } });
    return response;
}

export const kundliRequest = async (url, payload) => {
    const credentials = `${630051}:${'861bba6a92587a326a9b11ab9dfb9b7ca3492fab'}`;
    const token = btoa(credentials);

    const response = await axios.post(url, payload, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
    return response?.data;
};

export const AstrologyAPIRequest = async (url, payload) => {
    const credentials = `${630051}:${'861bba6a92587a326a9b11ab9dfb9b7ca3492fab'}`;
    const token = btoa(credentials);

    const response = await axios.post(url, payload, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
    return response?.data;
};

export const razorpayPayment = async ({ amount = 0, name = '', email = '', contact = '' }) => {

    const { data } = await postAPI('api/customers/create_razorpay_order', { amount });
    console.log("Order Response :::", data);

    if (!data?.status) {
        toaster?.error({ text: 'Payment Failed.' });
        return;
    }

    let options = {
        key: razorpay_test_key,
        name,
        currency: 'INR',
        amount: data?.data?.amount,
        order_id: data?.data?.id,
        prefill: { name, email, contact },
        theme: { color: '#E15602' },
        description: `Your Amount : ${data?.data?.amount}`,
        image: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png',
    };

    console.log("Razor Pay Option ::: ", options);

    return new Promise((resolve, reject) => {
        options.handler = function (response) {
            console.log('Handler Response ::: ', response);
            resolve({ status: true, message: 'Payment was successful.', result: response });
        };

        options.modal = {
            ondismiss: function () {
                console.log("Payment Dismissed !!! ");
                resolve({ status: false, message: 'Payment was dismissed by the user.', result: null });
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', function (response) {
            console.log("Payment Failed !!! ", response?.error);
            reject({ status: false, message: response?.error?.description, result: response?.error });
        });
        razorpay.open();
    });
};