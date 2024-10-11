import request from "@/utils/request";

const baseUrl = '/manager';


//登录
export function authLogin(params) {
    return request({
        url: baseUrl + "/login",
        method: "post",
        data: {
            account: params.account,
            password: params.password
        },
    });
}
//退出
export function authLogout(params) {
    return request({
        url: baseUrl + "/logout",
        method: "get",
    });
}