import {Component} from "react";
import Taro from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
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
      identityContent:'',
      identityTendency:''
    }
  }

componentDidMount() {
    console.log(this.state)
    let identityItem = this.state.identityItem;
    let identityDate = identityItem.identityDate;
    let identityCcontent = identityItem.identityContent;
    let identityTendency = identityItem.identityTendency;
    let Types = ['平和质','特禀质','气郁质','血瘀质','湿热质','痰湿质','阴虚质','阳虚质','气虚质'];

    this.setState({
      identityDate: identityDate,
      identityContent: identityCcontent,
      identityTendency: identityTendency,
    })
}

  toRecordDetailPage(){
    Taro.navigateTo({
      url: './recordDetail'
    })
  }

  render() {
    return (
      <View>
        <View className={this.state.className}>
        <View className='recordItem-time'>
          <Text>{this.state.identityDate}</Text>
        </View>
        <View className='recordItem-body'>
          <Text className='recordDetail-text'>是{this.state.identityContent},</Text>
          <Text className='recordDetail-text'>   倾向是{this.state.identityTendency}</Text>
        </View>
        <View className='recordItem-operation' onClick={this.toRecordDetailPage.bind(this)}>
          <Text>查看</Text>
        </View>
        </View>
        <View>
        </View>
        <TabBar currentTabBarIndex={3} />
      </View>
    )
  }
}
