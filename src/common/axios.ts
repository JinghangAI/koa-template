import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

/**
 * Axios工厂，用于创建不同的axios实例
 * @param config Axios 配置文件
 * @param reqOnFulfilled 请求完成拦截函数
 * @param resOnFulfilled 响应完成拦截函数
 */
export const AxiosFactory = (
    config: AxiosRequestConfig = {},
    reqOnFulfilled = null,
    resOnFulfilled = null
): AxiosInstance => {
    const axiosInstance = axios.create(config);
    // 请求拦截器
    axiosInstance.interceptors.request.use(
        reqOnFulfilled || _reqOnFulfilled,
        _reqOnRejected
    );

    // 响应拦截器
    axiosInstance.interceptors.response.use(
        resOnFulfilled || _resOnFulfilled,
        _resOnRejected
    );

    return axiosInstance;
};


// #region 默认请求拦截器
function _reqOnFulfilled(config: AxiosRequestConfig) {
    return config;
}
function _reqOnRejected(error: AxiosError) {
    return Promise.reject(error);
}
// #endregion

// #region 默认响应拦截器
function _resOnFulfilled(response: AxiosResponse) {
    return response;
}
function _resOnRejected(error: AxiosError) {
    return Promise.reject(error);
}
// #endregion