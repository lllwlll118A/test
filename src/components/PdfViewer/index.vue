<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-08-25 14:29:52
 * @LastEditTime: 2022-08-30 16:14:27
 * @Description: TO DO
-->
<template>
	<el-dialog
		top="0"
		title="文件预览"
		:visible.sync="dialogVisible"
		custom-class="pdf-preview-dialog"
		width="90vw"
		append-to-body
		:close-on-click-modal="false"
		@closed="onClosed"
		fullscreen
		destroy-on-close
	>
		<iframe width="100%" id="pdfFrame" :src="pdfSrc" frameborder="0" />
	</el-dialog>
</template>

<script>
export default {
	name: 'PdfViewer',
	data() {
		return {
			dialogVisible: false,
			pdfSrc: '',
		}
	},
	methods: {
		init(url) {
			console.log(url)
			// var url = `https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/calrgb.pdf`
			this.dialogVisible = true
			this.pdfSrc = `./pdfJs/web/viewer.html?file=${encodeURIComponent(url)}&time=${new Date().getTime()}`
		},
		onClosed() {
			this.pdfSrc = ''
		},
	},
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog.pdf-preview-dialog {
    // margin: 0 !important;
    // transform: none;
    // overflow: hidden;
	.el-dialog__header {
		background-image: url(./texture.png), linear-gradient(hsla(0, 0%, 32%, 0.99), hsla(0, 0%, 27%, 0.95));
        padding: 16px 16px 8px 16px;
		border: none;
		.el-dialog__title {
			color: #fff;
		}
	}
	.el-dialog__body {
		padding: 0;
		height: calc(100% - 48px);
		overflow: hidden;
		max-height: none;
		#pdfFrame {
			height: 100%;
		}
	}
}
</style>
