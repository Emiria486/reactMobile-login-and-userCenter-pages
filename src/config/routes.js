// 路由配置文件
import Login from '../page/Login';
import UserCenter from '../page/UserCenter';
const routes=[
    // 登录路由
    {
        path:"/login",
        component:Login
    },
    // 个人中心路由
    {
        path:"/usercenter",
        component:UserCenter
    }
]
export default routes