/*
 * @Author: dsj
 * @LastEditors: dsj
 * @Description: 初始化、表单提交功能混入
 *              所有新增、修改、查看弹窗共用逻辑，外部调用的组件需要在method中定义请求方法和主键名
 *              定义新增接口名称为 saveFormReq
 *              定义修改接口名称为 updateFormReq
 *              定义查询详情接口为 queryInfoReq
 *              定义主键名为 primaryKey
 *              定义数据反写的后续处理方法 afterInitHandle
 * @Date: 2019-03-11 14:05:15
 * @LastEditTime: 2021-09-13 10:22:52
 */

export default {
  computed: {
    dialogTitle() {
      switch (this.dialogType) {
        case 'add':
          return '新增'
        case 'update':
          return '修改'
        case 'read':
          return '查看'
        default:
          break
      }
    }
  },
  data() {
    return {
      dialogType: '',
      dataForm: {},
      primaryKey: '', //主键
      dataFormLoading: false,
      visible: false,
    }
  },
  methods: {
    // 页面初始化
    init(id, dialogType) {
      this.dialogType = dialogType
      this.visible = true //显示弹窗
      // 不加 $nextTick 报错？
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields() //清空表单
        this.dataForm[this.primaryKey] = ''
      })

      this.beforeInitHandle().then(() => {
        if (!id) return // 新增状态无后续操作
        this.dataFormLoading = true //开启loading
        this.queryInfoReq(id) //获取详细信息
          .then(res => {
            this.dataFormLoading = false // 关闭loading
            //表单回写  处理一般的回写，直接重新赋值即可
            for (let key in this.dataForm) {
              if (res.data[key] || res.data[key] === 0) {
                this.dataForm[key] = res.data[key]
              } else if (Array.isArray(this.dataForm[key])) {
                this.dataForm[key] = []
              } else {
                this.dataForm[key] = ""
              }
            }
            // 后置处理，根据页面需要特殊处理一些特殊的表单回写，在外部页面定义afterInitHandle
            return Promise.resolve(res.data)
          })
          .then(res => {
            this.afterInitHandle(res)
          })
      })
    },
    //页面初始化前置处理：如需要在获取详情前调其他接口
    beforeInitHandle() {
      return Promise.resolve() //默认不做任何处理
    },
    //页面初始化后置处理：如tree的回显
    afterInitHandle(res) { },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        // console.log(this.dataForm)
        if (!valid) return
        this.beforeSubmitHandle().then(params => {
          // console.log('参数', params)
          let method = this.dialogType == 'update' ? 'updateFormReq' : 'saveFormReq'
          let message = this.dialogType == 'update' ? '修改成功' : '保存成功'
          this[method](params).then(res => {
            this.afterSubmitHandle(res).then(res => {
              console.log("处理关闭弹窗 等")
              this.msgSuccess(message)
              this.visible = false
              this.$emit('refreshDataList')
            })
          }).catch(err => {
            console.log(err)
          })
        })
      })
    },
    // 表单提交前置处理：如参数需要重组
    beforeSubmitHandle() {
      return Promise.resolve(this.dataForm) //默认不做任何处理
    },
    // 表单提交后置处理
    afterSubmitHandle(res) {
      return Promise.resolve(res.data)
    }
  },
}
