<template>
  <div>
    <el-col :span="24">
      <el-card shadow="hover" class="imglist">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(img,index) in imgList" :key="index">
            <img v-bind:src="img.url" />
          </el-carousel-item>
        </el-carousel>
      </el-card>
    </el-col>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover" class="latestData">
          <div slot="header" class="clearfix">
            <span>最新数据集</span>
          </div>
          <el-table :data="latestProject" style="width: 100%">
            <el-table-column prop="projectName" label="名字" width="320"></el-table-column>
            <el-table-column prop="createBy" label="作者" width="180"></el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover" class="latestData">
          <div slot="header" class="clearfix">
            <span>官方推荐</span>
          </div>
          <el-table :data="recommendList" style="width: 100%">
            <el-table-column prop="title" label="名字" width="320"></el-table-column>
            <el-table-column prop="author" label="作者" width="180"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getRequest } from "../../api/api.js";
import { postRequest } from "../../api/api.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      imgList: [],
      latestProject: [],
      recommendList:[]
    };
  },
  methods: {
    getRecommend: function() {
      getRequest("/recommend").then(resp => {
        var data = resp.data;
        this.recommendList = data.obj;
      });
    },
    getimg: function() {
      getRequest("/carousel").then(resp => {
        var data = resp.data;
        this.imgList = data.obj;
      });
    },
    getDataframe() {
      getRequest("page/dataframes?page=1&size=5").then(resp => {
        var data = resp.data;
        this.latestProject = data.obj;
      });
    }
  },
  created() {
    this.getimg();
    this.getDataframe();
    this.getRecommend();
  }
};
</script>
<style scoped>
.imglist {
  margin: 10px;
}
.latestData{
  margin: 10px;
}
</style>