<!--
 * @Author: hanq
 * @LastEditors: hanq
 * @Date: 2022-09-06 17:23:48
 * @LastEditTime: 2022-09-08 17:00:19
 * @Description: TO DO
-->
<template>
    <el-drawer
        title="特殊考勤设置"
        :visible.sync="specialDrawer"
        direction="rtl"
        :before-close="handleClose"
        :wrapperClosable="false"
        append-to-body>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="add()">新增</el-button>
        <el-table :data="specials">
            <el-table-column label="日期" prop="specialDay"></el-table-column>
            <el-table-column label="打卡类型" prop="specialType">
                <template slot-scope="scope">
                    <span>{{getDictNameByValue(scope.row.specialType,$store.state.bizDict.attend.specialTypes)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="edit(scope.row)">修改</el-button>
					<el-button size="mini" type="text" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <specialEdit @succ="afterEditSpecial" ref="specialEdit"></specialEdit>
    </el-drawer>
</template>
<script>
import {queryAttendSpecial,deleteAttendSpecial} from '@/api/setting/attend'
import specialEdit from './attendSpecialEdit.vue'
import { getDictNameByValue } from '@/utils/ruoyi'
export default {
    name:"specialSet",
    data(){
        return {
            specials:[],
            specialDrawer:false,
            attendId:null,
        }
    },
    components:{
        specialEdit
    },
    methods:{
        getDictNameByValue,
        edit(row){
            this.$refs.specialEdit.init(row,null)
        },
        del(row){
            this.$confirm("确认删除当前记录？").then(()=>{
                deleteAttendSpecial(row.id).then(res=>{
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
        add(){
            this.$refs.specialEdit.init(null,this.attendId)
        },
        handleClose(){
            this.specialDrawer = false
            this.$emit("succ")
        },
        init(attendId){
            this.attendId = attendId
            queryAttendSpecial(attendId).then(res=>{
                this.specials = res.data
                this.specialDrawer = true
            })
        },
        afterEditSpecial(){
            this.init(this.attendId)
        }

    }
}
</script>