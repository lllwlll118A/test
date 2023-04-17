<template>
  <div>
    <Chart :myxAxis="xAxisData"></Chart>
  </div>
</template>

<script>
import Chart from '../../../components/Echarts/Chart'
  export default {
    name:'',
    props:[''],
    data () {
      return {
        xAxisData:[1,2]
      };
    },
    components:{
        Chart
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>

</style>