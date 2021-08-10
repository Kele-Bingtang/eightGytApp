import {Component} from 'react'
import {View,Button} from '@tarojs/components'
import Taro from "@tarojs/taro";
import PatientManagerList from "./patientManagerList";
import TabBar from '../../common/tabBar'

import './index.less'

/**
 * 我的
 * 就诊人管理
 */
export default class MyPatient extends Component{

  constructor(props){
    super(props)
    this.state={

    }
  }

  addInfo(){
    Taro.navigateTo({url:'/pages/myRecord/myPatient/addPatient'});
  }

  render(){
    return(
      <View className='patient-msg'>
        <PatientManagerList />
        <View className='patient-manager-btn'>
          <Button className='patient-add-btn' onClick={this.addInfo.bind(this)}>添加就诊人</Button>
        </View>
        <TabBar currentTabBarIndex={3} />
      </View>
    )
  }
}
