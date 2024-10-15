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
// 验证码登录
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
//修改头像
export function authChangeAvatarUrl(params) {
    return request({
        url: baseUrl + "/changeAvatarUrl",
        method: "get",
        params: {
            avatarUrl: params
        },
    });
}
//修改昵称
export function authChangeManagerName(params) {
    return request({
        url: baseUrl + "/changeManagerName",
        method: "get",
        params: {
            managerName: params
        },
    });
}
//修改手机号码
export function authChangePhone(params) {
    return request({
        url: baseUrl + "/changePhone",
        method: "post",
        data: {
            phone: params.phone,
            smsCode: params.smsCode
        },
    });
}