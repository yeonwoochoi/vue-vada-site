import axios from 'axios'
import {setInterceptors} from "@/api/common/interceptors";

const baseUrl = 'http://127.0.0.1:3000';

function createCommonInstance() {
    return axios.create({
        baseURL: baseUrl,
        timeout: 10000
    })
}

function createInstance() {
    return createCommonInstance();
}

function createInstanceWithAuth() {
    const instance = createCommonInstance();
    return setInterceptors(instance);
}

export const instance = createInstance();
export const instanceWithAuth = createInstanceWithAuth();