import { get } from '../base';

const baseServe = 'http://139.9.230.159:3000';

// 获取二维码code
export const getQrCode = ()=> {
    return get({
        url: `${baseServe}/login/qr/key`,
        params: {
            timerstamp: Date.now()
        }
    })
};

// 获取二维码
export const getQrCodeImg = key=> {
    return get({
        url: `${baseServe}/login/qr/create`,
        params: {
            key: key,
            qrimg: true,
            timerstamp: Date.now()
        }
    })
};

// 获取扫码状态
export const checkQrCodeStatus = key=> {
    return get({
        url: `${baseServe}/login/qr/check`,
        params: {
            key: key,
            timerstamp: Date.now()
        }
    })
};

// 检查登录状态
export const getLoginStatus = ()=> {
    return get({
        url: `${baseServe}/login/status`,
        params: {
            timerstamp: Date.now()
        }
    })
};

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const getSubcount = ()=> {
    return get({
        url: `${baseServe}/user/subcount`,
        params: {
            timerstamp: Date.now()
        }
    })
};