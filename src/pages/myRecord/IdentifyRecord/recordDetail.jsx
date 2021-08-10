import {Component} from "react";
import {Text, View} from "@tarojs/components";
import { AtAccordion, AtList } from 'taro-ui'
import './recordDetail.less'
import TabBar from "../../common/tabBar";

export default class RecordDetail extends Component{

  constructor(props) {
    super(props);
    this.state={
      identityItems:[
        {
          identityDate:'2016-10-01',
          identityContent:'平和质',
          identityTendency:'阴虚质',
          identityText:'面色、肤色润泽，头发较密，目光有神，不易疲劳，精力充沛，耐受寒热，睡眠良好，胃纳佳，二便正常，舌色淡红、苔薄白，脉和缓有力'
        }],
      open1:false,
      open2:false,
      open3:false,
      open4:false,
      open5:false,
    }
  }

  componentDidMount() {

  }

  toSeeRecord(){

  }

  handleClick1(){
    this.setState({
      open1: !this.state.open1
    })
  }
  handleClick2(){
    this.setState({
      open2: !this.state.open2
    })
  }
  handleClick3(){
    this.setState({
      open3: !this.state.open3
    })
  }
  handleClick4(){
    this.setState({
      open4: !this.state.open4
    })
  }
  handleClick5(){
    this.setState({
      open5: !this.state.open5
    })
  }

  render() {
    return(
      <View className='RecordDetail'>
        <View className='RecordDetail'>
          <View className='recordDetail-head'>
            <Text onClick={this.toSeeRecord.bind(this)}>查看填写记录</Text>
          </View>
          <View className='recordDetail-card'>
            <View>
              <Text className='recordDetail-body'>你的体质为：</Text>
            </View>
            <View className='recordDetail-item'>
              <Text className='recordDetail-text'>是：
                <Text className='recordDetail-text-content'>{this.state.identityItems[0].identityContent}</Text>
              </Text>
            </View>
            <View>
             <Text className='recordDetail-text'>倾向是：
              <Text className='recordDetail-text-content'>{this.state.identityItems[0].identityTendency}</Text>
             </Text>
            </View>
            <View>
              <Text className='recordDetail-text'>主要表现：{this.state.identityItems[0].identityText}</Text>
            </View>
          </View>
          <View className='recordDetail-head2'>
            <Text>指导意见：</Text>
          </View>
          <AtAccordion
            open={this.state.open1}
            onClick={this.handleClick1.bind(this)}
            title='情志调适'
            icon={{ value: 'heart', color: 'white', size: '15' }}
            className='AtAccordion'
            isAnimation={false}
          >
            <AtList hasBorder={false} className='content-list'>
             可乐
            </AtList>
          </AtAccordion>
          <AtAccordion
            open={this.state.open2}
            onClick={this.handleClick2.bind(this)}
            title='饮食调养'
            icon={{ value: 'star', color: 'white', size: '15' }}
            className='AtAccordion'
            isAnimation={false}
          >
            <AtList hasBorder={false} className='content-list'>
              可乐
            </AtList>
          </AtAccordion>
          <AtAccordion
            open={this.state.open3}
            onClick={this.handleClick3.bind(this)}
            title='起居调适'
            icon={{ value: 'star', color: 'white', size: '15' }}
            className='AtAccordion'
            isAnimation={false}
          >
            <AtList hasBorder={false} className='content-list'>
              可乐
            </AtList>
          </AtAccordion>
          <AtAccordion
            open={this.state.open4}
            onClick={this.handleClick4.bind(this)}
            title='运动保健'
            icon={{ value: 'star', color: 'white', size: '15' }}
            className='AtAccordion'
            isAnimation={false}
          >
            <AtList hasBorder={false} className='content-list'>
              可乐
            </AtList>
          </AtAccordion>
          <AtAccordion
            open={this.state.open5}
            onClick={this.handleClick5.bind(this)}
            title='穴位保健'
            icon={{ value: 'star', color: 'white', size: '15' }}
            className='AtAccordion'
            isAnimation={false}
          >
            <AtList hasBorder={false} className='content-list'>
              可乐
            </AtList>
          </AtAccordion>
        </View>
        <TabBar currentTabBarIndex={3} />
      </View>
    )
  }
}
