import {Component} from "react";
import Taro from '@tarojs/taro'

import './index.less'

import RecordExpense from "../recordExpense";
import {APIBASEURL} from "../../../constants/global";

/**
 * 电子病历
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


  render(){
    let {medicalList,defaultPatientName} = this.state;
    return(
      //React 自动new RecordExpense ，并且调用内部的render方法
      <RecordExpense medicalList={medicalList} defaultPatientName={defaultPatientName} medicalRecord='true' />//medicalRecord作为是跳转到费用页面还是跳转到病历页面的判断
    )
  }

}
