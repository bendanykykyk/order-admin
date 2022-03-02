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

import Category from '@/network/category'

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
          key: 'c_name',
          label: '种类名称',
          props: {
            clearable: true
          }
        }
      ],
      operatorList: [
        {
          type: '',
          label: '返 回',
          func: () => {
            this.$router.push({ name: 'categoryList' })
          }
        },
        {
          type: 'primary',
          label: '提 交',
          func: this.submitForm
        }
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
      this.queryCategoryDetail()
    }
  },
  beforeDestroy() {},
  methods: {
    queryCategoryDetail() {
      Category.queryDetail({ id: this.$route.query.id }).then(res => {
        this.formData = res.data.data[0]
      })
    },
    submitForm() {
      this.formComp.validate(valid => {
        if (!valid) return
        // if (this.$route.query.id) {
        if (this.$route.path.includes('edit')) {
          this.updateCategory()
        } else {
          this.addCategory()
        }

        // console.log('最终数据', this.formData)
      })
    },
    addCategory() {
      // 处理一下数据
      // const images = this.formData.logo.map(item => {
      //   if (item.response) {
      //     return item.response.data
      //   } else {
      //     return item
      //   }
      // })

      // const data = { ...this.formData, logo: images }

      Category.append(this.formData).then(res => {
        if (res.status === 200) {
          // eslint-disable-next-line vue/no-parsing-error
          // this.$message.success('操作成功')
          this.$router.push({ name: 'categoryList' })
        }
      })
    },
    updateCategory() {
      // 处理一下数据，图片数组转;拼接
      // const images = this.formData.logo.map(item => {
      //   if (item.response) {
      //     return item.response.data
      //   } else {
      //     return item
      //   }
      // })

      // const data = { ...this.formData, logo: images }
      Category.updateData(this.formData).then(res => {
        if (res.status === 200) {
          // eslint-disable-next-line vue/no-parsing-error
          // this.$message.success('操作成功')

          this.$router.push({ name: 'categoryList' })
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
