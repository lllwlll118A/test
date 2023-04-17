<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-06-23 16:46:08
 * @LastEditTime: 2022-07-20 09:52:14
 * @Description: TO DO
-->
<template>
  <div class="app-container home">
    <span style="font-size: 30px">待办任务</span>
    <el-divider></el-divider>
    <el-table border v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
      <el-table-column label="申请ID" align="center" prop="taskId" />
      <el-table-column label="客户名称" align="center" prop="clientName" />
      <el-table-column label="业务类型" align="center" prop="businessType" />
      <el-table-column label="业务编号" align="center" prop="businessId" />
      <el-table-column label="申请日期" align="center" prop="applicationTime" width="90">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            v-hasPermi="['sys:role:update,sys:menu:perms']"
            @click="approvalHandle(scope.row)"
          >审批</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.limit"
      @pagination="getDataList"
    />
  </div>
</template>

<script>
import pageMixin from '@/mixin/pagination'
import { listRole } from '@/api/system/task'
export default {
  name: "index",
  data() {
    return {
      taskForm: {
        taskId: 0,

      }
    };
  },
  mixins: [pageMixin],
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
    queryPageReq: listRole,
  },
};
</script>

<style scoped lang="scss">
.home {
	blockquote {
		padding: 10px 20px;
		margin: 0 0 20px;
		font-size: 17.5px;
		border-left: 5px solid #eee;
	}
	hr {
		margin-top: 20px;
		margin-bottom: 20px;
		border: 0;
		border-top: 1px solid #eee;
	}
	.col-item {
		margin-bottom: 20px;
	}

	ul {
		padding: 0;
		margin: 0;
	}

	font-family: 'open sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
	font-size: 13px;
	color: #676a6c;
	overflow-x: hidden;

	ul {
		list-style-type: none;
	}

	h4 {
		margin-top: 0px;
	}

	h2 {
		margin-top: 10px;
		font-size: 26px;
		font-weight: 100;
	}

	p {
		margin-top: 10px;

		b {
			font-weight: 700;
		}
	}

	.update-log {
		ol {
			display: block;
			list-style-type: decimal;
			margin-block-start: 1em;
			margin-block-end: 1em;
			margin-inline-start: 0;
			margin-inline-end: 0;
			padding-inline-start: 40px;
		}
	}
}
</style>

