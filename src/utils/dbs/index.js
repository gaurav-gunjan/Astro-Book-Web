import UPI from '../../assets/images/cardLogo/UPI-Logo.png';
import CreditCard from '../../assets/images/cardLogo/cards.png';
import Bank from '../../assets/images/cardLogo/bank.png';
import Wallet from '../../assets/images/cardLogo/wallet.png';

//! Chat With Astrologer 
export const sortByData = [{ id: 1, name: 'Popularity' }, { id: 2, name: 'Experience', type: 'High to Low' }, { id: 3, name: 'Experience', type: 'Low to High' }, { id: 4, name: 'Total orders', type: 'High to Low' }, { id: 5, name: 'Total orders', type: 'Low to High' }, { id: 6, name: 'Price', type: 'High to Low' }, { id: 7, name: 'Price', type: 'Low to High' }, { id: 8, name: 'Rating', type: 'High to Low' },];
export const skillData = [{ name: 'Face Reading' }, { name: 'Life Coach' }, { name: 'Nadi' }, { name: 'Palmistry' }, { name: 'Vedic' }, { name: 'Vastu' }]
export const languageData = [{ name: 'Hindi' }, { name: 'English' }, { name: 'Sanskrit' }]
export const genderData = [{ name: 'Male' }, { name: 'Female' }, { name: 'Other' }]
export const countryData = [{ name: 'India' }, { name: 'Outside India' }]
export const offerData = [{ name: 'Active' }, { name: 'Inactive' }]

//! Single Astrologer
export const Similar = [{ name: 'One' }, { name: 'Two' }, { name: 'Ine' }];
export const ProgressData = [{}, {}, {}, {}, {}];


//! Payment
export const paymentCardData = [
    { cardName: 'UPI', img: UPI },
    { cardName: 'Credit/Debit Card', img: CreditCard },
    { cardName: 'Net Banking', img: Bank },
    { cardName: 'Other Wallets', img: Wallet },
]; 