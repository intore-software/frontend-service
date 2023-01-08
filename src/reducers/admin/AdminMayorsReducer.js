import * as actions from '../../actions/admin/AdminMayorsAction';

export const initialState = {
    mayors: {},
    loading: false,
    sending: false,
    hasErrors: false,
}
export default function adminMayorsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_MAYORS:
            return { ...state, loading: true };
        case actions.GET_MAYORS_SUCCESS:
            return {
                mayors: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            }
        case actions.GET_MAYORS_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        case actions.SEND_MAYORS:
            return { ...state, sending: true };
        case actions.SEND_MAYORS_SUCCESS:
            return {
                mayors: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            };
        case actions.SEND_MAYORS_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        default:
            return state;
    }
    
}