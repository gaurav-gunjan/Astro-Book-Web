import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api_urls } from '../../../utils/api-urls';
import { IndianRupee } from '../../../utils/common-function';
import * as EcommerceActions from '../../../redux/actions/ecommerceActions';
import TopHeaderSection from '../../../components/common/TopHeaderSection';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartData } = useSelector(state => state?.ecommerceReducer);
    const { cart: cartDataArray, totalPrice } = cartData;
    const { userCustomerDataById } = useSelector(state => state?.userReducer)
    console.log('cartDataArray', cartDataArray);

    const handleOrderCart = async () => {
        const payload = {
            amount: totalPrice,
            data: {
                customerId: userCustomerDataById?._id,
            },
            user: userCustomerDataById,
            onComplete: () => navigate('/astro-mall')
        }

        console.log("Payload :: ", payload);
        //! Dispatching API For Payment 
        dispatch(EcommerceActions.orderCart(payload));
    }

    useEffect(() => {
        //! Dispatching API For Getting Cart Data
        dispatch(EcommerceActions.getCartData());
    }, []);

    return (
        <>
            <TopHeaderSection title={'Shopping Cart'} />

            <section className='px-5 lg:px-[100px] py-10'>
                {cartDataArray?.length > 0 && <div className='flex gap-5 flex-wrap'>
                    {/* Left Side: Cart Items */}
                    <div className='flex-1 flex flex-col gap-6 min-w-[350px] max-md:min-w-[90vw] max-md:w-[90vw]'>
                        {cartDataArray?.map((value, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex gap-5 items-center justify-between flex-wrap">
                                <div className='flex items-center gap-5 basis-[50%] max-md:basis-[100%]'>
                                    <img src={api_urls + 'uploads/' + value?.productId?.image} alt={value?.productId?.productName} className="h-32 w-32 object-cover rounded-md mr-4" />
                                    <div className="flex flex-col gap-2">
                                        <div className="font-semibold text-lg">{value?.productId?.productName}</div>
                                        <div className={`text-base font-medium ${value?.status === 'IN_STOCK' ? 'text-green-700' : 'text-red-600'}`}>{value?.status === 'IN_STOCK' ? 'In Stock' : 'Out Of Stock'}</div>
                                    </div>
                                </div>
                                <div className='flex justify-between gap-5 basis-[45%] max-md:basis-[100%]'>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button onClick={() => dispatch(EcommerceActions.updateCartQuantity({ cartItemId: value?._id, type: 'REMOVE' }))} className="bg-red-600 w-8 h-8 flex justify-center items-center rounded-md text-white">-</button>
                                        <div className="text-lg">{value?.quantity}</div>
                                        <button disabled={value?.quantity == 100} onClick={() => dispatch(EcommerceActions.updateCartQuantity({ cartItemId: value?._id, type: 'ADD' }))} className={`${value?.quantity == 100 ? 'bg-gray-400' : 'bg-green-700'} w-8 h-8 flex justify-center items-center rounded-md text-white`}>+</button>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xl font-bold text-green-700">{IndianRupee(value?.productId?.price)}</span>
                                        <span className="line-through text-red-600">{IndianRupee(value?.productId?.mrp)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Pricing Details */}
                    <div className='min-w-[300px] max-md:w-[90vw] bg-white shadow-lg p-6 rounded-lg flex flex-col'>
                        <div className='text-xl font-semibold mb-4'>Order Summary</div>
                        <div className='mb-4'>
                            <div className='flex justify-between'>
                                <span className='text-lg'>Total Price:</span>
                                <span className='text-lg font-bold'>{IndianRupee(totalPrice)}</span>
                            </div>
                        </div>
                        <button onClick={() => navigate('/cart/address', { state: { totalPrice } })} className='w-full bg-primary text-white py-2 rounded-md mb-4'>Book Now</button>
                    </div>
                </div>}

                {(cartDataArray?.length <= 0 || cartDataArray == undefined) && <div className="flex flex-col items-center justify-center py-10">
                    <img src='https://cdn-icons-png.flaticon.com/512/11329/11329060.png' alt="Empty Cart" className="w-1/2 max-w-xs" />
                    <div className="text-center text-2xl font-semibold text-gray-600  my-6">Your cart is empty</div>
                    <button onClick={() => navigate('/astro-mall')} className="bg-[#313131] text-white py-2 px-4 rounded cursor-pointer hover:bg-gray-700 transition-colors duration-300">Continue Shopping</button>
                </div>}
            </section>
        </>
    );
}

export default Cart;
