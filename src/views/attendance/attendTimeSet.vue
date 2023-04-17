<!--
 * @Author: hanq
 * @LastEditors: hanq
 * @Date: 2022-09-06 09:40:42
 * @LastEditTime: 2022-09-08 17:00:15
 * @Description: TO DO
-->
<template>
    <el-drawer
        title="考勤时间设置"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        :wrapperClosable="false"
        append-to-body>
        <el-table :data="attendTimes">
            <el-table-column label="工作日" prop="weeks">
                <template slot-scope="scope">
                    <span>{{ getDictNameByValue(scope.row.weeks, $store.state.bizDict.attend.weeks) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="班次时间段">
                <template slot-scope="scope">
                    <span v-if="scope.row.holiday == 'N'">{{scope.row.startWorkTime}}~{{scope.row.endWorkTime}}</span>
                    <span v-else>休息</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(scope.row)">更改班次</el-button>
                </template>
            </el-table-column>
        </el-table>
        <timeEdit @succ="afterTimeEdit" ref="timeEdit"></timeEdit>
    </el-drawer>
</template>
<script>
import {queryAttendTimes} from '@/api/setting/attend'
import { getDictNameByValue } from '@/utils/ruoyi'
import timeEdit from './attendTimeEdit.vue'
export default {
    name:"timeSet",
    data(){
        return{
            drawer:false,
            direction:"rtl",
            attendTimes:[],
            multipleSelection: []
        }
    },
    components:{
        timeEdit
    },
    created(){

    },
    methods:{
        getDictNameByValue,
        handleClose(done) {
            this.drawer = false
            this.$emit('succ')
        },
        init(attendId){
            this.drawer = true

            queryAttendTimes(attendId).then(res=>{
                this.attendTimes = res.data
            })

           
        },
        edit(row){
            this.$refs.timeEdit.init(row)
        },
        afterTimeEdit(data){
            this.init(data.attendId)
        }
    
    }
}
</script>