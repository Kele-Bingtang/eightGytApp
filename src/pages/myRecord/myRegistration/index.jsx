import React,{Component} from 'react'
import { View} from '@tarojs/components'
import Registration from "./registration"
import TabBar from "../../common/tabBar";
import './index.less'

/**
 * 我的
 * 我的挂号
 */
export default class Index extends Component{

  constructor(props){
    super(props)
    this.state = {
      registrations:[]
    }
  }

  //获取挂号信息



  render(){
    //获取信息
    let registrations = this.state.registrations;
    return(
      <View className='index-registration'>
        {
          //遍历数组
          registrations.map(function(registration, index){
              let classNames={};
              //判断类型
              switch (registration.registerType) {
                case '1':
                  classNames = {
                    stateClass: 'state',
                    numberClass: 'number state-ord-techno-number card'
                  }
                  break;
                case '0':
                  classNames = {
                    stateClass: 'ord-state',
                    numberClass: 'ord-number state-ord-techno-number card'
                  }
                  break;
                case '2':
                  classNames = {
                    stateClass: 'techno-state',
                    numberClass: 'techno-number state-ord-techno-number card'
                  }
                  break;
              }
              return <Registration registration={registration} key={index} index={index} className={classNames} />;
            }
          )
        }
        <TabBar currentTabBarIndex={3} />
        </View>
    )
  }
}
