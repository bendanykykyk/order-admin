<template>
  <div class="table-pagination">
    <el-table
      class="tableLimit"
      :data="tableData"
      border
      stripe
      v-bind="{ ...tableOpts.props }"
      v-on="{ ...tableOpts.events }"
    >
      <!-- :row-key="tableOpts['rowKey']"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" -->
      <!-- v-bind="$attrs" -->

      <!-- 普通列 -->
      <template v-for="(item, index) in tableColumns">
        <el-table-column
          :key="index"
          :label="item.label"
          :resizable="false"
          :prop="item.dataIndex"
          :show-overflow-tooltip="true"
          v-bind="{ ...item.props }"
        >
          <template slot-scope="scope">
            <!-- 一般用于修改一些简单文字，或者说一些值对应的状态可以在这里处理 -->
            <span v-if="item.render">
              {{ item.render(scope.row) }}
            </span>
            <!-- 主要用于修改一些样式，比如文本想要外面套一层标签 -->
            <!-- 自己设item的slotName，在TTableList组件内部加 <template v-slot:{slotName}="data">{{data.scope.row}}</..> -->
            <slot
              v-else-if="item.slotName"
              :scope="scope"
              :name="item.slotName"
            />

            <span v-else>{{ scope.row[item.dataIndex] }}</span>
          </template>
        </el-table-column>
      </template>

      <template v-for="(item, index) in tableOpColumns">
        <!-- 操作列的话 -->
        <el-table-column
          :key="index + 10086"
          :label="item.label"
          :resizable="false"
          :prop="item.dataIndex"
          :show-overflow-tooltip="true"
          v-bind="{ ...item.props }"
        >
          <template slot-scope="scope">
            <div style="display:flex">
              <div
                v-for="(btnItem, btnIndex) in item.btnGroup"
                :key="btnIndex"
                style="margin-left:5px"
              >
                <el-button
                  v-if="isShow(btnItem, scope)"
                  :type="btnItem.type"
                  :icon="btnItem.icon"
                  size="mini"
                  @click.stop="btnItem.onClick(scope)"
                >
                  {{ btnItem.label }}
                </el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'TTableList',
  components: {},
  props: {
    tableOpts: {
      type: Object,
      default() {
        return {}
      }
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    tableColumns: {
      type: Array,
      default() {
        return []
      }
    },
    tableOpColumns: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    isShow() {
      return (item, scope) => {
        if (typeof item.display === 'boolean') {
          return item.display
        } else if (typeof item.display === 'function') {
          // console.log('111')

          return item.display(scope)
        } else {
          return true
        }
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
