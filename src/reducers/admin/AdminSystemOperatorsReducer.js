import * as actions from '../../actions/admin/AdminSystemOperatorsAction';

export const initialState = {
    systemOperators: {},
    loading: false,
    sending: false,
    hasErrors: false,
}
export default function adminSystemOperatorsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_SYSTEM_OPERATORS:
            return { ...state, loading: true };
        case actions.GET_SYSTEM_OPERATORS_SUCCESS:
            return {
                systemOperators: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            }
        case actions.GET_SYSTEM_OPERATORS_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        case actions.SEND_SYSTEM_OPERATORS:
            return { ...state, sending: true };
        case actions.SEND_SYSTEM_OPERATORS_SUCCESS:
            return {
                systemOperators: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            };
        case actions.SEND_SYSTEM_OPERATORS_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        default:
            return state;
    }
    
}