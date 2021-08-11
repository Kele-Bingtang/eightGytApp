import {Component} from "react";
import {Text, View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import moment from "moment";
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
      defaultPatientName: this.props.defaultPatientName,
      medicalRecord: this.props.medicalRecord
    }
  }


  handleView() {
    if (this.state.medicalRecord === 'true') {
      Taro.navigateTo({url: `/pages/myRecord/eleMedRec/detail?patientName=` + this.state.defaultPatientName})
    } else {
      Taro.navigateTo({url: `/pages/myRecord/medicalExpenses/detail?patientName=` + this.state.defaultPatientName})
    }
  }

  render(){
    let medicalList = this.props.medicalList;
    return(
      <View className='at-row medical'>
        <View className='at-col at-col-12'>
          <View className='at-row medi-content'>
            <View className='at-row medi-name'>
              <Text className='per-name'>患者姓名:</Text>
              <Text className='per-name-2'>{this.state.defaultPatientName}</Text>
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

          {
            medicalList.map((medical,index)=>{
              return(
                <View className='at-row medi-content'>
                  <View className={index % 2 === 0 ? 'at-row tbody' : 'at-row tbody2'}>
                    <View className={index % 2 === 0 ? 'at-col at-col-4 tbody' : 'at-col at-col-3 tbody2'}>
                      <Text className='per-name-4 orgstyle'>{medical.visitOrgName}</Text>
                    </View>
                    <View className={index % 2 === 0 ? 'at-col at-col-4 tbody' : 'at-col at-col-5 tbody2'}>
                      <Text className='per-name-4'>{moment(medicalItem.visitDtime).format('YYYY-MM-DD')}</Text>
                    </View>
                    <View className={index % 2 === 0 ? 'at-col at-col-4 tbody' : 'at-col at-col-4 tbody2'}>
                      <Text className='look'
                        data-formNo={medicalItem.outpatFormNo}
                        onClick={this.handleView.bind(this)}
                      >查看</Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
        <TabBar tabBarCurrent={3} />
      </View>
    )
  }
}
