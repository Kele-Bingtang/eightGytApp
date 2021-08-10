import {Component} from "react";

import './index.less'

import RecordExpense from "../recordExpense";

/**
 * 就诊费用
 */
export default class Index extends Component{

  constructor(props) {
    super(props);
    this.state={
    }
  }



  render(){
    return(
      <RecordExpense />
    )
  }

}
