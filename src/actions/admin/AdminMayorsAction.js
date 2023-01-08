import axios from 'axios';
import authHeader from '../../services/auth-header';
import { toast } from 'react-toastify'

// Create Redux action types
export const GET_MAYORS = "GET_MAYORS";
export const GET_MAYORS_SUCCESS = "GET_MAYORS_SUCCESS";
export const GET_MAYORS_FAILURE = "GET_MAYORS_FAILURE";
export const SEND_MAYORS = "SEND_MAYORS";
export const SEND_MAYORS_SUCCESS = "SEND_MAYORS_SUCCESS";
export const SEND_MAYORS_FAILURE = "SEND_MAYORS_FAILURE";

const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;


// Create Redux action creators that return an action
export const getMayors = () => ({
    type: GET_MAYORS,
});

export const getMayorsSuccess = (mayors) => ({
    type: GET_MAYORS_SUCCESS,
    payload: mayors,
});

export const getMayorsFailure = () => ({
    type: GET_MAYORS_FAILURE,
});

export const sendMayors = () => ({
    type: SEND_MAYORS,
});

export const sendMayorsSuccess = () => ({
    type: SEND_MAYORS_SUCCESS,
});

export const sendMayorsFailure = () => ({
    type: SEND_MAYORS_FAILURE,
});


export function fetchMayors(page = 0, searchValues = { name: null },status="Active") {
    let limit = 5;
    return async (dispatch, getState) => {
        dispatch(getMayors());
        try {
            const url = `/users/search?limit=${limit}&page=${page}&status=${status.toUpperCase()}&role=MAYOR`;
            const FilterUrl = `/users/search?&name=${searchValues.name}&status=${status.toUpperCase()}&limit=${limit}&page=${page}&role=MAYOR`;


            let useSearch =
                searchValues.name

            let mayorsFromBackend = await axios.get(`${ENDPOINT}${useSearch ? FilterUrl : url}`, {
                headers: authHeader(),
            });
            mayorsFromBackend = mayorsFromBackend.data.data;
            if (useSearch) {
                mayorsFromBackend = { ...mayorsFromBackend, searchValues };
            }
            dispatch(getMayorsSuccess(mayorsFromBackend));
        } catch (error) {
            dispatch(getMayorsFailure());
        }
    };
}


async function reloadMayors(dispatch, getState) {
    let currentPage = getState().adminMayors.number;
    await dispatch(fetchMayors(currentPage));
}
export function dispatchReloadMayors() {
    return async (dispatch, getState) => {
        reloadMayors(dispatch, getState);
    };
}

export async function postMayor(dataToPost) {
    try {
        const url = `/users/mayors/register`;
        let response = await axios.post(`${ENDPOINT}${url}`, dataToPost, {
            headers: authHeader(),
        });
        toast.success("Mayor added successfully");
        return { success: true, data: response.data }
    } catch (err) {
        toast.error(err?.response?.data?.message || "Adding mayor failed")
        return { sucess: false, err }
    }

}

