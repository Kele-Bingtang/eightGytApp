import {Component} from "react";
import Taro from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import moment from "moment";
import './identityItems.less'
import TabBar from "../../common/tabBar";

/**
 * 体质辨识记录详细
 */

export default class IdentityItems extends Component {

  constructor(props) {
    super(props);
    this.state={
      identityItem: this.props.identityItem,
      className: this.props.className,
      identityDate:'',
      identityContent:'',//是
      identityTendency:'',//倾向是
    }
  }


  componentDidMount(){
    let identityItem=this.state.identityItem;
    let identityContent = identityItem.tzDetermine;
    let identityTendency = identityItem.tzTendency;
    //显示结果到底是什么体质
    let types = ['平和质','特禀质','气郁质','血瘀质','湿热质','痰湿质','阴虚质','阳虚质','气虚质'];
    let determineTypes = '';
    let tendencyTypes = '';
    if(identityContent !== ''){
      let tzDetermineTypes = identityContent.split(',');
      tzDetermineTypes.forEach(function (item) {
        let i = parseInt(item);
        determineTypes = determineTypes + types[i-1] +' ';
      })
    }
    if (identityTendency !== ''){
      let tzTendencyTypes = identityTendency.split(',');
      tzTendencyTypes.forEach(function (item) {
        let i = parseInt(item);
        tendencyTypes = tendencyTypes + types[i-1] +' ';
      })
    }
    this.setState({
      identityContent:determineTypes,//是
      identityTendency:tendencyTypes//倾向是
    });
  }

  toRecordDetailPage(){
    Taro.navigateTo({
      url: './recordDetail'
    })
  }

  render() {
    let identityItem=this.state.identityItem;
    return (
      <View>
        <View className={this.state.className}>
        <View className='recordItem-time'>
          <Text>{moment(identityItem.tcmRemark).format('YYYY-MM-DD')}</Text>
        </View>
        <View className='recordItem-body'>
          {this.state.identityContent !== '' ? (<Text className='recordDetail-text'>是：{this.state.identityContent}</Text>): ''}
          {this.state.identityTendency !== '' ? (<Text className='recordDetail-text'>倾向是：{this.state.identityTendency}</Text>):''}
        </View>
        <View className='recordItem-operation' onClick={this.toRecordDetailPage.bind(this)}>
          <Text>查看</Text>
        </View>
        </View>
        <View>
        </View>
      </View>
    )
  }
}
