import React,{Component} from 'react'
import Taro　from '@tarojs/taro';
import { AtAvatar } from 'taro-ui'
import {View,Text,Image} from '@tarojs/components'
import {BASEURL} from "../../constants/global";


import TabBar from '../common/tabBar'
import "./index.less"

/**
 * 我的
 */
export default class MyRecordIndex extends Component{

  constructor(props){
    super(props)
    this.state={
      openid:'',
      username:'',
      headUrl:'',

    }
  }
  //在render之后自动调用
  componentDidMount(){

    Taro.getStorage({
      key:"userInfo",
      success:(res)=>{
        this.setState({
          username:res.data.nickName,
          headUrl:res.data.avatarUrl
        })
      }
    })

    Taro.getStorage({
      key:"openid",
      success:(res)=>{
        this.setState({
          openid:res.data.openid
        })
      }
    })
  }

  isLogin(){
    if(this.state.openid === ''){
      Taro.navigateTo({
        url: './wxLogin'
      })
    }
  }

  //跳往个人信息
  toMyInfoPage(){
    if(this.state.openid != ''){
      Taro.navigateTo({
        url:'./myData/myData'
      })
    }else{
      Taro.navigateTo({
        url:'./wxLogin'
      })
    }
  }

   /*
   * 我的挂号
   */
toMyRegistration() {
  if(this.state.openid != ''){
    Taro.navigateTo({url: '/pages/myRecord/myRegistration/index'})
  }else{
    Taro.navigateTo({url: 'wxLogin'})
  }
}
/*
 * 就诊人管理
 */
toManagePage(){
  if(this.state.openid != ''){
    Taro.navigateTo({url: '/pages/myRecord/myPatient/index'})
  }else{
    Taro.navigateTo({url: 'wxLogin'})
  }
}

  /*
   * 健康档案
   */
  toHealthPage(){
    if(this.state.openid != ''){
      Taro.navigateTo({url: '/pages/myRecord/healthManage/index'})
    }else{
      Taro.navigateTo({url: 'wxLogin'})
    }
  }

  /**
   * 电子档案
   */
  tomedicalRecordPage(){
    if(this.state.openid != ''){
      Taro.navigateTo({url: '/pages/myRecord/medicalRecord/index'})
    }else{
      Taro.navigateTo({url: 'wxLogin'})
    }
  }

  /**
   *就诊费用
   */
  toExpenPage(){
    if(this.state.openid != ''){
      Taro.navigateTo({url:'/pages/myRecord/medicalExpenses/index'})
    }else{
      Taro.navigateTo({url: 'wxLogin'})
    }
  }

  /**
   *我的收藏
   */
  toMyCollectionPage(){
    if(this.state.openid != ''){
      Taro.navigateTo({url: '/pages/myRecord/myCollection/index'})
    }else{
      Taro.navigateTo({url: 'wxLogin'})
    }
  }

  /**
   *效果评价
   */
  toEffectPage(){
    if(this.state.openid != ''){
      Taro.navigateTo({url:'/pages/myRecord/effect/index'})
    }else{
      Taro.navigateTo({url: 'wxLogin'})
    }

  }

  /**
   * 跳转到体质辨识记录
   */
  toIdentifyRecordPage() {
    if(this.state.openid != ''){
      Taro.navigateTo({url: '/pages/myRecord/IdentifyRecord/index'})
    }else{
      Taro.navigateTo({url: 'wxLogin'})
    }
  }

  render(){
    return(
      <View className="index at-row">
        <View className="at-col at-col-12">
          {/* 导航栏 */}
          <View className="at-row header">
            <View className="at-col at-col-3 head">
              <AtAvatar image={this.state.openid != ''?this.state.headUrl:''} circle></AtAvatar>
            </View>
            <View className="at-col at-col-6 name">
              <Text onClick={this.isLogin.bind(this)}>{this.state.openid != ''?this.state.username:'登录/注册'}</Text>
            </View>
            <View className="at-col at-col-3 icon">
              <View className='at-icon at-icon-chevron-right' onClick={this.toMyInfoPage.bind(this)}/>
            </View>
          </View>
          {/* 我的挂号 就诊人管理 */}
         <View className="at-row manage">
           <View className="at-col mycomfor" onClick={this.toMyRegistration.bind(this)}>
             <Image className='myRegister' src={`${BASEURL}u1227.svg`} />
             <Text className="text-title">我的挂号</Text>
           </View>
           <View className="at-col mycomfor mycomfor2">
             <Image className='myRegister' src={`${BASEURL}u1230.svg`} />
             <Text className="text-title" onClick={this.toManagePage.bind(this)}>就诊人管理</Text>
           </View>
         </View>
         {/* 健康数据 */}
         <View className="at-row health-box">
            {/* 标题 */}
            <View className="at-row title-box">
              <View className="health-title">
              <Text>健康数据</Text>
              </View>
            </View>
            {/* 内容 */}
            <View className="at-row health-content">
              {/* 第一个 */}
              <View className="at-col at-col-4 health-item">
                <Image className='health-img' src={`${BASEURL}u1251.svg`} onClick={this.toHealthPage.bind(this)} />
                <Text className="health-item-title">健康档案</Text>
              </View>
              <View className="at-col at-col-4 health-item">
                <Image className='health-img' src={`${BASEURL}u1252.svg`} onClick={this.tomedicalRecordPage.bind(this)} />
                <Text className="health-item-title">电子病历</Text>
              </View>
              <View className="at-col at-col-4 health-item">
                <Image className='health-img' src={`${BASEURL}u1253.svg`} onClick={this.toExpenPage.bind(this)} />
                <Text className="health-item-title">就诊费用</Text>
              </View>
            </View>
         </View>
         {/* 我的服务 */}
        <View className="at-row service-box">
          {/* 标题 */}
          <View className="at-row title-box">
            <View className="service-title">
            <Text>我的服务</Text>
            </View>
          </View>
          {/* 内容 */}
          <View className="service-content">
            {/* 我的收藏 */}
              <View className="at-row myservice-item">
                <View className="at-col at-col-3 myservice-img">
                  <Image className='img-collection' src={`${BASEURL}u1237.svg`} />
                  </View>
                  <View className="at-col at-col-6">
                    <Text className="myservice-text" onClick={this.toMyCollectionPage.bind(this)}>我的收藏</Text>
                  </View>
                  <View className="at-col at-col-3 myservice-icon">
                    <View className='at-icon at-icon-chevron-right'/>
                  </View>
              </View>
             {/* 效果评价 */}
              <View className="at-row myservice-item">
                <View className="at-col at-col-3 myservice-img">
                <Image className='img-collection' src={`${BASEURL}u1248.svg`} />
                </View>
                <View className="at-col at-col-6">
                  <Text className="myservice-text" onClick={this.toEffectPage.bind(this)}>效果评价</Text>
                </View>
                <View className="at-col at-col-3 myservice-icon">
                  <View className='at-icon at-icon-chevron-right'/>
                </View>
              </View>
            {/* 体质辨识记录 */}
              <View className="at-row myservice-item">
                <View className="at-col at-col-3 myservice-img">
                <Image className='img-collection' src={`${BASEURL}u1243.svg`} />
                </View>
                <View className="at-col at-col-6">
                  <Text className="myservice-text" onClick={this.toIdentifyRecordPage.bind(this)}>体质辨识记录</Text>
                </View>
                <View className="at-col at-col-3 myservice-icon">
                  <View className='at-icon at-icon-chevron-right' />
                </View>
              </View>
          </View>
        </View>
        </View>
        <TabBar currentTabBarIndex={3} />
      </View>
    )
  }
}
