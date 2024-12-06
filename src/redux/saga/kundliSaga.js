import Swal from 'sweetalert2';
import * as actionTypes from "../action-types";
import { put, call, takeLeading, select } from 'redux-saga/effects';
import { kundliRequest, postAPI } from '../../utils/api-function';

function* getKundli(action) {
    try {
        const { payload } = action;
        console.log("Create Kundli Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const { data } = yield postAPI('api/kundli/get_customer_kundli', payload);
        console.log('Get Kundli Saga Response ::: ', data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_KUNDLI, payload: data?.kundli });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Kundli Saga Error ::: ", error);
    }
}

function* createKundli(action) {
    try {
        const { payload } = action;
        console.log("Create Kundli Payload ::: ", payload);

        const { data } = yield postAPI('api/kundli/add_kundli', payload?.data);
        console.log('Create Kundli Saga Response ::: ', data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: "Kundli Created Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
            yield put({ type: actionTypes.GET_KUNDLI, payload: { customerId: payload?.customerId } });
            payload?.navigate(`/free-kundli/${data?.kundli?._id}`);
        }

    } catch (error) {
        Swal.fire({ icon: "error", text: error?.response?.data ? error?.response?.data?.message : 'Failed To Create Kundli', showConfirmButton: true, timer: 2000, });
        console.log("Create Kundli Saga Error ::: ", error);
    }
}

function* deleteKundli(action) {
    try {
        const { payload } = action;
        console.log("Delete Kundli Payload ::: ", payload);

        const { data } = yield postAPI('api/kundli/delete_kundli', { kundliId: payload?.kundliId });
        console.log('Delete Kundli Saga Response ::: ', data);

        if (data?.success) {
            yield put({ type: actionTypes.GET_KUNDLI, payload: { customerId: payload?.customerId } });
        }

    } catch (error) {
        console.log("Delete Kundli Saga Error ::: ", error);
    }
}

function* kundliGetBirthDetail(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetBirthDetail Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://json.astrologyapi.com/v1/birth_details', payload);

        // console.log('kundliGetBirthDetail Saga Response ::: ', data);
        yield put({ type: actionTypes.KUNDLI_SET_BIRTH_DETAIL, payload: data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', showConfirmButton: false, timer: 2000 });
        // console.log("kundliGetBirthDetail Saga Error ::: ", error);
    }
}

function* kundliGetPanchang(action) {
    try {
        const { payload } = action;
        console.log("kundliGetPanchang Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://json.astrologyapi.com/v1/basic_panchang', payload);

        console.log('kundliGetPanchang Saga Response ::: ', data);
        // yield put({ type: actionTypes.KUNDLI_SET_PANCHANG, payload: data?.prediction });
        yield put({ type: actionTypes.KUNDLI_SET_PANCHANG, payload: data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', showConfirmButton: false, timer: 2000 });
        // console.log("kundliGetPanchang Saga Error ::: ", error);
    }
}

function* kundliGetChart(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetChart Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest(`https://json.astrologyapi.com/v1/horo_chart/${payload?.data}`, payload?.kundliPayload);

        // console.log('kundliGetChart Saga Response ::: ', data);
        yield put({ type: actionTypes.KUNDLI_SET_CHART, payload: data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', showConfirmButton: false, timer: 2000 });
        // console.log("kundliGetChart Saga Error ::: ", error);
    }
}

function* kundliGetPlanet(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetPlanet Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://json.astrologyapi.com/v1/planets', payload);

        // console.log('kundliGetPlanet Saga Response ::: ', data);
        yield put({ type: actionTypes.KUNDLI_SET_PLANET, payload: data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', showConfirmButton: false, timer: 2000 });
        // console.log("kundliGetPlanet Saga Error ::: ", error);
    }
}

function* kundliGetKPPlanet(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetKPPlanet Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://json.astrologyapi.com/v1/kp_horary', { ...payload, horary_number: 2 });

        // console.log('kundliGetKPPlanet Saga Response ::: ', data);
        yield put({ type: actionTypes.KUNDLI_SET_KP_PLANET, payload: data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', showConfirmButton: false, timer: 2000 });
        // console.log("kundliGetKPPlanet Saga Error ::: ", error);
    }
}

function* kundliGetKPHouseCup(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetKPHouseCup Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const data = yield kundliRequest('https://json.astrologyapi.com/v1/kp_horary', { ...payload, horary_number: 2 });

        // console.log('kundliGetKPHouseCup Saga Response ::: ', data);
        yield put({ type: actionTypes.KUNDLI_SET_KP_HOUSE_CUP, payload: data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', showConfirmButton: false, timer: 2000 });
        // console.log("kundliGetKPHouseCup Saga Error ::: ", error);
    }
}

function* kundliGetVimshottariDasha(action) {
    try {
        const { payload } = action;
        console.log("kundliGetVimshottariDasha Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });


        const data = yield kundliRequest('https://json.astrologyapi.com/v1/major_vdasha', payload);

        console.log('kundliGetVimshottariDasha Saga Response ::: ', data);
        yield put({ type: actionTypes.KUNDLI_SET_VIMSHOTTARI_DASHA, payload: data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', showConfirmButton: false, timer: 2000 });
        console.log("kundliGetVimshottariDasha Saga Error ::: ", error);
    }
}

function* kundliGetHouseReport(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetHouseReport Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const sunReports = yield kundliRequest(`https://json.astrologyapi.com/v1/general_house_report/sun`, payload);
        const moonReports = yield kundliRequest(`https://json.astrologyapi.com/v1/general_house_report/moon`, payload);
        const mercuryReports = yield kundliRequest(`https://json.astrologyapi.com/v1/general_house_report/mercury`, payload);
        const marsReports = yield kundliRequest(`https://json.astrologyapi.com/v1/general_house_report/mars`, payload);
        const venusReports = yield kundliRequest(`https://json.astrologyapi.com/v1/general_house_report/venus`, payload);
        const saturnReports = yield kundliRequest(`https://json.astrologyapi.com/v1/general_house_report/saturn`, payload);
        const jupiterReports = yield kundliRequest(`https://json.astrologyapi.com/v1/general_house_report/jupiter`, payload);

        const data = { sunReports, moonReports, mercuryReports, marsReports, saturnReports, venusReports, jupiterReports };

        // console.log('kundliGetHouseReport Saga Response ::: ', data);
        yield put({ type: actionTypes.KUNDLI_SET_HOUSE_REPORT, payload: data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', showConfirmButton: false, timer: 2000 });
        // console.log("kundliGetHouseReport Saga Error ::: ", error);
    }
}

function* kundliGetRashiReport(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetRashiReport Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const moonReports = yield kundliRequest(`https://json.astrologyapi.com/v1/general_rashi_report/moon`, payload);
        const mercuryReports = yield kundliRequest(`https://json.astrologyapi.com/v1/general_rashi_report/mercury`, payload);
        const marsReports = yield kundliRequest(`https://json.astrologyapi.com/v1/general_rashi_report/mars`, payload);
        const venusReports = yield kundliRequest(`https://json.astrologyapi.com/v1/general_rashi_report/venus`, payload);
        const saturnReports = yield kundliRequest(`https://json.astrologyapi.com/v1/general_rashi_report/saturn`, payload);
        const jupiterReports = yield kundliRequest(`https://json.astrologyapi.com/v1/general_rashi_report/jupiter`, payload);

        const data = { moonReports, mercuryReports, marsReports, saturnReports, venusReports, jupiterReports };

        // console.log('kundliGetRashiReport Saga Response ::: ', data);
        yield put({ type: actionTypes.KUNDLI_SET_RASHI_REPORT, payload: data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', showConfirmButton: false, timer: 2000 });
        // console.log("kundliGetRashiReport Saga Error ::: ", error);
    }
}

function* kundliGetAstakVarga(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetAstakVarga Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const ascendantReports = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak/ascendant', payload);
        const sunReports = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak/sun', payload);
        const moonReports = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak/moon', payload);
        const mercuryReports = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak/mercury', payload);
        const marsReports = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak/mars', payload);
        const venusReports = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak/venus', payload);
        const saturnReports = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak/saturn', payload);
        const jupiterReports = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak/jupiter', payload);

        const ascendantchart = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak_image/ascendant', payload);
        const sunchart = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak_image/sun', payload);
        const moonchart = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak_image/moon', payload);
        const mercurychart = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak_image/mercury', payload);
        const marschart = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak_image/mars', payload);
        const venuschart = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak_image/venus', payload);
        const saturnchart = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak_image/saturn', payload);
        const jupiterchart = yield kundliRequest('https://json.astrologyapi.com/v1/planet_ashtak_image/jupiter', payload);

        const data = { sunReports, ascendantReports, moonReports, mercuryReports, marsReports, saturnReports, venusReports, jupiterReports, sunchart, ascendantchart, moonchart, mercurychart, marschart, saturnchart, venuschart, jupiterchart };

        // console.log('kundliGetAstakVarga Saga Response ::: ', data);
        yield put({ type: actionTypes.KUNDLI_SET_ASTAK_VARGA, payload: data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', showConfirmButton: false, timer: 2000 });
        // console.log("kundliGetAstakVarga Saga Error ::: ", error);
    }
}

function* kundliGetSarvAstak(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetSarvAstak Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const sarvashtak = yield kundliRequest(`https://json.astrologyapi.com/v1/sarvashtak`, payload);

        const sarvashtakchart = yield kundliRequest(`https://json.astrologyapi.com/v1/sarvashtak_image`, payload);

        const data = { sarvashtak, sarvashtakchart }

        // console.log('kundliGetSarvAstak Saga Response ::: ', data);
        yield put({ type: actionTypes.KUNDLI_SET_SARV_ASTAK, payload: data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', showConfirmButton: false, timer: 2000 });
        // console.log("kundliGetSarvAstak Saga Error ::: ", error);
    }
}

function* kundliGetAscendent(action) {
    try {
        const { payload } = action;
        // console.log("kundliGetAscendent Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const data = yield kundliRequest(`https://json.astrologyapi.com/v1/general_ascendant_report`, payload);

        // console.log('kundliGetAscendent Saga Response ::: ', data?.asc_report);
        yield put({ type: actionTypes.KUNDLI_SET_ASCENDENT, payload: data?.asc_report });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', showConfirmButton: false, timer: 2000 });
        // console.log("kundliGetAscendent Saga Error ::: ", error);
    }
}

export default function* kundliSaga() {
    yield takeLeading(actionTypes?.GET_KUNDLI, getKundli);
    yield takeLeading(actionTypes?.CREATE_KUNDLI, createKundli);
    yield takeLeading(actionTypes?.DELETE_KUNDLI, deleteKundli);
    yield takeLeading(actionTypes?.KUNDLI_GET_BIRTH_DETAIL, kundliGetBirthDetail);
    yield takeLeading(actionTypes?.KUNDLI_GET_PANCHANG, kundliGetPanchang);
    yield takeLeading(actionTypes?.KUNDLI_GET_CHART, kundliGetChart);
    yield takeLeading(actionTypes?.KUNDLI_GET_PLANET, kundliGetPlanet);
    yield takeLeading(actionTypes?.KUNDLI_GET_KP_PLANET, kundliGetKPPlanet);
    yield takeLeading(actionTypes?.KUNDLI_GET_KP_HOUSE_CUP, kundliGetKPHouseCup);
    yield takeLeading(actionTypes?.KUNDLI_GET_VIMSHOTTARI_DASHA, kundliGetVimshottariDasha);
    yield takeLeading(actionTypes?.KUNDLI_GET_HOUSE_REPORT, kundliGetHouseReport);
    yield takeLeading(actionTypes?.KUNDLI_GET_RASHI_REPORT, kundliGetRashiReport);
    yield takeLeading(actionTypes?.KUNDLI_GET_ASTAK_VARGA, kundliGetAstakVarga);
    yield takeLeading(actionTypes?.KUNDLI_GET_SARV_ASTAK, kundliGetSarvAstak);
    yield takeLeading(actionTypes?.KUNDLI_GET_ASCENDENT, kundliGetAscendent);
}