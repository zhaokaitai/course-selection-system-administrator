import request from "@/utils/request";

const baseUrl = '/data';

//获取选课信息文件
export function getCurriculaVariable() {
    return request({
        url: baseUrl,
        method: "get",
        responseType: 'blob'
    });
}

//获取未能开课的教学班信息文件
export function getUnCurriculaVariable() {
    return request({
        url: baseUrl,
        method: "post",
        responseType: 'blob'
    });
}

//上传文件
export function uploadDataFile(file, type) {
    const formData = new FormData();
    formData.append('file', file); // 将文件添加到 FormData
    formData.append('type', type);

    return request({
        url: baseUrl + '/upload',
        method: "post",
        data: formData
    })
}
