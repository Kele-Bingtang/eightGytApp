// 1.先授权获取微信信息
// 2.使用微信信息的code进行登录
// 3.后端根据code返回用户的数据库信息
import Taro from "@tarojs/taro";
import {APIBASEURL} from "../constants/global";

//判断是否授权
export const authorize =()=>{
  // 可以通过 Taro.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
  Taro.getSetting({
    success: function (res) {

      if (!res.authSetting['scope.userInfo']) {
        Taro.authorize({
          scope: 'scope.userInfo',
          success: function () {
            // 用户已经同意小程序使用录音功能，后续调用 Taro.startRecord 接口不会弹窗询问
            // Taro.startRecord()
          }
        })
        // 获取授权
      }else{
          Taro.getUserInfo({
            success:function(res){

              let userInfo = res.userInfo
              if(userInfo != null){
                  Taro.setStorage({
                    key:'userInfo',
                    data:userInfo
                  })
              }
              login();
            }
          })
      }
    },
    fail:()=>{
      console.log("asd")
    }
  })
}

export async function login(){
  Taro.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        Taro.request({
          // 自己的后台地址，获取openid 和 session_key
          // url: `${APIBASEURL}/users/wxlogin`,
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid:'wx28e7e15e2f843416',
            secret:'79a89d697601b195b4c17d52aba1ca4d',
            js_code:res.code,
            grant_type:'authorization_code'
          },
          header: {
            'content-type': 'application/json'
          },
          success: (res)=> {
            const sessionKeyAndOpenid = res.data
            Taro.setStorage({
              key:　'openid',
              data:　sessionKeyAndOpenid
            })
            //console.log('完成登录! openid = %s', sessionKeyAndOpenid.openid)
            //获取用户的itemcode并存在storage里
            getuser()
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}

export const getuser = () => {
  Taro.getStorage({
    key: 'openid',
    success: (res)=> {
      let openid = res.data.openid;
      Taro.request({
        url: `${APIBASEURL}/getUserDetail`,
        data:{
          openid: openid
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        dataType: 'json',
        credentials: 'include',
        success: (res) => {
          Taro.setStorage({
            key: 'itemCode',
            data: res.data.data.itemcode
          })
        },
        fail: function (errMsg) {
          Taro.showToast({
            title: '服务器请求错误',
            icon: 'none',
            duration: 3000
          })
        }
      });
    }
  })

}

