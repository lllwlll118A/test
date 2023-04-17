<!--
 * @Author: dsj
 * @LastEditors: hanq
 * @Date: 2022-07-21 10:11:45
 * @LastEditTime: 2022-09-20 10:50:06
 * @Description: TO DO
-->
<template>
	<div class="app-container">
		<el-form :model="queryParams" ref="queryForm" :inline="true">
			
			<el-form-item>
				<el-date-picker
					size="small"
					v-model="queryParams.startDate"
					value-format="yyyy-MM-dd"
					type="date"
					placeholder="开始时间"
				/>
				~
				<el-date-picker
					size="small"
					v-model="queryParams.endDate"
					value-format="yyyy-MM-dd"
					type="date"
					placeholder="结束时间"
				/>
				
			</el-form-item>
			<el-form-item>
				<el-input size="small" v-model="queryParams.userName" placeholder="姓名" clearable/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" size="small" @click="getDataList(1)">搜索</el-button>
			</el-form-item>

			<el-form-item>
				<!-- <download-excel
					:name="exportFileName"
					:fetch="fetchData"
					:fields="exportFields"
					:before-generate="startDownload"
					:before-finish="finishDownload"
				>
					
					<el-button type="primary" size="small" icon="el-icon-download">导出excel</el-button>
				</download-excel> -->
				<el-button
					type="warning"
					icon="el-icon-download"
					size="mini"
					@click="handleExport"
					v-hasPermi="['oa:userAttend:export']"
					>导出</el-button>
			</el-form-item>
		</el-form>

		<el-table border v-loading="loading" :data="dataList">
			<el-table-column label="姓名" align="center" prop="userName" />
			<el-table-column label="考勤日期" align="center" prop="attendDate" />
			<el-table-column label="上午打卡时间" align="center" prop="startTime" />
			<el-table-column label="上午打卡地点" align="center" prop="startAddressWifi" />
			<el-table-column label="上午打卡状态" align="center" key="startStatus" width="120">
				<template slot-scope="scope">
					<span>{{statusConvert(scope.row.startStatus,$store.state.bizDict.attend.startStatus)}}</span>
				</template>
			</el-table-column>
			<el-table-column label="下午打卡时间" align="center" prop="endTime" />
			<el-table-column label="下午打卡地点" align="center" prop="endAddressWifi" />
			<el-table-column label="下午打卡状态" align="center" key="endStatus" width="120">
				<template slot-scope="scope">
					<span>{{statusConvert(scope.row.endStatus,$store.state.bizDict.attend.endStatus)}}</span>
				</template>
			</el-table-column>
		</el-table>

		<pagination
			v-show="total > 0"
			:total="total"
			:page.sync="queryParams.pageNum"
			:limit.sync="queryParams.pageSize"
			@pagination="getDataList"
		/>
	</div>
</template>

<script>
import { queryGroupAttendListPage,exportGroupAttendList } from '@/api/attendance/attenDance'
import pageMixin from '@/mixin/pagination'
import BizDictSelect from '@/components/BizDictSelect'
import downloadExcel from '@/components/JsonExcel'
import { getDictNameByValue } from '@/utils/ruoyi'

export default {
	name: 'attenDanceData',
	mixins: [pageMixin],
	dicts: ['process_form_type'],
	components: { downloadExcel, BizDictSelect },
	data() {
		return {
			queryParams: {
				urlPageParam: true,
				userName:'',
			},
			exportFields: {},
			exportDataList: [],
			exportLoading: null,
			exportFileName: 'data.xls',
		}
	},
	created() {
		
	},
	methods: {
		statusConvert(status,dicts){
			
			if(status.indexOf("_") != -1){
				return '请假'
			}else{
				return this.getDictNameByValue(status,dicts)
			}
		},
		getDictNameByValue,
		queryPageReq: queryGroupAttendListPage,
		startDownload() {},
		finishDownload() {
			this.exportLoading.close()
		},
		async fetchData() {
			
			// 重新查一下列表，组装表头
			let { data } = await this.queryPageReq(this.queryParams)
			this.dataList = data.list
			this.total = parseInt(data.totalCount)
			this.dataListHandle()

			// 拼文件名
			
			this.exportFileName = `attendance-${this.parseTime(new Date().getTime())}`

			console.log('文件名：', this.exportFileName)

			this.exportLoading = this.$loading({
				text: '正在导出请稍等...',
				background: 'rgba(0, 0, 0, 0.7)',
			})

			try {
				var response = await exportGroupAttendList({
					startDate: this.queryParams.startDate,
					urlPageParam: true,
					endDate: this.queryParams.endDate,
				})
			} catch (error) {}

			this.exportLoading.close()

			// 组装list数据
			let temp = []
			response.data.forEach((e) => {
				let attendWeek = this.$store.state.bizDict.attend.weeks.find((dict) => {
					return dict.dictValue == e.attendWeek
				})
				let startStatus = this.$store.state.bizDict.attend.attentionTypes.find((dict) => {
					return dict.dictValue == e.startStatus
				})
				let endStatus = this.$store.state.bizDict.attend.attentionTypes.find((dict) => {
					return dict.dictValue == e.endStatus
				})
				let tempObj = {
					id: e.id,
					userName: e.userName,
					attendDate: e.attendDate,
					startTime: e.startTime,
					startAddressWifi: e.startAddressWifi,
					startStatus: startStatus,
					endTime: e.endTime,
					endAddressWifi: e.endAddressWifi,
					endStatus: endStatus,
					workTime: e.workTime,
					lateTime: e.lateTime,
					//status: 
				}
				temp.push(tempObj)
			})

			console.log(temp)

			return temp
		},
		// 将表格数据转换成excel导出需要的数据格式
		dataListHandle() {
			// this.exportFields = {
			// 	编号: 'id',
			// 	姓名: 'userName',
			// 	考勤日期: 'attendDate',
			// 	上午打卡时间: 'startTime',
			// 	上午打卡地点: 'startAddressWifi',
			// 	上午打卡状态: 'startStatus',
			// 	下午打卡时间: 'endTime',
			// 	下午打卡地点: 'endAddressWifi',
			// 	下午打卡状态: 'endStatus',
			// }
			// console.log('组装表头:', this.exportFields)
		},
		/** 导出按钮操作 */
		handleExport() {
			const queryParams = this.queryParams;
			this.$confirm('是否确认导出考勤记录?', "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(function() {
					exportGroupAttendList(queryParams).then(()=>{})
				})
		}
		
	},
}
</script>

<style scoped lang="scss">
</style>
