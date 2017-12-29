import Router from 'next/router'
import {Alert} from './alert'

// 根据路径进行跳转
export function goRouterFunc (pathUrl) {
  alert('1')
  if (window.__wxjs_environment === 'miniprogram') {
    // 判断链接是否对小程序有效
    let result = pathUrl.search(/xiaozao.org/)
    alert(result)
    if (result && result !== '-1') {
      Router.push(pathUrl)
    } else {
      alert('1')
      Alert({ content: '课程正在报名中！获取课程详情、报名课程请联系小助手Harry ( xiaozao906 )' })
    }
  } else {
    location.href = pathUrl
  }
}