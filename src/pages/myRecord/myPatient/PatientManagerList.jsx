import { Component } from 'react'
import {Text, View,Image} from '@tarojs/components'
import './patientManagerList.less'

import {BASEURL} from '../../../constants/global'

/**
 * 就诊人管理内容
 */
export default class PatientManagerList extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      patients:[],
      userCode:'',
      checkedIndex:'',
      checkedList:['option1']
    }
  }

  //获取用户的就诊人信息


  onchangeRadio(){

  }

  render(){
    return(
      <View className='patient-main'>
        <View className='patient-content'>
          <View className='patient-item'>
            <Text className='patient-name'>可乐</Text>
            <Text className='patient-age'>18岁</Text>
          </View>
          <View className='patient-item'>
            <Text className=''>身份证号：</Text>
            <Text className=''>45272416161566X</Text>
          </View>
          <View className='patient-item patient-address'>
            <Text>住址：</Text>
            <Text>河北省石家庄市桥西区</Text>
          </View>
          <View className='patient-item at-row patient-edit'>
            <View className='at-col'>
              <radio className='patient-radio'
                color='#855713'
                value='r1'
                checked={this.props.checkedIndex === this.props.index}
                onClick={this.onchangeRadio.bind(this, this.props.index)}
              />
              <text>默认就诊人</text>
            </View>
            <View className='at-col at-col__offset-4' >
              <Image className='patient-icon' src={BASEURL+'my_edit.svg'} />
              <text >编辑</text>
            </View>
            <View className='at-col'>
              <Image className='patient-icon' src={BASEURL+'my_delete.svg'} />
              <text>删除</text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
