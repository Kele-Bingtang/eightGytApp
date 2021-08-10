import {Component} from 'react'
import Taro from '@tarojs/taro'
import {Text, View, Image} from '@tarojs/components'
import './patientManagerList.less'
import moment from "moment";
import {BASEURL, APIBASEURL} from '../../../constants/global'

/**
 * 就诊人管理内容
 */
export default class PatientManagerList extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      patients: [],
      userCode: '',
      checkedIndex: '',
      checkedList: ['option1']
    }
  }

  //获取用户的就诊人信息
  componentDidMount() {
    Taro.getStorage({
      key: 'itemCode',
      success: (res) => {
        this.setState({
          userCode: res.data
        })
        Taro.request({
          url: APIBASEURL + `/patientManager/${res.data}`,
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: 'GET',
          dataType: 'json',
          credentials: 'include',
          success: (res) => {
            this.setState({
              patients: res.data.data
            })
            //判断是否为默认就诊人
            this.state.patients.forEach((patient, index) => {
              if (patient.defaultPatient === '1') {
                this.setState({
                  checkedIndex: index
                })
              }
            })
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
    });
  }

  //改变radio
  onchangeRadio(indexNum, patientItem) {
    Taro.showModal({
      title: '提示',
      content: `设为默认就诊人！`,
      showCancel: false,
      success: (res) => {
        if (res.confirm) {
          this.changeDefaultPatient(indexNum);
          Taro.request({
            url: `${APIBASEURL}/patientManagerStatus`,
            data: {
              itemcode: patientItem.itemcode,
              userCode: this.state.userCode,
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'PUT',
            dataType: 'json',
            credentials: 'include',
            success: (res) => {
              Taro.showToast({
                title: '默认就诊人设置成功！',
                icon: 'none',
                duration: 3000
              })
            },
            fail: function (errMsg) {
              Taro.showToast({
                title: '服务器请求错误',
                icon: 'none',
                duration: 3000
              })
            }
          });
        } else if (res.cancel) {
        }
      }
    })
  }

  changeDefaultPatient() {
    this.setState({
      checkedIndex: indexNum
    })
  }

  //删除就诊人
  onDeletePatient(itemcode) {
    let code = this.props.userCode
    Taro.showModal({
      title: '提示',
      content: `确定删除？`,
      success: function (res) {
        if (res.confirm) {
          Taro.request({
            url: APIBASEURL + `/patientManager`,
            data: {
              itemcode: itemcode,//就诊人code
              userCode: code,//用户code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: 'DELETE',
            dataType: 'json',
            credentials: 'include',
            success: (res) => {
              Taro.showToast({
                title: '就诊人信息删除成功！',
                icon: 'none',
                duration: 3000
              });
              Taro.redirectTo({url: 'index'})
            },
            fail: function (errMsg) {
              Taro.showToast({
                title: '服务器请求错误',
                icon: 'none',
                duration: 3000
              })
            }
          });
        } else if (res.cancel) {
        }
      }
    })
  }

  //编辑就诊人
  onEditPatient(itemcode) {
    Taro.navigateTo({url: `patientManagerEdit?itemcode=` + itemcode})
  }

  render() {
    return (
      <View>
        {
          this.state.patients.map((patientItem, index) => {
            return (
              <View className='patient-main'>
                <View className='patient-content'>
                  <View className='patient-item'>
                    <Text className='patient-name'>{patientItem.patientName}</Text>
                    <Text className='patient-age'>{moment.year() - moment(patientItem.birthDate).format('yyyy')}岁</Text>
                  </View>
                  <View className='patient-item'>
                    <Text className=''>身份证号：</Text>
                    <Text className=''>{patientItem.idcardNo}</Text>
                  </View>
                  <View className='patient-item patient-address'>
                    <Text>住址：</Text>
                    <Text>{patientItem.adressPro === patientItem.adressCity ? `${patientItem.adressPro}` : `${patientItem.adressPro + patientItem.adressCity}`}{patientItem.adressCountry}{patientItem.adress}</Text>
                  </View>
                  <View className='patient-item at-row patient-edit'>
                    <View className='at-col'>
                      <radio className='patient-radio'
                        color='#855713'
                        value='r1'
                        checked={this.state.checkedIndex === this.state.index}
                        onClick={this.onchangeRadio.bind(this, this.state.index,patientItem)}
                      />
                      <text>默认就诊人</text>
                    </View>
                    <View className='at-col at-col__offset-4'>
                      <Image className='patient-icon' src={BASEURL + 'my_edit.svg'} />
                      <Text onClick={this.onEditPatient.bind(this, patientItem.itemcode)}>编辑</Text>
                    </View>
                    <View className='at-col'>
                      <Image className='patient-icon' src={BASEURL + 'my_delete.svg'} />
                      <Text onClick={this.onDeletePatient.bind(this, patientItem.itemcode)}>删除</Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

}
