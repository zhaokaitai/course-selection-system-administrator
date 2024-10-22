import request from "@/utils/request";

const baseUrl = '/count';

//获取统计数据
export function getCount() {
    return request({
        url: baseUrl,
        method: "get"
    });
}