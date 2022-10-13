import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    let copyState = [];
    switch (action.type) {
        //GENDER
        case actionTypes.FETCH_GENDER_START:
            copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            copyState = { ...state };
            copyState.genders = action.data;
            copyState.isLoadingGender = false;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            copyState = { ...state };
            copyState.isLoadingGender = false;
            copyState.genders = [];
            return {
                ...copyState,
            }
        //POSITION
        case actionTypes.FETCH_POSITION_SUCCESS:
            copyState = { ...state };
            copyState.positions = action.data;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            copyState = { ...state };
            copyState.positions = [];
            return {
                ...copyState,
            }
        //ROLE
        case actionTypes.FETCH_ROLE_SUCCESS:
            copyState = { ...state };
            copyState.roles = action.data;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            copyState = { ...state };
            copyState.roles = [];
            return {
                ...copyState,
            }
        default:
            return state;
    }
}

export default adminReducer;