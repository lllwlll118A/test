<!--
 * @Author: hanq
 * @LastEditors: hanq
 * @Date: 2022-09-01 17:05:30
 * @LastEditTime: 2022-09-08 09:56:12
 * @Description: TO DO
-->
<template>
    <div class="app-container">
        <el-form :model="attend">
            <el-form-item label="考勤组名称" prop="attendName">
                <el-input clearable size="small" v-model="attend.attendName" maxlength="30" disabled></el-input>
            </el-form-item>
            <el-form-item label="考勤人员" prop="attendUserSummary">
                <el-button type="primary" size="small" @click="selecUser">设置</el-button>
                <div v-if="attend.attendUserSummary">
                    <p>参与考勤人员：{{attend.attendUserSummary}}</p>
                </div>
            </el-form-item>
            <el-form-item label="考勤时间" prop="attendTimeSummary">
                <el-button type="primary" size="small" @click="setAttendTime">设置</el-button>
                <div v-if="attend.attendTimeSummary">
                    <!-- <p>考勤类型：固定班制</p> -->
                    <p>工作日：{{attend.attendTimeSummary}}</p>
                </div>
            </el-form-item>
            <el-form-item label="特殊考勤日期" prop="attendSpecialSummary">
                <el-button type="primary" size="small" @click="setAttendSpecial">设置</el-button>
                <div v-if="attend.attendSpecialSummary">
                    <p>考勤日：{{attend.attendSpecialSummary}}</p>
                </div>
            </el-form-item>
            <el-form-item label="打卡方式" prop="attendTypeSummary">
                <el-button type="primary" size="small" @click="setAttendType">设置</el-button>
                <div v-if="attend.attendTypeSummary">
                    <p>考勤方式：地点打卡、WIFI打卡</p>
                    <p v-html="attend.attendTypeSummary">
                    </p>
                </div>
                
            </el-form-item>
            <el-form-item>
                <el-button @click="back()">返回</el-button>
                <!-- <el-button type="primary">保存</el-button> -->
            </el-form-item>
        </el-form>
        <!-- 可见范围选择用户对话框 -->
        <user-select @succ="afterSelectUser" ref="userSelect" />
        <timeSet @succ="afterSetTime" ref="timeSet"></timeSet>
        <special @succ="afterSpecialSet" ref="special"></special>
        <typeSet @succ="afterTypeSet" ref="typeSet"></typeSet>
    </div>
    
</template>
<script>
import {attendDetail,queryAttendUsers} from "@/api/setting/attend"
import UserSelect from './userSelect'
import timeSet from './attendTimeSet'
import special from './attendSpecial'
import typeSet from './attendType'
export default {
    name:'attandanceGroupDetail',
    data(){
        return{
            attend:{}
        }
    },
    components: { UserSelect ,timeSet,special,typeSet},
    created(){
        
       this.detail(this.$route.query.id)

    },
    methods:{
        back(){
            this.toPage("attendanceGroup",{},true)
        },
        detail(id){
            attendDetail(id).then(res=>{
                this.attend = res.data
            })
        },
        selecUser(){
            queryAttendUsers(this.attend.id).then(res=>{
                if(res.data){
                    let ids = new Array()
                    res.data.forEach(element => {
                        ids.push(element.userId)
                    })
                    this.$refs.userSelect.init(ids,this.attend)
                }
            })
            
        },
        afterSelectUser(){
            // console.log("ids:"+ids)
            // console.log("userNames:"+userNames)
            
            // let attend = JSON.parse(JSON.stringify(this.attend))
            // attend.attendUserSummary = userNames

            // let array = new Array()

            // ids.forEach(id=>{
            //     let obj = {}
            //     obj.userId = id
            //     obj.attendId = attend.id
            //     array.push(obj)
            // })
            // attend.attendUsersList = array
            // saveAttendUsers(attend).then(res=>{
            //     if(res.code == 200){
            //          this.$message.success("设置成功")
            //          this.attend = res.data
            //     }else{
            //         this.$message.error(res.msg)
            //     }
            // })


            this.detail(this.attend.id)

        },
        setAttendTime(){
            this.$refs.timeSet.init(this.attend.id)
        },
        afterSetTime(){
            this.detail(this.attend.id)
        },
        afterSpecialSet(){
            this.detail(this.attend.id)
        },
        setAttendSpecial(){
            this.$refs.special.init(this.attend.id)
        },
        setAttendType(){
            this.$refs.typeSet.init(this.attend.id)
        },
        afterTypeSet(){
            this.detail(this.attend.id)
        },
    }
}
</script>