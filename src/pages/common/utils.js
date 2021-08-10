/**
 * Created by 张建平 on 2020/十一月/26.
 */
import moment from "moment";

const weekdays = ['周日','周一','周二','周三','周四','周五','周六']

//获得年月日时分秒,去掉中间的t
//传入日期//例：2020-10-27T14:36:23
export const timeFormatSeconds = function(time) {
  var fotmatTime = time ? new Date(time).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') : new Date();
  return fotmatTime;
}

/**
 * 获取周几
 *
 * @param value 日期时间字符串
 * @return {string} 周几（如：周一）
 */
export const getWeekday = (value) => {

	return weekdays[moment(value).day()];
}

/**
 * @param value 日期时间字符串
 * @return {string} 上午或下午
 */
export const getHalfDay = (value) => {
	const hours = moment(value).hours();
	return hours>12 ? '下午' : '上午';
}


