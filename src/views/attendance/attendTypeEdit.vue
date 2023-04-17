<!--
 * @Author: hanq
 * @LastEditors: hanq
 * @Date: 2022-09-06 17:23:48
 * @LastEditTime: 2022-09-08 17:25:52
 * @Description: TO DO
-->
<template>
    <el-drawer
        title="打卡方式编辑"
        :visible.sync="typeDrawerVisible"
        direction="rtl"
        :before-close="handleClose"
        :wrapperClosable="false"
        append-to-body>
        <el-form ref="typeForm" :model="attendType" :rules="rules">
            <template v-if="attendType && attendType.attendType == '1'">
                <el-form-item label="地点打卡地址名称" prop="addressName">
                    <el-input v-model="attendType.addressName" maxlength="256" :show-word-limit="true"></el-input>
                </el-form-item>
                <el-form-item label="经纬度" prop="addressLatitude">
                    <el-button @click="showMap">打卡地点</el-button>
                    <el-input v-if="attendType.addressLatitude && attendType.addressLongitude" :value="attendType.addressLatitude +','+attendType.addressLongitude" disabled size="small"></el-input>
                    <el-input v-else disabled size="small"></el-input>
                </el-form-item>
                <el-form-item label="有效范围" prop="addressRange">
                    <el-select v-model="attendType.addressRange" placeholder="请选择范围">
                        <el-option v-for="item in ranges" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </template>
            <template v-else>
                <el-form-item label="wifi名称" prop="wifiName">
                    <el-input v-model="attendType.wifiName" maxlength="64" :show-word-limit="true"></el-input>
                </el-form-item>
                <el-form-item label="mac地址" prop="wifiMac">
                    <el-input v-model="attendType.wifiMac" maxlength="50" :show-word-limit="true"></el-input>
                </el-form-item>
            </template>
        </el-form>
         <div>
            <el-button size="small" @click="typeDrawerVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="submit">保 存</el-button>
        </div>
        <addressChoose @succ="afterChooseAddress" ref="addressChoose"></addressChoose>
    </el-drawer>
</template>
<script>
import {saveAttendType} from '@/api/setting/attend'
import addressChoose from './map'
export default {
    name:"typeEdit",
    data(){
        return {
            attendType:{},
            typeDrawerVisible:false,
            rules:{
                addressName:[{required:true,trigger:"blur",message:"请填写地点打卡地址名称"}],
                addressLatitude:[{required:true,trigger:"blur",message:"请打开地图选择打卡地点"}],
                addressLongitude:[{required:true,trigger:"blur",message:"请打开地图选择打卡地点"}],
                addressRange:[{required:true,trigger:"blur",message:"请填写有效范围"}],
                wifiName:[{required:true,trigger:"blur",message:"请填写wifi名称"}],
                wifiMac:[{required:true,trigger:"blur",message:"请填写wifi的mac地址"}],
            },
            ranges:[
                {
                    name:"100米",
                    value:100
                },
                {
                    name:"200米",
                    value:200
                },
                {
                    name:"300米",
                    value:300
                },
                {
                    name:"400米",
                    value:400
                },
                {
                    name:"500米",
                    value:500
                },
                {
                    name:"600米",
                    value:600
                },
                {
                    name:"700米",
                    value:700
                },
                {
                    name:"800米",
                    value:800
                },
                {
                    name:"900米",
                    value:900
                },
                {
                    name:"1000米",
                    value:1000
                },
                {
                    name:"2000米",
                    value:2000
                },
                {
                    name:"3000米",
                    value:3000
                },
            ]
        }
    },
    created(){
    },
    components:{
        addressChoose
    },
    methods:{
        submit(){

            this.$refs['typeForm'].validate(validate=>{

                if(validate){
                    saveAttendType(this.attendType).then(res=>{
                        if(res.code == 200){

                            this.$message.success("保存成功")
                            this.$emit("succ")
                            this.typeDrawerVisible = false
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                }
            })

            
            
        },
        afterChooseAddress(val){
            console.log(val)
            this.$set(this.attendType,"addressLatitude",val.lat)
            this.$set(this.attendType,"addressLongitude",val.lng)
            if(val.name){
                this.$set(this.attendType,"addressName",val.name)
            }
            
         
        },
        handleClose(){
            this.typeDrawerVisible = false
        },
        showMap(){
            this.$refs.addressChoose.init()
        },
        init(attendType){
            this.attendType = attendType

            this.$nextTick(()=>{
                this.$refs['typeForm'].clearValidate()
            })
            this.typeDrawerVisible = true
        }

    }
}
</script>