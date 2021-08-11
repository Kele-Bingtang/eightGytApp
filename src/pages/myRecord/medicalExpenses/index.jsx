import {Component} from "react";

import './index.less'

import RecordExpense from "../recordExpense";
import Taro from "@tarojs/taro";
import {APIBASEURL} from "../../../constants/global";

/**
 * 就诊费用
 */
export default class Index extends Component{

  constructor(props) {
    super(props);
    this.state={
      medicalList: [],
      defaultPatientName: '',
    }
  }

  componentDidMount() {
    Taro.getStorage({
      key: 'openid',
      success:(res) => {
        Taro.request({
          url: `${APIBASEURL}/getUserDetail`,
          data:{
            openid: res.data.openid
          },
          header:{
            'content-type':'application/json'
          },
          credentials:"include",
          success:(res)=>{
            this.setState({
              defaultPatientName:res.data.data.name
            })
            this.getMedicalList (res.data.data.idcardNo);
          },
          fail:(erro)=>{
            Taro.showToast({
              title:'服务器请求错误',
              icon:"none",
              duration:3000
            })
          }
        })
      }
    })
  }

  getMedicalList = (idcardNo)=>{
    Taro.request({
      url: `${APIBASEURL}/medRecordList`,
      data:{
        idcardNo: idcardNo
      },
      header:{
        'content-type':'application/json'
      },
      credentials:"include",
      success:(res)=>{
        this.setState({
          medicalList: res.data.data,
        })
      },
      fail:(erro)=>{
        Taro.showToast({
          title:'服务器请求错误',
          icon:"none",
          duration:3000
        })
      }
    })
  }

  handleView() {
    if (this.state.medicalRecord === 'true') {
      Taro.navigateTo({url: `/pages/myRecord/eleMedRec/detail?patientName=` + this.state.defaultPatientName})
    } else {
      Taro.navigateTo({url: `/pages/myRecord/medicalExpenses/detail?patientName=` + this.state.defaultPatientName})
    }
  }

  render(){
    let {medicalList,defaultPatientName} = this.state;
    return(
      <RecordExpense medicalList={medicalList} defaultPatientName={defaultPatientName} medicalRecord='false' />//medicalRecord作为是跳转到费用页面还是跳转到病历页面的判断

    )
  }

}
