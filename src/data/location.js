import BASE_URL from "../helpers/baseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authHeader from "../services/auth-header";

export async function getProvinces() {
  let provinceOptions = [];
  let i = 0;
  await axios
    .get(`${BASE_URL}/location-address/provinces`)
    .then((response) => {
      for (const province of response.data.content) {
        const data = {
          value: province.id,
          label: province.name,
        };
        provinceOptions.push(data);
        i++;
      }
      return provinceOptions;
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message);
    });
  return provinceOptions;
}
export async function getDistricts(id) {
  let districtOptions = [];
  let i = 0;
  await axios
    .get(`${BASE_URL}/location-address/districts/province/${id}`)
    .then((response) => {
      for (const district of response.data.content) {
        const data = {
          value: district.id,
          label: district.name,
        };
        districtOptions.push(data);
        i++;
      }
      return districtOptions;
    })
    .catch((error) => {});
  return districtOptions;
}


export async function getAllSectorsByDistrict(id) {
  let sectorOptions = [];
  let i = 0;
  await axios
    .get(`${BASE_URL}/location-address/sectors/district/${id}`)
    .then((response) => {
      for (const school of response.data.content) {
        const data = {
          value: school.id,
          label: school.name,
        };
        sectorOptions.push(data);
        i++;
      }

      return sectorOptions;
    })
    .catch((error) => {});
  return sectorOptions;
}

export async function getAllCellsBySectors(id) {
  let sectorOptions = [];
  let i = 0;
  await axios
    .get(`${BASE_URL}/location-address/cells/sector/${id}`)
    .then((response) => {
      for (const school of response.data.content) {
        const data = {
          value: school.id,
          label: school.name,
        };
        sectorOptions.push(data);
        i++;
      }

      return sectorOptions;
    })
    .catch((error) => {});
  return sectorOptions;
}

export async function getAllVillagesByCell(id) {
  let sectorOptions = [];
  let i = 0;
  await axios
    .get(`${BASE_URL}/location-address/villages/cell/${id}`)
    .then((response) => {
      for (const school of response.data.content) {
        const data = {
          value: school.id,
          label: school.name,
        };
        sectorOptions.push(data);
        i++;
      }

      return sectorOptions;
    })
    .catch((error) => {});
  return sectorOptions;
}

export async function getAllDistricts() {
  let tradeOptions = [];
  let i = 0;
  await axios
    .get(`${BASE_URL}/location-address/districts`)
    .then((response) => {
      for (const trade of response.data.content) {
        const data = {
          value: trade.id,
          label: trade.name,
        };
        tradeOptions.push(data);
        i++;
      }
      return tradeOptions;
    })
    .catch((error) => {});
  return tradeOptions;
}

export async function getAllDistrictsByProvince(provinceId) {
  let districtOptions = [];
  let i = 0;
  await axios
    .get(`${BASE_URL}/location-address/districts/province/${provinceId}`)
    .then((response) => {
      for (const district of response.data.content) {
        const data = {
          value: district.id,
          label: district.name,
        };
        districtOptions.push(data);
        i++;
      }
      return districtOptions;
    })
    .catch((error) => {});
  return districtOptions;
}

export async function getAllLocationByVillageId(id) {
  let locationOptions = [];
  await axios
    .get(`${BASE_URL}/location-address/all-locations/village/${id}`)
    .then((response) => {
      locationOptions = response.data.data;
      return response.data.data;
    })
    .catch((error) => {});
  return locationOptions;
}
