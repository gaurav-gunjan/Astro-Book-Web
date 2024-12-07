import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo/logo.png"
import AstroMallCard from "../../components/cards/AstroMallCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as EcommerceAction from "../../redux/actions/ecommerceActions.js"
import { api_urls } from "../../utils/api-urls/index.js";
import { DeepSearchSpace } from "../../utils/common-function/index.js";
import TopHeaderSection from "../../components/common/TopHeaderSection.jsx";
import { SearchSvg } from "../../assets/svg/index.js";

const AstroMall = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productCategoryData } = useSelector(state => state?.ecommerceReducer);
    console.log('productCategoryData', productCategoryData);

    const [searchText, setSearchText] = useState('');
    const handleSearch = (event) => setSearchText(event.target.value);
    const filteredData = DeepSearchSpace(productCategoryData, searchText);

    useEffect(function () {
        //! Dispatching API for Get Categories
        dispatch(EcommerceAction.getProductCategory());
    }, []);

    return (
        <>
            <TopHeaderSection />

            <section className='px-[80px] max-md:px-[20px] pt-10 pb-5 text-center'>
                <h1 className='text-[37px] font-semibold tracking-wider'>Astromall Shop</h1>
                <p className='text-[#ADADAD] text-[28.4px] font-semibold tracking-wide'>Shop Best Online Astrology Products And Services</p>
            </section>

            <section className='px-[80px] max-md:px-[20px] pb-5'>
                <main className='flex justify-end'>
                    <div className='border border-[#DDDDDD] rounded-md flex items-center max-sm:w-[90vw]'>
                        <input type='search' onChange={handleSearch} placeholder='Let’s find what you’re looking for..' className='outline-none px-3 py-3.5 text-[20.11px] rounded-md h-full w-[350px] max-xl:w-[330px] max-lg:w-[300px] max-md:w-[100%]' />
                        <button className='bg-[#F1B646] border-[#F1B646] rounded-e-md flex items-center justify-center p-2 px-3 w-[65px] h-full'><SearchSvg w='30' h='30' /></button>
                    </div>
                </main>
            </section>

            <section className='px-[80px] max-md:px-[20px] py-10'>
                <div className="flex flex-wrap gap-[2.5%] gap-y-[40px]">
                    {filteredData?.map((item, index) => (
                        <AstroMallCard key={index}
                            onClick={() => navigate("/astro-mall/products", { state: { productCategoryData: item }, })}
                            startPrice={null}
                            bgImage={api_urls + 'uploads/' + item?.image}
                            categoryName={item?.categoryName}
                            description={item?.description}
                        />
                    ))}
                </div>

                {filteredData?.length <= 0 && (
                    <div className="flex justify-center items-center h-32 border-2 border-dashed border-gray-300 bg-gray-100 text-primary text-lg rounded-lg shadow-lg p-4">
                        <p className="text-gray-500">No Record Found</p>
                    </div>
                )}
            </section>
        </>
    );
}

export default AstroMall;