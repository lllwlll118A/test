<template>
  <div class="chart" ref="chart" :style="{width:'100%',height:'100%'}">
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  export default {
    name:'Chart',
    props:{
        myxAxis:{
            type:Array,
            default:()=>[]
        },
        myyAxis:{
            type:Array,
            default:() => []
        }
        },
    data () {
      return {
      
      };
    },
    methods:{
        drawChart(){
            var myChart = echarts.init(this.$refs.chart)
            myChart.setOption({
                grid:{
                    top:'12%',
                    left:'10%',
                    right:'8%',
                    bottom:'15%'
            },
            xAxis: {
              type: 'category',
              data:this.myxAxis,
              axisLabel:{
                color:'#5a85d4'
              },
              
            },
            yAxis: {
              type: 'value',
            //   min:minVal,
            //   max:maxVal,
              splitNumber:5,
            //   interval:interval,
              axisLabel:{
                color:'#5a85d4'
              },
              splitLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#090b20', //坐标轴线颜色
                  width: '2',
                }
                }
            },
            series: [
            {
                data: this.myyAxis,
                type: 'line'
              }
            ]
            })
            
        }
    },
    mounted(){
        this.$nextTick(() => {
            this.drawChart()
            // console.log("1111")
        })
    }
  }

</script>
<style lang='' scoped>

</style>