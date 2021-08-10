import React,{Component} from 'react'
import { View,Image,Text,Button} from '@tarojs/components'
import Taro　from '@tarojs/taro';
import {APIBASEURL, BASEURL} from "../../constants/global";

import './wxLogin.less'

export default class WXLogin extends Component{

  constructor(props){
    super(props)
  }

getUserInfo(e){
  if(e.detail.userInfo){
    this.userLogin();
    Taro.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo
    })

  }else{

  }
}

userLogin(){
  Taro.login({
    success:  (res)=> {
      if (res.code) {
        //发起网络请求
        Taro.request({
          // 自己的后台地址，获取openid 和 session_key
           url: 'https://api.weixin.qq.com/sns/jscode2session',
          //url: `${APIBASEURL}/users/wxlogin`,
          data: {
            appid:'wx28e7e15e2f843416',
            secret:'79a89d697601b195b4c17d52aba1ca4d',
            js_code:res.code,
            grant_type:'authorization_code'
          },
          header: {
            'content-type': 'application/json'
          },
          type:'get',
          success:(res)=>{
            // 有openid 和 session_key
            // openid: orrAf46Sh2z60Rqbb9eaNssyPJRg
            // session_key：g2zzNkfhsS7hqstjsejqwA==
            const sessionKeyAndOpenid = JSON.parse(`${res.data}`)
            Taro.setStorage({
              key:　'openid',
              data:　sessionKeyAndOpenid
            })
            this.getuseropenid();
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}

  getuseropenid(){
    Taro.getStorage({
      key: 'openid',
      success: result => {
        Taro.request({
          url: `${APIBASEURL}/users`,
          data: {
            wxOpenId: result.data.openid
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: (res) =>{
            if(res.data.code === 502){
              Taro.navigateTo({url:'/pages/myRecord/myData/myData'})
            }else{
              Taro.reLaunch({url:'/pages/index/index'})
            }
          },
          fail: (err) => {
            console.error('从数据库获取不到openID')
          }
        });
      }
    })
  }

  render(){
    return (
      <View>
          <view>
            <view className='header'>
              <Image src={`${BASEURL}appwx_logo.png`} ></Image>
            </view>
            <view className='wx-content'>
              <view>申请获取以下权限</view>
              <Text>获得你的公开信息(昵称，头像等)</Text>
            </view>
            {/*微信提供的回调是bindgetuserinfo，但是Taro将bind事件都封装成了on事件*/}
            <Button className='bottom' type='primary' openType='getUserInfo'
              onGetUserInfo={this.getUserInfo.bind(this)}
            >
              授权登录</Button>
          </view>
      </View>
   );
  }
}
