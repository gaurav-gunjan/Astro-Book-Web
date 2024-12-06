import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteSvg } from '../../../assets/svg';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import * as UserActions from '../../../redux/actions/userAction';
import * as EcommerceActions from '../../../redux/actions/ecommerceActions';

const Address = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const totalPrice = location?.state?.totalPrice;
    const { userCustomerDataById, userCustomerAddressData } = useSelector(state => state?.userReducer);

    const [inputfieldDetail, setInputfieldDetail] = useState({ name: '', phone: '', pincode: '', house: '', state: '', city: '', area: '' });

    const handleInputfieldDetail = (event) => setInputfieldDetail({ ...inputfieldDetail, [event?.target?.name]: event?.target?.value })

    const handleValidation = () => {
        const { name, phone, pincode, house, state, city, area } = inputfieldDetail;

        let isValid = true;

        if (!name) {
            toast.info('Please enter first name.')
            return isValid = false
        }
        if (!phone) {
            toast.info('Please enter phone number.')
            return isValid = false
        }
        if (!pincode) {
            toast.info('Please enter pincode.')
            return isValid = false
        }
        if (!house) {
            toast.info('Please enter house number.')
            return isValid = false
        }
        if (!state) {
            toast.info('Please enter state.')
            return isValid = false
        }
        if (!city) {
            toast.info('Please enter city.')
            return isValid = false
        }
        if (!area) {
            toast.info('Please enter area.')
            return isValid = false
        }

        return isValid;
    };

    const handleAddress = () => {
        const payload = {
            data: { ...inputfieldDetail, customerId: userCustomerDataById?._id },
            onComplete: () => setInputfieldDetail({ name: '', phone: '', pincode: '', house: '', state: '', city: '', area: '' })
        };

        handleValidation() && dispatch(UserActions?.createUserCustomerAddress(payload));
    };

    const handleOrderCart = async (addressId) => {
        const payload = {
            amount: totalPrice,
            data: { customerId: userCustomerDataById?._id, addressId },
            user: userCustomerDataById,
            onComplete: () => navigate('/my-order?active-tab=order-history')
        }

        //! Dispatching API For Payment 
        dispatch(EcommerceActions.orderCart(payload));
    }

    useEffect(() => {
        userCustomerDataById && dispatch(UserActions?.getUserCustomerAddress());
    }, [userCustomerDataById]);

    return (
        <>
            <TopHeaderSection title={'Address'} />

            <section className='px-[100px] py-7 max-sm:px-[20px]'>
                <article className='flex flex-col gap-7'>
                    <main className='flex flex-wrap gap-[2.5%] gap-y-[40px]'>
                        {userCustomerAddressData && userCustomerAddressData?.map((value, index) => (
                            <div key={index} className='lg:basis-[31.5%] max-lg:basis-[47.5%] max-lg:flex-grow max-md:basis-full flex flex-col gap-2 rounded-xl p-5 capitalize border border-b-[5px] border-r-[5px] border-primary text-gray-800 text-[15px] relative'>
                                <div className='flex items-center gap-[10%]'><strong className='basis-[30%]'>Name:</strong> <p> {value?.name}</p></div>
                                <div className='flex items-center gap-[10%]'><strong className='basis-[30%]'>Phone:</strong> <p> {value?.phone}</p></div>
                                <div className='flex items-center gap-[10%]'><strong className='basis-[30%]'>Locality:</strong> <p> {value?.area}</p></div>
                                <div className='flex items-center gap-[10%]'><strong className='basis-[30%]'>City:</strong> <p> {value?.city}</p></div>
                                <div className='flex items-center gap-[10%]'><strong className='basis-[30%]'>State:</strong> <p> {value?.state}</p></div>
                                <div className='flex items-center gap-[10%]'><strong className='basis-[30%]'>Postal Code:</strong> <p> {value?.pincode}</p></div>

                                <button onClick={() => handleOrderCart(value?._id)} className="mt-4 py-2 px-6 bg-primary text-white rounded-lg" >Deliver to this address</button>

                                <div onClick={() => dispatch(UserActions?.deleteUserCustomerAddress({ id: value?._id }))} className='absolute bg-red-600 text-white rounded-full p-1.5 right-2 top-2 cursor-pointer'><DeleteSvg w='15' h='15' /></div>
                            </div>
                        ))}

                    </main>


                    <section className="relative shadow-2xl p-3 overflow-hidden bg-gray-200">
                        <article>
                            <main className='px-10 py-10 text-[14px] text-[#666373] flex flex-col gap-8'>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex flex-col items-center justify-end h-full'>
                                        <div className='font-[500] text-3xl text-black'>Address<span className='text-primary_text_dark'> Detail</span></div>
                                        <div className='flex items-center'><div className='w-[50px] h-[2px] bg-primary'></div><div className='w-[30px] h-[4px] bg-primary'></div><div className='w-[50px] h-[2px] bg-primary'></div></div>
                                    </div>
                                </div>
                                <div className='flex max-lg:flex-col gap-[20px] max-lg:gap-[15px]'>
                                    <div className='basis-[45%] max-lg:basis-full flex-grow flex flex-col gap-[15px]'>
                                        <input name='name' value={inputfieldDetail?.name} onChange={(e) => handleInputfieldDetail(e)} placeholder='Name' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                        <input name='phone' value={inputfieldDetail?.phone} onChange={(e) => handleInputfieldDetail(e)} type='number' placeholder='Phone' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                        <input name='pincode' value={inputfieldDetail?.pincode} onChange={(e) => handleInputfieldDetail(e)} type='number' placeholder='Pincode' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                        <input name='house' value={inputfieldDetail?.house} onChange={(e) => handleInputfieldDetail(e)} placeholder='House' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                    </div>
                                    <div className='basis-[45%] max-lg:basis-full flex-grow flex flex-col gap-[15px]'>
                                        <input name='state' value={inputfieldDetail?.state} onChange={(e) => handleInputfieldDetail(e)} placeholder='State' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                        <input name='city' value={inputfieldDetail?.city} onChange={(e) => handleInputfieldDetail(e)} placeholder='City' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                        <input name='area' value={inputfieldDetail?.area} onChange={(e) => handleInputfieldDetail(e)} placeholder='Area' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                    </div>
                                </div>
                                <div onClick={handleAddress} className='cursor-pointer bg-primary border border-primary hover:bg-orange-400 text-center text-white font-semibold rounded-sm px-5 py-2 transition-all duration-500'>Add Address</div>
                            </main>
                        </article>
                    </section>

                    {userCustomerAddressData?.length <= 0 && (
                        <div className="flex justify-center items-center h-32 border-2 border-dashed border-gray-300 bg-gray-100 text-primary text-lg rounded-lg shadow-lg p-4">
                            <p className="text-gray-500">No Record Found</p>
                        </div>
                    )}
                </article>
            </section>
        </>
    )
}

export default Address;