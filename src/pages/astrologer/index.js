import axios from 'axios';
import Swal from 'sweetalert2';
import ReactStars from 'react-stars';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Color } from '../../assets/colors';
import { CrossSvg, SearchSvg } from '../../assets/svg';
import { api_urls } from '../../utils/api-urls';
import useModal from '../../components/hooks/useModal';
import { IndianRupee } from '../../utils/common-function';
import { toaster } from '../../utils/services/toast-service';
import PageHeading from '../../components/common/PageHeading';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as CommonActions from '../../redux/actions/commonAction';
import RadioButton from '../../components/button/RadioButton';
import CheckBoxActive from '../../components/button/CheckBoxActive';
import CheckBoxInactive from '../../components/button/CheckBoxInactive';
// import * as AstrologerActions from '../../redux/actions/astrologerAction';

export const sortByData = [{ id: 1, name: 'Popularity' }, { id: 2, name: 'Experience', type: 'High to Low' }, { id: 3, name: 'Experience', type: 'Low to High' }, { id: 4, name: 'Total orders', type: 'High to Low' }, { id: 5, name: 'Total orders', type: 'Low to High' }, { id: 6, name: 'Price', type: 'High to Low' }, { id: 7, name: 'Price', type: 'Low to High' }, { id: 8, name: 'Rating', type: 'High to Low' },];
export const skillData = [{ name: 'Face Reading' }, { name: 'Life Coach' }, { name: 'Nadi' }, { name: 'Palmistry' }, { name: 'Vedic' }, { name: 'Vastu' }]
export const languageData = [{ name: 'Hindi' }, { name: 'English' }, { name: 'Sanskrit' }]
export const genderData = [{ name: 'Male' }, { name: 'Female' }, { name: 'Other' }]
export const countryData = [{ name: 'India' }, { name: 'Outside India' }]
export const offerData = [{ name: 'Active' }, { name: 'Inactive' }]

const ChatWithAstrologer = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDataById } = useSelector(state => state?.userReducer);
    // const { astrologerData } = useSelector(state => state?.astrologerReducer);
    const [openSortByModal, closeSortByModal, SortByModal] = useModal();
    const [openFilterModal, closeFilterModal, FilterModal] = useModal();

    //! Handle Sort By 
    const [sortBy, setsortBy] = useState("");
    const handleChangeSortBy = (data) => {
        setsortBy(data?.name + data?.type);
        console.log(data);
    };


    //! Handle Filter 
    const [activeTab, setActiveTab] = useState(0);
    const filterHead = [{ id: 0, name: 'Skill' }, { id: 1, name: 'Language' }, { id: 2, name: 'Gender' }, { id: 3, name: 'Country' }, { id: 4, name: 'Offer' },]

    const [selectedLanguage, setSelectedLanguage] = useState([])
    const handleSelectedLanguage = (language) => {
        setSelectedLanguage((prevSelected) =>
            prevSelected.includes(language)
                ? prevSelected.filter((item) => item !== language)
                : [...prevSelected, language]
        );
    };

    const handleSubmitFilter = () => {
        console.log('Selected Language ::: ', selectedLanguage)
    };

    //! Astrologer Data 
    const [astrologerData, setAstrologerData] = useState([]);
    // console.log("Astrologer Data ::: ", astrologerData);
    // console.log("Astrologer Data Length ::: ", astrologerData?.length);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [totalPage, setTotalPage] = useState(1);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(api_urls + 'api/astrologer/get_chat_astrologer', { page, search });
            const newData = data?.astrologer;

            // setAstrologerData((prevData) => [...prevData, ...newData]); //! Append new data to the existing data
            setAstrologerData((prevData) => {
                const mergedData = [...prevData, ...newData];
                const uniqueData = mergedData.filter(
                    (astrologer, index, self) =>
                        self.findIndex((item) => item._id === astrologer._id) === index
                );
                return uniqueData;
            });
            setTotalPage(data?.pagination?.pages);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, search]);

    const fetchDataSearch = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(api_urls + 'api/astrologer/get_chat_astrologer', { search });
            const newData = data?.astrologer;

            setAstrologerData((prevData) => {
                const mergedData = [...newData];
                const uniqueData = mergedData.filter(
                    (astrologer, index, self) =>
                        self.findIndex((item) => item._id === astrologer._id) === index
                );
                return uniqueData;
            });
            setPage(1);
            setTotalPage(data?.pagination?.pages);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataSearch();
    }, [search]);

    useEffect(() => {
        const handleScroll = () => {
            if (loading) return;

            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const clientHeight = window.innerHeight;
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            const isNearBottom = scrollTop + clientHeight >= scrollHeight - clientHeight;

            if (isNearBottom && page <= totalPage) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    return (
        <>
            <TopHeaderSection />

            <section className='px-[80px] py-7 max-sm:px-[20px]'>
                <article className='flex flex-col gap-7'>
                    <main className='flex gap-4 flex-wrap items-center justify-between'>
                        <PageHeading title={'Talk with Astrologer'} />

                        <div>{userCustomerDataById && <div>Available balance: {IndianRupee(userCustomerDataById?.wallet_balance)}</div>}</div>

                        <div className='flex gap-4 flex-wrap'>
                            <div onClick={() => navigate('/recharge')} className='border border-green-500 text-green-500 px-5 rounded-md flex items-center justify-center max-md:py-1 cursor-pointer'>Recharge</div>
                            <div onClick={openFilterModal} className='border border-green-500 text-green-500 px-5 rounded-md flex items-center justify-center max-md:py-1  cursor-pointer'>Filter</div>
                            <div onClick={openSortByModal} className='border border-green-500 text-green-500 px-5 rounded-md flex items-center justify-center max-md:py-1 cursor-pointer'>Sort by</div>

                            <div className='border border-[#DDDDDD] rounded-md flex items-center max-sm:w-[90vw]'>
                                <input value={search} onChange={(e) => setSearch(e?.target?.value)} type='search' placeholder='Search here..' className='outline-none px-3 py-2.5 text-[16px] max-md:text-[16px] rounded-md h-full w-[200px] max-lg:w-[200px] max-md:w-[100%]' />
                                <button className='bg-[#F1B646] border-[#F1B646] rounded-e-md flex items-center justify-center p-2 px-3 w-[50px] h-full'><SearchSvg w='20' h='20' /></button>
                            </div>
                        </div>
                    </main>

                    <main className='flex flex-wrap gap-[2.5%] gap-y-[40px]'>
                        {astrologerData?.map((value, index) => (
                            <div key={index} className='basis-[31.5%] max-xl:basis-[47.5%] max-xl:flex-grow max-md:basis-full flex items-center gap-[20px] rounded-xl px-2 pt-1 pb-3 capitalize' style={{ boxShadow: "0 0 10px #bdb5b5" }}>
                                <div onClick={() => navigate(`/astrologer/${value?.astrologerName?.split(' ')[0]?.toLowerCase()}`, { state: { stateData: value } })} className='h-32 max-lg:h-32 w-32 max-lg:w-32 cursor-pointer'><img className='h-full w-full rounded-full border border-[#F1B646]' src={api_urls + value?.profileImage} /></div>
                                <div className='flex-1'>
                                    <div className='flex flex-col items-end text-center'>
                                        <div className='text-center'><ReactStars count={5} edit={false} value={Number(value?.rating)} size={16} color2={'#ffd700'} /></div>
                                        <div className='line-clamp-1 text-[13.24px] text-black'>216 followers</div>
                                        <div className='line-clamp-1 text-[9px] text-[#828282] pr-3'>2121 orders</div>
                                    </div>
                                    <div>
                                        <div className='line-clamp-1 text-[18px]'>{value?.astrologerName}</div>
                                        {/* <div className='line-clamp-1 text-[12px]'>{value?.email}</div> */}
                                        <div className='line-clamp-1 text-[13.24px] text-[#828282]'>Exp :  {value?.experience} Years</div>
                                        <div className='line-clamp-1 text-[13.24px] text-[#828282]'>{value?.language.length > 0 ? value?.language.join(', ') : "Hindi"}</div>
                                        <div className='line-clamp-1 text-[13.24px] text-[#828282]'>{value?.skill?.length > 0 && value?.skill?.map(item => item?.skill)?.join(' , ')}</div>
                                    </div>

                                    <hr className='my-3' />

                                    <div className='flex items-center gap-2'>
                                        <div onClick={async () => {
                                            if (Number(userCustomerDataById?.wallet_balance) < Number(value?.chat_price) * 5) {
                                                const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", confirmButtonColor: Color.secondary, cancelButtonText: "Cancel", showCancelButton: true, cancelButtonColor: 'grey' });
                                                if (result.isConfirmed) navigate('/recharge');
                                            } else {
                                                if (!("Notification" in window)) {
                                                    alert("This browser does not support desktop notifications.");
                                                } else if (Notification.permission === "granted") {
                                                    if (userCustomerDataById) {
                                                        navigate(`/astrologer/intake-form/${value?._id}?type=chat`);
                                                    } else {
                                                        toaster.info({ text: 'Please login as a customer' })
                                                    }
                                                } else if (Notification.permission === "denied") {
                                                    alert("You have blocked notifications. Please enable them in your browser settings.");

                                                } else if (Notification.permission === "default") {
                                                    console.log('Requesting Notification Permission');
                                                    await Notification.requestPermission();
                                                }
                                            }
                                        }} className='flex flex-col justify-center items-center px-3 flex-1 border border-[#27AE60] rounded-[7.49px] cursor-pointer'>
                                            <div className='text-[#27AE60] text-[13px]'>Chat</div>
                                            <div className='text-[10px]'>{value?.chat_price}/min</div>
                                        </div>

                                        <div onClick={async () => {
                                            if (Number(userCustomerDataById?.wallet_balance) < Number(value?.call_price) * 5) {
                                                const result = await Swal.fire({ icon: "warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000, confirmButtonText: "Recharge", confirmButtonColor: Color.secondary, cancelButtonText: "Cancel", showCancelButton: true, cancelButtonColor: 'grey' });
                                                if (result.isConfirmed) navigate('/recharge');
                                            } else {
                                                if (!("Notification" in window)) {
                                                    alert("This browser does not support desktop notifications.");
                                                } else if (Notification.permission === "granted") {
                                                    if (userCustomerDataById) {
                                                        navigate(`/astrologer/intake-form/${value?._id}?type=call`);
                                                    } else {
                                                        toaster.info({ text: 'Please login as a customer' })
                                                    }
                                                } else if (Notification.permission === "denied") {
                                                    alert("You have blocked notifications. Please enable them in your browser settings.");

                                                } else if (Notification.permission === "default") {
                                                    console.log('Requesting Notification Permission');
                                                    await Notification.requestPermission();
                                                }
                                            }
                                        }} className='flex flex-col justify-center items-center px-3 flex-1 border border-[#27AE60] rounded-[7.49px] cursor-pointer'>
                                            <div className='text-[#27AE60] text-[13px]'>Call</div>
                                            <div className='text-[10px]'>{value?.call_price}/min</div>
                                        </div>

                                        <div onClick={() => dispatch(CommonActions?.openDownloadOurAppModal())} className='flex flex-col justify-center items-center px-3 flex-1 border border-[#27AE60] rounded-[7.49px] cursor-pointer'>
                                            <div className='text-[#27AE60] text-[13px]'>Video</div>
                                            <div className='text-[10px]'>{value?.normal_video_call_price}/min</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </main>

                    {astrologerData?.astrologer?.length <= 0 && (
                        <div className="flex justify-center items-center h-32 border-2 border-dashed border-gray-300 bg-gray-100 text-primary text-lg rounded-lg shadow-lg p-4">
                            <p className="text-gray-500">No Record Found</p>
                        </div>
                    )}

                    {loading && (
                        <div className="flex justify-center items-center my-4">
                            <Skeleton count={3} height={180} width="90%" />
                        </div>
                    )}
                </article>
            </section>


            <SortByModal width={`w-[300px]`}>
                <div className='flex justify-between items-center py-3 px-5 border-b-[2px]'>
                    <div className='text-lg font-semibold'>SORT BY</div>
                    <div onClick={closeSortByModal} className='cursor-pointer' ><CrossSvg strokeWidth='3' /></div>
                </div>

                <main className='px-5 py-5 pb-7 flex flex-col gap-4'>
                    {sortByData.map((value, index) => (
                        <RadioButton key={index}
                            label={value?.type ? value?.name + ' : ' + value?.type : value?.name}
                            name="custom-radio"
                            value={value?.name + value?.type}
                            checked={sortBy === value?.name + value?.type}
                            onChange={() => handleChangeSortBy(value)}
                        />
                    ))}
                </main>
            </SortByModal>

            <FilterModal width={`w-[500px]`}>
                <div className='flex justify-between items-center py-3 px-5 border-b-[2px]'>
                    <div className='text-lg font-semibold'>FILTERS</div>
                    <div onClick={closeFilterModal} className='cursor-pointer' ><CrossSvg strokeWidth='3' /></div>
                </div>

                <main className='flex h-96 border-b-[2px]'>
                    <div className='basis-[30%] border-r-[2px]'>
                        <div className=' bg-greybg'>
                            {filterHead.map((value, index) => (
                                <div key={index} onClick={() => setActiveTab(value?.id)} className={`border-l-[5px] ${activeTab == value?.id ? `border-[#008080] bg-white` : `border-greybg`} px-3 py-2 cursor-pointer`}>{value?.name}</div>
                            ))}
                        </div>
                    </div>
                    <div className='basis-[70%] overflow-auto filter-overflow p-4'>
                        <SwtichTab activeTab={activeTab} handleSelectedLanguage={handleSelectedLanguage} selectedLanguage={selectedLanguage} />
                    </div>
                </main>

                <div className='flex gap-4 py-3 px-4 items-center'>
                    <div className='px-4 text-cyan-900 cursor-pointer'>Reset</div>
                    <div className='flex-1 flex justify-center'>
                        <div onClick={() => handleSubmitFilter()} className='px-20 py-2 bg-yellow-400 rounded-lg cursor-pointer' style={{ boxShadow: "0 0 5px #bdb5b5" }}>Apply</div>
                    </div>
                </div>
            </FilterModal>
        </>
    )
}

export default ChatWithAstrologer;


const SwtichTab = ({ activeTab, handleSelectedLanguage, selectedLanguage }) => {
    switch (activeTab) {
        case 0:
            return <>
                <main className='flex flex-col gap-4'>
                    {skillData.map((value, index) => (
                        <div onClick={() => handleSelectedLanguage(value?.name)} key={index} className='flex gap-2 items-center cursor-pointer'>
                            {selectedLanguage.includes(value.name) ? <CheckBoxActive /> : <CheckBoxInactive />}
                            <div>{value?.name}</div>
                        </div>
                    ))}
                </main>
            </>
        case 1:
            return <>
                <main className='flex flex-col gap-4'>
                    {languageData.map((value, index) => (
                        <div onClick={() => handleSelectedLanguage(value?.name)} key={index} className='flex gap-2 items-center cursor-pointer'>
                            {selectedLanguage.includes(value.name) ? <CheckBoxActive /> : <CheckBoxInactive />}
                            <div>{value?.name}</div>
                        </div>
                    ))}
                </main>
            </>
        case 2:
            return <>
                <main className='flex flex-col gap-4'>
                    {genderData.map((value, index) => (
                        <div onClick={() => handleSelectedLanguage(value?.name)} key={index} className='flex gap-2 items-center cursor-pointer'>
                            {selectedLanguage.includes(value.name) ? <CheckBoxActive /> : <CheckBoxInactive />}
                            <div>{value?.name}</div>
                        </div>
                    ))}
                </main>
            </>
        case 3:
            return <>
                <main className='flex flex-col gap-4'>
                    {countryData.map((value, index) => (
                        <div onClick={() => handleSelectedLanguage(value?.name)} key={index} className='flex gap-2 items-center cursor-pointer'>
                            {selectedLanguage.includes(value.name) ? <CheckBoxActive /> : <CheckBoxInactive />}
                            <div>{value?.name}</div>
                        </div>
                    ))}
                </main>
            </>
        case 4:
            return <>
                <main className='flex flex-col gap-4'>
                    {offerData.map((value, index) => (
                        <div onClick={() => handleSelectedLanguage(value?.name)} key={index} className='flex gap-2 items-center cursor-pointer'>
                            {selectedLanguage.includes(value.name) ? <CheckBoxActive /> : <CheckBoxInactive />}
                            <div>{value?.name}</div>
                        </div>
                    ))}
                </main>
            </>
    }
}