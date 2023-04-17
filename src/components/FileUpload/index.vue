<template>
	<div class="upload-file">
		<!-- :show-file-list="true" -->
		<el-upload
			multiple
			action="uploadFileUrl"
			:auto-upload="false"
			:before-upload="handleBeforeUpload"
			:http-request="onHttpRequest"
			:file-list="uploadList"
			:limit="limit"
			:on-change="handleChange"
			:on-remove="handleRemove"
			:on-exceed="handleExceed"
			:headers="headers"
			:show-file-list="false"
			:class="[{ hide: fileList.length == 0 }, 'upload-file-uploader']"
			ref="upload"
		>
			<!-- 上传按钮 -->
			<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
			<!-- <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">
				上传到服务器
			</el-button> -->
			<!-- 上传提示 -->
			<div class="el-upload__tip" slot="tip" v-if="showTip">
				请上传
				<template v-if="fileSize">
					大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
				</template>
				<template v-if="fileType">
					格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b>
				</template>
				的文件
			</div>
		</el-upload>

		<!-- 已上传文件列表 -->
		<transition-group
			class="upload-file-list el-upload-list el-upload-list--text"
			name="el-fade-in-linear"
			tag="ul"
		>
			<li
				:key="file.fileId"
				class="el-upload-list__item ele-upload-list__item-content"
				v-for="(file, index) in fileList"
			>
				<el-link :href="`${downloadUrl}${file.fileId}`" :underline="false" target="_blank">
					<span class="el-icon-document"> {{ file.fileName }} </span>
					<!-- <span class="el-icon-document"> {{ getFileName(file.name) }} </span> -->
				</el-link>
				<div class="ele-upload-list__item-content-action">
					<el-link :underline="false" @click="handleDownload(file)" type="primary">下载</el-link>
					<el-link :underline="false" @click="handlePreview(file)" v-if="isPreview(file)" type="primary"
						>查看
					</el-link>
					<!--   -->
					<el-link :underline="false" @click="handleDelete(index, 'fileList')" type="danger">删除</el-link>
				</div>
			</li>
		</transition-group>

		<!-- pdf预览 -->
		<pdf-viewer ref="pdfViewer" />
		<el-image-viewer v-if="showViewer" :on-close="closeImgViewer" :url-list="[imgSrc]" />
		<word-viewer ref="wordViewer" />
	</div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { baseURL } from '@/utils/request'
import { uploadFile } from '@/api/common'
import PdfViewer from '@/components/PdfViewer'
import WordViewer from './WordViewer'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
	name: 'FileUpload',
	model: {
		//自定义双向绑定的prop和事件
		prop: 'bar',
		event: 'foo',
	},
	props: {
		// 值
		bar: [String, Object, Array],
		// 数量限制
		limit: {
			type: Number,
			default: 5,
		},
		// 大小限制(MB)
		fileSize: {
			type: Number,
			default: 20,
		},
		// 文件类型, 例如['png', 'jpg', 'jpeg']
		fileType: {
			type: Array,
			default: () => ['doc', 'xls', 'ppt', 'txt', 'pdf', 'png', 'jpg', 'jpeg'],
		},
		// 是否显示提示
		isShowTip: {
			type: Boolean,
			default: false,
		},
	},
	components: {
		PdfViewer,
		ElImageViewer,
		WordViewer,
	},
	data() {
		return {
			baseUrl: baseURL,
			uploadList: [],
			downloadUrl: baseURL + 'system/download/', // 下载的服务器地址
			headers: {
				Authorization: 'Bearer ' + getToken(),
			},
			fileList: [],
			showViewer: false,
			imgSrc: '',

			maxFileLen: 0,
		}
	},
	watch: {
		bar: {
			handler(val) {
				if (!val) return []
				this.fileList = val.length > 0 ? val : []
			},
			deep: true,
			immediate: true,
		},
	},
	computed: {
		// 是否显示提示
		showTip() {
			return this.isShowTip && (this.fileType || this.fileSize)
		},
	},
	methods: {
		// 上传前校检格式和大小
		handleBeforeUpload(file) {
			console.log('handleBeforeUpload', file)
			// 校检文件类型
			if (this.fileType) {
				let fileExtension = ''
				if (file.name.lastIndexOf('.') > -1) {
					fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
				}
				const isTypeOk = this.fileType.some((type) => {
					if (file.type.indexOf(type) > -1) return true
					if (fileExtension && fileExtension.indexOf(type) > -1) return true
					return false
				})
				if (!isTypeOk) {
					this.$modal.msgError(`文件格式不正确, 请上传${this.fileType.join('/')}格式文件!`)
					return false
				}
			}
			// 校检文件大小
			if (this.fileSize) {
				const isLt = file.size / 1024 / 1024 < this.fileSize
				if (!isLt) {
					this.$modal.msgError(`上传文件大小不能超过 ${this.fileSize} MB!`)
					return false
				}
			}
			this.$modal.loading('正在上传文件，请稍候...')
			return true
		},
		// 文件个数超出
		handleExceed() {
			this.$modal.msgError(`上传文件数量不能超过 ${this.limit} 个!`)
		},
		// 待上传文件删除
		handleRemove(file, fileList) {
			this.uploadList = fileList
		},
		// 删除文件
		handleDelete(index, list) {
			this[list].splice(index, 1)
			if (list == 'fileList') this.$emit('foo', this.fileList)
		},
		// 获取文件名称
		getFileName(name) {
			if (name.lastIndexOf('/') > -1) {
				return name.slice(name.lastIndexOf('/') + 1)
			} else {
				return ''
			}
		},
		// 对象转成指定字符串分隔
		listToString(list, separator) {
			let strs = ''
			separator = separator || ','
			for (let i in list) {
				strs += list[i].url + separator
			}
			return strs != '' ? strs.substr(0, strs.length - 1) : ''
		},
		// 下载附件
		handleDownload({ fileId }) {
			window.open(`${this.downloadUrl}${fileId}`)
		},
		isPreview(file) {
			let fileName = file.fileName
			let suffix = fileName.substring(fileName.lastIndexOf('.') + 1)
			return ['pdf', 'png', 'jpg', 'jpeg', 'bmp', 'jfif', 'gif', 'docx', 'xlsx'].includes(suffix.toLowerCase())
		},
		// 预览附件
		handlePreview(row) {
			let fileName = row.fileName
			let suffix = fileName.substring(fileName.lastIndexOf('.') + 1)
			var fileId = row.fileId
			console.log(`${this.downloadUrl}${fileId}`)
			if (['pdf'].includes(suffix.toLowerCase())) {
				this.$refs.pdfViewer.init(`${this.downloadUrl}${fileId}`)
				// window.open(
				// 	`./pdfJs/web/viewer.html?file=${encodeURIComponent(
				// 		this.downloadUrl
				// 	)}${fileId}&time=${new Date().getTime()}`
				// )
			} else if (['png', 'jpg', 'jpeg', 'bmp', 'jfif', 'gif'].includes(suffix.toLowerCase())) {
				this.imgSrc = `${this.downloadUrl}${fileId}`
				this.showViewer = true
				const m = (e) => {
					e.preventDefault()
				}
				document.body.style.overflow = 'hidden'
				document.addEventListener('touchmove', m, false) // 禁止页面滑动
			} else if (['docx'].includes(suffix.toLowerCase())) {
				this.$refs.wordViewer.init(`${this.downloadUrl}${fileId}`, true)
			} else if (['xlsx'].includes(suffix.toLowerCase())) {
				// this.$refs.wordViewer.init(`${this.downloadUrl}${fileId}`)
				window.open(`./luckySheetJs/index.html?url=${this.downloadUrl}${fileId}`)
			} else {
				this.msgInfo(`${suffix} 格式文件不支持在线预览仅支持，请下载查看！`)
			}
		},
		// 关闭图片预览弹窗
		closeImgViewer() {
			this.showViewer = false
			const m = (e) => {
				e.preventDefault()
			}
			document.body.style.overflow = 'auto'
			document.removeEventListener('touchmove', m, true)
		},

		//监控上传文件列表
		handleChange(file, fileList) {
			// 上传多个文件时，会多次触发这个事件，在队列的最后才调上传接口实现一次选择自动上传多个文件
			let currLength = fileList.length
			// console.log(currLength, this.maxFileLen)
			this.maxFileLen = Math.max(currLength, fileList.length)
			setTimeout(() => {
				// console.log(currLength, this.maxFileLen) 为啥这两个打印出来的结果不一样？？？
				if (currLength != this.maxFileLen) return
				this.uploadList = fileList
				this.submitUpload()
			}, 0)
		},
		// onHttpRequest
		onHttpRequest(r) {
			console.log('http-request', r)
		},
		async submitUpload() {
			console.log('提交上传')
			// 封装数据，开始上传
			let formData = new FormData()
			this.uploadList.forEach((file) => {
				formData.append('file', file.raw)
			})
			const loading = this.$loading({
				text: '文件正在上传,请稍等...',
				customClass: 'file-upload-loading',
			})
			try {
				let { data } = await uploadFile(formData)

				loading.close()
				console.log('上传成功:', data)
				this.fileList = this.fileList.concat(data)
				this.uploadList = []
				this.$refs.upload.clearFiles()
				this.$emit('foo', this.fileList)
			} catch (error) {
				console.log('上传失败:', error)
				loading.close()
			}
		},
	},
}
</script>

<style scoped lang="scss">
.upload-file-uploader {
	margin-bottom: 5px;
}
.upload-file-list .el-upload-list__item {
	border: 1px solid #e4e7ed;
	line-height: 2;
	margin-bottom: 10px;
	position: relative;
}
.upload-file-list .ele-upload-list__item-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: inherit;
	padding-left: 10px;
}
::v-deep .upload-file-list .el-icon-document {
	width: 450px;
	display: block;
	line-height: 1.5em;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.ele-upload-list__item-content-action .el-link {
	margin-right: 10px;
}
</style>
