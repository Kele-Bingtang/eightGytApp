import {Component} from "react";
import {View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import MyCollection from "./myCollection"
import {APIBASEURL} from "../../../constants/global"
import './index.less'
import TabBar from "../../common/tabBar";

/**
 * 我的
 * 我的收藏
 */
export default class Index extends Component{

  constructor(props) {
    super(props);
    this.state={
      userCode:'',
      //文章
      myHotSpotList:[],
      //药品
      myHotSpotMedicineList: [],
    }
  }

  componentDidMount() {
    Taro.getStorage({
      key: 'itemCode',
      success:(res)=>{
        this.setState({
          userCode:res.data
        });
        Taro.request({
          url: `${APIBASEURL}/myHotSpots/${res.data}`,

          header: {
            'content-type' : 'application/json'
          },
          credentials:"include",
          success:(res)=>{
            this.setState({
              myHotSpotList: res.data.data
            });
          },
          fail:(errp)=>{
            Taro.showToast({
              title:"服务器请求错误",
              icon:"none",
              duration:3000
            })
          }
        });
        Taro.request({
          url: `${APIBASEURL}/myHotSpotsMedicine/${res.data}`,
          header: {
            'content-type' : 'application/json'
          },
          credentials: 'include',
          success: (res) => {
            this.setState({
              myHotSpotMedicineList: res.data.data
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

  render() {
    let {myHotSpotList,myHotSpotMedicineList} = this.state;
    return(
      <View className='index'>
        <View>
          {
            myHotSpotList.map((myHotSpot,index)=>{
              return <MyCollection myHotSpot={myHotSpot} key={index} index={index} />
            })
          }
        </View>


        <TabBar />
      </View>
    )
  }
}
