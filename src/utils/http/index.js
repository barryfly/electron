/**
 * http请求
 * example: 
 *   GET 请求 this.$http({method:'get', url: 'xxx', params: {}}).then().catch()
 *   POST 请求 this.$http({method:'post', url: 'xxx', data: {}}).then().catch()
 * @author barry@jwis.cn
 */

import axios from "axios";
import { getSession } from '../storage'

const config = {
    baseURL: '',
    timeout: 1000,
    withCredentials: false,
    headers: {
        accesstoken: null
    }
}

let http = axios.create(config);

http.interceptors.request.use(
    function(config) {
        if (config.headers.accesstoken === null) {
            config.headers.accesstoken = getSession("token")
        }
        
        return config;
    },
    function (error) {
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    function(response) {
        return response;
    },
    function (error) {
        return Promise.reject(error)
    }
)

export default http

export function setupHttp(app) {
    app.config.globalProperties.$http = http;
}