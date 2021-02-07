 /**
 * @description node的request模块请求
 */
import { ElMessage } from 'element-plus';

const request = require('request');
const paramsParse = params=> {
    let res = '?';

    for (const [key, val] of Object.entries(params)) {
        res += `${key}=${val}&`;
    }
    return res.slice(0, res.length - 1);
};

export const get = ({ url: baseUrl, params = {}, apiName= '' })=> {
    const url = baseUrl + paramsParse(params);

    return new Promise(resolve=> {
        request(url, (err, response, body)=> {
            if (!err && response.statusCode == 200) { 
                resolve(JSON.parse(body));
            } else {
                // 调用失败消息提示
                ElMessage({
                    showClose: true,
                    type: 'error',
                    message: `${apiName}接口请求失败`,
                    duration: 2000,
                    offset: 200,
                    center: true
                });
                resolve({
                    code: 500,
                    err: err
                })
            }
        })
    });
}

export const post = ({ url, data, apiName= '' })=> {
    return new Promise(resolve=> {
        request({
            methods: 'post',
            url: url,
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        }, (err, response, body)=> {
            if (!err && response.statusCode == 200) { 
                resolve(JSON.parse(body));
            } else {
                // 调用失败消息提示
                ElMessage({
                    showClose: true,
                    type: 'error',
                    message: `${apiName}接口请求失败`,
                    duration: 2000,
                    offset: 200,
                    center: true
                });
                resolve({
                    code: 500,
                    err: err
                })
            }
        })
    });
}
