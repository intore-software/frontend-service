
import BASE_URL from '../../helpers/baseUrl';
import axios from 'axios';


const getToken = () => {
  let authToken = JSON.parse(sessionStorage.getItem('token'));
  return `Bearer ${authToken}`
}

export async function getCurrentUserProfile (){
   const response = await axios.get(`${BASE_URL}/auth/profile`, {headers: {'Authorization': getToken()}});
   return response?.data?.data?.profile;
}



