import {Component} from 'react'
import {View, Button,Picker} from '@tarojs/components'
import {AtNoticebar,AtList, AtListItem,AtInput} from 'taro-ui'

import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/noticebar.scss";
import "taro-ui/dist/style/components/list.scss";
import moment from "moment";
import TabBar from "../../common/tabBar";

import './addPatient.less'

class AddPatient extends Component {
  constructor() {
    super();
    this.state = {
      idCardSelector: ['居民身份证', '港澳台通行证', '护照'],//证件类型选择器中的值
      sexSelector: ['男','女'],//性别选择器中的值
      maritalStatusSelector:['未婚','已婚','离婚'],//婚姻状况选择器中的值
      relationshipSelector:['本人','父母','爱人','子女','其他'],//关系选择器中的值
      idCardType: '居民身份证',//初始显示的值
      idCardNum:'',
      name:'',
      sex:'选择自己的性别',
      currentDate:moment().format('YYYY-MM-DD').toString(),
      date:'选择出生日期',
      region: ['请选择省市区>'],
      address:'选择居住地址',
      maritalStatus:'选择婚姻状况',
      phoneNum:'',
      relationship:'选择与患者的关系'
    }
  }
  changeIdCardType(e) {//证件类型选择器的回调函数
    this.setState({
      idCardType: this.state.idCardSelector[e.detail.value]
    })
  }

  changeIdCardNum(value){//证件号码输入框的回调函数
    this.setState({
      idCardNum:value
    })
    return this.state.idCardNum;
  }
  changeName(value){//姓名输入框的回调函数
    this.setState({
      name:value
    })
    return value;
  }

  changeSex(e) {//性别选择器的回调函数
    this.setState({
      sex: this.state.sexSelector[e.detail.value]
    })
  }
  changeDate(e) {//出生日期选择器的回调函数
    this.setState({
      date: e.detail.value
    })
  }
  changeAddress(e) {//住址选择器的回调函数
    this.setState({
      address: this.toAddress(e.detail.value),
      region: e.detail.value
    })
  }
  changeMaritalStatus(e) {//婚姻情况选择器的回调函数
    this.setState({
      maritalStatus: this.state.maritalStatusSelector[e.detail.value]
    })
  }
  changePhoneNum(value){//电话号码的回调函数
      this.setState({
        phoneNum:value
      })
      return value;
  }

  changeRelationship(e) {//关系选择器的回调函数
    this.setState({
      relationship: this.state.relationshipSelector[e.detail.value]
    })
  }

  toAddress(e){
    var a='';
    for(var i=0;i<3;i++){
      a+=e[i];
    }
    return a;
  }

  save(){

  }

  render() {
    return (
      <View className="main">
        <AtNoticebar>请进行实名登记</AtNoticebar>
        <View className="input_pad">

          <Picker className='selector' mode='selector' range={this.state.idCardSelector} onChange={this.changeIdCardType.bind(this)}>
            <AtList>
              <AtListItem
                title='证件类型'
                extraText={this.state.idCardType}
              />
            </AtList>
          </Picker>

          <AtInput className='input' name='idCardNum' title='证件号码' type='text' placeholder='请输入证件号码' value={this.state.idCardNum} onChange={this.changeIdCardNum.bind(this)}/>

          <AtInput className='input' name='Name' title='姓名' type='text' placeholder='请输入姓名' value={this.state.name} onChange={this.changeName.bind(this)}/>

          <Picker className='selector' mode='selector' range={this.state.sexSelector} onChange={this.changeSex.bind(this)}>
            <AtList>
              <AtListItem
                title='性别'
                extraText={this.state.sex}
              />
            </AtList>
          </Picker>

          <Picker className='selector' mode='date' end={this.state.currentDate} onChange={this.changeDate.bind(this)}>
            <AtList>
              <AtListItem
                title='出生日期'
                extraText={this.state.date}
              />
            </AtList>
          </Picker>

          <Picker className='selector' mode='region' onChange={this.changeAddress.bind(this)} value={this.state.region}>
            <AtList>
              <AtListItem
                title='住址'
                extraText={this.state.region}
              />
            </AtList>
          </Picker>

          <Picker className='selector' mode='selector' range={this.state.maritalStatusSelector} onChange={this.changeMaritalStatus.bind(this)}>
            <AtList>
              <AtListItem
                title='婚姻状况'
                extraText={this.state.maritalStatus}
              />
            </AtList>
          </Picker>

          <AtInput className='input' name='phoneNum' title='手机号码' type='text' placeholder='请输入手机号码' value={this.state.phoneNum} onChange={this.changePhoneNum.bind(this)}/>

          <Picker className='selector' mode='selector' range={this.state.relationshipSelector} onChange={this.changeRelationship.bind(this)}>
            <AtList>
              <AtListItem
                title='关系'
                extraText={this.state.relationship}
              />
            </AtList>
          </Picker>

          <Button border={false} className='patient-save-btn' formType='submit'>保存</Button>

        </View>
        <TabBar currentTabBarIndex={3} />
      </View>
    )
  }
}

export default AddPatient;
