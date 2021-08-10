// 1.先授权获取微信信息  
// 2.使用微信信息的code进行登录  
// 3.后端根据code返回用户的数据库信息
import Taro from "@tarojs/taro";

//判断是否授权
export const authorize =()=>{
  // 可以通过 Taro.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
  Taro.getSetting({
    success: function (res) {
      if (!res.authSetting['scope.record']) {
        Taro.authorize({
          scope: 'scope.record',
          success: function () {
            // 用户已经同意小程序使用录音功能，后续调用 Taro.startRecord 接口不会弹窗询问
            Taro.startRecord()
          }
        })
        // 获取授权
      }else{
          Taro.getUserInfo({
            success:function(res){
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
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
    }
  })
}

export function login(){
  Taro.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        Taro.request({
          // 自己的后台地址，获取openid 和 session_key 
          url: 'https://test.com/onLogin',
          data: {
            code: res.code
          },
          success:function(res){
            // 有openid 和 session_key 
            console.log(res);

          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}



