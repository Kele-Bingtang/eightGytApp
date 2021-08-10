import {Component} from "react";
import {View} from "@tarojs/components";

import MyCollection from "./myCollection"

import './index.less'
import TabBar from "../../common/tabBar";

/**
 * 我的
 * 我的收藏
 */
export default class Index extends Component{

  constructor(props) {
    super(props);
    this.state={

    }
  }

  render() {
    return(
      <View className='index'>
        <MyCollection />
        <TabBar />
      </View>
    )
  }
}
