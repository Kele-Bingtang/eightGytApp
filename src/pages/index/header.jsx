import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
// ui 搜索框

import { AtSearchBar } from 'taro-ui'

import './header.less'

class Header extends Component{

  constructor () {
    super(...arguments)
    this.state = {
      value: ''
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
    return (
      <View>
        <AtSearchBar
          actionName='搜索'
          placeholder='请搜索内容'
          maxLength='50'
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
          className='search-input'
        />
      </View>
    );
  }
}

export default Header