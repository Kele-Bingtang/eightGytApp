import { Component } from 'react'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { add, minus, asyncAdd } from '../../actions/counter'
import {authorize, getuser} from '../../common/userLogin'

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

  componentDidMount() {
    this.checkUserInfoSession()
  }

  //判断授权登录
  checkUserInfoSession(){

    Taro.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
        new Promise((resolve,reject)=> {
          getuser()
          resolve()
        }).then(()=>{
        })
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        authorize();
      }
    })
  }

  render () {
    return (
      <View className='index'>
        <Header />
        <HomeSwiper />
        <IndexIcon />
        <HomeAdv />
        <HomeHotList />
        <TabBar currentTabBarIndex={0} />
      </View>
    )
  }
}

export default Index

