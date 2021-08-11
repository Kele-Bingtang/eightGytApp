import {Component} from "react";
import {Text, View} from "@tarojs/components";
import {AtButton, AtCheckbox, AtInput, AtRate} from "taro-ui";
import Taro from '@tarojs/taro'
import moment from "moment";
import {APIBASEURL} from '../../../constants/global'
import './effectEvaluate.less'
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
      userCode:'',
      date: '',//就诊时间
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
      //获取疾病列表
      disList: [],
      // 匿名评价
      choose: 0,
      // 其他疾病输入框
      disOther: '',
      disease: [],//疾病
    }
    this.checkboxOption = [{
      value:'list1',
      label:'匿名评价'
    }]
  }

  componentDidMount() {
    Taro.getStorage({
      key: 'itemCode',
      success:(res)=>{
        this.setState({
          userCode: res.data
        })
        Taro.request({
          url: `${APIBASEURL}/detailEvaluate`,
          data: {
            itemcode: res.data
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'GET',
          success: (res) => {
            this.setState({
              date: res.data.data.registerDate,
              choose: res.data.data.anonymous,
              stars1: res.data.data.serviceSource,
              stars2: res.data.data.environmentSource,
              stars3: res.data.data.effectSource,
              stars4: res.data.data.overallSource,
            });
            //flag为true为已评价，不显示确定
            if(res.data.data.source !== null&&res.data.data.source !== ''){
              this.setState({
                flag: true
              })
            }
            /*将疾病的按钮状态匹配为true*/
            if (res.data.data.diseaseLists.length) {
              this.setState({
                disList: res.data.data.diseaseLists
              })
              let disListOld = this.state.disList
              let diseaseListOld = this.state.diseaseLists;
              for (let i = 0; i < disListOld.length; i++) {
                for (let k = 0; k < diseaseListOld.length - 1; k++) {
                  if (disListOld[i] === diseaseListOld[k].title) {
                    diseaseListOld[k].selected = true
                    break;
                  }
                  /*将其他疾病text数据写回*/
                  if (JSON.stringify(diseaseListOld).indexOf(`"title":"${disListOld[disListOld.length - 1]}"`) === -1) {
                    diseaseListOld[4].value = disListOld[disListOld.length - 1]
                    diseaseListOld[4].selected = true
                    this.setState({
                      disOther: disListOld[disListOld.length - 1]
                    })
                  }
                }
              }
              /*将疾病列表进行回传显示*/
              this.setState({
                diseaseLists: diseaseListOld
              })
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

  handleChange (value) {
    this.setState({
      checkedList: value
    })
  }

  handleChangeStar (index,value) {
    if(!this.state.flag) {
      if (index == 1) {
        this.setState({
          stars1: value
        })
      }
      if (index == 2) {
        this.setState({
          stars2: value
        })
      }
      if (index == 3) {
        this.setState({
          stars3: value
        })
      }
      if (index == 4) {
        this.setState({
          stars4: value
        })
      }
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

  onChooseDiseaseOther(value){
    let diseaseHistory = [...this.state.diseaseLists];
    this.setState({
      disOther: value
    })
    diseaseHistory[4].selected = true;
    diseaseHistory[4].value = this.state.disOther;

    this.setState({
      diseaseLists: diseaseHistory
    })
  }

  /*提交*/
  onSubmit() {
    for (let i = 0; i < this.state.diseaseLists.length; i++) {
      if (this.state.diseaseLists[i].selected === true) {
        this.state.disease.push(this.state.diseaseLists[i].value)
      }
    }
    Taro.request({
      url: `${APIBASEURL}/updateEvaluate`,
      data: {
        itemcode: this.state.code,
        illness: this.state.disease.join(","),
        anonymous: this.state.choose,
        serviceSource: this.state.stars1,
        environmentSource: this.state.stars2,
        effectSource: this.state.stars3,
        overallSource: this.state.stars4,
      },
      header: {'content-type': 'application/json'},
      method: 'POST',
      success: (res) => {
        Taro.showToast({
          title: '保存成功！',
          icon: 'none',
          duration: 3000
        });
        Taro.redirectTo({url: 'index'})

      },
      fail: function (errMsg) {
        Taro.showToast({
          title: '保存失败！',
          icon: 'none',
          duration: 3000
        })
      }
    })
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
            <Text>{moment(this.state.date).format('YYYY' + '年' + 'MM' + '月' + 'DD' + '日')}</Text>
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
        <View className='evaluate-msg-button'>
          <AtButton type='submit' circle size='normal' className={this.state.flag?'eval-but':'eval-but-show'} onClick={this.onSubmit.bind(this)}>确定</AtButton>
        </View>
        <TabBar currentTabBarIndex={3} />
      </View>
    )
  }
}
