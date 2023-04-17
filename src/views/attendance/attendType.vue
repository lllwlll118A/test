<!--
 * @Author: hanq
 * @LastEditors: hanq
 * @Date: 2022-09-06 17:23:48
 * @LastEditTime: 2022-09-08 17:00:28
 * @Description: TO DO
-->
<template>
    <el-drawer
        title="打卡方式设置"
        :visible.sync="typeDrawer"
        direction="rtl"
        :before-close="handleClose"
        :wrapperClosable="false"
        append-to-body>
         <el-divider content-position="left">地点打卡</el-divider>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="add('1')">新增</el-button>
        <el-table :data="addressList">
            <el-table-column label="打卡地点" prop="addressName"></el-table-column>
            <el-table-column label="纬度" prop="addressLatitude">
            </el-table-column>
            <el-table-column label="经度" prop="addressLongitude">
            </el-table-column>
            <el-table-column label="有效范围(米)" prop="addressRange">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="edit(scope.row)">修改</el-button>
					<el-button size="mini" type="text" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-divider content-position="left">Wifi打卡</el-divider>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="add('2')">新增</el-button>
        <el-table :data="wifiList">
            <el-table-column label="wifi名称" prop="wifiName"></el-table-column>
            <el-table-column label="wifi的mac地址" prop="wifiMac">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="edit(scope.row)">修改</el-button>
					<el-button size="mini" type="text" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <typeEdit @succ="afterEditType" ref="typeEdit"></typeEdit>
    </el-drawer>
</template>
<script>
import {queryAttendType,delAttendType} from '@/api/setting/attend'
import typeEdit from './attendTypeEdit'
export default {
    name:"typeSet",
    data(){
        return {
            addressList:[],
            wifiList:[],
            typeDrawer:false,
            attendId:null,
        }
    },
    components:{
        typeEdit
    },
    methods:{
        edit(row){
            this.$refs.typeEdit.init(row)
        },
        del(row){
            this.$confirm("确认删除当前记录？").then(()=>{
                delAttendType(row.id).then(res=>{
                    if(res.code == 200){
                        this.$message.success("删除成功")
                        this.init(this.attendId)
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            }).catch(()=>{
                console.log("已取消")
            })
        },
        add(type){
            let obj = {attendId:this.attendId,attendType:type}
            this.$refs.typeEdit.init(obj)
        },
        handleClose(){
            this.typeDrawer = false
            this.$emit("succ")
        },
        init(attendId){
            this.attendId = attendId
            queryAttendType(attendId).then(res=>{
                this.addressList = res.data.filter(item=>{
                    return item.attendType == '1'
                })

                this.wifiList = res.data.filter(item=>{
                    return item.attendType == '2'
                })
                this.typeDrawer = true
            })
        },
        afterEditType(){
            this.init(this.attendId)
        }

    }
}
</script>