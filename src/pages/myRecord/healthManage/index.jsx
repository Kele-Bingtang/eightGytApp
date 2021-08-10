import React, {Component} from "react";
import Taro from '@tarojs/taro'
import {View, Image, Text, Picker} from '@tarojs/components';
import {AtInput, AtForm, AtButton, AtList, AtListItem, AtIcon} from 'taro-ui'

import "./index.less"
import moment from "moment";
import TabBar from "../../common/tabBar";

/**
 * 健康档案
 */
export default class Index extends Component{

  constructor(props) {
    super(props);
    this.state={
      itemCode:'',
      username:'可乐',
      sexMan: true,
      sexWoman: false,
      userGender:'男',
      userBirth:'2021-6-6',
      phone:'164156',
      address:'广西省河池市',
      nation:'汉族',
      selector:['A型', 'B型', 'AB型', 'O型'],
      bloodType:'AB型',
      culture:'本科',
      job:'后端',
      height:'185',
      weight:'62',
      BMI:'6.25'
    }
  }




  handleChange(){

  }

  handleMan(){
    const sexMan = !this.state.sexMan
    const sexWoman = !this.state.sexWoman
    this.setState({
      sexMan:sexMan,
      sexWoman:sexWoman
    })

    if (sexWoman === true) {
      this.setState({
        userGender: '女'
      })
    } else {
      this.setState({
        userGender: '男'
      })
    }

  }

  handleWoman(){
    const sexMan = !this.state.sexMan
    const sexWoman = !this.state.sexWoman
    this.setState({
      sexMan:sexMan,
      sexWoman:sexWoman
    })
    if (sexWoman === true) {
      this.setState({
        userGender: '女'
      })
    } else {
      this.setState({
        userGender: '男'
      })
    }
  }


  // 血型
  onXuexingChangge(e){
    this.setState({
      bloodType:this.state.selector[e.detail.value]
    })
  }

  render(){
    return(
      <View>
        <View className='person-info'>个人基本信息</View>
        <AtForm>
        <View className='input'>
          <AtInput
            className='input-info'
            name='username'
            title='姓名'
            type='text'
            placeholder='用户名'
            value={this.state.username}
            onChange={this.handleChange.bind(this)}
          />
        </View>
        <View className='at-row'>
          <View className="sex-title">
            <Text className='sex-text'>性别</Text>
          </View>
          <View className="at-row">
            <View className="at-col sex-but-center">
              <AtButton className={this.state.sexMan?'sex-but-hover':'sex-but'} onClick={this.handleMan.bind(this)}>男</AtButton>
            </View>
            <View className="at-col sex-but-center">
              <AtButton className={this.state.sexWoman?'sex-but-hover':'sex-but'} onClick={this.handleWoman.bind(this)}>女</AtButton>
            </View>
          </View>
        </View>
          <View className='at-row picker-title'>
            <View className='at-col'>
              <Text className='picker-text'>出生日期</Text>
            </View>
            <View className="at-row at-col-6 picker-picker">
              <Picker  className='birth-data' mode='date' start='1900-01-01' onChange={this.onDateChange}>
                <AtList>
                  <AtListItem className='per-picker' extraText={moment(this.state.userBirth).format('YYYY-MM-DD')} />

                </AtList>
              </Picker>
              <View className='at-col at-col-1 data-icon'>
                <AtIcon value='chevron-right' color='#a9a9a9'  size='16' />
              </View>
            </View>
          </View>
          <View className='input'>
            <AtInput
              className='input-info'
              name='phone'
              title='手机号'
              type='text'
              placeholder='手机号'
              value={this.state.phone}
              onChange={this.handleChange.bind(this)}
            />
          </View>
          <View className='at-row picker-title'>
            <View className='at-col'>
              <Text className='picker-text'>住址</Text>
            </View>
            <View className="at-row at-col-6 picker-picker">
              <Picker  className='birth-data' mode='selector' onChange={this.onDateChange}>
                <AtList>
                  <AtListItem className='per-picker' extraText={this.state.address} />

                </AtList>
              </Picker>
              <View className='at-col at-col-1 data-icon'>
                <AtIcon value='chevron-right' color='#a9a9a9'  size='16' />
              </View>
            </View>
          </View>
          <View className='input'>
            <AtInput
              className='input-info'
              name='nation'
              title='民族'
              type='text'
              placeholder='请输入民族'
              value={this.state.nation}
              onChange={this.handleChange.bind(this)}
            />
          </View>
          <View className='at-row picker-title'>
            <View className='at-col'>
              <Text className='picker-text'>血型</Text>
            </View>
            <View className="at-row at-col-6 picker-picker">
              <Picker  className='birth-data' mode='selector' range={this.state.selector} onChange={this.onXuexingChangge.bind(this)}>
                <AtList>
                  <AtListItem className='per-picker' extraText={this.state.bloodType} />
                </AtList>
              </Picker>
              <View className='at-col at-col-1 data-icon'>
                <AtIcon value='chevron-right' color='#a9a9a9'  size='16' />
              </View>
            </View>
          </View>
          <View className='input'>
            <AtInput
              className='input-info'
              name='culture'
              title='文化程度'
              type='text'
              placeholder='请输入文化程度'
              value={this.state.culture}
              onChange={this.handleChange.bind(this)}
            />
          </View>
          <View className='input'>
            <AtInput
              className='input-info'
              name='job'
              title='职业'
              type='text'
              placeholder='请输入职业'
              value={this.state.job}
              onChange={this.handleChange.bind(this)}
            />
          </View>
          <View className='input'>
            <AtInput
              className='input-info input-info-right'
              name='height'
              title='身高'
              type='text'
              placeholder='请输入身高'
              value={this.state.height}
              onChange={this.handleChange.bind(this)}
            />
            <View className='right-title'>cm</View>
          </View>
          <View className='input'>
            <AtInput
              className='input-info input-info-right'
              name='weight'
              title='体重'
              type='text'
              placeholder='请输入体重'
              value={this.state.weight}
              onChange={this.handleChange.bind(this)}
            />
            <View className='right-title'>kg</View>
          </View>
          <View className='input'>
            <AtInput
              className='input-info'
              name='BMI'
              title='BMI'
              type='text'
              placeholder='系统自动计算'
              value={this.state.BMI}
              onChange={this.handleChange.bind(this)}
            />
          </View>
          <View className='save'>
            <AtButton formType='submit' className='save-button'>保存</AtButton>
          </View>
        </AtForm>
        <TabBar currentTabBarIndex={3} />
      </View>
    )
  }

}
