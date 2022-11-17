import md5 from "spark-md5"
import qs from "qs"

let tools = {}

tools.testmd5 = () => {
    console.log((md5.hash('user-pwd')))
    console.log(qs.stringify({
        info: "刘光辉"
    }))
}

/*
    md5加密
*/
tools.md5 = (info) => {
    return info ? md5(info) : ''
}
//本地保存token
/*
    ajax请求
*/
tools.ajax = (url, paramrs, cb, method) => {

    uni.request({

    })
}

export default tools
