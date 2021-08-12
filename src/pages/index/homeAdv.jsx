import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import {View, Text} from '@tarojs/components'


import './homeAdv.less'

class HomeAdv extends Component{

  //转到健康管理规范
  toHealthKnowledge(){
    Taro.navigateTo({url: '/pages/index/knowledge/healthKnowledge'})
  }

  render(){
    return (
      <View className="at-row adv-box">
        <View className="at-col-6 adv-item1" onClick={this.toHealthKnowledge.bind(this)}>
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
