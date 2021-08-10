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
    let hotItem=''
    return(
      <View >
        <View className='at-row at-col-12 home-hot-content'>
          <View className='at-row at-col-12 home-hot-item' onClick={this.toHotHospitalDetail.bind(this, hotItem.itemcode)}>
            <View className='at-col at-col-4'>
              <Image
                className='at-article__img hot-item-img'
                src={hotItem.filePath}
                mode='aspectFill' />
            </View>
            <View className='at-col at-col-8 hot-item-text'>
              <View className='home-hot-text'>
                <View className='home-hot-text-title-name'>
                  <text className='home-hot-text-title'>{hotItem.hotspotTitle}人参的功效与作用</text>
                </View>
                <View className=''>
                  <text className='home-hot-date'>{hotItem.itemcreateatString}2021-8-7</text>
                </View>
              </View>
              <Text  className='at-col--wrap home-hot-intro'>人参中药学中属于补气药，其药性甘、微
                苦、微温，主入脾，肺，心...</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

}
