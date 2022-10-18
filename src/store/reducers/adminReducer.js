import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors:[],
    allDoctors: [],
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
        //USERS
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            copyState = { ...state };
            copyState.users = action.users;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            copyState = { ...state };
            copyState.users = [];
            return {
                ...copyState,
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            copyState = { ...state };
            copyState.topDoctors = action.dataDoctors;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            copyState = { ...state };
            copyState.topDoctors = [];
            return {
                ...copyState,
            }
        case actionTypes.FETCH_All_DOCTORS_SUCCESS:
            copyState = { ...state };
            copyState.allDoctors = action.dataDr;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_All_DOCTORS_FAILED:
            copyState = { ...state };
            copyState.allDoctors = [];
            return {
                ...copyState,
            }
            
        default:
            return state;
    }
}

export default adminReducer;