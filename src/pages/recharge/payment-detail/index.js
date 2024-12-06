import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IndianRupee } from "../../../utils/common-function";
import * as UserActions from '../../../redux/actions/userAction';
import TopHeaderSection from "../../../components/common/TopHeaderSection";
import { toaster } from "../../../utils/services/toast-service";

const PaymentDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location?.state?.stateData;

    const dispatch = useDispatch();
    const { userCustomerDataById } = useSelector(state => state?.userReducer)

    const handlePayment = async () => {
        const payload = {
            data: {
                customerId: userCustomerDataById?._id,
                amount: stateData?.amount + stateData?.amount * .18,
                rechargePlanId: stateData?._id,
                profitPercentage: stateData?.percentage,
                gst: 18
            },
            user: userCustomerDataById,
            onComplete: () => navigate('/wallet-history')
        }

        //! Dispatching API For Recharge 
        if (stateData?.amount) {
            dispatch(UserActions.rechargeUserCustomerWallet(payload));
        } else {
            toaster({ text: 'Amount is required.' })
        }
    };

    return (
        <>
            <TopHeaderSection title={'Payment Details'} />

            <section className='px-[350px] py-[50px] max-md:px-[20px]'>
                <article>
                    <div className='text-2xl text-center flex justify-center items-center font-semibold  p-2 rounded-md border border-gray ' style={{ boxShadow: "0 0 5px #bdb5b5" }}>Payment Details</div>

                    <div className="mt-4">
                        <table className="min-w-full bg-white border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300">Recharge Amount</td>
                                    <td className="px-4 py-2 border border-gray-300 text-right">{IndianRupee(stateData?.amount)}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300">GST@18%</td>
                                    <td className="px-4 py-2 border border-gray-300 text-right">{IndianRupee(stateData?.amount * .18)}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300"><b> Total Amount </b></td>
                                    <td className="px-4 py-2 border border-gray-300 text-right"><b> {IndianRupee(stateData?.amount + stateData?.amount * .18)}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* <div className='text flex justify-between mt-4 py-2 px-7 rounded-md border border-gray bg-yellow-50' style={{ boxShadow: "0 0 5px #bdb5b5" }}>
                    <PercentSvg /><div >  APPLY COUPON </div> <RightArrowSvg />
                </div>

                <main className="flex flex-wrap gap-2 mt-4">
                    {paymentCardData.map((data, index) => (
                        <div key={index} className="flex-[45%]">
                            <PaymentCard cardName={data.cardName} img={data.img} />
                        </div>
                    ))}
                </main> */}

                    <div onClick={() => handlePayment()} className="mt-4 bg-primary text-white py-2 text-center rounded-md cursor-pointer">Proceed To Payment</div>

                </article>
            </section>
        </>
    );
}

export default PaymentDetail;