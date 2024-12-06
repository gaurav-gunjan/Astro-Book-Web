import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { api_urls } from '../../../../utils/api-urls';
import { IndianRupee } from '../../../../utils/common-function';
import * as EcommerceActions from '../../../../redux/actions/ecommerceActions';
import TopHeaderSection from '../../../../components/common/TopHeaderSection';

const ProductDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    useEffect(() => { window.scrollTo(0, 0) }, [pathname]);
    const product = location.state && location.state.productDetails;
    console.log(product)
    const dispatch = useDispatch();
    const { userCustomerDataById } = useSelector(state => state?.userReducer);

    const handleAddToCart = () => {
        if (!userCustomerDataById) {
            Swal.fire({ icon: "warning", title: "Warning", text: "Please Login First", showConfirmButton: true, timer: 20000 });
        } else {
            const payload = {
                data: { productId: product?._id, customerId: userCustomerDataById?._id },
                onComplete: () => navigate('/cart')
            }

            //! Dispatching API For Add To Cart
            dispatch(EcommerceActions.addToCart(payload));
        }
    }

    return (
        <>
            <TopHeaderSection title={'Astromall Shop'} />

            <section className='px-5 py-7 sm:px-10 md:px-20 lg:px-[100px]'>
                <main className='flex flex-wrap gap-7'>
                    <img src={api_urls + 'uploads/' + product?.image} alt="product" className='basis-[30%] md:max-w-[400px] rounded-md w-full h-auto sm:h-96 border-2 border-gray-500' />
                    <div className='flex-1 flex flex-col items-start'>
                        <h4 className='text-lg sm:text-xl font-bold capitalize'> {product?.productName} </h4>
                        <div className='text-gray-600 font-bold py-2 flex gap-2 items-center'>Starting From : <span className='line-through text-lg  text-red-500'>{IndianRupee(product?.mrp)} </span> <span className='flex gap-2 items-center text-primary'>{IndianRupee(product?.price)}</span></div>
                        <button onClick={handleAddToCart} className='bg-primary hover:bg-orange-400 text-white text-sm py-2 px-4 rounded transition-all duration-300 ease-in my-4'>Add To Cart</button>

                        <div className='bg-gray-200 p-4 mt-4 rounded-lg flex flex-col gap-2 flex-1 w-full'>
                            <h4 className='font-[500] text-lg text-gray-800'>What is {product?.productName}?</h4>
                            <div className='text-[15px] text-justify'>{product?.description}</div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}

export default ProductDetails;
