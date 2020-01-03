
import axios from "axios";
// import common from "../tools/common";
//post 请求时，采用的请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common["authorization"] = ''

var baseURL ='http://127.0.0.1:3000/back'; 
export function request(config) {
    const instance = axios.create({
        baseURL: baseURL,
        // time: 2000
    })
    return instance(config);
}
//带有拦截器的请求方式
export function interceptRequest(config) {
    const instance = axios.create({
        baseURL: baseURL,
        // time: 5000
    })
    //请求拦截
    instance.interceptors.request.use(config => {
        /**
         * 请求时，可以对请求的配置做一次修改之后在发送给server端
         */
        return config;
    }, err => {
    });
    //响应拦截
    instance.interceptors.response.use(config => {
        /*
         *  server端相应的配置做一下修改之后再区接受，例如数据处理
         */  
        
        return config;
    }, err => {
    })
    return instance(config)
}


 