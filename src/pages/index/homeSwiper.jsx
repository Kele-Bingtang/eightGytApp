import React, { Component } from 'react'
// 引入 Swiper, SwiperItem 组件
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'
import {BASEURL} from '../../constants/global'

import './homeSwiper.less'
class HomeSwiper extends Component {
  render () {
    return (
     
      <View className="swiper">
        <Swiper
        className='test-h'
        indicatorColor='#fff'
        indicatorActiveColor='#999'
        indicatorDots
        autoplay>
        <SwiperItem>
          <Image className='swiper-image' src={`${BASEURL}/u31.png`}></Image>
        </SwiperItem>
        <SwiperItem>
          <Image className='swiper-image' src={`${BASEURL}/u33.png`}></Image>
        </SwiperItem>
        <SwiperItem>
          <Image className='swiper-image' src={`${BASEURL}/u31.png`}></Image>
        </SwiperItem>
      </Swiper>
      </View>

    )
  }
}

export default HomeSwiper