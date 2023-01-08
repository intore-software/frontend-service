import axios from 'axios';
import authHeader from '../../services/auth-header';
import { toast } from 'react-toastify'

// Create Redux action types
export const GET_MEMBERS = "GET_MEMBERS";
export const GET_MEMBERS_SUCCESS = "GET_MEMBERS_SUCCESS";
export const GET_MEMBERS_FAILURE = "GET_MEMBERS_FAILURE";

const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;


// Create Redux action creators that return an action
export const getMembers = () => ({
    type: GET_MEMBERS,
});

export const getMembersSuccess = (members) => ({
    type: GET_MEMBERS_SUCCESS,
    payload: members,
});

export const getMembersFailure = () => ({
    type: GET_MEMBERS_FAILURE,
});



export function fetchMembers(page = 0, searchValues = { name: null }) {
    let limit = 5;
    return async (dispatch, getState) => {
        dispatch(getMembers());
        try {
            const url = `/members/system-operator-search?limit=${limit}&page=${page}`;
            const FilterUrl = `/members/system-operator-search?&name=${searchValues.name}&limit=${limit}&page=${page}`;


            let useSearch =
                searchValues.name

            let membersFromBackend = await axios.get(`${ENDPOINT}${useSearch ? FilterUrl : url}`, {
                headers: authHeader(),
            });
            membersFromBackend = membersFromBackend.data.data;
            if (useSearch) {
                membersFromBackend = { ...membersFromBackend, searchValues };
            }
            dispatch(getMembersSuccess(membersFromBackend));
        } catch (error) {
            dispatch(getMembersFailure());
        }
    };
}


async function reloadMembers(dispatch, getState) {
    let currentPage = getState().mayorMembers.number;
    await dispatch(fetchMembers(currentPage));
}
export function dispatchReloadMembers() {
    return async (dispatch, getState) => {
        reloadMembers(dispatch, getState);
    };
}
