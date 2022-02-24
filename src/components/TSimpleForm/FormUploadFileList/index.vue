<template>
  <div class="form-upload-picture">
    <el-upload
      list-type="upload-demo"
      v-bind="$attrs"
      :action="action"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :file-list="value"
      :limit="item.props.limit"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>

      <!-- <div slot="tip" class="el-upload__tip"> -->
      <!-- 只能上传银屏/png文件，且不超过500kb -->
      <!-- </div> -->
    </el-upload>
    <!-- <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog> -->
  </div>
</template>
<script>
export default {
  // name: '',
  components: {},
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogImageUrl: ''
      // dialogVisible: false
    }
  },
  computed: {
    action() {
      return process.env.VUE_APP_BASE_API + '/api/v1/files/uploadFiles'
    }
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleAvatarSuccess(res, file, fileList) {
      this.$emit('change', fileList)
      // this.$emit('change', URL.createObjectURL(file.raw))
      // this.$emit('change', res.data)
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      // return isJPG && isLt2M
      return isLt2M
    },
    handleRemove(file, fileList) {
      this.$emit('change', fileList)
    },
    handleExceed() {
      this.$message.error(`图片最多上传${this.item.props.limit}张`)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      // this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
