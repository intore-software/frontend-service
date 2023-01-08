import axios from 'axios';
import authHeader from '../../services/auth-header';
import { toast } from 'react-toastify'

// Create Redux action types
export const GET_SYSTEM_OPERATORS = "GET_SYSTEM_OPERATORS";
export const GET_SYSTEM_OPERATORS_SUCCESS = "GET_SYSTEM_OPERATORS_SUCCESS";
export const GET_SYSTEM_OPERATORS_FAILURE = "GET_SYSTEM_OPERATORS_FAILURE";
export const SEND_SYSTEM_OPERATORS = "SEND_SYSTEM_OPERATORS";
export const SEND_SYSTEM_OPERATORS_SUCCESS = "SEND_SYSTEM_OPERATORS_SUCCESS";
export const SEND_SYSTEM_OPERATORS_FAILURE = "SEND_SYSTEM_OPERATORS_FAILURE";

const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;


// Create Redux action creators that return an action
export const getSystemOperators = () => ({
    type: GET_SYSTEM_OPERATORS,
});

export const getSystemOperatorsSuccess = (systemOperators) => ({
    type: GET_SYSTEM_OPERATORS_SUCCESS,
    payload: systemOperators,
});

export const getSystemOperatorsFailure = () => ({
    type: GET_SYSTEM_OPERATORS_FAILURE,
});

export const sendSystemOperators = () => ({
    type: SEND_SYSTEM_OPERATORS,
});

export const sendSystemOperatorsSuccess = () => ({
    type: SEND_SYSTEM_OPERATORS_SUCCESS,
});

export const sendSystemOperatorsFailure = () => ({
    type: SEND_SYSTEM_OPERATORS_FAILURE,
});


export function fetchSystemOperators(page = 0, searchValues = { name: null },status="Active") {
    let limit = 5;
    return async (dispatch, getState) => {
        dispatch(getSystemOperators());
        try {
            const url = `/users/search?limit=${limit}&page=${page}&status=${status.toUpperCase()}&role=SYSTEM_OPERATOR`;
            const FilterUrl = `/users/search?&name=${searchValues.name}&status=${status.toUpperCase()}&limit=${limit}&page=${page}&role=SYSTEM_OPERATOR`;


            let useSearch =
                searchValues.name

            let systemOperatorsFromBackend = await axios.get(`${ENDPOINT}${useSearch ? FilterUrl : url}`, {
                headers: authHeader(),
            });
            systemOperatorsFromBackend = systemOperatorsFromBackend.data.data;
            if (useSearch) {
                systemOperatorsFromBackend = { ...systemOperatorsFromBackend, searchValues };
            }
            dispatch(getSystemOperatorsSuccess(systemOperatorsFromBackend));
        } catch (error) {
            dispatch(getSystemOperatorsFailure());
        }
    };
}


async function reloadSystemOperators(dispatch, getState) {
    let currentPage = getState().adminSystemOperators.number;
    await dispatch(fetchSystemOperators(currentPage));
}
export function dispatchReloadSystemOperators() {
    return async (dispatch, getState) => {
        reloadSystemOperators(dispatch, getState);
    };
}

export async function postSystemOperator(dataToPost) {
    try {
        const url = `/users/system-operator/register`;
        let response = await axios.post(`${ENDPOINT}${url}`, dataToPost, {
            headers: authHeader(),
        });
        toast.success("System Operator added successfully");
        return { success: true, data: response.data }
    } catch (err) {
        toast.error(err?.response?.data?.message || "Adding system operator failed")
        return { sucess: false, err }
    }

}

