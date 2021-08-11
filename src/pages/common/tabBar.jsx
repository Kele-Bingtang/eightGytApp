import { AtTabBar } from 'taro-ui'
import React,{ Component } from 'react'
import { Form, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {BASEURL} from '../../constants/global'

export default class TabBar extends Component{
  constructor () {
    super(...arguments)
    this.state = {
      current: 0
    }
  }
  handleClick (value) {
    switch(value){
      case 0:
        Taro.reLaunch({
          url:'/pages/index/index'
        });
        break;
      case 1:
        Taro.reLaunch({
          url:'/pages/hotSpot/index'
        });
        break;
      case 2:
        Taro.reLaunch({
          url:'/pages/healthManage/index'
        });
       break;
      case 3:
        Taro.reLaunch({
          url:'/pages/myRecord/index'
        });
        break;

    }

  }

  render(){
    return(
    <View style={{'height':'4rem'}} >
     <AtTabBar
       fixed
       color='#ccc'
       selectedColor='#d40000'
       tabList={[
         {title: '首页', image: `${BASEURL}home.png`, selectedImage: `${BASEURL}homeSelected.png` },
         {title: '今日热点', image: `${BASEURL}knowledge.png`, selectedImage: `${BASEURL}knowledgeSelected.png` },
         {title: '健康档案', image: `${BASEURL}health.png`, selectedImage: `${BASEURL}healthSelected.png` },
         {title: '我的', image: `${BASEURL}self.png`, selectedImage:`${BASEURL}selfSelected.png` }
       ]}
       onClick={this.handleClick.bind(this)}
       current={this.props.currentTabBarIndex}
     />
   </View>
    )
  }
}
