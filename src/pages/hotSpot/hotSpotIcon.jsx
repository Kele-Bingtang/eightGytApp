import { View, Text, Image } from '@tarojs/components'
import React, { Component } from 'react'
import {BASEURL} from '../../constants/global'

import './hotSpot.less'

export default class HotSpotIcon extends Component{


  render(){
    return(
      <View className="at-row at-row--wrap hot-spot-icon">
        <View className="at-col at-col-4 hot-spot-icon-item">
          <Image className="hot-spot-img" src={`${BASEURL}jqys.svg`}></Image>
          <Text className="hot-spot-title">节气养生</Text>
        </View>
        <View className="at-col at-col-4 hot-spot-icon-item">
          <Image className="hot-spot-img" src={`${BASEURL}zwbj.svg`}></Image>
          <Text className="hot-spot-title">自我保健</Text>
        </View>
        <View className="at-col at-col-4 hot-spot-icon-item">
          <Image className="hot-spot-img" src={`${BASEURL}yssl.svg`}></Image>
          <Text className="hot-spot-title">药膳食疗</Text>
        </View>
        <View className="at-col at-col-4 hot-spot-icon-item">
          <Image className="hot-spot-img" src={`${BASEURL}zycs.svg`}></Image>
          <Text className="hot-spot-title">中医常识</Text>
        </View>
        <View className="at-col at-col-4 hot-spot-icon-item">
          <Image className="hot-spot-img" src={`${BASEURL}zzwh.svg`}></Image>
          <Text className="hot-spot-title">中医文化</Text>
        </View>
        <View className="at-col at-col-4 hot-spot-icon-item">
          <Image className="hot-spot-img" src={`${BASEURL}ekjk.svg`}></Image>
          <Text className="hot-spot-title">儿科健康</Text>
        </View>
      </View>
    )
  }
}