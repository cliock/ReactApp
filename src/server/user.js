import axios from './request';

// 登录
const login = function (data) {
    return axios({
        url: '/zhgd-admin/login', // url = base url + request url
        method: 'post',
        data: data // ----------------->>>区别
    })
}

const apiList = {
    login
}

export default apiList