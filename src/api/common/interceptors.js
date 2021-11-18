import VueCookies from "vue-cookies";
import axios from "axios";

const baseUrl = 'http://127.0.0.1:3000';

export function setInterceptorsWithFiles(instance) {
    instance.interceptors.request.use(
        async config => {
            if (config.url && config.url.charAt(0) === '/') {
                config.url = baseUrl + config.url;
            }
            //헤더 셋팅
            // config.timeout = 10000;
            config.headers["x-access-token"] = VueCookies.get("accessToken");
            config.headers["Content-Type"] = "multipart/form-data";

            return config;
        },
        error => {
            console.log(`axios request error : ${error}`);
            return Promise.reject(error);
        }
    )

    return instance;
}

export function setInterceptors(instance) {
    instance.interceptors.request.use(
        async config => {
            if (config.url && config.url.charAt(0) === '/') {
                config.url = baseUrl + config.url;
            }
            //헤더 셋팅
            // config.timeout = 10000;
            config.headers["x-access-token"] = VueCookies.get("accessToken");
            config.headers["Content-Type"] = "application/json";

            return config;
        },
        error => {
            console.log(`axios request error : ${error}`);
            return Promise.reject(error);
        }
    )

    instance.interceptors.response.use(
        response => {
            try {
                return response;
            } catch (e) {
                console.error('[axios.interceptors.response] response : ', e.message);
            }
        },
        async error => {
            try {
                const errorAPI = error.response.config;
                if (error.response.status === 401 && errorAPI.retry === undefined && !VueCookies.get("accessToken")) {
                    errorAPI.retry = true;
                    let params = {
                        "id" : localStorage.id
                    };
                    await this.$store.dispatch("user/requestRefreshToken", params).then(
                        () => {
                            console.log('[axios.interceptors.response] reissue : reissue access token', )
                        },
                        e => {
                            console.error('[axios.interceptors.response] error : ', e.message);
                        }
                    );
                    return await axios(errorAPI);
                }
            } catch (e) {
                console.error('[axios.interceptors.response] error : ', e.message);
            }
            return Promise.reject(error);
        }
    )

    return instance;
}