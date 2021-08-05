import { Component } from 'react'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'

import { add, minus, asyncAdd } from '../../actions/counter'

import Header from './header'
import HomeSwiper from './homeSwiper'
import IndexIcon from './indexIcon'
import HomeAdv from './homeAdv'
import HomeHotList from './homeHotList'
import TabBar from "../common/tabBar"
import './index.less'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Header/>
        <HomeSwiper/>
        <IndexIcon/>
        <HomeAdv/>
        <HomeHotList/>
        <TabBar currentTabBarIndex={0}/>
      </View>
    )
  }
}

export default Index

