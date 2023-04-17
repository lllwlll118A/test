<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-08-30 09:51:04
 * @LastEditTime: 2022-08-31 17:57:45
 * @Description: TO DO
-->
<template>
	<el-dialog title="文档预览" :visible.sync="dialogVisible" width="90vw">
		<!-- wordx -->
		<div id="wordView" ref="wordView" v-if="isWord" />
		<!-- excel查看详情 -->
		<div id="excelView" ref="excelView" v-else v-html="excelData">
			<!-- <el-table :data="excelData" style="width: 100%" border max-height="500px">
				<el-table-column
					align="center"
					v-for="(value, key, index) in excelData[2]"
					:key="index"
					:prop="key"
					:label="key"
				/>
			</el-table> -->
		</div>
	</el-dialog>
</template>

<script>
// import { utils, read } from 'xlsx'
var docx = require('docx-preview')
import axios from 'axios'

export default {
	name: 'WordViewer',
	data() {
		return {
			isWord: '',
			vHtml: '',
			dialogVisible: false,
			excelData: [],
		}
	},
	created() {
		// 具体函数调用位置根据情况而定
	},
	methods: {
		init(filrUrl, isWord) {
			this.dialogVisible = true
			this.isWord = isWord
			if (isWord) {
				this.readWord(filrUrl)
			} else {
				this.readExcel(filrUrl)
			}
		},
		//  读取docx
		readWord(url) {
			axios({
				method: 'get',
				responseType: 'blob', // 因为是流文件，所以要指定blob类型
				url,
			})
				.then(({ data }) => {
					if (data.type == 'application/json') {
						const reader = new FileReader() //创建一个FileReader实例
						reader.readAsText(data, 'utf-8') //读取文件,结果用字符串形式表示
						reader.onload = () => {
							//读取完成后,**获取reader.result**
							const { msg } = JSON.parse(reader.result)
							this.$message.warning(msg) //弹出错误提示
							this.dialogVisible = false
						}
					} else {
						docx.renderAsync(data, this.$refs.wordView) // 渲染到页面
					}
				})
				.catch((err) => {
					this.$message.error('网络异常')
					this.dialogVisible = false
				})
		},
		// 读取excel
		async readExcel(url) {
			/* Download from https://sheetjs.com/pres.numbers */
			console.log(url)
			var xhr = new XMLHttpRequest()
			xhr.open('get', url, true)
			xhr.responseType = 'arraybuffer'
			let _this = this
			xhr.onload = function (e) {
				if (xhr.status === 200) {
					var data = new Uint8Array(xhr.response)
					var workbook = XLSX.read(data, { type: 'array' })
					console.log('workbook', workbook)
					var sheetNames = workbook.SheetNames // 工作表名称集合
					_this.workbook = workbook
					_this.getTable(sheetNames[0])
				}
			}
			xhr.send()
		},
		getTable(sheetName) {
			console.log(sheetName)
			var worksheet = this.workbook.Sheets[sheetName]
			this.excelData = XLSX.utils.sheet_to_json(worksheet)
			console.log(this.excelData)
		},
	},
}
</script>

<style scoped lang="scss">
#wordView,
#excelView {
	width: 100%;
	min-height: 70vh;
}
</style>
