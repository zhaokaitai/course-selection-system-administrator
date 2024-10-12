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
export function authSmsLogin(params) {
    return request({
        url: baseUrl + "/loginByPhone",
        method: "post",
        data: {
            phone: params.phone,
            smsCode: params.smsCode
        },
    });
}
//退出
export function authLogout(params) {
    return request({
        url: baseUrl + "/logout",
        method: "post",
    });
}
//重置密码
export function authResetPassword(params) {
    return request({
        url: baseUrl + "/resetPassword",
        method: "post",
        data: {
            phone: params.phone,
            smsCode: params.smsCode,
            password: params.password,
            passwordTwo: params.passwordTwo
        },
    });
}