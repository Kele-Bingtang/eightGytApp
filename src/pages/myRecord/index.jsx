import React,{Component} from 'react'
import {View,Text,Image} from '@tarojs/components'
import {BASEURL} from "../../constants/global";
import { AtAvatar } from 'taro-ui'

import TabBar from '../common/tabBar'
import "./index.less"
export default class MyRecordIndex extends Component{


  render(){
    return(
      <View className="index at-row">
        <View className="at-col at-col-12">
          {/* 导航栏 */}
          <View className="at-row header">
            <View className="at-col at-col-3 head">
              <AtAvatar image='' circle></AtAvatar>
            </View>
            <View className="at-col at-col-6 name">
              <Text>登录/注册</Text>
            </View>
            <View className="at-col at-col-3 icon">
              <View className='at-icon at-icon-chevron-right'/>
            </View>
          </View>
          {/* 我的挂号 就诊人管理 */}
         <View className="at-row manage">
           <View className="at-col mycomfor">
             <Image className='myRegister' src={`${BASEURL}u1227.svg`} />
             <Text className="text-title">我的挂号</Text>
           </View>
           <View className="at-col mycomfor">
             <Image className='myRegister' src={`${BASEURL}u1230.svg`} />
             <Text className="text-title">就诊人管理</Text>
           </View>
         </View>
         {/* 健康数据 */}
         <View className="at-row health-box">
            {/* 标题 */}
            <View className="at-row title-box">
              <View className="health-title">
              <Text>健康数据</Text>
              </View>
            </View>
            {/* 内容 */}
            <View className="at-row health-content">
              {/* 第一个 */}
              <View className="at-col at-col-4 health-item">
                <Image className='health-img' src={`${BASEURL}u1251.svg`}></Image>
                <Text className="health-item-title">健康档案</Text>
              </View>
              <View className="at-col at-col-4 health-item">
                <Image className='health-img' src={`${BASEURL}u1252.svg`}></Image>
                <Text className="health-item-title">电子病历</Text>
              </View>
              <View className="at-col at-col-4 health-item">
                <Image className='health-img' src={`${BASEURL}u1253.svg`}></Image>
                <Text className="health-item-title">就诊费用</Text>
              </View>
            </View>
         </View>
         {/* 我的服务 */}
        <View className="at-row service-box">
          {/* 标题 */}
          <View className="at-row title-box">
            <View className="service-title">
            <Text>我的服务</Text>
            </View>
          </View>
          {/* 内容 */}
          <View className="service-content">
            {/* 我的收藏 */}
              <View className="at-row myservice-item">
                <View className="at-col at-col-3 myservice-img">
                  <Image className='img-collection' src={`${BASEURL}u1237.svg`} />
                  </View>
                  <View className="at-col at-col-6">
                    <Text className="myservice-text">我的收藏</Text>
                  </View>
                  <View className="at-col at-col-3 myservice-icon">
                    <View className='at-icon at-icon-chevron-right'/>
                  </View>
              </View>
             {/* 效果评价 */}
              <View className="at-row myservice-item">
                <View className="at-col at-col-3 myservice-img">
                <Image className='img-collection' src={`${BASEURL}u1248.svg`} />
                </View>
                <View className="at-col at-col-6">
                  <Text className="myservice-text">效果评价</Text>
                </View>
                <View className="at-col at-col-3 myservice-icon">
                  <View className='at-icon at-icon-chevron-right'/>
                </View>
              </View>
            {/* 体质辨识记录 */}
              <View className="at-row myservice-item">
                <View className="at-col at-col-3 myservice-img">
                <Image className='img-collection' src={`${BASEURL}u1243.svg`} />
                </View>
                <View className="at-col at-col-6">
                  <Text className="myservice-text">体质辨识记录</Text>
                </View>
                <View className="at-col at-col-3 myservice-icon">
                  <View className='at-icon at-icon-chevron-right'/>
                </View>
              </View>
          </View>
        </View>
        </View>
        <TabBar currentTabBarIndex={3}/>
      </View>
    )
  }
}
