import React, { useEffect, useState } from "react";
import { IndianRupee } from "../../utils/common-function";
import axios from "axios";
import { api_urls } from "../../utils/api-urls";
import { useNavigate } from "react-router-dom";
import TopHeaderSection from "../../components/common/TopHeaderSection";
import { useSelector } from "react-redux";

const Recharge = () => {
    const navigate = useNavigate();
    const { userCustomerDataById } = useSelector(state => state?.userReducer);
    const [planData, setPlanData] = useState([]);

    useEffect(() => {
        const getReachargePlan = async () => {
            const { data } = await axios.get(api_urls + 'api/customers/get_customer_all_recharge_plan')
            if (data?.success) {
                console.log(data?.allRechargePlan)
                setPlanData(data?.allRechargePlan);
            }
        }

        getReachargePlan();
    }, [])


    return (
        <>
            <TopHeaderSection title={'Recharge'} />

            <section className='px-[100px] py-[50px] max-md:px-[20px]'>
                <article>
                    <div className='text-2xl text-center font-[600]'>Add Money to Wallet</div>
                    <div className='text-l text-center font-[400] mt-2 text-grey'>Available balance:</div>
                    <div className="flex justify-center items-center text-xl text-center font-[400] mt-2 text-black">{IndianRupee(userCustomerDataById?.wallet_balance)}</div>
                    <div className='text-xl  font-[400] mt-2 text-grey max-sm:text-center mb-8'>Popular Recharge</div>

                    <main className="flex flex-wrap lg:gap-x-[2.5%] md:gap-x-[10%] gap-x-[10%] gap-y-[40px]">
                        {planData && planData.sort((a, b) => a.amount - b.amount)?.map((value, index) => (
                            <div key={index} onClick={() => navigate(`/recharge/payment-details`, { state: { stateData: value } })} className="basis-[45%] md:basis-[26.66%] lg:basis-[18%] rounded-xl cursor-pointer">
                                {/* flex-15% max-md:bases-50% max-sm:flex-50% */}
                                <div className="bg-white border border-gray shadow-lg rounded-xl shadow-gray-300 items-center hover:border-yellow-300 hover:shadow-yellow-50">
                                    <div>
                                        <div className="text-center mx-8 h-5  max-md:mx-3 max-xl:mx-3">
                                            {value?.mostPopular && <div className="bg-[#F2994A] text-white rounded-b-md   ">
                                                {value?.mostPopular}
                                            </div>}
                                        </div>

                                        <div className="text-center  text-xl px-10 py-5 ">{value?.amount}</div>

                                        <div className="text-center">
                                            <div className="bg-[#E8F4ED] text-[#219675] rounded-b-xl flex items-center justify-center px-10 py-1" >
                                                {value?.percentage} %
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </main>
                </article>
            </section>
        </>
    );
}

export default Recharge;