import React, {Component} from 'react'
import {View, Text, Image} from '@tarojs/components'

import './homeHotList.less'
class HomeHotList extends Component{

  render(){
    return (
      <View>
        <View className="at-row at-col-12 now-hot-content">
          <Text className="now-hot-title">今日热点</Text>
          <View className="now-hot-more-content">
            <Text className="now-hot-more-title">更多</Text>
            <View className='at-icon at-icon-chevron-right'/>
          </View>
        </View>
      </View>
      
    )
  }
}

export default HomeHotList