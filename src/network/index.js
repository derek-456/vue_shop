import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export function request(config){
    //创建axios的实例
    const instance = axios.create({
		// baseURL: "",
		timeout: 5000,
		headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
    
    //拦截器
    instance.interceptors.request.use(config =>{
        return config;
    },err =>{
        console.log(err);
    })

    instance.interceptors.response.use(res =>{
        return res.data;
    },err =>{
        console.log(err);
        return Promise.reject(err);
    })

    //发起请求
    return instance(config);
}