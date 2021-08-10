import React, {Component} from 'react'
import {View, Text, Image} from "@tarojs/components";
import './expenseDetail.css'
import Taro, {getCurrentInstance} from "@tarojs/taro";

class Detail extends Component {
  $instance = getCurrentInstance();

  constructor(props) {
    super(props);
    this.state = {
      patientName: this.$instance.router.params.patientName
    }
  }

  render() {
    return (
        <View className='cost-bg-two'>
          <View className='cost' style='flex-direction:column;'>
            <View className='cost-item-title'>{this.state.patientName}-就诊费用</View>
            <View className='cost-item'>
              <View className='detail-margin'>
                <Text className='detail-title'>就诊机构：</Text>
                {/*{costItem.visitOrgName}*/}
                <Text className='detail-text'>xxxxxxxx</Text>
              </View>
              <View className='detail-margin'>
                <Text className='detail-title'>就诊科室：</Text>
                {/*{costItem.visitDeptName}*/}
                <Text className='detail-text'>xxxxxxxx</Text>
              </View>
              <View className='detail-margin'>
                <Text className='detail-title'>就诊医生：</Text>
                {/*{costItem.respDoctorName}*/}
                <Text className='detail-text'>xxxxxxxx</Text>
              </View>
              <View className='detail-margin'>
                <Text className='detail-title'>价项名称：</Text>
                {/*{costItem.specifications}*/}
                <Text className='detail-text'>xxxxxxxxx</Text>
              </View>
              <View className='detail-margin'>
                <Text className='title-padding'>单价：</Text>
                {/*{costItem.price}*/}
                <Text className='detail-text'>xxxxxxxxxx</Text>
              </View>
              <View className='detail-margin'>
                <Text className='title-padding'>数量：</Text>
                {/*{costItem.num}*/}
                <Text className='detail-text'>xxxxxxxxxxx</Text>
              </View>
              <View className='detail-margin'>
                <Text className='detail-title'>门诊费用：</Text>
                {/*{costItem.outpatSelfPayment}*/}
                <Text className='detail-text'>xxxxxxxxxxxxx</Text>
                {/*{costItem.visitDtime != null ? moment(costItem.visitDtime).format('YYYY-MM-DD') : ''}*/}
                <Text
                  className='detail-date'>xxxxxxxxxx</Text>
              </View>
            </View>
          </View>
        </View>
    );
  }
}

export default Detail;
