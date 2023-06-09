import http from "../utils/request";

//定义一个请求首页数据的接口
export const getData = ()=>{
    // 返回一个promise
    return http.get('/home/getData')
}
export const getUser = (params) =>{
// 返回用户列表
return http.get('/user/getUser',params)
}

export const addUser = (data) =>{
    return http.post('/user/add',data)
}
export const editUser = (data) =>{
    return http.post('/user/edit',data)
}
export const delUser = (data) =>{
    return http.post('/user/del',data)
}