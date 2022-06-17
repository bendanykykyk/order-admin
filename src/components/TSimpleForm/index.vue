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
      <el-col :span="item.col ? item.col : 24">
        <el-form-item
          v-if="isShow(item)"
          :prop="item.key"
          :rules="item.rules"
          :label="item.label"
        >
          <!-- 自定义label  -->
          <template #label>
            <span>
              {{ item.label }}
            </span>
            <span v-if="item.hint">
              <el-popover
                placement="top-start"
                title="提示"
                width="300"
                trigger="hover"
                :content="item.hint"
              >
                <i slot="reference" class="el-icon-question" />
              </el-popover>
            </span>
          </template>
          <!-- @change主要是做一个赋值操作 -->
          <component
            :is="compChildName(item)"
            :item="item"
            :value="formData[item.key]"
            v-bind="{ ...item.props }"
            v-on="{ ...item.events }"
            @input="value => onInput(item.key, value)"
            @change="value => onChange(item.key, value)"
            @changeFile="(value, file) => onChangeFile(item.key, value, file)"
          />
        </el-form-item>
      </el-col>
    </div>

    <!-- 按钮组 -->
    <div
      :class="mode == 'list' ? 'list-btn-group' : 'page-btn-group'"
      style="margin-bottom:20px;display:flex; justify-content: center"
    >
      <div v-for="(buttonItem, index) in operatorList" :key="index">
        <el-button
          v-if="isShow(buttonItem)"
          :type="buttonItem.type"
          size="small"
          :icon="buttonItem.icon"
          class="btn"
          @click="buttonItem.func"
        >
          {{ buttonItem.label }}
        </el-button>
      </div>
    </div>
  </el-form>
</template>
<script>
import FormInput from '@/components/TSimpleForm/FormInput/index'
import FormSwitch from '@/components/TSimpleForm/FormSwitch/index'
import FormSelect from '@/components/TSimpleForm/FormSelect/index'
import FormRadioGroup from '@/components/TSimpleForm/FormRadioGroup/index'
import FormCheckboxGroup from '@/components/TSimpleForm/FormCheckboxGroup/index'
import FormUploadPicture from '@/components/TSimpleForm/FormUploadPicture/index'
import FormUploadSinglePicture from '@/components/TSimpleForm/FormUploadSinglePicture/index'
import FormUploadFileList from '@/components/TSimpleForm/FormUploadFileList/index'
import FormRichText from '@/components/TSimpleForm/FormRichText/index'
import FormDateTimePicker from '@/components/TSimpleForm/FormDateTimePicker/index'
import FormDescriptionList from '@/components/TSimpleForm/FormDescriptionList/index'
import FormDescriptionLists from '@/components/TSimpleForm/FormDescriptionLists/index'
import FormAliMap from '@/components/TSimpleForm/FormAliMap/index'

// 业务组件
import FormSelectTempleC from '@/components/TSimpleForm/FormSelectTempleC/index'
import FormSkuC from '@/components/TSimpleForm/FormSkuC/index'
import FormSkuCC from '@/components/TSimpleForm/FormSkuCC/index'
import FormSkuRightC from '@/components/TSimpleForm/FormSkuRightC/index'
import FormUploadSinglePictureFileC from '@/components/TSimpleForm/FormUploadSinglePictureFileC/index'

export default {
  name: 'TSimpleForm',
  components: {
    FormInput,
    FormSwitch,
    FormSelect,
    FormRadioGroup,
    FormCheckboxGroup,
    FormUploadPicture,
    FormUploadSinglePicture,
    FormRichText,
    FormDateTimePicker,
    FormDescriptionList,
    FormDescriptionLists,
    FormUploadFileList,
    FormAliMap,
    // 业务
    FormSelectTempleC,
    FormSkuC,
    FormSkuCC,
    FormSkuRightC,
    FormUploadSinglePictureFileC
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
          switch: 'FormSwitch',
          select: 'FormSelect',
          radioGroup: 'FormRadioGroup',
          checkboxGroup: 'FormCheckboxGroup',
          uploadPicture: 'FormUploadPicture',
          uploadSinglePicture: 'FormUploadSinglePicture',
          dateTimePicker: 'FormDateTimePicker',
          richText: 'FormRichText',
          descriptionList: 'FormDescriptionList',
          descriptionLists: 'FormDescriptionLists',
          uploadFileList: 'FormUploadFileList',
          aliMap: 'FormAliMap',
          // 业务
          selectTempleC: 'FormSelectTempleC',
          uploadSinglePictureFileC: 'FormUploadSinglePictureFileC',
          skuC: 'FormSkuC',
          skuCC: 'FormSkuCC',
          skuRightC: 'FormSkuRightC'
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
  mounted() {
    console.log(this.$refs['form'])
  },
  beforeDestroy() {},
  methods: {
    onChange(key, value) {
      this.$set(this.formData, key, value)
      this.$forceUpdate()
    },
    onInput(key, value) {
      this.$set(this.formData, key, value)
      this.$forceUpdate()
    },
    onChangeFile(key, value, file) {
      this.$set(this.formData, key, value)
      this.$set(this.formData, 'file', file.raw)
      // this.$forceUpdate()
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
}
.btn {
  margin-left: 10px;
}

.list-btn-group {
  margin-left: 80px;
}

.list-form {
  display: flex;
  flex-wrap: wrap;
}
</style>
