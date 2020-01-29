<template>
  <el-form ref="form" :model="form" label-width="80px" class="container" :rules="rules">
    <h3 class="register_title">系统登录</h3>
    <el-divider></el-divider>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item  prop="password">
      没有账号？
      <router-link :to="{path:'/register' }">点击注册</router-link>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">立即登录</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { postRequest } from "../../api/api.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      form: {
        username: "111",
        password: "111"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postRequest("/userlogin", this.form).then(resp => {
            if (resp && resp.status == 200) {
              Message.success({ message: "登录成功!" });
              var data = resp.data;
              // _this.$store.commit('login', data.obj);
              sessionStorage.setItem("ms_username", data.obj);
              this.$router.push("/");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.register_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>























