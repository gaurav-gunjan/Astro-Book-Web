import * as actionTypes from "../action-types";

const initialState = {
    kundliData: [],
    kundliBirthDetailData: null,
    kundliPanchangData: null,
    kundliChartData: null,
    kundliPlanetData: null,
    kundliKPPlanetData: null,
    kundliKPHouseCupData: null,
    kundliVimshottariDashaData: null,
    kundliHouseReportData: null,
    kundliRashiReportData: null,
    kundliAstakVargaData: null,
    kundliSarvAstakData: null,
    kundliAscendentData: null,
};

const kundliReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_KUNDLI: {
            return {
                ...state,
                kundliData: payload,
            };
        }
        case actionTypes.KUNDLI_SET_BIRTH_DETAIL: {
            return {
                ...state,
                kundliBirthDetailData: payload,
            };
        }
        case actionTypes.KUNDLI_SET_PANCHANG: {
            return {
                ...state,
                kundliPanchangData: payload,
            };
        }
        case actionTypes.KUNDLI_SET_CHART: {
            return {
                ...state,
                kundliChartData: payload,
            };
        }
        case actionTypes.KUNDLI_SET_PLANET: {
            return {
                ...state,
                kundliPlanetData: payload,
            };
        }
        case actionTypes.KUNDLI_SET_KP_PLANET: {
            return {
                ...state,
                kundliKPPlanetData: payload,
            };
        }
        case actionTypes.KUNDLI_SET_KP_HOUSE_CUP: {
            return {
                ...state,
                kundliKPHouseCupData: payload,
            };
        }
        case actionTypes.KUNDLI_SET_VIMSHOTTARI_DASHA: {
            return {
                ...state,
                kundliVimshottariDashaData: payload,
            };
        }
        case actionTypes.KUNDLI_SET_HOUSE_REPORT: {
            return {
                ...state,
                kundliHouseReportData: payload,
            };
        }
        case actionTypes.KUNDLI_SET_RASHI_REPORT: {
            return {
                ...state,
                kundliRashiReportData: payload,
            };
        }
        case actionTypes.KUNDLI_SET_ASTAK_VARGA: {
            return {
                ...state,
                kundliAstakVargaData: payload,
            };
        }
        case actionTypes.KUNDLI_SET_SARV_ASTAK: {
            return {
                ...state,
                kundliSarvAstakData: payload,
            };
        }
        case actionTypes.KUNDLI_SET_ASCENDENT: {
            return {
                ...state,
                kundliAscendentData: payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default kundliReducer;
