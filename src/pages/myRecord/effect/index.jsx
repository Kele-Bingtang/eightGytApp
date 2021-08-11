import {Component} from "react";
import {Text, View} from "@tarojs/components";
import {AtTabs, AtTabsPane} from "taro-ui";
import Taro from '@tarojs/taro'
import './index.less';
import {APIBASEURL} from '../../../constants/global'
import TabBar from "../../common/tabBar";

/**
 * 效果评价
 */
export default class Index extends Component{

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      medicalList:[],

    }
  }
  componentDidMount(){
    Taro.getStorage({
      key: 'itemCode',
      success: (res) => {
        Taro.request({
          url: `${APIBASEURL}/selectEvaluate`,
          data: {
            userCode: res.data,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          credentials: 'include',
          success: (res) => {
            this.setState({
              medicalList:res.data.data
            });
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
//切换评价栏，从后台获取信息
  handleClick (value) {
    Taro.getStorage({
      key: 'itemCode',
      success: (res) => {
        Taro.request({
          url: (value === 0 ? `${APIBASEURL}/selectEvaluate` : `${APIBASEURL}/selectNotEvaluate`),
          data: {
            userCode: res.data
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          credentials: 'include',
          success: (res) => {
            this.setState({
              medicalList: res.data.data,
              current: value
            });
            console.log(this.state.medicalList)
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

  toEvaluateMsg(itemCode){
    Taro.navigateTo({
      url: `effectEvaluate?itemCode=${itemCode}`
    })
  }

  render() {
    let medicalList = this.state.medicalList
    const tabList = [{ title: '已评价' }, { title: '未评价' }];
    return(
      <View className='index at-row'>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View className='at-col at-col-12'>
              <View className='at-row'>
                <View className='at-row thead'>
                  <View className='at-col at-col thead'>
                    <Text className='per-name-3'>日期</Text>
                  </View>
                  <View className='at-col at-col thead'>
                    <Text className='per-name-3'>疾病</Text>
                  </View>
                  <View className='at-col at-col thead'>
                    <Text className='per-name-3'>总体评价</Text>
                  </View>
                  <View className='at-col at-col thead'>
                    <Text className='per-name-3'>操作</Text>
                  </View>
                </View>
              </View>

              {
                medicalList.map((medicalItem,index)=>{
                  return(
                    <View className={`${index % 2 === 0 ? 'at-row per-name-4' : 'at-row per-name-5'}`}>
                      <View className='at-row at-row__justify--center medical-evaluate-tbody'>
                        <View className='at-col at-col-3 medical-evaluate-tbody'>
                          <Text className=''>{moment(medicalItem.registerDate).format("YYYY-MM-DD")}</Text>
                        </View>
                        <View className='at-col at-col-3 medical-evaluate-tbody'>
                          <Text className=''>{medicalItem.illness}</Text>
                        </View>
                        <View className='at-col at-col-3 medical-evaluate-tbody'>
                          <Text className=''>{medicalItem.source}</Text>
                        </View>
                        <View className='at-col at-col-3 medical-evaluate-tbody'>
                          <Text className='look' onClick={this.toEvaluateMsg.bind(this, medicalItem.itemcode)}>查看</Text>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
              <View className='at-col at-col-12'>
                <View className='at-row'>
                  <View className='at-row thead'>
                    <View className='at-col at-col thead'>
                      <Text className='per-name-3'>日期</Text>
                    </View>
                    <View className='at-col at-col thead'>
                      <Text className='per-name-3'>疾病</Text>
                    </View>
                    <View className='at-col at-col thead'>
                      <Text className='per-name-3'>总体评价</Text>
                    </View>
                    <View className='at-col at-col thead'>
                      <Text className='per-name-3'>操作</Text>
                    </View>
                  </View>
                </View>

                {
                  medicalList.map((medicalItem,index)=>{
                    return(
                      <View className={`${index % 2 === 0 ? 'at-row per-name-4' : 'at-row per-name-5'}`}>
                        <View className='at-row at-row__justify--center medical-evaluate-tbody'>
                          <View className='at-col at-col-3 medical-evaluate-tbody'>
                            <Text className=''>{moment(medicalItem.registerDate).format("YYYY-MM-DD")}</Text>
                          </View>
                          <View className='at-col at-col-3 medical-evaluate-tbody'>
                            <Text className=''>{medicalItem.illness}</Text>
                          </View>
                          <View className='at-col at-col-3 medical-evaluate-tbody'>
                            <Text className=''>{medicalItem.source}</Text>
                          </View>
                          <View className='at-col at-col-3 medical-evaluate-tbody'>
                            <Text className='look' onClick={this.toEvaluateMsg.bind(this, medicalItem.itemcode)}>查看</Text>
                          </View>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
          </AtTabsPane>
        </AtTabs>
        <TabBar currentTabBarIndex={3} />
      </View>
    )
  }
}
