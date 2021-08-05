import { View, Text} from "@tarojs/components"
import React, { Component } from 'react'
import TabBar from "../common/tabBar"
import { AtSearchBar } from 'taro-ui'

import HotSpotIcon from './hotSpotIcon'

import '../index/header.less'

class HotSpotIndex extends Component{
  constructor(props){
    super(props);
    this.state = {
     
    }
  }
  
  onChange (value) {
    this.setState({
      value: value
    })
  }
  onActionClick () {
    console.log('开始搜索')
  }
  doSearch(){

  }

  render(){
    return(
      <View className='index'>
        <AtSearchBar
             actionName='搜索'
             placeholder='搜索今日热点'
             maxLength='50'
             onChange={this.onChange.bind(this)}
             onActionClick={this.onActionClick.bind(this)}
             className='search-input'
        />
        <HotSpotIcon/>
        <TabBar currentTabBarIndex={1} />
      </View>
    )
  }
}

export default HotSpotIndex