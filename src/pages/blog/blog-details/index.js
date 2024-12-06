import moment from "moment";
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api_urls } from '../../../utils/api-urls/index.js';
import TopHeaderSection from '../../../components/common/TopHeaderSection.jsx';

const BlogDetails = () => {
    const location = useLocation();
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 600) }, [pathname]);
    const product = location.state && location.state.astroBlogData;

    return (
        <>
            <TopHeaderSection title={'Blog'} />

            <div className='flex  min-h-[100vh] px-[80px]  max-md:px-[20px]'>
                <div className='flex-1'>
                    <section className='px-[20px] py-[50px] max-md:px-[20px] flex items-start max-md:flex-col justify-start gap-5'>
                        <img src={api_urls + 'uploads/' + product.image} className="w-[30vw] max-md:w-[90vw] rounded-lg object-contain" />

                        <div>
                            <p className="text-gray-500 text-base pb-[10px] text-justify" ><div dangerouslySetInnerHTML={{ __html: product?.description }}></div></p>
                            <p className=" pt-[10px]" > Posted On -{moment(product?.createdAt).format("DD-MM-YY")} | Posted By - {product?.created_by}</p>
                        </div>
                    </section>
                </div>
            </div >
        </>
    );

}


export default BlogDetails