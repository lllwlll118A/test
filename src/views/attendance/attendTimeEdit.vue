<!--
 * @Author: hanq
 * @LastEditors: hanq
 * @Date: 2022-09-06 14:27:38
 * @LastEditTime: 2022-09-14 15:49:58
 * @Description: TO DO
-->
<template>
    <el-drawer
        title="考勤班次编辑"
        :visible.sync="drawerVisible"
        direction="rtl"
        :before-close="handleClose"
        :wrapperClosable="false"
        append-to-body>
        <el-form ref="attendForm" :model="attendTime" :rules="currentRules">
            <el-form-item label="考勤日" prop="weeks">
                <span>{{getDictNameByValue(attendTime.weeks, $store.state.bizDict.attend.weeks) }}</span>
            </el-form-item>
            <el-form-item label="上班时间" prop="startWorkTime">
                <el-time-select :picker-options="options" :disabled="canEdit()" @change="changeStartTime" v-model="attendTime.startWorkTime"></el-time-select>
            </el-form-item>
            <el-form-item label="下班时间" prop="endWorkTime">
                <el-time-select :picker-options="options" :disabled="canEdit()" @change="changeEndTime" v-model="attendTime.endWorkTime"></el-time-select>
            </el-form-item>
             <el-form-item label="上班最多可晚到分钟数" prop="startWorkElasticTime">
                <el-input :disabled="canEdit()" type="number" v-model="attendTime.startWorkElasticTime"></el-input>
            </el-form-item>
            <el-form-item label="下班最多可早走分钟数" prop="endWorkElasticTime">
                <el-input :disabled="canEdit()" type="number" v-model="attendTime.endWorkElasticTime"></el-input>
            </el-form-item>
            <el-form-item label="" prop="lhAutoHoliday">
                <el-checkbox @change="changelhAutoHoliday" v-model="lhAutoHoliday">是否自动排假期</el-checkbox>
            </el-form-item>
            <el-form-item label="" prop="holiday">
                <el-checkbox @change="changeholiday" v-model="holiday" :disabled="attendTime.lhAutoHoliday == 'Y'">是否休息日</el-checkbox>
            </el-form-item>
             <div>
                <el-button size="small" @click="drawerVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="sumbit">保 存</el-button>
            </div>
        </el-form>
        
    </el-drawer>
</template>
<script>
import { getDictNameByValue } from '@/utils/ruoyi'
import {saveAttendTimeSingle} from '@/api/setting/attend'

function validateMin(rule,value,callback){
    console.log(!value)
    if(!value){
        if(value === 0){
            callback()
        }

        callback(new Error('请填写分钟数')) 
    }
    if(value < 0){
        callback(new Error('分钟数不能小于0')) 
    }
    callback()
}

let rules = {
                startWorkTime:[{required:true,trigger:'blur',message:'请选择工作开始时间'}],
                endWorkTime:[{required:true,trigger:'blur',message:'请选择工作结束时间'}],
                startWorkElasticTime:[{required:true,validator:validateMin,trigger:"blur"}],
                endWorkElasticTime:[{required:true,validator:validateMin,trigger:"blur"}],
            }


export default {
    name:"timeEdit",
    data(){
        return {
            options:{start:"00:00",end:"23:30"},
            drawerVisible:false,
            attendTime:{},
            startWorkTime:"",
            endWorkTime:"",
            lhAutoHoliday:null,
            holiday:null,
        }
    },
    computed:{
        currentRules:function(){
            if(this.attendTime.lhAutoHoliday == 'Y'){
                return rules
            }else{
                if(this.attendTime.holiday == 'Y'){
                    return {}
                }else{
                    return rules
                }
            }
        }
    },
    created(){

    },
    methods:{
        canEdit(){
            if(this.attendTime.lhAutoHoliday == 'Y'){
                return false
            }else{
                if(this.attendTime.holiday == 'Y'){
                    return true
                }else{
                    return false
                }
            }

        },
        sumbit(){

            this.$refs['attendForm'].validate(valid=>{
                if(!valid){
                    return
                }
                this.attendTime.startWorkElasticTime = parseInt(this.attendTime.startWorkElasticTime)
                this.attendTime.endWorkElasticTime = parseInt(this.attendTime.endWorkElasticTime)
                saveAttendTimeSingle(this.attendTime).then(res=>{
                    if(res.code == 200){
                        this.$message.success("设置成功")
                        this.drawerVisible = false
                        this.$emit("succ",res.data)
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            })

            
        },
        changeStartTime(val){
            console.log(val)
            if(val){
                this.attendTime.startWorkTime=val
            }else{
                this.attendTime.startWorkTime = null
            }

            
        },
        changeEndTime(val){
            if(val){
                this.attendTime.endWorkTime=val
            }else{
                this.attendTime.endWorkTime=null
            }
            
        },
        changeholiday(val){
            if(val){
                this.attendTime.holiday = "Y"
            }else{
                this.attendTime.holiday = "N"
            }
            this.$nextTick(()=>{
                this.$refs['attendForm'].clearValidate()
            })
        },
        changelhAutoHoliday(val){
            if(val){   
                this.attendTime.lhAutoHoliday = "Y"
            }else{
                this.attendTime.lhAutoHoliday = "N"
            }
            this.$nextTick(()=>{
                this.$refs['attendForm'].clearValidate()
            })
        },
        getDictNameByValue,
        init(detail){
            
            this.attendTime = JSON.parse(JSON.stringify(detail))
            this.drawerVisible = true
            // this.startWorkTime = detail.startWorkTime
            // this.endWorkTime = detail.endWorkTime
            if(detail.lhAutoHoliday == 'Y'){
                this.lhAutoHoliday = true
            }else{
                this.lhAutoHoliday = false
            }
            if(detail.holiday == 'Y'){
                this.holiday = true
            }else{
                this.holiday = false
            }
            this.$nextTick(()=>{
                this.$refs['attendForm'].clearValidate()
            })
            
        },
        handleClose(){
            this.drawerVisible = false
        }
    }
}
</script>