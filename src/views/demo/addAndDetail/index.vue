<template>
  <div>
    <t-simple-form
      ref="form"
      :form-data="formData"
      :field-list="fieldList"
      :operator-list="operatorList"
      :rules="rules"
    />
  </div>
</template>
<script>
import TSimpleForm from '@/components/TSimpleForm'

// var map =

export default {
  name: 'AddAndDetail',
  components: {
    TSimpleForm
  },
  props: {},
  data() {
    return {
      list: [],
      formData: {},
      fieldList: [
        {
          type: 'skuCC',
          label: '规格',
          key: 'name222',
          props: {
            // placeholder: '名称',
            clearable: true
          },
          events: {},
          display: true
        },
        // {
        //   type: 'aliMap',
        //   label: '获取经纬度',
        //   key: 'position',
        //   props: {
        //     // placeholder: '名称',
        //     clearable: true
        //   },
        //   events: {},
        //   display: true
        //   // col: 12
        // },
        {
          type: 'input',
          label: '名称',
          key: 'name',
          props: {
            // placeholder: '名称',
            clearable: true
          },
          events: {},
          display: true
          // col: 12
        },
        {
          type: 'input',
          label: '年龄',
          props: {
            placeholder: '一般年龄为20岁'
          },
          key: 'age',
          display: true
          // col: 12
        },
        {
          type: 'select',
          label: '性别',
          typeData: () => {
            // 为了解决this指向问题
            return this.list
          },
          props: {
            clearable: true
            // placeholder: ''
          },
          key: 'sex',
          display: true
        },
        {
          type: 'radioGroup',
          label: '结婚否',
          typeData: () => {
            return [
              { label: '是', value: 10 },
              { label: '否', value: 11 }
            ]
          },
          props: {
            clearable: true
            // placeholder: ''
          },
          key: 'isMarried',
          display: true
        },
        {
          type: 'checkboxGroup',
          label: '兴趣爱好',
          typeData: () => {
            return [
              { label: '足球', value: 10 },
              { label: '篮球', value: 11 },
              { label: '打架', value: 12 }
            ]
          },
          props: {
            clearable: true
            // placeholder: ''
          },
          key: 'hobbies',
          display: () => {
            return this.formData.isMarried === 10
          }
        },
        {
          type: 'uploadPicture',
          label: '身份证正面',
          props: {
            data: {
              type: 1
            },
            limit: 3
          },
          key: 'idCardPic1'
        },
        {
          type: 'uploadSinglePicture',
          label: '丑照',
          props: {
            data: {
              type: 1
            }
          },
          key: 'avatar'
        },
        {
          type: 'dateTimePicker',
          label: '选择开始时间',
          props: {
            type: 'datetime',
            'value-format': 'yyyy-MM-dd hh:mm:ss'
          },
          key: 'startTime'
        },
        {
          type: 'dateTimePicker',
          label: '选择结束时间',
          props: {
            type: 'date',
            'value-format': 'yyyy-MM-dd'
          },
          key: 'endTime'
        },
        {
          type: 'richText',
          label: '简介',
          toRef: 'message1',
          props: {},
          key: 'message'
        },
        {
          type: 'richText',
          label: '简介2',
          toRef: 'message2',
          props: {},
          key: 'message2'
        }
      ],
      operatorList: [
        {
          type: '',
          label: '返 回',
          func: () => {
            this.$router.back()
          }
        },
        {
          type: 'primary',
          label: '提 交',
          func: this.submitForm
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入输入框1', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sex: [{ required: true, message: '请选择', trigger: 'blur' }],
        message: [{ required: true, message: '请填写简介', trigger: 'blur' }]
      }
      // formOpts: {
      //   // labelWidth: '120', // 表单label的宽度
      //   formData: {
      //     idCardPic1: [
      //       {
      //         url:
      //           'https://img1.baidu.com/it/u=4242893571,1713191278&fm=26&fmt=auto'
      //       }
      //     ],
      //     startTime: '2012-02-13 12:12:12'
      //   }, // 表单提交的数据
      //   fieldList: [
      //     {
      //       type: 'input',
      //       label: '名称',
      //       key: 'name',
      //       props: {
      //         // placeholder: '名称',
      //         clearable: true
      //       },
      //       events: {},
      //       display: true
      //       // col: 12
      //     },
      //     {
      //       type: 'input',
      //       label: '年龄',
      //       props: {
      //         placeholder: '一般年龄为20岁'
      //       },
      //       key: 'age',
      //       display: true
      //       // col: 12
      //     },
      //     {
      //       type: 'select',
      //       label: '性别',
      //       typeData: () => {
      //         // 为了解决this指向问题
      //         return this.list
      //       },
      //       props: {
      //         clearable: true
      //         // placeholder: ''
      //       },
      //       key: 'sex',
      //       display: true
      //     },
      //     {
      //       type: 'radioGroup',
      //       label: '结婚否',
      //       typeData: () => {
      //         return [
      //           { label: '是', value: 10 },
      //           { label: '否', value: 11 }
      //         ]
      //       },
      //       props: {
      //         clearable: true
      //         // placeholder: ''
      //       },
      //       key: 'isMarried',
      //       display: true
      //     },
      //     {
      //       type: 'checkboxGroup',
      //       label: '兴趣爱好',
      //       typeData: () => {
      //         return [
      //           { label: '足球', value: 10 },
      //           { label: '篮球', value: 11 },
      //           { label: '打架', value: 12 }
      //         ]
      //       },
      //       props: {
      //         clearable: true
      //         // placeholder: ''
      //       },
      //       key: 'hobbies',
      //       display: true
      //     },
      //     {
      //       type: 'uploadPicture',
      //       label: '身份证正面',
      //       props: {
      //         data: {
      //           type: 1
      //         },
      //         limit: 3
      //       },
      //       key: 'idCardPic1'
      //     },
      //     {
      //       type: 'uploadSinglePicture',
      //       label: '丑照',
      //       props: {
      //         data: {
      //           type: 1
      //         }
      //       },
      //       key: 'avatar'
      //     },
      //     {
      //       type: 'dateTimePicker',
      //       label: '选择开始时间',
      //       props: {
      //         type: 'datetime',
      //         'value-format': 'yyyy-MM-dd hh:mm:ss'
      //       },
      //       key: 'startTime'
      //     },
      //     {
      //       type: 'dateTimePicker',
      //       label: '选择结束时间',
      //       props: {
      //         type: 'date',
      //         'value-format': 'yyyy-MM-dd'
      //       },
      //       key: 'endTime'
      //     },
      //     {
      //       type: 'richText',
      //       label: '简介',
      //       props: {},
      //       key: 'message'
      //     }
      //   ],
      //   operatorList: [
      //     {
      //       type: '',
      //       label: '返 回',
      //       func: () => {
      //         this.$router.back()
      //       }
      //     },
      //     {
      //       type: 'primary',
      //       label: '提 交',
      //       func: this.submitForm
      //     }
      //   ],
      //   rules: {
      //     name: [
      //       { required: true, message: '请输入输入框1', trigger: 'blur' },
      //       { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //     ],
      //     sex: [{ required: true, message: '请选择', trigger: 'blur' }],
      //     message: [{ required: true, message: '请填写简介', trigger: 'blur' }]
      //   }
      // }
    }
  },
  computed: {
    formComp() {
      return this.$refs['form'].$refs['form']
    },
    isAdmin() {
      return true
    }
  },
  watch: {},
  created() {},
  mounted() {
    // console.log(this.$refs['form'].$refs['form'])
    setTimeout(() => {
      this.list = [
        { label: '男1', value: 0 },
        { label: '女1', value: 1 }
      ]
    }, 300)
  },
  beforeDestroy() {},
  methods: {
    // 提交form表单
    submitForm() {
      this.formComp.validate(valid => {
        if (!valid) return
        console.log('最终数据', this.formData)
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
<style lang="scss" scoped></style>
