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
        @pagination="queryUnitList"
      />
    </el-card>
  </div>
</template>
<script>
import TSimpleForm from '@/components/TSimpleForm'
import TTableList from '@/components/TTableList'
import Pagination from '@/components/Pagination'

import Unit from '@/network/unit'
export default {
  name: 'UnitManager',
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
          label: '单位名称',
          key: 'unit_name',
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
            this.$router.push('/Unit/add')
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
          label: '单位名称',
          dataIndex: 'unit_name',
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
                  path: '/Unit/edit',
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
                this.deleteUnit(row)
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
    this.queryUnitList()
  },
  beforeDestroy() {},
  methods: {
    // 提交form表单
    submitForm() {
      this.$refs['form'].$refs['form'].validate(valid => {
        if (!valid) return
        console.log('最终数据', this.formData)
        this.queryUnitList()
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
    queryUnitList() {
      Unit.queryList({ ...this.listQuery, ...this.formData }).then(res => {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      })
    },
    deleteUnit(row) {
      Unit.deleteData({ id: row.id }).then(res => {
        if (res.status === 200) {
          // eslint-disable-next-line vue/no-parsing-error
          // this.$message.success('操作成功')
          this.queryUnitList()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
