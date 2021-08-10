import {Component} from "react";

import './index.less'

import RecordExpense from "../recordExpense";

/**
 * 电子病历
 */
export default class Index extends Component{

  constructor(props) {
    super(props);
    this.state={
    }
  }



  render(){
    return(
      <RecordExpense medicalRecord='true' />//medicalRecord作为是跳转到费用页面还是跳转到病历页面的判断
    )
  }

}
