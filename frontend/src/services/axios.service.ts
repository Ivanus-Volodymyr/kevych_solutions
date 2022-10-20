import axios from "axios";

import apiURL from "../constans/urls";

export const axiosService = axios.create({ baseURL: apiURL });
