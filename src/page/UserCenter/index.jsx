import React, { Component } from 'react'
import { NavBar,Toast,Button} from 'antd-mobile'
import {reqVerifyToken,reqLogout} from '../../api/index'
import './index.less'
export default class UserCenter extends Component {
  state={
    nickName:'',
    phone:'',
    avatar:"",
    _id:""
  }
  logout=async ()=>{
    await reqLogout(this.state._id)
    this.props.history.replace('/login')
  }
  async componentDidMount(){
    const result=await reqVerifyToken()
    const {code,message,data,_id}=result
    if(code!==20000){
      Toast.show({
        icon:"fail",
        content:message
      })
      this.props.history.replace('/login')
    }else{
      const {nickName,phone,avatar}=data
      this.setState({nickName,phone,avatar,_id})
    } 
  }
  render() {
    const {nickName,phone,avatar}=this.state
    const backArrow=false
    return (
      <div className='user-info'>
        <NavBar backArrow={backArrow}>
          个人中心
        </NavBar>
        <img className='avatar' src={avatar} alt="" />
        <div>昵称：{nickName}</div>
        <div>电话号码：{phone}</div>
        <Button color='primary' 
        size='large' block
        onTouchEnd={this.logout}
        >退出登录</Button>
      </div>
    )
  }
}
