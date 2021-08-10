import React,{Component} from 'react'
import Taro from '@tarojs/taro'
import { View} from '@tarojs/components'
import Registration from "./registration"
import TabBar from "../../common/tabBar";
import './index.less'
import {APIBASEURL} from "../../../constants/global";

/**
 * 我的
 * 我的挂号
 */
export default class Index extends Component{

  constructor(props){
    super(props)
    this.state = {
      registrations:[]
    }
  }

  //获取挂号信息
  componentDidMount() {
    Taro.getStorage({
      key:'itemCode',
      success:(res)=>{
        const itemCode = res.data;
        Taro.request({
          url: `${APIBASEURL}/myRegisters/${itemCode}`,
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: 'GET',
          dataType: 'json',
          credentials: 'include',
          success: (res) => {
            this.setState({
              registrations: res.data.data
            })
            if (this.state.registrations && this.state.registrations.length==0){
              Taro.showToast({
                title: '您没有挂号记录！',
                icon: 'none',
                duration: 3000
              })
            }
          },
          fail: function (errMsg) {
            Taro.showToast({
              title: '服务器请求失败!',
              icon: 'none',
              duration: 3000
            })
          }
        });
      }
    })
  }


  render(){
    //获取信息
    let registrations = this.state.registrations;
    return(
      <View className='index-registration'>
        {
          //遍历数组
          registrations.map(function(registration, index){
              let classNames={};
              //判断类型
              switch (registration.registerType) {
                case '1':
                  classNames = {
                    stateClass: 'state',
                    numberClass: 'number state-ord-techno-number card'
                  }
                  break;
                case '0':
                  classNames = {
                    stateClass: 'ord-state',
                    numberClass: 'ord-number state-ord-techno-number card'
                  }
                  break;
                case '2':
                  classNames = {
                    stateClass: 'techno-state',
                    numberClass: 'techno-number state-ord-techno-number card'
                  }
                  break;
              }
              return <Registration registration={registration} key={index} index={index} className={classNames} />;
            }
          )
        }
        <TabBar currentTabBarIndex={3} />
        </View>
    )
  }
}
