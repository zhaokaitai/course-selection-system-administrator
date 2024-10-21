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

//上传文件
    export function uploadFile(file, type) {
        const formData = new FormData();
        formData.append('file', file); // 将文件添加到 FormData

        return request({
            url: baseUrl + '/upload?type=' + type,
            method: "post",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
