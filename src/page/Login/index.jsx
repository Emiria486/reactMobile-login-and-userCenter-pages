import React, { Component } from 'react'
import { NavBar,Form, Input,Button,Toast} from 'antd-mobile'
import {reqVerifyCode,reqLogin} from '../../api/index'
import styles from './demo2.less'
import './index.less'
import github from './imgs/github-logo.png'
import wx from './imgs/wx.png'
import qq from './imgs/qq.png'
import {phoneReg,verifyCodeReg} from '../../utils/reg'

export default class Login extends Component {
  state={
    phone:'',
    verifyCode:'',
    time:10,
    canClick:true
  }
  // 保存数据
  savaDate=(type)=>{
    return (value)=>{
      // 如果用户输入的数据符合要求，那么维护进状态
      if(type==='phone'&&phoneReg.test(value)) return this.setState({[type]:value})
      if(type==='verifyCode'&&verifyCodeReg.test(value)) return this.setState({[type]:value})
      else this.setState({[type]:''})
    }
  }
  // 获取验证码的回调
  getVerifyCode=async()=>{
    // 获取手机号
    const {phone,canClick}=this.state
    if(!canClick) return 
    // 更新状态让获取验证码按钮不可点击
    if(!phone) return Toast.show({
      icon: 'fail',
      content: '手机号输入不合法',
    })
    // 开启定时器更新倒计时
    this.setState({canClick:false})
    this.timer=setInterval(()=>{
      let {time}=this.state
      time--
      // 若倒计时结束重置验证码按钮关闭定时器
      if(time<=0){
        clearInterval(this.timer)
        this.setState({canClick:true,time:10})
        return
      }
        this.setState({time})
    },1000)
    // 发送请求
    await reqVerifyCode(phone)
    Toast.show(
      {
        icon: 'success',
        content: '验证码发送成功',
      }
    )

  }
  
  // github授权登录
  githubLogin=()=>{
    window.location.href='https://github.com/login/oauth/authorize?client_id=e9238d1f8812d541f6cc'
  }
  // 登录的回调
  login=async ()=>{
    const {phone,verifyCode}=this.state
    if(!(phone&&verifyCode)){
      return Toast.show(
        {
          icon:"fail",
          content:'请检查手机号或验证码格式'
        }
      )
    }

    const result=await reqLogin(phone,verifyCode)
    const {code,message}=result
    if(code===20000){
      Toast.show({
        icon:"success",
        content:"登录成功"
      })
      this.props.history.push('/usercenter')
    }
    else{
      Toast.show({
        icon:"fail",
        content:'登录失败'+message
      }
      )
    }
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  render() {
    const backArrow=false
    const {time,canClick,phone,verifyCode}=this.state
    return (
      <div className='login'>
        {/* 顶部导航去 */}
        <NavBar backArrow={backArrow}>
          手机验证码登录
        </NavBar>
        {/* 手机号输入框 */}
        <Form layout='horizontal'>
        <Form.Item label='用户电话号码' name='username'>
            <Input onChange={this.savaDate('phone')} placeholder='请输入用户名' clearable />
          </Form.Item>
        {/* 验证码输入框 */}
          <Form.Item
            label='短信验证码'
            extra={
              <div className={styles.extraPart}>
                <Button disabled={canClick} size='mini' onTouchStart={this.getVerifyCode}>
                  发送验证码{canClick?'':`(${time})`}
                  </Button>
              </div>
            }
          >
            <Input onChange={this.savaDate('verifyCode')} placeholder='请输入验证码' clearable />
          </Form.Item>
        </Form>
        {/* 登录按钮 */}
        <Button  
        onTouchEnd={this.login} 
        disabled={(phone&&verifyCode)?false:true}
        className='summitButton' 
        block color='primary' 
        size='large'>
          登录
        </Button>
        {/* 底部其他登录方式区 */}
        <footer className='footer'>
            <span className='other'>其他登录方式</span>
            <div className='login-type'>
              <img src={github} onTouchEnd={this.githubLogin} alt="" />
              <img src={wx} alt="" />
              <img src={qq} alt="" />
            </div>
          <span className='footer-text'>未注册的手机号，验证后会自动创建硅谷账号，登录即代表您同意：<a href='www.baidu.com'>《隐私政策》</a></span>
        </footer>
      </div>
    )
  }
}
