import {Component} from "react";

import "./myCollection.less"

import {View,Image,Text,RichText} from "@tarojs/components";

/**
 * 我的收藏内容
 */
export default class MyCollection extends Component{

  constructor(props) {
    super(props);
    this.state={

    }
  }

  toHotHospitalDetail(itemcode){

  }

  render() {
    let myHotSpot = this.props.myHotSpot;
    return(
      <View >
        <View className='at-row at-col-12 home-hot-content'>
          <View className='at-row at-col-12 home-hot-item' onClick={this.toHotHospitalDetail.bind(this, myHotSpot.itemcode)}>
            <View className='at-col at-col-4'>
              <Image
                className='at-article__img hot-item-img'
                src={myHotSpot.filePath}
                mode='aspectFill'
              />
            </View>
            <View className='at-col at-col-8 hot-item-text'>
              <View className='home-hot-text'>
                <View className='home-hot-text-title-name'>
                  <text className='home-hot-text-title'>{myHotSpot.hotspotTitle}</text>
                </View>
                <View className=''>
                  <text className='home-hot-date'>{myHotSpot.itemcreateatString}</text>
                </View>
              </View>
              <Text  className='at-col--wrap home-hot-intro'>{myHotSpot.hotspotContent}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

}
