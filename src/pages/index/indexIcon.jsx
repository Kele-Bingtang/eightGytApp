import React,{Component} from 'react'
import Taro from '@tarojs/taro'
import {View,Image,Text} from '@tarojs/components'
import {BASEURL,GYT,YYREGISTRATION,SMART} from '../../constants/global'

import './indexIcon.css'

class IndexIcon extends Component{

  render(){
    return (
      <View className='at-row content-icon'>
        <View className='at-col-4 icon-item'>
          <Image className="icon-img" src={`${BASEURL}u42.png`}/>
          <text className="icon-title">国医堂</text>
        </View>
        <View className='at-col-4 icon-item'>
          <Image className="icon-img" src={`${BASEURL}u45.png`}/>
          <text className="icon-title">预约挂号</text>
        </View>
        <View className='at-col-4 icon-item'>
          <Image className="icon-img" src={`${BASEURL}u46.png`}/>
          <text className="icon-title">智能导诊</text>
        </View>
      </View>
    )
  }
}

export default IndexIcon
