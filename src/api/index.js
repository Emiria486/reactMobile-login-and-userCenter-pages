// 统一管理项目中所有的ajax请求
import ajax from './ajax'

// 请求验证码
export const reqVerifyCode=phone=>
    ajax.post('https://dev.usemock.com/630035d2ad2611a740fb212f/login/digits',{phone})
// 请求登录
export const  reqLogin=(phone,code)=>
    ajax.post('https://dev.usemock.com/630035d2ad2611a740fb212f/login/phone',{phone,code})
// 请求校验用户身份,不用携带token作为参数，cookie会自动携带
 export const  reqVerifyToken=(phone,code)=>
    ajax.post('https://dev.usemock.com/630035d2ad2611a740fb212f/login/verify',{phone,code})
// 请求校验用户身份
export const  reqLogout=(id)=>
    ajax.post('https://dev.usemock.com/630035d2ad2611a740fb212f/logout',{id})