import React, {Component} from 'react'
import {View, Text, Button} from "@tarojs/components";
// eslint-disable-next-line no-unused-vars
import Taro, {getCurrentInstance} from '@tarojs/taro';
import moment from 'moment'

import './detail.less'

export default class MedRecDetail extends Component {

  render() {
    return (
      <View className='detail-layout-one'>
        <View>
          <View className='detail-patient'>
            <Text>{'电子病历-门诊信息'}</Text>
          </View>
          <View>
            <View className='med-line-height'>
              <Text className='detail-title'>就诊机构：</Text>
              {/*{this.state.medicalDatil.visitOrgName}*/}
              <Text className='detail-text'>xxxxxxx</Text>
            </View>
            <View className='med-line-height'>
              <Text className='detail-title'>就诊科室：</Text>
              {/*{this.state.medicalDatil.visitDeptName}*/}
              <Text className='detail-text'>xxxxxxxx</Text>
            </View>
            <View className='med-line-height'>
              <Text className='detail-title'>就诊医师：</Text>
              {/*{this.state.medicalDatil.respDoctorName}*/}
              <Text className='detail-text'>xxxxxxxxx</Text>
            </View>
            <View className='med-line-height'>
              <Text className='detail-title'>就诊时间：</Text>
              {/*{moment(this.state.medicalDatil.visitDtime).format('YYYY-MM-DD')}*/}
              <Text className='detail-text'>xxxxxxxxx</Text>
              {/*{this.state.week}*/}
              <Text className='detail-text'>xxxxxxxxx</Text>
              {/*{this.state.day}*/}
              <Text className='detail-text'>xxxxxxxxx</Text>
            </View>
            <View className='med-line-height'>
              <Text className='detail-title'>门诊诊断：</Text>
              {/*{this.state.medicalDatil.outpatDiagName}*/}
              <Text className='detail-text'>xxxxxxxxx</Text>
            </View>
            <View className='med-line-height'>
              <Text className='detail-title'>诊断日期：</Text>
              {/*{moment(this.state.medicalDatil.diagDate).format('YYYY-MM-DD')}*/}
              <Text className='detail-text'>xxxxxxxxx</Text>
            </View>
            <View>
              <View>
                <Text className='detail-title'>健康问题评估：</Text>
              </View>
              <View>
                {/*{this.state.medicalDatil.healthProblemEval}*/}
                <Text className='detail-text'>xxxxxxxxx</Text>
              </View>
            </View>
          </View>
        </View>
      </View>);
  }
}

