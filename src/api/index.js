import axios from 'axios'
import {setInterceptors, setInterceptorsWithFiles} from "@/api/common/interceptors";

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

function createInstanceWithFiles(){
    const instance = createCommonInstance();
    return setInterceptorsWithFiles(instance);
}

export const instance = createInstance();
export const instanceWithFiles = createInstanceWithFiles();
export const instanceWithAuth = createInstanceWithAuth();