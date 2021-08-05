import React, { Component } from 'react'
import {View, Text} from '@tarojs/components'

import './homeAdv.less'
class HomeAdv extends Component{

  render(){
    return (
      <View className="at-row adv-box">
        <View className="at-col-6 adv-item1">
        <View className='adv-knowledge'>
            <Text className='adv-know'>中医健康管理知识宣教</Text>
          </View>
        </View>
        <View className="at-col-6 adv-item2">
        <View className='adv-identity'>
            <text className='adv-phy-ident'>【体质辨识】</text>
            <text className='adv-phy-ident-table'>判定量表</text>
          </View>
        </View>
      </View>
    )
  }
}

export default HomeAdv