import axios from "axios";
import { getToken } from "../utils/token";

const serverUrl = 'http://localhost:5000';

const api = axios.create({
    baseURL: `${serverUrl}/api`
});

const authApi = axios.create({
    baseURL: `${serverUrl}/api`,
    headers: {
        Authorization: 'Bearer ' + getToken()
    }
});

export {
    api, authApi, serverUrl
}