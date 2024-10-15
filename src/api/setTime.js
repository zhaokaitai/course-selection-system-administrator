import request from "@/utils/request";

const baseUrl = '/timeSet';

//获取时间
export function getTime() {
    return request({
        url: baseUrl,
        method: "get"
    });
}

//提交时间
export function setTime(params) {
    return request({
        url: baseUrl,
        method: "post",
        data: {
            firstDateTime1: params.firstDateTime1,
            firstDateTime2: params.firstDateTime2,
            secondDateTime1: params.secondDateTime1,
            secondDateTime2: params.secondDateTime2,
            thirdDateTime1: params.thirdDateTime1,
            thirdDateTime2: params.thirdDateTime2   
        },
    });
}