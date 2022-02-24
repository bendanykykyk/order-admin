<template>
  <div class="form-input">
    <!-- <el-input
      :value="value"
      :placeholder="placeholderComp"
      v-bind="$attrs"
      v-on="$listeners"
      @input="onInput"
    /> -->
    <quill-editor
      ref="myQuillEditor"
      :content="value"
      :options="editorOption"
      v-bind="$attrs"
      @change="onEditorChange($event)"
    />

    <!--饿了么上传组件，也可以用input代替，都是隐藏起来-->
    <el-upload
      class="avatar-uploader"
      :action="action"
      :on-success="handleAvatarSuccess"
      :show-file-list="false"
      style="display: none"
    >
      <i id="imgInput" class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>
<script>
import { toolbarOptions } from './config'

// import { uploadPic } from '@/api/upload'
export default {
  name: 'FormInput',
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
    }
  },
  watch: {},
  created() {},
  mounted() {
    // mounted钩子中 替换插件图标点击事件
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    this.$refs.myQuillEditor.quill
      .getModule('toolbar')
      .addHandler('image', this.imgHandler)
  },
  beforeDestroy() {},
  methods: {
    onEditorChange({ editor, html, text }) {
      this.$emit('change', html)
    },
    // 点击图片ICON触发事件
    imgHandler(state) {
      console.log(state)
      this.addRange = this.$refs.myQuillEditor.quill.getSelection()
      if (state) {
        // let fileInput = document.getElementById('imgInput')
        // fileInput.click() // 加一个触发事件
        // 选择并上传一张图片
        const fileInput = document.getElementById('imgInput')
        fileInput.click() // 加一个触发事件
      }
    },
    handleAvatarSuccess(res, file, fileList) {
      // 图片的远程路径
      const url = res.data
      // 将图片添加到富文本内容区域
      this.addRange = this.$refs.myQuillEditor.quill.getSelection()
      // 调用编辑器的 insertEmbed 方法，插入URL
      this.$refs.myQuillEditor.quill.insertEmbed(
        this.addRange !== null ? this.addRange.index : 0,
        'image',
        url
      )
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
