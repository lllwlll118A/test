/*
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2019-12-26 16:48:38
 * @LastEditTime: 2022-09-20 09:13:30
 * @Description: 业务字典
 */

export default {
    namespaced: true,
    getters: {
        getStateByNode: (state) => (nodeStr) => {
            let arr = nodeStr.split('.')
            if (arr.length > 1) {
                let obj = state
                for (let i = 0; i < arr.length; i++) {
                    obj = obj[arr[i]]
                }
                return obj
            } else {
                return state[nodeStr]
            }
        }
    },
    state: {
        workFlow: {
            status: [{ //审批状态：1-草稿 2-审批中 3-审批通过 4-审批拒绝 5-已撤销
                dictName: "草稿",
                dictValue: "1",
                tag: 'info'
            }, {
                dictName: "审批中",
                dictValue: "2",
                tag: ''
            }, {
                dictName: "审批通过",
                dictValue: "3",
                tag: 'success'
            }, {
                dictName: "审批拒绝",
                dictValue: "4",
                tag: 'danger'
            }, {
                dictName: "已撤销",
                dictValue: "5",
                tag: 'warning'
            }],
            approvalType: [{ //审批类型：1-已同意 2-已拒绝 3-已撤销 4-已抄送 5-预审批人 6-已转交
                dictName: "已同意",
                dictValue: "1",
            }, {
                dictName: "已拒绝",
                dictValue: "2",
            }, {
                dictName: "已撤销",
                dictValue: "3",
            }, {
                dictName: "已抄送",
                dictValue: "4",
            }, {
                dictName: "预审批人",
                dictValue: "5",
            }, {
                dictName: "已转交",
                dictValue: "6",
            }]
        },
        attend: {
            weeks: [
                {
                    dictName: "周一",
                    dictValue: "1",
                },
                {
                    dictName: "周二",
                    dictValue: "2",
                },
                {
                    dictName: "周三",
                    dictValue: "3",
                },
                {
                    dictName: "周四",
                    dictValue: "4",
                },
                {
                    dictName: "周五",
                    dictValue: "5",
                },
                {
                    dictName: "周六",
                    dictValue: "6",
                },
                {
                    dictName: "周日",
                    dictValue: "7",
                },
            ],
            specialTypes: [
                {
                    dictName: "必须打卡",
                    dictValue: "1",
                },
                {
                    dictName: "无需打卡",
                    dictValue: "2",
                }
            ],
			attentionTypes:[
			    {
			        dictName:"休息",
			        dictValue:"0",
			    },
			    {
			        dictName:"正常",
			        dictValue:"1",
			    },
				{
				    dictName:"请假",
				    dictValue:"2",
				},
				{
				    dictName:"外出",
				    dictValue:"3",
				},
				{
				    dictName:"出差",
				    dictValue:"4",
				},
				{
				    dictName:"补卡",
				    dictValue:"5",
				},
				{
				    dictName:"早退",
				    dictValue:"6",
				},
				{
				    dictName:"未打卡",
				    dictValue:"7",
				}
			],
            startStatus:[
                {
                    dictName:'休息',
                    dictValue:'0'
                },
                {
                    dictName:'正常',
                    dictValue:'1'
                },
                {
                    dictName:'请假',
                    dictValue:'2'
                },
                {
                    dictName:'外出',
                    dictValue:'3'
                },
                {
                    dictName:'出差',
                    dictValue:'4'
                },
                {
                    dictName:'补卡',
                    dictValue:'5'
                },
                {
                    dictName:'迟到',
                    dictValue:'6'
                },
                {
                    dictName:'未打卡',
                    dictValue:'7'
                }
            ],
            endStatus:[
                {
                    dictName:'休息',
                    dictValue:'0'
                },
                {
                    dictName:'正常',
                    dictValue:'1'
                },
                {
                    dictName:'请假',
                    dictValue:'2'
                },
                {
                    dictName:'外出',
                    dictValue:'3'
                },
                {
                    dictName:'出差',
                    dictValue:'4'
                },
                {
                    dictName:'补卡',
                    dictValue:'5'
                },
                {
                    dictName:'早退',
                    dictValue:'6'
                },
                {
                    dictName:'未打卡',
                    dictValue:'7'
                }
            ]
        }
    }
}
