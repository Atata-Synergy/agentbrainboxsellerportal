import {
    CREATE_PRODUCT,
    PRODUCT_CREATED,
    PRODUCT_CREATE_ERROR,
    GET_PRODUCT,
    PRODUCTS,
    GET_PRODUCT_ERROR,
    TO_STEP_2,
    TO_STEP_3,
    TO_STEP_1,
    TO_STEP_0,
    GET_AD_COST,
    AD_COST,
    SET_AD_DATE,
    AD_COST_ERR,
    CREATE_AD,
    AD_CREATED,
    AD_CREATE_ERROR,
    CLEAR_STATUS_MESSAGE,
    PRODUCT,
    DELETE_PRODUCT,
    PRODUCT_DELETED,
    PRODUCT_DELETE_ERROR,
    GET_ADVERTS,
    ADVERTS,
    ADVERTS_ERROR,
} from "../Actions/types";

const initialState = {
    isCreatingProduct: false,
    product: {},
    product_Error: null,
    /*******   *******/
    products: [],
    gettingProducts: false,
    productGetError: null,
    /*******   *******/
    isFetchingAds: false,
    adverts: [],
    advertErrors: null,

    /*******   *******/
    gettingAdCost: false,
    ad_cost: 0,
    ad_cost_error: false,
    date: null,
    /*******   *******/
    productUpdateStatus: null,
    /******* Views *******/
    basicInfoDisplay: "block",
    productMediaDisplay: "none",
    productServicesDisplay: "none",
    basicSpecificationDisplay: "none",
    stepsCurrent: 0,
    disabledPreviousButton: false,
    /******* Views *******/
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ADVERTS:
            return {
                ...state,
                isFetchingAds: true,
                advertErrors: null,

            };
        case ADVERTS:
            return {
                ...state,
                isFetchingAds: false,
                adverts: action.payload
            };
        case ADVERTS_ERROR:
            return {
                ...state,
                isFetchingAds: false,
                adverts: action.payload,
            };
        case CLEAR_STATUS_MESSAGE:
            return {
                ...state,
                productUpdateStatus: null
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                productUpdateStatus: null,
                deletingProduct: true
            };
        case PRODUCT_DELETED:
            return {
                ...state,
                deletingProduct: false,
                productUpdateStatus: {
                    message: "Product has been deleted",
                    success: true
                },
            };
        case PRODUCT_DELETE_ERROR:
            return {
                ...state,
                deletingProduct: false,
                productUpdateStatus: {
                    message: JSON.stringify(action.payload),
                    success: false
                },
            };
        case AD_CREATED:
            return {
                ...state,
                productUpdateStatus: {
                    message: "Advert has been created",
                    success: true
                },
            };
        case AD_CREATE_ERROR:
            return {
                ...state,
                productUpdateStatus: {
                    message: JSON.stringify(action.payload),
                    success: false
                },
            };
        case SET_AD_DATE:
            return {
                ...state,
                date: action.payload
            };

        case GET_AD_COST:
            return {
                ...state,
                gettingAdCost: true,
                ad_cost_error: false,
            };
        case AD_COST:
            return {
                ...state,
                gettingAdCost: false,
                ad_cost: action.payload,
                ad_cost_error: false,
            };
        case AD_COST_ERR:
            return {
                ...state,
                gettingAdCost: false,
                ad_cost_error: action.payload,
            };
        case GET_PRODUCT:
            return {
                ...state,
                gettingProducts: true,
                productGetError: null,
            };

        case PRODUCT:
            return {
                ...state,
                gettingProducts: false,
                productGetError: null,
                product: action.payload
            };

        case PRODUCTS:
            return {
                ...state,
                gettingProducts: false,
                productGetError: null,
                products: action.payload
            };
        case GET_PRODUCT_ERROR:
            return {
                ...state,
                gettingProducts: false,
                productGetError: action.payload
            };
        case CREATE_PRODUCT:
            return {
                ...state,
                isCreatingProduct: true,
                product_Error: null,
                productUpdateStatus: null,
            };
        case PRODUCT_CREATED:
            return {
                ...state,
                isCreatingProduct: false,
                product_Error: null,
                productUpdateStatus: {
                    message: "Product Uploaded successfully",
                    success: true
                },
                product: action.payload,
            };
        case PRODUCT_CREATE_ERROR:
            return {
                ...state,
                isCreatingProduct: false,
                productUpdateStatus: {
                    message: JSON.stringify(action.payload),
                    success: false
                },
                product_Error: action.payload
            };

        case TO_STEP_1:
            return {
                ...state,
                basicInfoDisplay: "none",
                productMediaDisplay: "none",
                basicSpecificationDisplay: "block",
                productServicesDisplay: "none",
                stepsCurrent: 1,
                disabledPreviousButton: false,
            };
        case TO_STEP_2:
            return {
                ...state,
                basicSpecificationDisplay: "none",
                stepsCurrent: 2,
                productServicesDisplay: "none",
                basicInfoDisplay: "none",
                productMediaDisplay: "block",
                disabledPreviousButton: false,
            };
        case TO_STEP_3:
            return {
                ...state,
                basicInfoDisplay: "none",
                basicSpecificationDisplay: "none",
                productServicesDisplay: "block",
                stepsCurrent: 3,
                disabledPreviousButton: false,
                productMediaDisplay: "none",
                nextBtnText: "Finish",
            };
        case TO_STEP_0:
            return {
                ...state,
                basicSpecificationDisplay: "none",
                productMediaDisplay: "none",
                productServicesDisplay: "none",
                stepsCurrent: 0,
                basicInfoDisplay: "block",
                disabledPreviousButton: false,
            };

        default:
            return state;
    }
}