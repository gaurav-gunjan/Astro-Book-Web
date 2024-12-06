import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { api_urls } from '../../../utils/api-urls';
import moment from 'moment';
import { KundliFormatDateTime } from '../../../utils/common-function';
import * as KundliActions from '../../../redux/actions/kundliAction';
import KundliModal from '../../../components/modal/KundliModal';
import TopHeaderSection from '../../../components/common/TopHeaderSection';

const IntakeDetails = () => {
    const dispatch = useDispatch();
    const { kundliBirthDetailData, kundliPanchangData, kundliChartData, kundliPlanetData, kundliKPPlanetData, kundliKPHouseCupData, kundliVimshottariDashaData, kundliHouseReportData, kundliRashiReportData, kundliAstakVargaData, kundliSarvAstakData, kundliAscendentData, } = useSelector(state => state?.kundliReducer);
    const { profileId } = useParams();
    const [intakeData, setIntakeData] = useState({});
    const [kundliPayload, setKundliPayload] = useState();

    useEffect(() => {
        const fetchIntakeDetail = async () => {
            const { data } = await axios.post(api_urls + 'api/customers/get_linked_profile', { profileId });
            if (data?.success) {
                console.log("Kundli Detail Data Intake Detail Page :::: ", data?.data);
                setIntakeData(data?.data);

                setKundliPayload({
                    day: KundliFormatDateTime(intakeData?.dateOfBirth)?.day,
                    month: KundliFormatDateTime(intakeData?.dateOfBirth)?.month,
                    year: KundliFormatDateTime(intakeData?.dateOfBirth)?.year,
                    hour: KundliFormatDateTime(intakeData?.timeOfBirth)?.hour,
                    min: KundliFormatDateTime(intakeData?.timeOfBirth)?.min,
                    lat: 19.132,
                    lon: 72.342,
                    tzone: 5.5
                })
            }
        }

        fetchIntakeDetail();
    }, [profileId]);

    useEffect(() => {
        //! Dispatching API For kundliGetBirthDetail 
        kundliPayload && dispatch(KundliActions.kundliGetBirthDetail(kundliPayload));

        //! Dispatching API For kundliGetPanchang 
        kundliPayload && dispatch(KundliActions.kundliGetPanchang(kundliPayload));

        //! Dispatching API For kundliGetPlanet 
        kundliPayload && dispatch(KundliActions.kundliGetPlanet(kundliPayload));

        //! Dispatching API For kundliGetKPPlanet 
        kundliPayload && dispatch(KundliActions.kundliGetKPPlanet(kundliPayload));

        // //! Dispatching API For kundliGetKPHouseCup 
        kundliPayload && dispatch(KundliActions.kundliGetKPHouseCup(kundliPayload));

        //! Dispatching API For kundliGetHouseReport 
        kundliPayload && dispatch(KundliActions.kundliGetHouseReport(kundliPayload));

        // //! Dispatching API For kundliGetRashiReport 
        kundliPayload && dispatch(KundliActions.kundliGetRashiReport(kundliPayload));

        //! Dispatching API For kundliGetAstakVarga 
        kundliPayload && dispatch(KundliActions.kundliGetAstakVarga(kundliPayload));

        //! Dispatching API For kundliGetSarvAstak 
        kundliPayload && dispatch(KundliActions.kundliGetSarvAstak(kundliPayload));

        // //! Dispatching API For kundliGetAscendent 
        kundliPayload && dispatch(KundliActions.kundliGetAscendent(kundliPayload));

    }, [profileId, kundliPayload]);

    const [modalData, setModalData] = useState(null);
    const [visible, setVisible] = useState(false);
    const handleVisible = () => setVisible(false);

    const chartHead = ['Birth Details', 'Panchang', 'Chart', 'Planets', 'KP Planets', 'KP House Cup', 'Vimshottari Dasha', 'House Report', 'Rashi Report', 'Astak Varga', 'Sarv Astak', 'Ascedent Report'];

    const handleChartHeadClick = (index, value) => {
        setVisible(true);

        switch (index) {
            case 0:
                setModalData({ title: value, data: { kundliBirthDetailData } });
                break;
            case 1:
                setModalData({ title: value, data: { kundliPanchangData } });
                break;
            case 2:
                // setModalData({ title: value, data: { kundliChartData, handleChartRouteData } });
                setModalData({ title: value, data: { ...kundliPayload } });
                break;
            case 3:
                setModalData({ title: value, data: { ...kundliPlanetData } });
                break;
            case 4:
                setModalData({ title: value, data: { kundliKPPlanetData } });
                break;
            case 5:
                setModalData({ title: value, data: { kundliKPHouseCupData } });
                break;
            case 6:
                // setModalData({ title: value, data: { ...kundliVimshottariDashaData } });
                setModalData({ title: value, data: { ...kundliPayload } });
                break;
            case 7:
                setModalData({ title: value, data: { ...kundliHouseReportData } });
                break;
            case 8:
                setModalData({ title: value, data: { ...kundliRashiReportData } });
                break;
            case 9:
                setModalData({ title: value, data: { ...kundliAstakVargaData } });
                break;
            case 10:
                setModalData({ title: value, data: { kundliSarvAstakData } });
                break;
            case 11:
                setModalData({ title: value, data: { kundliAscendentData } });
                break;
            default:
                setModalData({ title: 'default', data: {} });
                break;
        }
    }

    return (
        <>
            <TopHeaderSection title={'Intake Details'} />

            <section className='px-28 max-sm:p-5 py-10 flex flex-wrap gap-10'>
                <div className='flex-1 min-w-[300px]'>
                    <div className='bg-primary text-center py-2 text-white font-semibold text-lg'>Intake Detail</div>
                    <div className='px-7 py-5 flex flex-col gap-4 border'>
                        <div className='flex items-start'>
                            <div className='basis-[40%]'>Name</div>
                            <div className='basis-[60%]'>{intakeData?.firstName} {intakeData?.lastName}</div>
                        </div>
                        <div className='flex items-start'>
                            <div className='basis-[40%]'>Date</div>
                            <div className='basis-[60%]'>{moment.utc(intakeData?.dateOfBirth).format('MMM Do YYYY')}</div>
                        </div>
                        <div className='flex items-start'>
                            <div className='basis-[40%]'>Time</div>
                            <div className='basis-[60%]'>{moment.utc(intakeData?.timeOfBirth).format('HH:mm A')}</div>
                        </div>
                        <div className='flex items-start'>
                            <div className='basis-[40%]'>Place</div>
                            <div className='basis-[60%]'>{intakeData?.placeOfBirth}</div>
                        </div>
                        <div className='flex items-start'>
                            <div className='basis-[40%]'>latitude</div>
                            <div className='basis-[60%]'>{intakeData?.latitude}</div>
                        </div>
                        <div className='flex items-start'>
                            <div className='basis-[40%]'>Longitude</div>
                            <div className='basis-[60%]'>{intakeData?.longitude}</div>
                        </div>
                        <div className='flex items-start'>
                            <div className='basis-[40%]'>Time Zone</div>
                            <div className='basis-[60%]'>+05.30</div>
                        </div>
                    </div>
                </div>
                <div className='flex-1  min-w-[300px]'>
                    <div className='bg-primary text-center py-2 text-white font-semibold text-lg'>View kundli</div>
                    <div className='px-7 py-5 flex flex-wrap justify-between gap-4 gap-y-8 border'>
                        {chartHead?.map((value, index) => <div onClick={() => handleChartHeadClick(index, value)} key={index} className='h-20 w-28 flex items-center justify-center border text-center border-primary p-5 rounded-md cursor-pointer'>{value}</div>)}
                    </div>
                </div>
            </section>

            {/* <BirthDetailModal visible={true} /> */}
            <KundliModal intakeData={intakeData} modalData={modalData} visible={visible} handleVisible={handleVisible} />
        </>
    )
}

export default IntakeDetails;