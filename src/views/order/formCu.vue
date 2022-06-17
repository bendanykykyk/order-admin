<template>
  <div>
    <el-card style="margin:20px">
      <t-simple-form
        ref="form"
        :form-data="formData"
        :field-list="fieldList"
        :operator-list="operatorList"
        :rules="rules"
      />
    </el-card>
  </div>
</template>
<script>
import TSimpleForm from '@/components/TSimpleForm'

import Order from '@/network/order'

export default {
  name: 'FormCu',
  components: {
    TSimpleForm
  },
  props: {},
  data() {
    return {
      formData: {}, // 表单提交的数据
      fieldList: [
        {
          type: 'input',
          key: 'order_no',
          label: '订单编号',
          props: {
            clearable: true
          },
          disabled: true
        },
        {
          type: 'select',
          key: 'order_receive_status',
          label: '接单状态',
          props: {
            clearable: true
          },
          typeData: () => {
            return [
              {
                value: true,
                label: '已接单'
              },
              {
                value: false,
                label: '未接单'
              }
            ]
          },
          disabled: true
        },
        {
          type: 'select',
          key: 'order_payment_status',
          label: '支付状态',
          props: {
            clearable: true
          },
          typeData: () => {
            return [
              {
                value: true,
                label: '已支付'
              },
              {
                value: false,
                label: '未支付'
              }
            ]
          },
          disabled: true
        },

        {
          type: 'input',
          key: 'table_no',
          label: '桌号',
          props: {
            clearable: true
          },

          disabled: true
        },
        {
          type: 'input',
          key: 'order_time',
          label: '下单时间',
          props: {
            clearable: true
          },

          disabled: true
        },
        {
          type: 'descriptionLists',
          key: 'order_info',
          label: '订单信息',
          props: {
            border: true,
            column: 2,
            direction: 'vertical'
          },

          disabled: true
        }
      ],
      operatorList: [
        {
          type: '',
          label: '返 回',
          func: () => {
            this.$router.push({ name: 'orderList' })
          }
        }
        // {
        //   type: 'primary',
        //   label: '提 交',
        //   func: this.submitForm
        // }
      ],
      rules: {}
    }
  },
  computed: {
    formComp() {
      return this.$refs['form'].$refs['form']
    }
  },
  watch: {},
  created() {},
  mounted() {
    // 如果是编辑页，直接查一下detail

    // if (this.$route.query.id) {
    if (this.$route.path.includes('edit')) {
      this.queryOrderDetail()
    }
  },
  beforeDestroy() {},
  methods: {
    queryOrderDetail() {
      Order.queryDetail({ id: this.$route.query.id }).then(res => {
        this.formData = res.data.data[0]
        // 处理所有order_info 内的数据，只需要name和user_select_count
        this.formData.order_info = this.formData.order_info.map(orderItem => {
          const product_list = orderItem.product_list.map(item => {
            return { name: item.name, count: item.user_select_count }
          })
          return { ...orderItem, product_list }
        })
      })
    },
    submitForm() {
      this.formComp.validate(valid => {
        if (!valid) return
        // if (this.$route.query.id) {
        if (this.$route.path.includes('edit')) {
          this.updateOrder()
        } else {
          this.addOrder()
        }

        // console.log('最终数据', this.formData)
      })
    },
    addOrder() {
      // 处理一下数据
      // const images = this.formData.logo.map(item => {
      //   if (item.response) {
      //     return item.response.data
      //   } else {
      //     return item
      //   }
      // })

      // const data = { ...this.formData, logo: images }

      Order.append(this.formData).then(res => {
        if (res.status === 200) {
          // eslint-disable-next-line vue/no-parsing-error
          // this.$message.success('操作成功')
          this.$router.push({ name: 'OrderList' })
        }
      })
    },
    updateOrder() {
      // 处理一下数据，图片数组转;拼接
      // const images = this.formData.logo.map(item => {
      //   if (item.response) {
      //     return item.response.data
      //   } else {
      //     return item
      //   }
      // })

      // const data = { ...this.formData, logo: images }
      Order.updateData(this.formData).then(res => {
        if (res.status === 200) {
          // eslint-disable-next-line vue/no-parsing-error
          // this.$message.success('操作成功')

          this.$router.push({ name: 'OrderList' })
        }
      })
    },

    // 重置表单
    resetFields() {
      return this.formComp.resetFields()
    },
    // 清空校验
    clearValidate() {
      return this.formComp.clearValidate()
    }
  }
}
</script>
<style lang="less" scoped></style>
