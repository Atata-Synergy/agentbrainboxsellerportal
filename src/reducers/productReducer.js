import {
    CREATE_PRODUCT,
    PRODUCT_CREATED,
    PRODUCT_CREATE_ERROR,
    TO_STEP_2,
    TO_STEP_3,
    TO_STEP_1,
    TO_STEP_0,
} from "../Actions/types";

const initialState = {
    isCreatingProduct: false,
    product: {},
    product_Error: null,
    /******* Views *******/
    basicInfoDisplay: "none",
    productMediaDisplay: "none",
    productServicesDisplay: "none",
    basicSpecificationDisplay: "block",
    stepsCurrent: 0,
    disabledPreviousButton: false,
    /******* Views *******/
}

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_PRODUCT:
            return {
                ...state,
                isCreatingProduct: true,
                product_Error: null,
            };
        case PRODUCT_CREATED:
            return {
                ...state,
                isCreatingProduct: false,
                product_Error: null,
                product: action.payload
            };
        case PRODUCT_CREATE_ERROR:
            return {
                ...state,
                isCreatingProduct: false,
                product_Error: action.payload
            };
        case TO_STEP_1:
            return {
                ...state,
                basicInfoDisplay: "none",
                productMediaDisplay: "none",
                productServicesDisplay: "none",
                basicSpecificationDisplay: "block",
                stepsCurrent: 1,
                disabledPreviousButton: false,
            };
        case TO_STEP_2:
            return {
                ...state,
                basicSpecificationDisplay: "none",
                productServicesDisplay: "none",
                stepsCurrent: 2,
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