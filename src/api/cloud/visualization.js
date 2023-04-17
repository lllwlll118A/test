import request from '@/utils/request'
//获取实时电量
export function getElectriNow(data){
  return request({
    url:'/electric/statisticNow',
    method: 'POST',
    data:data,
  })
}
//按天统计电量
export function getStatisticByDay(data){
  return request({
    url:'/electric/statisticByDay',
    method: 'POST',
    data:data,
  })
}
//按月统计电量
export function getStatisticByMonth(data){
  return request({
    url:'/electric/statisticByMonth',
    method: 'POST',
    data:data,
  })
}
//按年统计电量
export function getStatisticByYear(data){
  return request({
    url:'/electric/statisticByYear',
    method: 'POST',
    data:data,
  })
}
//获取实时地沟油
export function getGutteroilNow(data){
    return request({
      url:'/gutteroil/statisticNow',
      method: 'POST',
      data:data,
    })
}
//获取实时餐厨/厨余垃圾
//1 餐厨垃圾 2 厨余垃圾
export function getGarbageNow(data){
    return request({
      url:'/gutteroil/statisticNow',
      method: 'POST',
      data:data,
    })
}
