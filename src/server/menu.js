import axios from './request'

const getMenu = function (data) {
    return axios({
        url: '/zhgd-admin/login', // url = base url + request url
        method: 'post',
        data: data // ----------------->>>区别
    })
}

const apiList = {
    getMenu
}

export default apiList