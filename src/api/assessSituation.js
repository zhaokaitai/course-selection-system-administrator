import request from "@/utils/request";

const baseUrl = '/teaching-class';

//获取所有教学班
export function getAll() {
    return request({
        url: baseUrl,
        method: "get"
    });
}

// 获取教学班学生列表
export function getStudentList(params) {
    return request({
        url: baseUrl + "/getAllStudent",
        method: "get",
        params:{
            id: params
        }
    });
}

// 添加学生
export function addOneStudent(params) {
    return request({
        url: baseUrl,
        method: "post",
        data: {
            classId: params.classId,
            studentNumber: params.studentNumber
        }
    });
}

// 查询教学班
export function searchClass(params) {
    return request({
        url: baseUrl + "/search",
        method: "get",
        params: {
            search: params
        }
    });
}

// 删除某个教学班的学生
export function deleteOneStudent(params) {
    return request({
        url: baseUrl,
        method: "delete",
        data: {
            classId: params.classId,
            studentNumber: params.studentNumber
        }
    });
}