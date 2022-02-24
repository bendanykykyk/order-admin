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
        @pagination="queryProductList"
      />
    </el-card>
  </div>
</template>
<script>
import TSimpleForm from '@/components/TSimpleForm'
import TTableList from '@/components/TTableList'
import Pagination from '@/components/Pagination'

import Product from '@/network/product'
export default {
  name: 'ProductManager',
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
          label: '商品名称',
          key: 'name',
          props: {
            // placeholder: '名称',
            clearable: true
          },
          events: {},
          display: true
          // col: 12
        }
        // {
        //   type: 'select',
        //   label: '商品类型',
        //   key: 'type',
        //   typeData: () => {
        //     return [
        //       { value: '', label: '全部' },
        //       { value: '2', label: '禅修禅旅' },
        //       { value: '3', label: '福碑刻名' },
        //       { value: '4', label: '祈福普佛' },
        //       { value: '5', label: '尊享权益' },
        //       { value: '6', label: '实物商品' },
        //       { value: '7', label: '惠明禅茶' }
        //     ]
        //   },
        //   props: {
        //     // placeholder: '名称',
        //     clearable: true
        //   },
        //   events: {},
        //   display: true
        //   // col: 12
        // }
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
            this.$router.push('/Product/add')
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
          label: '编号',
          dataIndex: 'id',
          props: {
            // sortable: true
          }
        },
        {
          label: '商品名称',
          dataIndex: 'name',
          props: {
            // sortable: true
          }
          // slotName: 'headline'
        },
        {
          label: '商品分类',
          dataIndex: 'category_name',
          props: {
            // sortable: true
          }
          // slotName: 'headline'
        },
        {
          label: '价格',
          dataIndex: 'price',
          props: {
            // sortable: true
          }
          // slotName: 'headline'
        },
        {
          label: '单位',
          dataIndex: 'unit_name',
          props: {
            // sortable: true
          }
          // slotName: 'headline'
        },
        {
          label: '状态',
          dataIndex: 'status',
          props: {
            // sortable: true
          },
          render: row => {
            const text = {
              true: '开启',
              false: '关闭'
            }[row.status]
            return text || '不明状态'
          }
          // slotName: 'headline'
        },
        {
          label: '创建时间',
          dataIndex: 'create_time',
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
            {
              label: '编辑',
              type: 'primary',
              icon: 'el-icon-edit',
              onClick: ({ index, row }) => {
                this.$router.push({
                  path: '/Product/edit',
                  query: { id: row.id }
                })
                console.log(row.id)
              }
            },
            {
              type: 'danger',
              icon: 'el-icon-delete',
              label: '删除',
              onClick: ({ index, row }) => {
                this.deleteProduct(row)
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
    this.queryProductList()
  },
  beforeDestroy() {},
  methods: {
    // 提交form表单
    submitForm() {
      this.$refs['form'].$refs['form'].validate(valid => {
        if (!valid) return
        console.log('最终数据', this.formData)
        this.queryProductList()
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
    queryProductList() {
      Product.queryList({ ...this.listQuery, ...this.formData }).then(res => {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      })
    },
    deleteProduct(row) {
      Product.deleteData({ id: row.id, categoryId: row.categoryId }).then(
        res => {
          if (res.status === 200) {
            // eslint-disable-next-line vue/no-parsing-error
            // this.$message.success('操作成功')
            this.queryProductList()
          }
        }
      )
    }
  }
}
</script>
<style lang="less" scoped></style>
