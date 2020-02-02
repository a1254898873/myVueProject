<template>
  <div class="container">
    <div class="title">
      <h3>公共数据集</h3>
      <el-divider></el-divider>
    </div>
    <div class="dataContainer">
      <router-link
        :to="{path:'/dataframeinfo?id='+item.id }"
        :key="index"
        v-for="(item,index) in dataFrames"
      >
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{item.projectName}}</span>

            <span style="float: right; padding: 3px 0" type="text">
              <el-tag class="tagInfo" type="warning">作者:{{item.createBy}}</el-tag>
              <el-tag class="tagInfo">数据集协议:{{item.licence}}</el-tag>
              <el-tag class="tagInfo" type="success">创建时间:{{utc2beijing(item.createAt)}}</el-tag>
            </span>
          </div>
          <div>{{item.overview}}</div>
        </el-card>
      </router-link>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="cur_page"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="pageNum"
          layout="total,sizes,  prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getRequest } from "../../api/api.js";
export default {
  data() {
    return {
      dataFrames: null,
      cur_page: 1, //默认在第一页

      pageNum: 10, //默认每页显示1条数据

      totalCount: 10 //默认总条数为一条
    };
  },
  created() {
    this.getDataFrame();
    this.getTotal();
  },
  methods: {
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getDataFrame(); //获取用户点击的当前页后刷新页面数据
    },
    handleSizeChange(val) {
      this.pageNum = val;
      this.getDataFrame(); //根据用户获取的每页显示页面数量显示页面
    },
    getTotal: function() {
      getRequest("page/total?page=" + this.cur_page + "&size=" + this.pageNum).then(
        resp => {
          var data = resp.data;
          this.totalCount = data.obj;
          console.log(this.totalCount);
        }
      );
    },
    getDataFrame: function() {
      getRequest("page/dataframes?page=" + this.cur_page + "&size=" + this.pageNum).then(
        resp => {
          var data = resp.data;
          this.dataFrames = data.obj;
          console.log(this.dataFrames);
        }
      );
    },
    utc2beijing: function(utc_datetime) {
      return (new Date(utc_datetime)).toLocaleString();
    }
  }
};
</script>
<style scoped>
.container .box-card {
  margin: 10px;
}
.tagInfo {
  margin-left: 10px;
}
.title h3 {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>