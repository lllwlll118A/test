<template>
    <div class="app-container" style="margin:0;padding:0;">
        <div class="content">
        <!-- 标题 -->
        <div style="display:flex" class="title">
        <div style="flex:0 1 30%">
          <dv-decoration-10 style="height:5px;" />
        </div>
        <div style="flex:0 1 40%">
          <div class="d-flex">
            <dv-decoration-8 style="height:50px;flex:1;" />
            <div style="flex:1;" class="title-name">数据可视化监控</div>
            <dv-decoration-8 :reverse="true" style="height:50px;flex:1" />
          </div>
        </div>
        <div style="flex:0 1 30%">
          <dv-decoration-10 style="height:5px;transform:rotateY(180deg)" />
        </div>
        </div>
        <div class="content-box" >
          <!-- 左边 -->
        <div class="left">
            <div class="left-first3"  v-if="this.electric.length == 3">
                  <!-- 日用电量 -->
                  <div class="left-first-content" >
                    <dv-border-box-13>
                      <div ref="electricByDay" style="width: 100%;height: 100%;"></div>
                    </dv-border-box-13>
                  </div>
                  <!-- 月用电量 -->
                  <div class="left-first-content" >
                    <dv-border-box-13>
                      <div ref="electricByMonth" style="width: 100%;height: 100%;"></div>
                    </dv-border-box-13>
                  </div>
                  <!-- 年用电量 -->
                  <div class="left-first-content" >
                    <dv-border-box-13>
                      <div ref="electricByYear" style="width: 100%;height: 100%;"></div>
                    </dv-border-box-13>
                  </div>
            </div>
            <div class="left-first2"  v-if="this.electric.length == 2">
                  <!-- 月用电量 -->
                  <div class="left-first-content" >
                    <dv-border-box-13>
                      <div ref="electricByMonth" style="width: 100%;height: 100%;"></div>
                    </dv-border-box-13>
                  </div>
                  <!-- 年用电量 -->
                  <div class="left-first-content" >
                    <dv-border-box-13>
                      <div ref="electricByYear" style="width: 100%;height: 100%;"></div>
                    </dv-border-box-13>
                  </div>
            </div>
            <div class="left-first1"  v-if="this.electric.length == 1">
                  <!-- 年用电量 -->
                  <div class="left-first-content">
                    <dv-border-box-13>
                      <div ref="electricByYear" style="width: 100%;height: 100%;"></div>
                    </dv-border-box-13>
                  </div>
            </div>
          
            <div class="left-two">
              <!-- <dv-border-box-13>
                <div class="title"><p >地沟油</p></div>
                <div class="left-two-content-oil-day" style="height: 20%; width: 65%;float: left;margin-left:20px;">
                  <dv-border-box-10>
                    <div class="oil-data">
                      <span>日地沟油</span>
                      <span>1000</span>
                    </div>
                  </dv-border-box-10>
                </div>
                <div class="left-two-content-oil-month" style="height: 20%;width: 65%;float: right;margin-top:10px;margin-right:20px">
                  <dv-border-box-10>
                    <div class="oil-data">
                      <span>月地沟油</span>
                      <span>1000</span>
                    </div>
                  </dv-border-box-10>
                </div>
                <div class="left-two-content-oil-year" style="height: 20%;width: 65%;float: left;margin-top:10px;margin-left:20px">
                  <dv-border-box-10>
                    <div class="oil-data">
                      <span>年地沟油</span>
                      <span>1000</span>
                    </div>
                  </dv-border-box-10>
                </div>
              </dv-border-box-13> -->
            </div>
            <div class="left-three">
              <dv-border-box-13>
                <el-tabs v-model="activeName" @tab-click="switchBy">
                  <el-tab-pane label="按日统计" name="first"  :lazy="true" >
                   <Chart :myxAxis="electrixAxisByDay" :myyAxis="electriyAxisByDay" style="width:100%;height:100%"></Chart>
                  </el-tab-pane>
                  <el-tab-pane label="按月统计" name="second">配置管理</el-tab-pane>
                  <el-tab-pane label="按年统计" name="third">角色管理</el-tab-pane>
                </el-tabs>
               
              </dv-border-box-13>
            </div>
        </div>
         <!-- 中间 -->
        <div class="middle">
          <!-- 地图 -->
          <div class="middle-first">
            <!-- <div class="map" ref="myMap">
              <div></div>
            </div> -->
          </div>
          <div class="middle-two">
             <!-- 柱状图 -->
            <dv-border-box-13>
              <div class="middle-two" ref="bar" style="height:220px;width:100%;margin:0"></div>
            </dv-border-box-13>
          </div>
        </div>
       <!-- 右边 -->
        <div class="right">
         <div class="right-first">
          <dv-border-box-13>
           <div class="title"><p>餐厨垃圾</p></div>
            <div class="right-first-content">
              <div class="photo-ex">
                      <div class="photo-ex-content">
                      <div class="myKey1" style="background:blue"></div>
                      <div class="myKey2">日处理量</div>
                      </div>
                      <div class="photo-ex-text">111</div>
              </div>
              <div class="photo-ex">
                  <div class="photo-ex-content">
                  <div class="myKey1" style="background:green"></div>
                  <div class="myKey2">月处理量</div>
                  </div>
                  <div class="photo-ex-text">1000</div>
              </div>
              <div class="photo-ex">
                  <div class="photo-ex-content">
                  <div class="myKey1" style="background:red"></div>
                  <div class="myKey2">年处理量</div>
                  </div>
                  <div class="photo-ex-text">1000</div>
              </div>
            </div>
          </dv-border-box-13>
         </div>
          <div class="right-two">
            <dv-border-box-13>
           <div class="title"><p>厨余垃圾</p></div>
            <div class="right-first-content">
              <div class="photo-ex">
                      <div class="photo-ex-content">
                      <div class="myKey1" style="background:blue"></div>
                      <div class="myKey2">日处理量</div>
                      </div>
                      <div class="photo-ex-text">111</div>
              </div>
              <div class="photo-ex">
                  <div class="photo-ex-content">
                  <div class="myKey1" style="background:green"></div>
                  <div class="myKey2">月处理量</div>
                  </div>
                  <div class="photo-ex-text">1000</div>
              </div>
              <div class="photo-ex">
                  <div class="photo-ex-content">
                  <div class="myKey1" style="background:red"></div>
                  <div class="myKey2">年处理量</div>
                  </div>
                  <div class="photo-ex-text">1000</div>
              </div>
            </div>
          </dv-border-box-13>
          </div>
          <div class="right-three">
            <dv-border-box-13 style="width:50%;">
              
            </dv-border-box-13>
            <dv-border-box-13 style="width:50%;">
              <!-- 水球 -->
              <div style="height:170px;margin:0 auto;" ref="waterBall">
              </div>
            </dv-border-box-13>
          </div>
          <div class="right-four">
            <dv-border-box-13>
              <dv-scroll-board :config="config"/>
            </dv-border-box-13>
          </div>
        </div>
        </div>
        </div>
       </div>
    </template>
    
    <script>
    import {mapData} from '../../../utils/visualization/mapData.js'
    import Chart from '../../../components/Echarts/Chart'
    import { getElectriNow,getGutteroilNow,getGarbageNow,getStatisticByDay,getStatisticByMonth,getStatisticByYear} from "@/api/cloud/visualization";
    import router from 'vue-router'
    import 'echarts-liquidfill'
    import * as echarts from 'echarts'
    import axios from 'axios'
    export default {
      components:{Chart},
      data(){
        return{
          number:1,
          //实时用电量
          electric:[],
          //按天统计电量
          electricByDay:[],
          electrixAxisByDay:[],
          electriyAxisByDay:[],
          //按月统计电量
          electricByMonth:[],
          electrixAxisByMonth:[],
          electriyAxisByMonth:[],
          //按年统计电量
          electricByYear:[],
        }
        },
      methods:{
        //柱状图
        // barCharts(){
        //   var option
        //   var myChart = this.$echarts.init(this.$refs.bar)
        //   option = {
        //     tooltip: {
        //       trigger: 'axis',
        //       axisPointer: {
        //         type: 'shadow'
        //       }
        //     },
        //     grid: {
        //       left: '3%',
        //       right: '4%',
        //       bottom: '3%',
        //       containLabel: true
        //     },
        //     xAxis: [
        //       {
        //         type: 'category',
        //         data: ['江苏省', '河南省', '浙江省', '江西省', '海南省'],
        //         axisTick: {
        //           alignWithLabel: true
        //         },
        //         axisLine:{
        //           lineStyle:{
        //             color:'#fff'
        //           }
        //         }
        //       }
        //     ],
        //     yAxis: [
        //       {
        //         type: 'value',
        //         max:20,
        //         min:0,
        //         splitNumber:4,
        //         axisLabel:{
        //            textStyle:{
        //             color:'#fff'
        //           }
        //         }
        //       }
        //     ],
        //     series: [
        //       {
        //         name: 'Direct',
        //         type: 'bar',
        //         barWidth: '60%',
        //         itemStyle:{
        //           color:'#1bd3af'
        //         },
        //         data: [3,6,8,12,17]
        //       }
        //     ]
        //   }
        //   myChart.setOption(option)
        // },
       switchBy(tab){
         this.number = tab.index
        },
        //水球图
        // waterBallCharts(){
        //   var option
        //   var myChart = this.$echarts.init(this.$refs.waterBall)
        //   option = {
        //     series:[{
        //       type:'liquidFill',
        //       data:[{'name':'处理水量','value':'0.6'},],
        //       radius:'75%',
        //       label:{
        //         normal:{
        //           formatter:function(param){
        //             console.log(param)
        //             return param.name+'\n' + param.value*100 + '%'
        //           },
        //           fontSize:20
        //         }
        //       },
        //       outline: {
        //         show: true,
        //         borderDistance: 3,
        //         itemStyle:{
        //           borderWidth:4
        //         }
        //       },
        //       backgroundStyle:{
        //         color:'#05081d'
        //       }
        //     }]
        //   }
        //   myChart.setOption(option)
        // },
        // 引入矢量地图
        // mapInto(){
        //       var myChart = this.$echarts.init(this.$refs.myMap)
        //       this.$echarts.registerMap("chinaMap",mapData)
             
        //       let option = {
        //               geo:{
        //                   type:"map",//设置图表类型
        //                   map:"chinaMap",//需与上面echarts.registerMap方法的第一个参数保持一致
        //                   zoom:1.4,
        //                   center: [105, 40],
        //                   roam:true,
        //                   itemStyle:{
        //                     normal: {
        //                       areaColor: '#13295a',
        //                     },
        //                     emphasis:{
        //                       areaColor: '#4e72b8',
        //                     }
        //                   }
        //               },
        //               tooltip:{
        //                 // alwaysShowContent: true,
        //                 formatter:function(params){
        //                   var value = params.value
        //                   // console.log(params)
        //                   // return `<h3>${params.name}</h3>`
        //                 }
        //               },
        //               series:[
        //                 {
        //                   type: "scatter",
        //                   coordinateSystem: "geo",
        //                   zoom:1.4,
        //                   center: [105, 40],
        //                   itemStyle:{
        //                     normal: {//未选中状态
        //                       areaColor: '#13295a',//背景颜色
    
        //                     },
        //                     emphasis:{
        //                        label: {
        //                           show: true,//显示名称
        //                           areaColor: '#4e72b8',
        //                           fontSize:15,
        //                           formatter(v){
        //                             return v.name == "盐城" ? "盐城":"";
        //                           }
        //                     }
        //                     }
        //                   },
        //                   data:this.getPosition(),
        //                 },
                     
        //               ],
        //         }
               
             
        //       //图层同步
        //       myChart.on('chinaMap',function(){
        //           var o = myChart.getOption();//获得option对象
        //           o.geo[0].zoom = o.series[0].zoom
        //           o.geo[0].center = o.series[0].center;//下层的geo的中心位置随着上层geo一起改变
        //           myChart.setOption(o)
        //           console.log(111)
        //       })
        //       myChart.on('click',(params) => {
        //         if(params.name == '盐城'){
        //          console.log("盐城被点击了")
        //         }
        //       })
        //        // 生成图表（地图）
        //       myChart.setOption(option)    
        // },
        //获取指定点坐标
        // getPosition(){
        //   let point = [{
        //     name:'盐城',
        //     value:[120.13,33.38],
        //     selected:false,
        //     // symbol:'../static/position.png',
        //     symbolSize:13
        //   }]
        //   return point
        // },
        //电量仪表盘
        electricBy(myElectric,usedQuantity,myTitle){
          console.log(myElectric)
          var option
          var myChart = echarts.init(myElectric)
          option = {
            series: [
              {
                type: 'gauge',
                min:10,
                max:2000,
                progress: {
                  show: true,
                  width: 15
                },
                axisLine: {
                  lineStyle: {
                    width: 18,
                    color: [
                      [0.3, 'rgb(26,143,255)'],
                      [0.5, 'rgb(23,151,255)'],
                      [0.7, 'rgb(13,213,253)'],
                      [0.8, 'rgb(9,237,253)'],
                      [1, 'rgb(70,100,144)']
                    ],
                  }
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  length: 12,
                  lineStyle: {
                    width: 2,
                    color: '#fff'
                  }
                },
                axisLabel: {
                  show:false,
                },
                anchor: {
                  show: true,
                  showAbove: true,
                  size: 12,
                  itemStyle: {
                    borderWidth: 5
                  }
                },
                title: {
                  show: true,
                  offsetCenter: [0,"110%"],
                  color:'#fff'
                },
                detail: {
                  valueAnimation: true,
                  fontSize: 20,
                  offsetCenter: [0, '75%'],
                  // offsetCenter: [0,"30%"]
                  // formatter:'日用电量'
                },
                data: [
                  {
                    value: usedQuantity,
                    name:myTitle
                  }
                ]
              }
            ]
          }
          myChart.setOption(option)
        },
        //电量api
        getElectriNowList(){
          var params = {site:"1"}
          getElectriNow(params).then(res => {
            this.electric = res.data
            if(this.electric.length == 3){
              // console.log("3")
              this.electricBy(this.$refs.electricByDay,this.electric[2].usedQuantity,'日用电量')
              this.electricBy(this.$refs.electricByMonth,this.electric[1].usedQuantity,'月用电量')
              this.electricBy(this.$refs.electricByYear,this.electric[0].usedQuantity,'年用电量')
            }else if(this.electric.length == 2){
              // console.log("2")
              this.$nextTick(() => {
                this.electricBy(this.$refs.electricByMonth,this.electric[1].usedQuantity,'月用电量')
                this.electricBy(this.$refs.electricByYear,this.electric[0].usedQuantity,'年用电量')
              })
            }else{
              // console.log("1")
              this.electricBy(this.$refs.electricByYear,this.electric[0].usedQuantity,'年用电量')
            }
         
          })
        },
        //电量按日折线图
        async getStatisticByDayList(){
         var params = {site:"1"}
         await getStatisticByDay(params).then(res => {
            this.electricByDay = res.data
         })
         this.electricByDay.map((item) => {
              this.electrixAxisByDay.push(item.date)
              this.electriyAxisByDay.push(item.usedQuantity)
          })
        },
        //电量按月折线图
        async getStatisticByMonthList(){
         var params = {site:"1"}
         await getStatisticByMonth(params).then(res => {
            this.electricByMonth = res.data
         })
         this.electricByMonth.map((item) => {
              this.electrixAxisByMonth.push(item.date)
              this.electriyAxisByMonth.push(item.usedQuantity)
          })
          console.log("this.electrixAxisByMonth",this.electrixAxisByMonth)
        },
        //地沟油的处理
        getGutteroilNowList(){
          var params = {site:"1"}
          getGutteroilNow(params).then(res => {
            console.log("地沟油",res)
          })
        },
        //厨余垃圾api
        getGarbageNowList(){
          //餐厨垃圾
          var params1 = 
          {
            site:"1",
            garbagetype:"1"
          }
          var params2 = 
          {
            site:"1",
            garbagetype:"2"
          }
          getGarbageNow(params1).then(res => {
            console.log("餐厨垃圾",res)
          })
          getGarbageNow(params2).then(res => {
            console.log("厨余垃圾",res)
          })
        },
        
      },
      mounted(){
        setTimeout(() => {
          this.getElectriNowList()
         
          // this.getGutteroilNowList()
          // this.getGarbageNowList()
          this.getStatisticByDayList()
          this.getStatisticByMonthList()
        },300)  
      },
      updated(){
       
      }
    }
    </script>
    <style lang="less">
     @import '../../../assets/styles/visualization.less';
    </style>