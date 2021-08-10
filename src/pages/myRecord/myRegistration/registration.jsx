import React,{Component} from 'react'
import Taro from "@tarojs/taro";
import {View, Text, Block} from '@tarojs/components'
import moment from "moment";
import * as utils from '../../common/utils.js'

import './registration.less'

/**
 * 我的挂号（专家号、普通号、适宜技术号）
 */
export default class Registration extends Component{

  constructor (props) {
    super(props)
    this.state = {
      week: '',
      day:''
    }
  }

  componentDidMount () {
    //在页面加载时显示星期几、上午还是下午
    let registration = this.props.registration;
    let formatDate = utils.timeFormatSeconds(registration.registerDate);
    this.setState({
      week: utils.getWeekday(formatDate),
      day: utils.getHalfDay(formatDate)
    })
  }

  toExpensesPage(){
    //跳转到评论页面
    Taro.navigateTo({url:'/pages/myRecord/effectEvaluate'})
  }

  render(){
    let registration = this.props.registration;
    let className = this.props.className;
    let count;
    if(registration.status == '1'){
      count=<View className={className.numberClass}>
              <View>
                <Text className='my-message'>{registration.registerNum}</Text>
              </View>
            </View>
    }else {
      count=<View className={registration.source===null?'my-message2':'my-messageC'}>
              <View  onClick={this.toExpensesPage.bind(this)}>
                <Text className='my-message'>{registration.source===null?'去评价':'已评价'}</Text>
              </View>
            </View>
    }
    return(
      <Block className='card'>
        <View className='my-registration'>
          <View className='registration-item'>
            <View>
              <Text>就诊人：</Text>
              <Text className='my-message'>{registration.patientName}</Text>
            </View>
            <View>
              <Text>就诊机构：</Text>
              <Text className='my-message'>{registration.hospitalName}</Text>
            </View>
            <View>
              <Text>就诊科室：</Text>
              <Text className='my-message'>{registration.deptCode}</Text>
            </View>
            <View>
              <Text>就诊医师：</Text>
              <Text className='my-message'>{registration.doctorName}</Text>
            </View>
            <View>
              <Text>预约时间：</Text>
              <Text className='my-message'>
                {moment(registration.registerDate).format('YYYY-MM-DD')}&nbsp;&nbsp;
                {this.state.week}&nbsp;&nbsp;
                {this.state.day}
              </Text>
            </View>
            <View className={className.stateClass}>
              <View>
                <Text>
                  {registration.registerType==='0'?'普通号':registration.registerType==='1'?'专家号':registration.registerType==='2'?'适宜技术号':''}
                </Text>
              </View>
            </View>
          </View>
            {count}
        </View>
      </Block>
    )
  }
}
