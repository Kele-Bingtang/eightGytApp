import {Component} from "react";
import {Text, View} from "@tarojs/components";

import Taro from "@tarojs/taro";

import IdentityItems from './identityItems'
import {APIBASEURL} from "../../../constants/global"
import './index.less'
import './identityItems.less'
import TabBar from "../../common/tabBar";
/**
 * 我的
 * 体质辨识记录
 */
export default class Index extends Component{
  constructor(props) {
    super(props);
    this.state={
      identityItems:[
        {
          identityDate:'2016-10-01',
          identityContent:'平和质',
          identityTendency:'阴虚质'
        },{
          identityDate:'2016-10-01',
          identityContent:'平和质',
          identityTendency:'阴虚质'
        }],
      identityItem:'',
    }
  }


  componentDidMount () {

    Taro.getStorage({
      key: 'itemCode',
      success:(res)=> {
        const usercode = res.data;
        Taro.request({
          url: `${APIBASEURL}/selectUserTzResultByUsercode?usercode=${usercode}`,
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: 'GET',
          dataType: 'json',
          credentials: 'include',
          success: (res) => {
            this.setState({
              identityItem: res.data.data
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

  render() {

    return(
      <View className='index'>
        <View className='medical-record-index'>
          <View className='medical-record-time'>
            <Text>日期</Text>
          </View>
          <View className='medical-record-body'>
            <Text>体质</Text>
          </View>
          <View className='medical-record-operation'>
            <Text>操作</Text>
          </View>
        </View>
        {

          this.state.identityItems.map(function (identityItem,index){
            let className = '';
              if(index % 2 === 1 ){
                className='One RecordItem'
            }else {
              className='Two RecordItem';
            }
              return <IdentityItems identityItem={identityItem} className={className} key={index} index={index} />
          })
        }
        <TabBar currentTabBarIndex={3} />
      </View>
    )
  }
}
