<template>
<el-container class=" background">
  <el-form ref="form" :model="form" label-width="80px" class="container" :rules="rules">
    <h3 class="register_title">系统注册</h3>
    <el-divider></el-divider>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password"></el-input>
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
      <el-button type="primary" @click="submitForm('form')">立即注册</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
  </el-container>
</template>
<script>
import { postRequest } from "../../api/api.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        gender: "",
        email: "",
        phone: "",
        address: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postRequest("/user", this.form).then(resp => {
            if (resp && resp.status == 200) {
              Message.success({ message: "注册成功!" });

              this.$router.push("/");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.register_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.background {
  position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/background.jpg);
    background-size: 100%;
}
</style>