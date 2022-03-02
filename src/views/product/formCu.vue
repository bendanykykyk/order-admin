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

import Product from '@/network/product'
import Category from '@/network/category'
import Unit from '@/network/unit'

export default {
  name: 'FormCu',
  components: {
    TSimpleForm
  },
  props: {},
  data() {
    return {
      ajaxCategoryList: [],
      ajaxUnitList: [],
      formData: {
        status: true
      }, // 表单提交的数据
      fieldList: [
        {
          type: 'input',
          key: 'name',
          label: '商品名称',
          props: {
            clearable: true
          }
        },
        {
          type: 'select',
          key: 'categoryId',
          label: '商品分类',
          props: {
            clearable: true
          },
          typeData: () => {
            return this.ajaxCategoryList
          },
          disabled: () => {
            return this.$route.query.id
          }
        },
        {
          type: 'input',
          key: 'price',
          label: '价格',
          props: {}
        },
        {
          type: 'select',
          key: 'unitId',
          label: '单位',
          props: {},
          typeData: () => {
            return this.ajaxUnitList
          }
        },
        {
          type: 'uploadSinglePicture',
          key: 'image',
          label: '商品图片',
          props: {}
        },
        {
          type: 'switch',
          key: 'status',
          label: '上架状态',
          props: {}
        }
      ],
      operatorList: [
        {
          type: '',
          label: '返 回',
          func: () => {
            this.$router.push({ name: 'productList' })
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
  created() {
    this.queryCategoryList()
    this.queryUnitList()
  },
  mounted() {
    // 如果是编辑页，直接查一下detail

    // if (this.$route.query.id) {
    if (this.$route.path.includes('edit')) {
      this.queryProductDetail()
    }
  },
  beforeDestroy() {},
  methods: {
    queryCategoryList() {
      // Product.queryDetail({ id: this.$route.query.id }).then(res => {
      Category.queryList({ page: 1 }).then(res => {
        this.ajaxCategoryList = res.data.data.list.map(item => {
          return { value: item.id, label: item.c_name }
        })
      })
    },
    queryUnitList() {
      // Product.queryDetail({ id: this.$route.query.id }).then(res => {
      Unit.queryList({ page: 1 }).then(res => {
        this.ajaxUnitList = res.data.data.list.map(item => {
          return { value: item.id, label: item.unit_name }
        })
      })
    },
    queryProductDetail() {
      Product.queryDetail({ id: this.$route.query.id }).then(res => {
        this.formData = res.data.data[0]
      })
    },
    submitForm() {
      this.formComp.validate(valid => {
        if (!valid) return
        // if (this.$route.query.id) {
        if (this.$route.path.includes('edit')) {
          this.updateProduct()
        } else {
          this.addProduct()
        }

        // console.log('最终数据', this.formData)
      })
    },
    addProduct() {
      // 处理一下数据
      // const images = this.formData.logo.map(item => {
      //   if (item.response) {
      //     return item.response.data
      //   } else {
      //     return item
      //   }
      // })

      // const data = { ...this.formData, logo: images }

      Product.append(this.formData).then(res => {
        if (res.status === 200) {
          // eslint-disable-next-line vue/no-parsing-error
          // this.$message.success('操作成功')
          this.$router.push({ name: 'productList' })
        }
      })
    },
    updateProduct() {
      // 处理一下数据，图片数组转;拼接
      // const images = this.formData.logo.map(item => {
      //   if (item.response) {
      //     return item.response.data
      //   } else {
      //     return item
      //   }
      // })

      // const data = { ...this.formData, logo: images }

      Product.updateData(this.formData).then(res => {
        if (res.status === 200) {
          // eslint-disable-next-line vue/no-parsing-error
          // this.$message.success('操作成功')
          // this.$router.back()
          this.$router.push({ name: 'productList' })
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
