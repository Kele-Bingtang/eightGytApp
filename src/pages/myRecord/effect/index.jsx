import {Component} from "react";
import {Text, View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import './index.less';
import {AtTabs, AtTabsPane} from "taro-ui";
import TabBar from "../../common/tabBar";

/**
 * 效果评价
 */
export default class Index extends Component{

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,

    }
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }

  toEvaluateMsg(){
    Taro.navigateTo({
      url:'effectEvaluate'
    })
  }

  render() {
    let medicalItem =''
    const tabList = [{ title: '已评价' }, { title: '未评价' }];
    return(
      <View className='index at-row'>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View className="at-col at-col-12">
              <View className="at-row">
                <View className="at-row thead">
                  <View className="at-col at-col thead">
                    <Text className='per-name-3'>日期</Text>
                  </View>
                  <View className="at-col at-col thead">
                    <Text className='per-name-3'>疾病</Text>
                  </View>
                  <View className="at-col at-col thead">
                    <Text className='per-name-3'>总体评价</Text>
                  </View>
                  <View className="at-col at-col thead">
                    <Text className='per-name-3'>操作</Text>
                  </View>
                </View>
              </View>

              <View className='at-row per-name-4'>
                <View className="at-row at-row__justify--center medical-evaluate-tbody">
                  <View className="at-col at-col-3 medical-evaluate-tbody">
                    <Text className=''>2021-8-7</Text>
                  </View>
                  <View className="at-col at-col-3 medical-evaluate-tbody">
                    <Text className=''>{medicalItem.illness}感冒病</Text>
                  </View>
                  <View className="at-col at-col-3 medical-evaluate-tbody">
                    <Text className=''>{medicalItem.source}2.4分</Text>
                  </View>
                  <View className="at-col at-col-3 medical-evaluate-tbody">
                    <Text className='look' onClick={this.toEvaluateMsg.bind(this, medicalItem.itemcode)}>查看</Text>
                  </View>
                </View>
              </View>

              <View className='at-row per-name-5'>
                <View className="at-row at-row__justify--center medical-evaluate-tbody">
                  <View className="at-col at-col-3 medical-evaluate-tbody">
                    <Text className=''>2021-8-7</Text>
                  </View>
                  <View className="at-col at-col-3 medical-evaluate-tbody">
                    <Text className=''>{medicalItem.illness}感冒病</Text>
                  </View>
                  <View className="at-col at-col-3 medical-evaluate-tbody">
                    <Text className=''>{medicalItem.source}2.4分</Text>
                  </View>
                  <View className="at-col at-col-3 medical-evaluate-tbody">
                    <Text className='look' onClick={this.toEvaluateMsg.bind(this, medicalItem.itemcode)}>查看</Text>
                  </View>
                </View>
              </View>

            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
              <View className="at-col at-col-12">
                <View className="at-row">
                  <View className="at-row thead">
                    <View className="at-col at-col thead">
                      <Text className='per-name-3'>日期</Text>
                    </View>
                    <View className="at-col at-col thead">
                      <Text className='per-name-3'>疾病</Text>
                    </View>
                    <View className="at-col at-col thead">
                      <Text className='per-name-3'>总体评价</Text>
                    </View>
                    <View className="at-col at-col thead">
                      <Text className='per-name-3'>操作</Text>
                    </View>
                  </View>
                </View>

                <View className='at-row per-name-4'>
                  <View className="at-row at-row__justify--center medical-evaluate-tbody">
                    <View className="at-col at-col-3 medical-evaluate-tbody">
                      <Text className=''>2021-8-7</Text>
                    </View>
                    <View className="at-col at-col-3 medical-evaluate-tbody">
                      <Text className=''>{medicalItem.illness}感冒病</Text>
                    </View>
                    <View className="at-col at-col-3 medical-evaluate-tbody">
                      <Text className=''>{medicalItem.source}2.4分</Text>
                    </View>
                    <View className="at-col at-col-3 medical-evaluate-tbody">
                      <Text className='look' onClick={this.toEvaluateMsg.bind(this, medicalItem.itemcode)}>查看</Text>
                    </View>
                  </View>
                </View>

                <View className='at-row per-name-5'>
                  <View className="at-row at-row__justify--center medical-evaluate-tbody">
                    <View className="at-col at-col-3 medical-evaluate-tbody">
                      <Text className=''>2021-8-8</Text>
                    </View>
                    <View className="at-col at-col-3 medical-evaluate-tbody">
                      <Text className=''>{medicalItem.illness}咳嗽病</Text>
                    </View>
                    <View className="at-col at-col-3 medical-evaluate-tbody">
                      <Text className=''>{medicalItem.source}2.9分</Text>
                    </View>
                    <View className="at-col at-col-3 medical-evaluate-tbody">
                      <Text className='look' onClick={this.toEvaluateMsg.bind(this, medicalItem.itemcode)}>查看</Text>
                    </View>
                  </View>
                </View>

              </View>
          </AtTabsPane>
        </AtTabs>
        <TabBar currentTabBarIndex={3} />
      </View>
    )
  }
}
