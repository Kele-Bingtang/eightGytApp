import {Component} from "react";
import {Text, View} from "@tarojs/components";

import './effectEvaluate.less'
import {AtButton, AtCheckbox, AtInput, AtRate} from "taro-ui";
import TabBar from "../../common/tabBar";

/**
 * 效果评价
 * 评价内容
 */
export default class EffectEvaluate extends Component{

  constructor(props) {
    super(props);
    this.state={
      checkedList: ['list1'],
      flag: false,
      // 疾病列表
      diseaseLists: [
        {
          title: '高血压',
          value: '高血压',
          selected: false
        }, {
          title: '肺结核',
          value: '肺结核',
          selected: false
        }, {
          title: '感冒',
          value: '感冒',
          selected: false
        }, {
          title: '咳嗽',
          value: '咳嗽',
          selected: false
        }, {
          title: '其他',
          value: '',
          selected: false
        }],
      stars1: 0,
      stars2: 0,
      stars3: 0,
      stars4: 0,
    }
    this.checkboxOption = [{
      value:'list1',
      label:'匿名评价'
    }]
  }


  handleChange (value) {
    this.setState({
      checkedList: value
    })
  }

  handleChangeStar (index,value) {
    if(index == 1){
      this.setState({
        stars1: value
      })
    }
    if(index == 2){
      this.setState({
        stars2: value
      })
    }
    if(index == 3){
      this.setState({
        stars3: value
      })
    }
    if(index == 4){
      this.setState({
        stars4: value
      })
    }
  }

  onChooseDisease(index){
    if(!this.state.flag){
      let diseaseItem = this.state.diseaseLists
      diseaseItem[index].selected = !diseaseItem[index].selected
      this.setState({
        diseaseLists: diseaseItem
      })
    }
  }

  onChooseDiseaseOther(){

  }

  render() {
    let disItem = this.state.diseaseLists
    return(
      <View className='effectEvaluate'>
        <View className='at-row at-row--wrap'>
          <View className='at-col at-col-12 effectEvaluate-top'>
            <Text className='effectEvaluate-top-title'>就诊记录</Text>
          </View>
          <View className='check'>
            <AtCheckbox className='check-box'
              options={this.checkboxOption}
              selectedList={this.state.checkedList}
              onChange={this.handleChange.bind(this)}
            />
          </View>
        </View>
        {/*选择疾病*/}
        <View className='effectEvaluate-disease'>
          <View className='effectEvaluate-disease-date'>
            <Text>2021-8-8</Text>
          </View>
          <View className='at-row at-row--wrap'>
            <Text className='at-row effectEvaluate-disease-title'>所患疾病</Text>
            {
              disItem.map((diseaseItem, index) => {
                return (
                  <View className='effectEvaluate-disease-date-choose'>
                    <AtButton
                      className={[ (diseaseItem.selected === true) ? 'btn-checked' : 'btn']}
                      circle
                      size='small'
                      key={index}
                      onClick={this.onChooseDisease.bind(this, index)}
                    >
                      {diseaseItem.title}
                    </AtButton>
                  </View>
                );
              })
            }
          </View>
          <View className='evaluate-msg-disease-input'>
            <AtInput
              name='disOther'
              type='text'
              placeholder='其他疾病请输入'
              value={this.state.disOther}
              onChange={this.onChooseDiseaseOther.bind(this)}
              disabled={this.state.flag}
            />
          </View>
        </View>
      {/* 进行评价 */}
      <View className='effectEvaluate-box'>
        <View className='effectEvaluate-box-title'>
          <Text>请您对本次就诊进行评价</Text>
        </View>
        <View className='at-row effectEvaluate-item'>
          <Text className='effectEvaluate-title'>服务态度</Text>
          <AtRate
            size='25'
            value={this.state.stars1}
            onChange={this.handleChangeStar.bind(this,1)}
          />
        </View>
        <View className='at-row effectEvaluate-item'>
          <Text className='effectEvaluate-title'>诊疗环境</Text>
          <AtRate
            size='25'
            value={this.state.stars2}
            onChange={this.handleChangeStar.bind(this,2)}
          />
        </View>
        <View className='at-row effectEvaluate-item'>
          <Text className='effectEvaluate-title'>诊疗效果</Text>
          <AtRate
            size='25'
            value={this.state.stars3}
            onChange={this.handleChangeStar.bind(this,3)}
          />
        </View>
        <View className='at-row effectEvaluate-item'>
          <Text className='effectEvaluate-title'>总体评价</Text>
          <AtRate
            size='25'
            value={this.state.stars4}
            onChange={this.handleChangeStar.bind(this,4)}
          />
        </View>
      </View>
        <TabBar currentTabBarIndex={3} />
      </View>
    )
  }
}
