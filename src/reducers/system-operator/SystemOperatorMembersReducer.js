import * as actions from '../../actions/mayor/MayorMembersAction';

export const initialState = {
    members: {},
    loading: false,
    sending: false,
    hasErrors: false,
}
export default function systemOperatorMembersReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_MEMBERS:
            return { ...state, loading: true };
        case actions.GET_MEMBERS_SUCCESS:
            return {
                members: action.payload,
                loading: false,
                hasErrors: false,
                sending: false,
            }
        case actions.GET_MEMBERS_FAILURE:
            return { ...state, loading: false, hasErrors: true, sending: false };
        default:
            return state;
    }
    
}