import {Component} from 'react'
import {View} from '@tarojs/components'
import './index.less'
import TabBar from '../common/tabBar'

class Index extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View className='main'>
        <View className='Record'>
          <View className='title'>个人基本信息</View>
          <View className='theInfo'>
            <View className='info' style='flex-direction:row'>
              <View className='infoTitle'>姓名：</View>
              <View className='detail'>xxx</View>
            </View>
            <View className='info' style='flex-direction:row'>
              <View className='infoTitle'>性别：</View>
              <View className='detail'>男</View>
            </View>
            <View className='info' style='flex-direction:row'>
              <View className='infoTitle'>出生日期：</View>
              <View className='detail'>xxxx-xx-xx</View>
            </View>
            <View className='info' style='flex-direction:row'>
              <View className='infoTitle'>证件类型：</View>
              <View className='detail'>居民身份证</View>
            </View>
            <View className='info' style='flex-direction:row'>
              <View className='infoTitle'>证件号码：</View>
              <View className='detail'>000000000000000000</View>
            </View>
            <View className='info' style='flex-direction:row'>
              <View className='infoTitle'>文化程度：</View>
              <View className='detail'>xx</View>
            </View>
            <View className='info' style='flex-direction:row'>
              <View className='infoTitle'>户口性质：</View>
              <View className='detail'>xxx</View>
            </View>
            <View className='info' style='flex-direction:row'>
              <View className='infoTitle'>婚姻状况：</View>
              <View className='detail'>xx</View>
            </View>
            <View className='info' style='flex-direction:row'>
              <View className='infoTitle'>民族：</View>
              <View className='detail'>汉</View>
            </View>
            <View className='info' style='flex-direction:row'>
              <View className='infoTitle'>移动号码：</View>
              <View className='detail'>00000000000</View>
            </View>
            <View className='info' style='flex-direction:row'>
              <View className='infoTitle'>出生地：</View>
              <View className='detail'>出生地出</View>
            </View>
            <View className='info' style='flex-direction:row'>
              <View className='infoTitle'>既往患病史：</View>
              <View className='detail'>xxxxx</View>
            </View>
            <View className='info' style='flex-direction:row'>
              <View className='infoTitle'>家族患病史：</View>
              <View className='detail'>xxxxxx</View>
            </View>
            <View className='info' style='flex-direction:row'>
              <View className='infoTitle'>患者与本人关系：</View>
              <View className='detail'>xxxx</View>
            </View>
          </View>
        </View>
        <TabBar currentTabBarIndex={2} />
      </View>

    );
  }
}

export default Index;
