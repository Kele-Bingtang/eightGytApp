import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import {Picker, Text, View,Button} from '@tarojs/components'
import {AtAvatar, AtIcon,AtForm,AtList,AtListItem,AtInput,AtButton} from 'taro-ui'
import moment from 'moment'
import TabBar from '../../common/tabBar';
import {APIBASEURL} from "../../../constants/global";
import WxValidate from '../../../common/WxValidate'

import './myData.less'

/**
 * 我的
 * 个人信息
 */
export default class PersonData extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      isActive1: true,
      isActive2: false,
      userName: '',
      userPhone: '',
      userIdcard: '',
      userIdcardType: '请选择证件类型',
      userBirth: moment().format('YYYY-MM-DD'),
      userGender: '男',
      avatarUrl: '',
      openid: '',
      name: '',
      phone: '',
      birth: '',
      gender: '',
      selector: ['居民身份证', '港澳台身份证'],
      idcardType: '',
      idcard: '',
      form: {
        userPhone:''
      },
      wxOpenId: ''
    }
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
  }


  componentDidMount(){

    //验证规则函数
    this.initValidate()

    // 从本地缓存中获取用户的 openid
    Taro.getStorage({
      key: 'openid',
      success: (res)=> {
        console.log(res.data.openid);
        // 根据用户的 openid 查询用户信息
        Taro.request({
          url: `${APIBASEURL}/getUserDetail`,
          data:{
            openid: res.data.openid
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'GET',
          dataType: 'json',
          credentials: 'include',
          success: (res) => {
            // 用户信息未补全
            if (res.data.code == 502){
              Taro.showModal({
                title: '提示',
                content: '请正确补全用户信息，否则部分功能无法使用！',
                success: function (res) {
                  if (res.confirm) {
                    // console.log('用户点击确定')
                  } else if (res.cancel) {
                  }
                }
              })
            }

            // 用户信息已补全
            if (res.data.code == 200) {

              console.log('原始用户信息：％o',res.data.data);

              // 组件缓存数据
              this.setState({
                wxOpenId:     res.data.data.wxOpenId,
                userName:     res.data.data.name,
                userGender:   res.data.data.gender,
                userPhone:    res.data.data.mobilephone,
                userBirth:    res.data.data.birth,
                userIdcard:   res.data.data.idcardNo,
                userIdcardType: res.data.data.idcardType ==''?'请选择证件类型':res.data.data.idcardType
              })
            }
            //
            if(this.state.userGender === '男'){
              this.setState({
                isActive1: true,
                userGender: '男'
              })
            }else{
              this.setState({
                isActive2: true,
                isActive1: false,
                userGender: '女'
              })
            }

          },
          fail: function (errMsg) {
            Taro.showToast({
              title: '服务器请求错误!',
              icon: 'none',
              duration: 3000
            })
          }
        });
      }
    })
    //
    Taro.getStorage({
      key: 'userInfo',
      success:(res)=> {
        //console.log(res.data.avatarUrl)
        this.setState({
          avatarUrl: res.data.avatarUrl
        })
      }
    })
  }

  //报错
  showModal(error) {
    Taro.showModal({
      content: error.msg,
      showCancel: false,
    })
  }

  //验证函数
  initValidate() {
    const rules = {
      userName: {
        required: true,
        minlength: 2
      },
      idcard:{
        required: true,
        idcard: true
      },
      userPhone:{
        required: true,
        tel: true
      }
    }
    const messages = {
      userName: {
        required: '请填写姓名',
        minlength:'姓名不能为空'
      },
      idcard:{
        required:'请填写身份证号',
        idcard:'请填写正确的身份证号'
      },
      userPhone:{
        required:'请填写手机号',
        tel:'请填写正确的手机号'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  }

  //港澳台验证函数
  initValidate2() {
    const rules = {
      isHKidcard: {
        required: true,
        isHKidcard: true
      },
      userName: {
        required: true,
        minlength: 2
      },
      userPhone: {
        required: true,
        tel: true
      }
    }
    const messages = {
      userName: {
        required: '请填写姓名',
        minlength: '姓名不能为空'
      },
      isHKidcard: {
        required: '请填写港澳台身份证号',
        isHKidcard: '请填写正确的港澳台身份证号'
      },
      userPhone: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      }
    }

    this.WxValidate = new WxValidate(rules, messages)
  }

  /*修改出生日期*/
  onDateChange = e => {
    this.setState({
      userBirth: e.detail.value
    })
  }

  /*获取修改的电话号码*/
  inputChangePhone(userPhone){
    this.setState({
      userPhone:userPhone
    })
  }

  /*获取修改的名字*/
  inputChangeName(userName){
    this.setState({
      userName: userName
    })
  }

  /*选择证件类型*/
  onChangeIdcardType = e => {
    this.setState({
      userIdcardType: this.state.selector[e.detail.value]
    })
  }

  /*获取修改的证件号码*/
  inputChangeIdcard(idcard){
    this.setState({
      userIdcard: idcard
    })
  }

    /*提交修改*/
    formSubmit = (e) => {
      let params
      //调用验证函数
      if (this.state.userIdcardType != '居民身份证' && this.state.userIdcardType != '请选择类型>'){
        this.initValidate2()
        params = {
          userPhone: this.state.userPhone,
          isHKidcard: this.state.userIdcard,
          userName: this.state.userName
        }
      } else{
        this.initValidate()
        params = {
          userPhone: this.state.userPhone,
          idcard: this.state.userIdcard,
          userName: this.state.userName
        }
      }

      console.log(params);

      //校验表单
      if (!this.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0]
        this.showModal(error)
        return false
      }

      let { wxOpenId } =  this.state

      if(wxOpenId != '' && wxOpenId.length>5){
        //更新用户信息
        Taro.getStorage({
          key:'openid',
          success:res=>{
            this.setState({
              openid: res.data.openid
            })
            Taro.request({
              url: `${APIBASEURL}/updateUserDetail`,
              data: {
                wxOpenId:     this.state.openid,
                name:         this.state.userName,
                gender:       this.state.userGender,
                mobilephone:  this.state.userPhone,
                birth:        this.state.userBirth,
                idcardNo:     this.state.userIdcard,
                idcardType:   this.state.userIdcardType !='请选择证件类型'? this.state.userIdcardType:this.state.userIdcardType
              },
              header: {
                'content-type': 'application/json'
              },
              method: 'PUT',
              dataType: 'json',
              credentials: 'include',
              success: (res) => {
                Taro.navigateTo({url:'/pages/myRecord/index'})
              },
              fail: function (errMsg) {
                Taro.showToast({
                  title: '服务器请求错误!',
                  icon: 'none',
                  duration: 3000
                })
              }
            });
          }
        })
      }
      else{
        //刚开始时注册用户
        Taro.getStorage({
          key:'openid',
          success:(res)=> {
            this.setState({
              openid: res.data.openid
            })
            console.log('openid>>>',this.state.openid)

            Taro.request({
              url: `${APIBASEURL}/users`,
              data:{
                name:       this.state.userName,
                gender:     this.state.userGender,
                birth:      this.state.userBirth,
                mobilephone: this.state.userPhone,
                wxOpenId:   this.state.openid,
                idcardType: this.state.userIdcardType !='请选择证件类型'?this.state.userIdcardType:'',
                idcardNo:   this.state.userIdcard
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: 'POST',
              dataType: 'json',
              credentials: 'include',
              success: (res) => {
                console.log(res)
                if(res.data === '注册成功'){
                  Taro.showToast({
                    title: '用户信息补全成功！',
                    icon: 'none',
                    duration: 3000
                  })
                  Taro.navigateTo({url:'/pages/index/index'})
                }else{
                  Taro.showToast({
                    title: '用户信息补全失败！',
                    icon: 'none',
                    duration: 3000
                  })
                }

              },
              fail: function (errMsg) {
                Taro.showToast({
                  title: '服务器请求错误',
                  icon: 'none',
                  duration: 3000
                })
              }
            });
          }
        })
      }
    }

    handleClick1(){
      const isActive2 = !this.state.isActive2;
      const isActive1 = !this.state.isActive1;
      this.setState({
        isActive2:isActive2,
        isActive1:isActive1,

      });
      if(isActive1 === true){
        this.setState({
          userGender:'男'
        })
      }else{
        this.setState({
          userGender:'女'
        })
      }
    }

    handleClick2(){
      const isActive2 = !this.state.isActive2;
      const isActive1 = !this.state.isActive1;
      this.setState({
        isActive2: isActive2,
        isActive1: isActive1,
      });

      if (isActive2 === true) {
        this.setState({
          userGender: '女'
        })
      } else {
        this.setState({
          userGender: '男'
        })
      }
    }

    render(){
        return (
            <View className='at-row per-content'>
              <AtForm className='at-form' border={false} onSubmit={this.formSubmit.bind(this)}>
                <View className='at-row per-data'>
                  <View className='at-col at-col-12'>
                    {/*头像*/}
                    <View className='at-row per-line'>
                      <View className='at-col at-col__offset-1'>
                        <Text className='per-text'>头像</Text>
                      </View>
                      <View className='at-col col-10 at-col__offset-6 userava'>
                        <AtAvatar circle image={this.state.avatarUrl}></AtAvatar>
                      </View>
                      <View className='at-col at-col-1'>
                        {/*<AtIcon value='chevron-right' color='#a9a9a9'></AtIcon>*/}
                      </View>
                    </View>
                    {/*姓名*/}
                    <View className="at-row per-line">
                      <View className="at-col at-col__offset-1">
                        <Text className='per-text' >姓名</Text>
                      </View>
                      <View className="at-col col-10 at-col__offset-3">
                        <AtInput type='text'
                               className='per-text patient-input-font'
                               name='userName'
                               border={false}
                               value={this.state.userName}
                               placeholder={'请输入姓名'}
                               onChange={this.inputChangeName.bind(this)} />
                      </View>
                      <View className="at-col at-col-1">
                        {/*<AtIcon value='chevron-right' color='#a9a9a9'></AtIcon>*/}
                      </View>
                    </View>
                    {/*性别*/}
                    <View className="at-row per-line">
                      <View className="at-col at-col__offset-1">
                        <Text className='per-text'>性别</Text>
                      </View>
                      <View className="at-col at-col__offset-3">
                        <View className="at-row">
                          <View className="at-col sex-but-center">
                            <AtButton className={this.state.isActive1?'sex-but-hover':'sex-but'} onClick={this.handleClick1}>男</AtButton>
                          </View>
                          <View className="at-col sex-but-center">
                            <AtButton className={this.state.isActive2?'sex-but-hover':'sex-but'} onClick={this.handleClick2}>女</AtButton>
                          </View>
                        </View>
                      </View>
                      <View className="at-col at-col-1">
                        {/*<AtIcon value='chevron-right' color='#a9a9a9'></AtIcon>*/}
                      </View>
                    </View>
                    {/*身份证类型*/}
                    <View className='at-row per-line'>
                      <View className='at-col at-col__offset-1'>
                        <Text className='per-text'>身份证件类型</Text>
                      </View>
                      <View className='at-col'>
                        <View className="at-row idtype-width">
                          <Picker  className='birth-data' mode='selector' range={this.state.selector} onChange={this.onChangeIdcardType}>
                            <AtList>
                              <AtListItem className='per-picker' extraText={this.state.userIdcardType} />
                              <View className='at-col at-col-1 data-icon'>
                                <AtIcon value='chevron-right' color='#a9a9a9' />
                              </View>
                            </AtList>
                          </Picker>
                        </View>
                      </View>
                    </View>
                    {/*证件号码*/}
                    <View className='at-row per-line'>
                      <View className="at-col-2 at-col__offset-1">
                        <Text className='per-text'>证件号码</Text>
                      </View>
                      <View className='at-col col-10 at-col__offset-3 per-text idcard-width'>
                        <AtInput type='idcard'
                                 border={false}
                                 name='idcard'
                                 className='per-text at-list__item item-extra__info patient-input-font'
                                 placeholder={'请输入证件号码'}
                                 value={this.state.userIdcard}
                                 onChange={this.inputChangeIdcard.bind(this)}/>
                      </View>
                      <View className="at-col at-col-1">
                        {/*<AtIcon value='chevron-right' color='#a9a9a9'></AtIcon>*/}
                      </View>
                    </View>
                    {/*出生日期*/}
                    <View className='at-row per-line'>
                      <View className='at-col at-col__offset-1'>
                        <Text className='per-text'>出生日期</Text>
                      </View>
                      <View className='at-col'>
                        <View className="at-row idtype-width">
                          <Picker  className='birth-data' mode='date' start='1900-01-01' onChange={this.onDateChange}>
                            <AtList>
                              <AtListItem className='per-picker' extraText={moment(this.state.userBirth).format('YYYY-MM-DD')} />
                              <View className='at-col at-col-1 data-icon'>
                                <AtIcon value='chevron-right' color='#a9a9a9' />
                              </View>
                            </AtList>
                          </Picker>
                        </View>
                      </View>
                    </View>
                    {/*手机号码*/}
                    <View className='at-row per-line'>
                      <View className="at-col at-col__offset-1">
                        <Text className='per-text'>手机号码</Text>
                      </View>
                      <View className='at-col col-10 at-col__offset-3 per-text idcard-width'>
                        <AtInput type='number'
                                 border={false}
                               name='userPhone'
                               maxlength='11'
                               minlength={11}
                               className='per-text at-list__item item-extra__info patient-input-font'
                               placeholder={'请输入手机号码'}
                               value={this.state.userPhone}
                               onChange={this.inputChangePhone.bind(this)}/>
                      </View>
                      <View className="at-col at-col-1">
                        {/*<AtIcon value='chevron-right' color='#a9a9a9'></AtIcon>*/}
                      </View>
                    </View>
                  </View>
                </View>
                {/*保存按钮*/}
                <View className='at-row person-bac'>
                  <View className='at-col at-col-12 person-but'>
                    <Button className='sava-but' formType='submit'>保存</Button>
                  </View>
                </View>
              </AtForm>
              <TabBar currentTabBarIndex={3} />
            </View>
        );
    }
}


