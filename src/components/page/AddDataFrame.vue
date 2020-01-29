<template>
  <div class="container">
    <el-row class="warp">
      <!--
Form 组件提供了表单验证的功能，只需要通过 rule 属性传入约定的验证规则，并 Form-Item 的 prop 属性设置为需校验的字段名即可。具体可以参考官网：http://element.eleme.io/#/zh-CN/component/form
      -->
      <el-form :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-widths="120px">
          <el-form-item label="标题" prop="projectName">
            <el-input v-model="infoForm.projectName"></el-input>
          </el-form-item>
          <el-form-item label="概述" prop="overview">
            <el-input type="textarea" v-model="infoForm.overview" :rows="3"></el-input>
          </el-form-item>

          <el-form-item label="来源" prop="fileUrl">
            <el-input v-model="infoForm.fileUrl"></el-input>
          </el-form-item>
          <!--使用编辑器
          -->
          
          <el-form-item prop="state" label="说明">>
            <div class="edit_container">
              <quill-editor
                v-model="infoForm.state"
                ref="myQuillEditor"
                class="editer"
                :options="editorOption"
                @ready="onEditorReady($event)"
              ></quill-editor>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认提交</el-button>
          </el-form-item>
        </el-form>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { postRequest } from "../../api/api.js";
import { Message } from "element-ui";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      infoForm: {
        projectName: "",
        fileUrl: "",
        overview: "",
        state: ""
      },
      //表单验证
      rules: {
        projectName: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ],
        overview: [{ required: true, message: "请输入概述", trigger: "blur" }],
        fileUrl: [{ required: true, message: "请输入来源", trigger: "blur" }],
        state: [{ required: true, message: "请输入说明", trigger: "blur" }]
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    //初始化
  },
  methods: {
    onEditorReady(editor) {},
    onSubmit() {
      //提交
      //this.$refs.infoForm.validate，这是表单验证
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          postRequest("/dataframe", this.infoForm).then(resp => {
            if (resp && resp.status == 200) {
              Message.success({ message: "创建成功!" });
              this.$router.push("/");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {
    //使用编辑器
    quillEditor
  }
};
</script>


<style scoped>
.container {
  width: 90%;
  margin: auto;
}
.edit_container{
  margin-top: 10px;
}
</style>