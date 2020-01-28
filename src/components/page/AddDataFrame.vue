<template>
  <div class="container">
    <h3>添加数据集</h3>
    <el-divider></el-divider>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="名称" prop="projectName">
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>
      <el-form-item label="背景" prop="background">
        <el-input type="textarea" v-model="form.background" :rows="7"></el-input>
      </el-form-item>
      <el-form-item label="说明" prop="state">
        <el-input type="textarea" v-model="form.state" :rows="7"></el-input>
      </el-form-item>
      <el-form-item label="来源" prop="fileUrl">
        <el-input v-model="form.fileUrl"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitClick">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { postRequest } from "../../api/api.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      form: {
        projectName: "",
        background: "",
        state: "",
        fileUrl: ""
      },
      rules: {
        projectName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        background: [
          { required: true, message: "请输入背景", trigger: "blur" }
        ],
        state: [{ required: true, message: "请输入说明", trigger: "blur" }],
        fileUrl: [{ required: true, message: "请输入来源", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitClick: function() {
      console.log(111);
      postRequest("/dataframe", this.form).then(resp => {
        if (resp && resp.status == 200) {
          Message.success({ message: "创建成功!" });
          this.$router.push("/");
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: auto;
}
</style>