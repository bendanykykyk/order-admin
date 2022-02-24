<template>
  <div class="form-input">
    <!-- <el-input
      :value="value"
      :placeholder="placeholderComp"
      v-bind="$attrs"
      v-on="$listeners"
      @input="onInput"
    /> -->
    <!-- ref="myQuillEditor" -->
    <quill-editor
      :id="randomString(3)"
      :ref="refName"
      :content="value"
      :options="editorOption"
      v-bind="$attrs"
      @change="onEditorChange($event)"
    />

    <!--饿了么上传组件，也可以用input代替，都是隐藏起来-->
    <el-upload
      :key="randomString(3)"
      class="avatar-uploader quill-img"
      :action="action"
      :on-success="handleAvatarSuccess"
      :show-file-list="false"
      style="display: none"
    >
      <i ref="imgInput" class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>
<script>
import { toolbarOptions } from './config'

// import { uploadPic } from '@/api/upload'
export default {
  name: 'FormRichText',
  components: {},
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      refName: this.item.toRef || 'quillEditor',
      addRange: '',
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,

            theme: 'snow'
          }
        }
      }
    }
  },
  computed: {
    action() {
      return process.env.VUE_APP_BASE_API + '/api/v1/files/uploadFiles'
      // return 'http://api.boreshan.com/baolinyun' + '/api/v1/files/uploadFiles'
    }
  },
  watch: {},
  created() {},
  mounted() {
    // mounted钩子中 替换插件图标点击事件
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性

    const toeval = 'this.$refs.' + this.refName + '.quill'
    // eslint-disable-next-line no-eval
    const quill = eval(toeval)
    quill.getModule('toolbar').addHandler('image', this.imgHandler)
  },
  beforeDestroy() {},
  methods: {
    onEditorChange({ editor, html, text }) {
      this.$emit('change', html)
    },
    // 点击图片ICON触发事件
    imgHandler(state) {
      const toeval = 'this.$refs.' + this.refName + '.quill'
      // eslint-disable-next-line no-eval
      const quill = eval(toeval)

      this.addRange = quill.getSelection()
      if (state) {
        // let fileInput = document.getElementById('imgInput')
        // fileInput.click() // 加一个触发事件
        // 选择并上传一张图片
        // let index = this.item.quillIndex;

        this.$refs['imgInput'].click()
        // const fileInput = document.querySelectorAll("quill-img input")[index];
        // fileInput.click(); // 加一个触发事件
      }
    },
    handleAvatarSuccess(res, file, fileList) {
      // 图片的远程路径
      const url = res.data

      const toeval = 'this.$refs.' + this.refName + '.quill'
      // eslint-disable-next-line no-eval
      const quill = eval(toeval)
      // 将图片添加到富文本内容区域
      this.addRange = quill.getSelection()
      // 调用编辑器的 insertEmbed 方法，插入URL

      quill.insertEmbed(
        this.addRange !== null ? this.addRange.index : 0,
        'image',
        url
      )
    },
    randomString(len) {
      // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var tempLen = chars.length
      var tempStr = ''
      for (var i = 0; i < len; ++i) {
        tempStr += chars.charAt(Math.floor(Math.random() * tempLen))
      }
      return tempStr
    }

    // to_upload_img(formdata) {
    //   return new Promise((resolve, reject) => {
    //     uploadPic(formdata).then(res => {
    //       // 图片的远程路径
    //       const value = res.key
    //       // 将图片添加到富文本内容区域
    //       this.addRange = this.$refs.myQuillEditor.quill.getSelection()
    //       // 调用编辑器的 insertEmbed 方法，插入URL
    //       this.$refs.myQuillEditor.quill.insertEmbed(
    //         this.addRange !== null ? this.addRange.index : 0,
    //         'image',
    //         value,
    //         Quill.sources.USER
    //       )
    //     })
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped></style>
