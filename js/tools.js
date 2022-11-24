import sparkMd5 from "spark-md5"
import qs from "qs"

let tools = {}

tools.testmd5 = () => {
    console.log((sparkMd5.hash('user-pwd')))
    console.log(qs.stringify({
        info: "刘光辉"
    }))
}

/*
    md5加密
*/
tools.md5 = (info) => {
    if (info && info.trim() != '') {
        return sparkMd5.hash(info)
    }
    return ''
}

//本地保存token
tools.tokenKey = "huhuiyu_teach_service_token"
tools.saveToken = (data) => {
    // console.log("没有保存token之前", tools.tokenKey)
    if (data && data.token) {
        // console.log("进入判断")
        uni.setStorageSync(tools.tokenKey, data.token);
        // console.log("没有保存token之", tools.tokenKey)
    }
}
tools.loadToken = () => {
    let token = uni.getStorageSync(tools.tokenKey)
    return token ? token : ''
}
tools.setverBaseUrl = "https://huhuiyu.top/teach_project_service"
/*
    ajax请求
*/
tools.ajax = (url, paramrs, cb, method) => {
    // 处理mehtod默认值
    method = method ? method : "POST"
    // 请求参数处理
    let info = qs.stringify(paramrs, {
        allowDots: true
    })
    // 处理get请求
    if (method == "GET") {
        url = url + '?' + info
        info = ''
    }
    // uni的ajax请求
    uni.request({
        url: tools.setverBaseUrl + url,
        data: info,
        method: method,
        header: {
            // 修改为http标准的表单提交模式
            "content-type": "application/x-www-form-urlencoded",
            token: tools.loadToken()
        },
        success: (resp) => {
            tools.saveToken(resp.data)
            // console.log("chakantoken", resp)
            cb(resp.data)
        },
        fail: (errors) => {
            cb({
                code: 500,
                success: false,
                message: '访问数据失败！',
                error: errors
            })
        }
    })
}

export default tools
