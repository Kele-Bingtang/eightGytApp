import {Component} from "react";
import {Text, View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import TabBar from "../common/tabBar";

import './recordExpense.less'

/**
 * 电子病历和就诊费用
 * 共用一个界面
 */
export default class RecordExpense extends Component{

  constructor(props) {
    super(props);
    this.state={
      defaultpatientName:'可乐',
      medicalRecord: this.props.medicalRecord
    }
  }


  handleView() {
    if (this.state.medicalRecord === 'true') {
      Taro.navigateTo({url: `/pages/myRecord/eleMedRec/detail?patientName=` + this.state.defaultpatientName})
    } else {
      Taro.navigateTo({url: `/pages/myRecord/medicalExpenses/detail?patientName=` + this.state.defaultpatientName})
    }
  }

  render(){
    return(
      <View className='at-row medical'>
        <View className='at-col at-col-12'>
          <View className='at-row medi-content'>
            <View className='at-row medi-name'>
              <Text className='per-name'>患者姓名:</Text>
              <Text className='per-name-2'>{this.state.defaultpatientName}</Text>
            </View>
          </View>
          <View className='at-row medi-content'>
            <View className='at-row thead'>
              <View className='at-col at-col thead'>
                <Text className='per-name-3'>患者姓名</Text>
              </View>
              <View className='at-col at-col thead'>
                <Text className='per-name-3'>就诊日期</Text>
              </View>
              <View className='at-col at-col thead'>
                <Text className='per-name-3'>操作</Text>
              </View>
            </View>
          </View>

          <View className='at-row medi-content'>
            <View className='at-row tbody'>
              <View className='at-col at-col-4 tbody'>
                <Text className='per-name-4 orgstyle'>可乐</Text>
              </View>
              <View className='at-col at-col-4 tbody'>
                <Text className='per-name-4'>2021-7-8</Text>
              </View>
              <View className='at-col at-col-4 tbody'>
                <Text className='look'
                  onClick={this.handleView.bind(this)}
                >查看</Text>
              </View>
            </View>
          </View>

        </View>
        <TabBar />
      </View>
    )
  }
}
