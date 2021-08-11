import {Component} from "react";
import {Text, View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import { AtAccordion, AtList } from 'taro-ui'
import {APIBASEURL} from '../../../constants/global'
import './recordDetail.less'
import TabBar from "../../common/tabBar";

export default class RecordDetail extends Component{

  constructor(props) {
    super(props);
    this.state={
      identityContent:'',
      identityTendency:'',
      lbCjbxText:'',//常见表现
      tlQztjText:'',//情志调适
      tlTyfsYsText:'',//饮食调养
      tlTyfsQjText:'',//起居调适
      tlTyfsYdText:'',//运动保健
      open1:false,
      open2:false,
      open3:false,
      open4:false,
      open5:false,
    }
  }

  componentDidMount() {
    Taro.getStorage({
      key: 'itemCode',
      success:(res)=>{
        Taro.request({
          url: `${APIBASEURL}/selectUserTzResultDTO`,
          data:{
            resultItemcode:res.data
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'GET',
          dataType: 'json',
          credentials: 'include',
          success: (res) => {
            let tzDetermine = res.data.data.tzDetermine;
            let tzTendency = res.data.data.tzTendency;
            //显示结果到底是什么体质
            let tzTypes = ['平和质','特禀质','气郁质','血瘀质','湿热质','痰湿质','阴虚质','阳虚质','气虚质'];
            let determineTypes = '';
            let tendencyTypes = '';
            if(tzDetermine !== ''){
              let tzDetermineTypes = tzDetermine.split(',');
              tzDetermineTypes.forEach(function (item) {
                let i = parseInt(item);
                determineTypes = determineTypes + tzTypes[i-1] +' ';
              })
            }
            if (tzTendency !== ''){
              let tzTendencyTypes = tzTendency.split(',');
              tzTendencyTypes.forEach(function (item) {
                let i = parseInt(item);
                tendencyTypes = tendencyTypes + tzTypes[i-1] +' ';
              })
            }
            this.setState({
              identityContent:determineTypes,//是
              identityTendency:tendencyTypes//倾向是
            });

            //根据最终体质显示指导意见
            let types = '';
            if (typeof(tzDetermine) !== 'undefined' && tzDetermine !==''){
              types = tzDetermine;
              if (typeof(tzTendency) !== 'undefined' && tzTendency !==''){
                types = types +','+tzTendency;
              }
            }else if (typeof(tzTendency) !== 'undefined' && tzTendency !==''){
              types = tzTendency;
            }
            if(types !== ''){
              Taro.request({
                url: `${APIBASEURL}/selectKnowledgeTcmTypes?types=${types}`,
                header: {
                  'content-type': 'application/json'
                },
                method: 'GET',
                dataType: 'json',
                credentials: 'include',
                success: (res) => {
                  let lbCjbxText= '';//常见表现
                  let tlQztjText = '';//情志调适
                  let tlTyfsYsText = '';//饮食调养
                  let tlTyfsQjText ='';//起居调适
                  let tlTyfsYdText = '';//运动保健
                  let tlTyfsXwbjTest='';//空位保健
                  res.data.data.forEach(function (item) {
                    lbCjbxText = lbCjbxText+ item.lbCjbx +'。 ';
                    tlQztjText = tlQztjText+ item.tlQztj +'\n';
                    tlTyfsYsText = tlTyfsYsText+ item.tlTyfsYs +'\n';
                    tlTyfsQjText = tlTyfsQjText+ item.tlTyfsQj +'\n';
                    tlTyfsYdText = tlTyfsYdText+ item.tlTyfsYd +'\n';
                    tlTyfsXwbjTest = tlTyfsXwbjTest+ item.tlTyfsXwbj +'\n';
                  });
                  this.setState({
                    lbCjbxText:lbCjbxText,
                    tlQztjText:tlQztjText,
                    tlTyfsYsText:tlTyfsYsText,
                    tlTyfsQjText:tlTyfsQjText,
                    tlTyfsYdText:tlTyfsYdText,
                    tlTyfsXwbjTest:tlTyfsXwbjTest
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
              {this.state.identityContent !== ''? ( <Text className='recordDetail-text'>是：
                <Text className='recordDetail-text-content'>{this.state.identityItems[0].identityContent}</Text>
              </Text>):''}
            </View>
            <View>
              {this.state.identityTendency !== ''? (<Text className='recordDetail-text'>倾向是：
                <Text className='recordDetail-text-content'>{this.state.identityItems[0].identityTendency}</Text>
              </Text>):''}
            </View>
            <View>
              <Text className='recordDetail-text'>主要表现：{this.state.lbCjbxText}</Text>
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
              {this.state.tlQztjText}
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
              {this.state.tlTyfsYsText}
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
              {this.state.tlTyfsQjText}
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
              {this.state.tlTyfsYdText}
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
              {this.state.tlTyfsXwbjTest}
            </AtList>
          </AtAccordion>
        </View>
        <TabBar currentTabBarIndex={3} />
      </View>
    )
  }
}
