import { userConstants } from "../constants";

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { loading: true, status: false };
        case userConstants.REGISTER_SUCCESS:
            return { loading: false, status: true };
        case userConstants.REGISTER_FAILURE:
            return { loading: false, status: false, error: action.error };
        default:
            return state;
    }
}
