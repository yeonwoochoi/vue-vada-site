import axios from 'axios'
import VueCookies from "vue-cookies";

axios.interceptors.request.use(async function (config){
    if (config.retry === undefined) {
        config.url = this.$store.getters["user/getHost"] + config.url; //host 및 url 방식 수정필요
    }
    //헤더 셋팅
    config.timeout = 10000;
    config.headers['x-access-token'] = VueCookies.get('accessToken');
    config.headers['x-refresh-token'] = VueCookies.get('refreshToken');
    config.headers['Content-Type'] = 'application/json';

    return config;
}, function (e){
    console.log(`axios request error : ${e}`);
    return Promise.reject(e);
});

axios.interceptors.response.use(
    function (response){
        try {
            return response;
        } catch (e) {
            console.error('[axios.interceptors.response] response : ', e.message);
        }
    },
    async function (error) {
        try {
            const errorAPI = error.response.config;
            if (error.response.status === 401 && errorAPI.retry === undefined && VueCookies.get('refreshToken') !== null) {
                errorAPI.retry = true;
                await this.$store.dispatch("user/requestRefreshToken").then(

                );
                return await axios(errorAPI);
            }
        } catch (e) {
            console.error('[axios.interceptors.response] error : ', e.message);
        }
        return Promise.reject(error);
    }
)