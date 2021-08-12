import {View} from '@tarojs/components';
import {Component} from 'react';
import './healthKnowledge.less';
import Taro from "@tarojs/taro";
import TabBar from '../../common/tabBar'
import {FILEURL1,FILEURL2} from '../../../constants/global';


class HealthKnowledge extends Component {

  /*附件的下载*/
getFile(value){
  /*下载文件*/
  Taro.downloadFile({
    url: value,
    /*下载成功*/
    success: function (res) {
      var filePath=res.tempFilePath
      Taro.openDocument({
        filePath: filePath,/*提供一个路径*/
        success: function (res) {
          console.log("文件原路径",value);
          console.log("文件临时路径",filePath);
          console.log('打开文档成功')
        }
      })
    }
  })
}

  render(){
    return(
      <View>
        {/* 健康管理规范头部 */}
        <View className='at-row at-col-12 hea-kno-head'>
          <View className='at-row at-col at-col-10 at-row--wrap'>
            <View className='at-col-12 hea-kno-title'>中医药健康管理服务规范 </View>

            {/*<View><Img id="u446_img" className="img " src="images/收藏.png"/></View>*/}


            <View className='at-col-12 hea-kno-source'>河北省中医药管理局</View>
            <View className='at-col-12 hea-kno-date'>
              <text>2020-09-17</text>
              <text className='hea-kno-time'>11:02:17</text>
            </View>
          </View>
        </View>

        {/*健康管理内容*/}
        <View className='hea-kno-content'>
          <View>老年人中医药健康管理服务</View>
          <View>一、服务对象</View>
          <View>辖区内 65 岁及以上常住居民</View>
          <View>二、服务内容</View>
          <View>每年为 65 岁及以上老年人提供 1 次中医药健康管理服务，内容包括中医体</View>
          <View>质辨识和中医药保健指导。</View>
          <View>（一）中医体质辨识</View>
          <View>按照老年人中医药健康管理服务记录表前 33 项问题采集信息，根据体质判</View>
          <View>定标准进行体质辨识，并将辨识结果告知服务对象。</View>
          <View>（二）中医药保健指导</View>
          <View>根据不同体质从情志调摄、饮食调养、起居调摄、运动保健、穴位保健等方</View>
          <View>面进行相应的中医药保健指导。</View>
          <View>四、服务要求</View>
          <View>（一）开展老年人中医药健康管理服务可结合老年人健康体检和慢性病患者</View>
          <View>管理及日常诊疗时间。</View>
          <View>（二）开展老年人中医药健康管理服务的乡镇卫生院、村卫生室和社区卫生</View>
          <View>服务中心（站）应当具备相应的设备和条件。有条件的地区应利用信息化手段开</View>
          <View>展老年人中医药健康管理服务。</View>
          <View>（三）开展老年人中医体质辨识工作的人员应当为接受过老年人中医药知识</View>
          <View>和技能培训的卫生技术人员。开展老年人中医药保健指导工作的人员应当为中医</View>
          <View>类别执业（助理）医师或接受过中医药知识和技能专门培训能够提供上述服务的</View>
          <View>其他类别医师（含乡村医生）。</View>
          <View>（四）服务机构要加强与村（居）委会、派出所等相关部门的联系，掌握辖</View>
          <View> 区内老年人口信息变化。</View>
          <View>（五）服务机构要加强宣传，告知服务内容，使更多的老年人愿意接受服务。</View>
          <View>（六）每次服务后要及时、完整记录相关信息，纳入老年人健康档案。</View>
          <View>五、工作指标</View>
          <View>（一）老年人中医药健康管理率＝年内接受中医药健康管理服务的 65 岁及</View>
          <View>以上居民数/年内辖区内 65 岁及以上常住居民数×100％。</View>
          <View>注：接受中医药健康管理是指建立了健康档案、接受了中医体质辨识、中医</View>
          <View>药保健指导、服务记录表填写完整。</View>
        </View>

        {/* 健康管理附件下载*/}
        <View className='at-row at-row--wrap hea-kno-annex'>
          <View className='at-col at-col-12'>附件：</View>
          <View className='at-col at-col-12 hea-kno-annex-item' onClick={this.getFile.bind(this,`${FILEURL1}`)}>1.老年人中医药健康管理服务记录表</View>
          <View className='at-col at-col-12 hea-kno-annex-item' onClick={this.getFile.bind(this,`${FILEURL2}`)}>2.体质判定标准表</View>
        </View>
        <TabBar  tabBarCurrent={0} />
      </View>
    );

  }
}


export default HealthKnowledge;
