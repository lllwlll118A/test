/*
 * @Author: dsj
 * @LastEditors: dsj
 * @Description: 分页功能混入
 *              所有分页功能共用逻辑，外部调用的组件需要在method中定义请求地址，
 *              定义分页查询接口为 queryPageReq,
 *              定义删除接口为 deleteReq
 *              deleteHandle()中传入主键ID
 * @Date: 2019-03-11 14:05:15
 * @LastEditTime: 2022-08-31 16:16:08
 */

export default {
    data() {
        return {
            activeGetList: true, //重新激活就请求数据
            createdGetList: true,//created请求数据
            addOrUpdateVisible: false, //创建组件
            // dialogType: '', //弹窗类型
            //分页参数
            queryParams: {
                pageSize: 10,
                pageNum: 1,
            },
            // 适配后台用地址上面的参数接收page，limit
            primaryKey: 'sysId', //主键
            ids: [], //多选的选中条目ids
            selectRow: {},//单选的选中行
            dataList: [], //分页数据
            total: 0, //分页总数
            loading: false //过渡动画
        }
    },
    methods: {
        // 多选
        handleSelectionChange(rows) {
            console.log(rows)
            this.ids = rows.map(item => {
                return item[this.primaryKey]
            })
        },
        // 查询分页 传入任意非空参数 则从第一页开始查 避免先翻页后条件查询获取不到数据的情况
        async getDataList(p) {
            if (p === 1) this.queryParams.pageNum = 1
            this.loading = true
            this.beforeGetDataList()
            this.queryPageReq(this.queryParams)
                .then((data) => {
                    this.dataList = data.data.list
                    this.total = parseInt(data.data.totalCount)
                    this.loading = false
                    this.dataListHandle(this.dataList)
                })
                .catch(err => {
                    this.loading = false
                })
        },
        // 新增 / 修改
        addOrUpdateHandle(row) {
            let id = row ? row[this.primaryKey] : ''
            let dialogType = id ? 'update' : 'add'
            this.addOrUpdateVisible = true
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(id, dialogType)
            })
        },
        //查看
        readHandle(row) {
            let dialogType = 'read'
            this.addOrUpdateVisible = true
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(row[this.primaryKey], dialogType)
            })
        },
        // 批量删除
        batchDeleteHandle() {
            this.$confirm('确定删除这些记录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteReq(this.ids).then(res => {
                    this.getDataList()
                    this.msgSuccess('删除成功')
                })
            })
        },
        //删除单个 ， flag参数区分接口参数传递方式
        singleDeleteHandle(row, flag) {
            this.$confirm('确定删除该记录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let param = flag ? {
                    [this.primaryKey]: row[this.primaryKey]
                } : [row[this.primaryKey]]

                this.deleteReq(param).then(res => {
                    this.getDataList()
                    this.msgSuccess('删除成功')
                })
            })
        },
        //接口地址为路径后面直接跟id的删除
        delHandle(row) {
            this.$confirm('确定删除该记录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteReq(row[this.primaryKey]).then(res => {
                    this.getDataList()
                    this.msgSuccess('删除成功')
                })
            })
        },
        // 查数据前预处理
        beforeGetDataList() { },
        //处理dataList
        dataListHandle() { }

    },
    created() {
        if (this.createdGetList) this.getDataList()
    },
    activated() {
        console.log(11)
        if (this.activeGetList) this.getDataList()
    }
}
