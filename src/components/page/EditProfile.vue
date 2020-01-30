<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px" class="container" :rules="rules">
      <h3 class="register_title">资料修改</h3>
      <el-divider></el-divider>
      <el-form-item label="头像">
        <img :src="avatar" class="user-avator" />
        <el-button type="primary" id="pick-avatar">修改</el-button>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.gender" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即修改</el-button>
      </el-form-item>
    </el-form>

    <avatar-cropper
      @uploading="handleUploading"
      @uploaded="handleUploaded"
      @error="handlerError"
      trigger="#pick-avatar"
      upload-url="/avatarupload"
      mimes="image/jpeg"
    />
  </div>
</template>

<script>
import AvatarCropper from "vue-avatar-cropper";
import { postRequest } from "../../api/api.js";
import { getRequest } from "../../api/api.js";
import { Message } from "element-ui";

export default {
  components: { AvatarCropper },
  data() {
    return {
      form: {
        id: "",
        username: "",
        gender: "",
        email: "",
        phone: "",
        address: ""
      },

      avatar:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    submitForm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postRequest("/edituser", this.form).then(resp => {
            if (resp && resp.status == 200) {
              Message.success({ message: "修改成功!" });

              this.$router.push("/");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getUserInfo: function() {
      getRequest("/userInfo").then(resp => {
        var data = resp.data;
        this.form.id = data.obj.id;
        this.form.username = data.obj.username;
        this.form.gender = data.obj.gender;
        this.form.email = data.obj.email;
        this.form.phone = data.obj.phone;
        this.form.address = data.obj.address;

        this.avatar = "/avatar/" + this.form.id + ".jpg";
        console.log(this.form);
      });
    },
    handleUploading(form, xhr) {
      Message.info({ message: "正在上传" });
    },
    handleUploaded(response) {
      if (response.status == 200) {
        this.avatar = "/avatar/" + response.obj + "?" + new Date().getTime();

        Message.success({ message: "上传成功!" });
      }
    },
    handlerError(message, type, xhr) {
      Message.error({ message: "上传成功!" });
    }
  }
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: auto;
}
.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
</style>
