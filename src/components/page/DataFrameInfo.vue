<template>
  <div class="container">
    <h3>{{dataframeinfo.projectName}}</h3>
    <el-divider></el-divider>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="概述" name="first">
        <el-collapse @change="handleChange">
          <el-collapse-item title="概述" name="1">
            <div>{{dataframeinfo.overview}}</div>
          </el-collapse-item>
          <el-collapse-item title="说明" name="2">
            <div v-html="dataframeinfo.state"></div>
          </el-collapse-item>
          <el-collapse-item title="来源" name="3">
            <div>{{dataframeinfo.fileUrl}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="评论" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getRequest } from "../../api/api.js";
export default {
  data() {
    return {
      activeName: "second",
      id: null,
      dataframeinfo: null
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange(val) {
      console.log(val);
    },
    getDataFrame: function() {
      getRequest("/dataframe?id=" + this.id).then(resp => {
        var data = resp.data;
        this.dataframeinfo = data.obj;
      });
    }
  },
  created() {
    //获取传入的参数
    var param = this.$route.query;
    //  var param = this.$route.params;
    this.id = param.id;
    this.getDataFrame();

    //如果使用query方式传入的参数使用this.$route.query 接收
    //如果使用params方式传入的参数使用this.$router.params接收
  }
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: auto;
}
</style>