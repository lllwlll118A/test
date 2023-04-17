<!--
 * @Author: hanq
 * @LastEditors: hanq
 * @Date: 2022-09-06 17:23:48
 * @LastEditTime: 2022-09-08 17:00:22
 * @Description: TO DO
-->
<template>
    <el-drawer
        title="特殊考勤日编辑"
        :visible.sync="specialDrawerVisible"
        direction="rtl"
        :before-close="handleClose"
        :wrapperClosable="false"
        append-to-body>
        <el-form ref="specialForm" :model="special" :rules="rules">
            <el-form-item label="特殊日期类型" prop="specialType">
                <el-radio-group v-model="special.specialType">
                    <el-radio label="1">必须打卡</el-radio>
                    <el-radio label="2">无需打卡</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="特殊日期" prop="specialDay">
                <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="special.specialDay"></el-date-picker>
            </el-form-item>
        </el-form>
         <div>
            <el-button size="small" @click="specialDrawerVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="submit">保 存</el-button>
        </div>
    </el-drawer>
</template>
<script>
import {saveAttendSpecial} from '@/api/setting/attend'

export default {
    name:"specialEdit",
    data(){
        return {
            special:{},
            specialDrawerVisible:false,
            rules:{
                specialType:[{required:true,trigger:"blur",message:"请选择特殊日期打卡类型"}],
                specialDay:[{required:true,trigger:"blur",message:"请选择特殊日期"}],
            }
        }
    },
    created(){
    },
    methods:{
        submit(){

            this.$refs['specialForm'].validate(validate=>{

                if(validate){
                    saveAttendSpecial(this.special).then(res=>{
                        if(res.code == 200){

                            this.$message.success("保存成功")
                            this.$emit("succ")
                            this.specialDrawerVisible = false
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                }
            })

            
            
        },
        handleClose(){
            this.specialDrawerVisible = false
        },
        init(special,attendId){
            
            if(special){
                this.special = special
            }else{
                this.special = {attendId:attendId}
            }

            this.$nextTick(()=>{
                this.$refs['specialForm'].clearValidate()
            })
            this.specialDrawerVisible = true
        }

    }
}
</script>