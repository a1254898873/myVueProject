<template>
  <div class="container">
    <span>{{dataframeinfo.projectName}}</span>
    <span style="float: right; padding: 3px 0" type="text">
      <el-tag class="tagInfo" type="warning">作者:{{dataframeinfo.createBy}}</el-tag>
      <el-tag class="tagInfo">数据集协议:{{dataframeinfo.licence}}</el-tag>
      <el-tag class="tagInfo" type="success">创建时间:{{utc2beijing(dataframeinfo.createAt)}}</el-tag>
    </span>
    <el-divider></el-divider>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="概述" name="first" v-model="currentActive">
        <el-card shadow="hover" class="box-card">
          <div slot="header" class="clearfix">
            <el-tag>概述</el-tag>
          </div>
          <div>{{dataframeinfo.overview}}</div>
        </el-card>

        <el-card shadow="hover" class="box-card">
          <div slot="header" class="clearfix">
            <el-tag>说明</el-tag>
          </div>
          <div v-html="dataframeinfo.state"></div>
        </el-card>

        <el-card shadow="hover" class="box-card">
          <div slot="header" class="clearfix">
            <el-tag>来源</el-tag>
          </div>
          <div>{{dataframeinfo.fileUrl}}</div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="评论" name="second">
        <el-card class="box-card" shadow="hover" :key="index" v-for="(item,index) in comments">
          <span>{{item.content}}</span>
          <span style="float: right; padding: 3px 0" type="text">
            <el-tag class="tagInfo" type="warning">用户:{{item.createBy}}</el-tag>
            <el-tag class="tagInfo" type="success">评论时间:{{utc2beijing(item.createAt)}}</el-tag>
          </span>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>评论该项目</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="addComment">添加</el-button>
          </div>
          <el-input type="textarea" v-model="text" rows="4"></el-input>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getRequest } from "../../api/api.js";
import { postRequest } from "../../api/api.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      activeName: "first",
      id: null,
      dataframeinfo: null,
      comments: null,
      text: null,
      name: sessionStorage.getItem("ms_username")
    };
  },
  methods: {
    addComment() {
      postRequest("/comment", { content: this.text, did: this.id }).then(
        resp => {
          if (resp && resp.status == 200) {
            Message.success({ message: "评论成功!" });
            postRequest("/notification", {
              notifier: this.name,
              receiver: this.dataframeinfo.createBy,
              did:this.dataframeinfo.id,
              dtitle:this.dataframeinfo.projectName,
              content:this.text,
              status:0
            });

            this.$router.go(0);
          }
        }
      );
    },
    utc2beijing: function(utc_datetime) {
      return new Date(utc_datetime).toLocaleString();
    },
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
    },
    getComment: function() {
      getRequest("/did/comment?id=" + this.id).then(resp => {
        var data = resp.data;
        this.comments = data.obj;
      });
    }
  },
  created() {
    //获取传入的参数
    var param = this.$route.query;
    //  var param = this.$route.params;
    this.id = param.id;
    this.getDataFrame();
    this.getComment();

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
.tagInfo {
  margin-left: 10px;
}
.box-card {
  margin: 10px;
}
</style>