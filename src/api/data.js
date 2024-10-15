import request from "@/utils/request";

const baseUrl = '/data';

//获取时间
export function getCurriculaVariable() {
    return request({
        url: baseUrl,
        method: "get",
        responseType: 'blob'
    });
}
