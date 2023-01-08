import axios from 'axios';
import authHeader from '../../services/auth-header';
import { toast } from 'react-toastify'

// Create Redux action types
export const GET_AMASIBO = "GET_AMASIBO";
export const GET_AMASIBO_SUCCESS = "GET_AMASIBO_SUCCESS";
export const GET_AMASIBO_FAILURE = "GET_AMASIBO_FAILURE";
export const SEND_AMASIBO = "SEND_AMASIBO";
export const SEND_AMASIBO_SUCCESS = "SEND_AMASIBO_SUCCESS";
export const SEND_AMASIBO_FAILURE = "SEND_AMASIBO_FAILURE";

const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;


// Create Redux action creators that return an action
export const getMembers = () => ({
    type: GET_AMASIBO,
});

export const getMembersSuccess = (members) => ({
    type: GET_AMASIBO_SUCCESS,
    payload: members,
});

export const getMembersFailure = () => ({
    type: GET_AMASIBO_FAILURE,
});

export const sendMembers = () => ({
    type: SEND_AMASIBO,
});

export const sendMembersSuccess = () => ({
    type: SEND_AMASIBO_SUCCESS,
});

export const sendMembersFailure = () => ({
    type: SEND_AMASIBO_FAILURE,
});



export function fetchAmasibo(page = 0,villageId=0) {
    let limit = 5;
    return async (dispatch, getState) => {
        dispatch(getMembers());
        try {
            const url = `/location-address/amasibo/by-village/${villageId}?limit=${limit}&page=${page}`;

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
    await dispatch(fetchAmasibo(currentPage));
}
export function dispatchReloadMembers() {
    return async (dispatch, getState) => {
        reloadMembers(dispatch, getState);
    };
}


export async function postMember(dataToPost) {
    try {
        const url = `/members/register`;
        let response = await axios.post(`${ENDPOINT}${url}`, dataToPost, {
            headers: authHeader(),
        });
        toast.success("Member added successfully");
        return { success: true, data: response.data }
    } catch (err) {
        toast.error(err?.response?.data?.message || "Adding member failed")
        return { sucess: false, err }
    }

}