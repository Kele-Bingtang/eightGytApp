import {Component} from "react";
import {Text, View} from "@tarojs/components";

import './index.less'
import './identityItems.less'
import TabBar from "../../common/tabBar";
import Taro from "@tarojs/taro";
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
    }
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
              //return <IdentityItems identityItem={identityItem} className={className} key={index} index={index} />
            return(
              <View className='identityItem'>
                <View className={className}>
                  <View className='recordItem-time'>
                    <Text>{identityItem.identityDate}</Text>
                  </View>
                  <View className='recordItem-body'>
                    <Text className='recordDetail-text'>是{identityItem.identityContent},</Text>
                    <Text className='recordDetail-text'>   倾向是{identityItem.identityTendency}</Text>
                  </View>
                  <View className='recordItem-operation' onClick={function toRecordDetailPage(){
                    Taro.navigateTo({
                    url: './recordDetail'
                  })
                  }}
                  >
                    <Text>查看</Text>
                  </View>
                </View>
                <View>
                </View>
              </View>
            )
          })
        }
        <TabBar currentTabBarIndex={3} />
      </View>
    )
  }
}
