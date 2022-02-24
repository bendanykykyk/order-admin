<template>
  <el-form
    ref="form"
    :model="formData"
    :rules="rules"
    label-width="120px"
    :class="mode == 'list' ? 'list-form' : ''"
    style="margin-top:20px"
  >
    <div v-for="(item, index) in fieldList" :key="index">
      <el-form-item
        v-if="isShow(item)"
        :prop="item.key"
        :rules="item.rules"
        :label="item.label"
        style="margin-top:20px"
      >
        <!-- 自定义label，未来做  -->

        <!-- @change主要是做一个赋值操作 -->
        <component
          :is="compChildName(item)"
          :item="item"
          :value="formData[item.key]"
          v-bind="{ ...item.props }"
          @input="value => onInput(item.key, value)"
          @change="value => onChange(item.key, value)"
        />
      </el-form-item>
    </div>

    <!-- 按钮组 -->
    <div
      :class="mode == 'list' ? 'list-btn-group' : 'page-btn-group'"
      style="margin-bottom:20px"
    >
      <el-button
        v-for="(buttonItem, index) in operatorList"
        :key="index"
        :type="buttonItem.type"
        :icon="buttonItem.icon"
        class="btn"
        @click="buttonItem.func"
      >
        {{ buttonItem.label }}
      </el-button>
    </div>
  </el-form>
</template>
<script>
import FormInput from '@/components/TSimpleForm/FormInput/index'
import FormSelect from '@/components/TSimpleForm/FormSelect/index'
import FormRadioGroup from '@/components/TSimpleForm/FormRadioGroup/index'
import FormCheckboxGroup from '@/components/TSimpleForm/FormCheckboxGroup/index'
import FormUploadPicture from '@/components/TSimpleForm/FormUploadPicture/index'
import FormUploadSinglePicture from '@/components/TSimpleForm/FormUploadSinglePicture/index'
import FormRichText from '@/components/TSimpleForm/FormRichText/index'
import FormDateTimePicker from '@/components/TSimpleForm/FormDateTimePicker/index'
import FormDescriptionList from '@/components/TSimpleForm/FormDescriptionList/index'

// 业务组件
import FormSelectTempleC from '@/components/TSimpleForm/FormSelectTempleC/index'
import FormSkuC from '@/components/TSimpleForm/FormSkuC/index'

export default {
  name: 'TSimpleForm',
  components: {
    FormInput,
    FormSelect,
    FormRadioGroup,
    FormCheckboxGroup,
    FormUploadPicture,
    FormUploadSinglePicture,
    FormRichText,
    FormDateTimePicker,
    FormDescriptionList,
    // 业务
    FormSelectTempleC,
    FormSkuC
  },
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    fieldList: {
      type: Array,
      default: () => []
    },
    operatorList: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => {}
    },
    mode: {
      type: String,
      default: 'page' // list 和 page 控制样式
    }
  },
  data() {
    return {}
  },
  computed: {
    compChildName() {
      return item => {
        const name = {
          // 后续增加
          input: 'FormInput',
          select: 'FormSelect',
          radioGroup: 'FormRadioGroup',
          checkboxGroup: 'FormCheckboxGroup',
          uploadPicture: 'FormUploadPicture',
          uploadSinglePicture: 'FormUploadSinglePicture',
          dateTimePicker: 'FormDateTimePicker',
          richText: 'FormRichText',
          descriptionList: 'FormDescriptionList',
          // 业务
          selectTempleC: 'FormSelectTempleC',
          skuC: 'FormSkuC'
        }[item.type]
        return name
      }
    },
    isShow() {
      return item => {
        if (typeof item.display === 'boolean') {
          return item.display
        } else if (typeof item.display === 'function') {
          // console.log('111')

          return item.display()
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
  methods: {
    onChange(key, value) {
      console.log('动了')
      this.$set(this.formData, key, value)
      this.$forceUpdate()
    },

    onInput(key, value) {
      this.$set(this.formData, key, value)
      this.$forceUpdate()
    },
    // 校验
    validate() {
      console.log('触发校验')
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve({
              valid,
              formData: this.formData
            })
          } else {
            reject({
              valid,
              formData: null
            })
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-btn-group {
  width: 100%;
  line-height: 50px;
  text-align: center;
  .btn {
    margin-left: 20px;
  }
}

.list-btn-group {
  margin-left: 120px;
}

.list-form {
  display: flex;
  flex-wrap: wrap;
}
</style>
