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
              <el-tag class="tagInfo">作者:{{item.createBy}}</el-tag>
              <el-tag class="tagInfo" type="success">创建时间:{{utc2beijing(item.createAt)}}</el-tag>
            </span>
          </div>
          <div>{{item.overview}}</div>
        </el-card>
      </router-link>
    </div>
  </div>
</template>
<script>
import { getRequest } from "../../api/api.js";
export default {
  data() {
    return {
      dataFrames: null
    };
  },
  created() {
    this.getDataFrame();
  },
  methods: {
    getDataFrame: function() {
      getRequest("/alldataframes?page=0&size=5").then(resp => {
        var data = resp.data;
        this.dataFrames = data.obj;
        console.log(this.dataFrames);
      });
    },
    utc2beijing: function(utc_datetime) {
      // 转为正常的时间格式 年-月-日 时:分:秒
      var T_pos = utc_datetime.indexOf("T");
      var Z_pos = utc_datetime.indexOf("Z");
      var year_month_day = utc_datetime.substr(0, T_pos);
      var hour_minute_second = utc_datetime.substr(
        T_pos + 1,
        Z_pos - T_pos - 1
      );
      var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

      // 处理成为时间戳
      timestamp = new Date(Date.parse(new_datetime));
      timestamp = timestamp.getTime();
      timestamp = timestamp / 1000;

      // 增加8个小时，北京时间比utc时间多八个时区
      var timestamp = timestamp + 8 * 60 * 60;

      // 时间戳转为时间
      var beijing_datetime = new Date(parseInt(timestamp) * 1000)
        .toLocaleString()
        .replace(/年|月/g, "-")
        .replace(/日/g, " ");
      return beijing_datetime; // 2017-03-31 16:02:06
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
.title h3{
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>