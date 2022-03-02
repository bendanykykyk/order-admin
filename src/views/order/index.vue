<template>
  <div>
    <el-card style="margin:20px">
      <t-simple-form
        ref="form"
        :form-data="formData"
        :field-list="fieldList"
        :operator-list="operatorList"
        mode="list"
      />

      <t-table-list
        :table-data="tableData"
        :table-columns="tableColumns"
        :table-op-columns="tableOpColumns"
      >
        <template v-slot:url="data">
          <el-image
            style="width:100px;height:60px"
            fit="fit"
            :src="data.scope.row.url"
          />
        </template>
      </t-table-list>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pageSize"
        @pagination="queryOrderList"
      />
    </el-card>
  </div>
</template>
<script>
import TSimpleForm from '@/components/TSimpleForm'
import TTableList from '@/components/TTableList'
import Pagination from '@/components/Pagination'

import Order from '@/network/order'
export default {
  name: 'OrderManager',
  components: {
    TSimpleForm,
    TTableList,
    Pagination
  },
  props: {},
  data() {
    return {
      // 表单
      formData: {},
      fieldList: [
        {
          type: 'input',
          label: '订单编号',
          key: 'order_no',
          props: {
            // placeholder: '名称',
            clearable: true
          },
          events: {},
          display: true
          // col: 12
        }
      ],
      operatorList: [
        {
          type: 'primary',
          icon: 'el-icon-refresh',

          label: '重 置',
          func: this.resetFields
        },
        {
          type: 'primary',
          icon: 'el-icon-circle-plus-outline',

          label: '添 加',
          func: () => {
            this.$router.push('/Order/add')
          }
        },
        {
          type: 'primary',
          icon: 'el-icon-search',
          label: '查 询',
          func: this.submitForm
        }
      ],
      // 列表
      tableData: [],
      tableColumns: [
        {
          label: '订单编号',
          dataIndex: 'order_no',
          props: {
            // sortable: true
          }
        },
        {
          label: '桌号',
          dataIndex: 'table_no',
          props: {
            // sortable: true
          }
          // slotName: 'headline'
        },
        {
          label: '订单金额',
          dataIndex: 'amount',
          props: {
            // sortable: true
          }
          // slotName: 'headline'
        },
        {
          label: '接单状态',
          dataIndex: 'order_receive_status',
          props: {
            // sortable: true
          },
          render: row => {
            const text = {
              true: '已接单',
              false: '未接单'
            }[row.order_receive_status]
            return text
          }
          // slotName: 'headline'
        },
        {
          label: '结账状态',
          dataIndex: 'order_payment_status',
          props: {
            // sortable: true
          },
          render: row => {
            const text = {
              true: '已支付',
              false: '未支付'
            }[row.order_payment_status]
            return text
          }
        },
        {
          label: '下单时间',
          dataIndex: 'order_time',
          props: {
            // sortable: true
          }
          // slotName: 'headline'
        }
      ],

      tableOpColumns: [
        {
          label: '操作列',
          dataIndex: 'a1',
          props: {
            // sortable: true
            width: '200',
            fixed: 'right'
          },
          btnGroup: [
            // {
            //   label: '编辑',
            //   type: 'primary',
            //   icon: 'el-icon-edit',
            //   onClick: ({ index, row }) => {
            //     this.$router.push({
            //       path: '/Order/edit',
            //       query: { id: row.id }
            //     })
            //     console.log(row.id)
            //   }
            // },
            // {
            //   type: 'danger',
            //   icon: 'el-icon-delete',
            //   label: '删除',
            //   onClick: ({ index, row }) => {
            //     this.deleteOrder(row)
            //   }
            // }
            {
              type: 'primary',
              icon: 'el-icon-thumb',
              label: '接单',
              onClick: async ({ index, row }) => {
                // 调用改状态接口
                await Order.status({
                  order_no: row.order_no,
                  order_receive_status: true
                })
                this.queryOrderList()
              },
              display: ({ index, row }) => {
                return !row.order_receive_status && !row.order_payment_status
              }
            },
            {
              type: 'success',
              icon: 'el-icon-check',
              label: '结账',
              onClick: async ({ index, row }) => {
                // 调用改状态接口
                await Order.status({
                  order_no: row.order_no,
                  order_payment_status: true
                })
                this.queryOrderList()
              },
              display: ({ index, row }) => {
                return row.order_receive_status && !row.order_payment_status
              }
            }
          ]
        }
      ],
      // 分页控件
      total: 0,
      listQuery: {
        page: 0,
        pageSize: 10
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.queryOrderList()
  },
  beforeDestroy() {},
  methods: {
    // 提交form表单
    submitForm() {
      this.$refs['form'].$refs['form'].validate(valid => {
        if (!valid) return
        console.log('最终数据', this.formData)
        this.queryOrderList()
      })
    },

    // 重置表单
    resetFields() {
      return this.$refs['form'].$refs['form'].resetFields()
    },
    // 清空校验
    clearValidate() {
      return this.$refs['form'].$refs['form'].clearValidate()
    },

    // 真正要写的东西，就这个
    queryOrderList() {
      Order.queryList({ ...this.listQuery, ...this.formData }).then(res => {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      })
    },
    deleteOrder(row) {
      Order.deleteData({ id: row.id }).then(res => {
        if (res.status === 200) {
          // eslint-disable-next-line vue/no-parsing-error
          // this.$message.success('操作成功')
          this.queryOrderList()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
