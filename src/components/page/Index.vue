<template>
  <div>
    <el-col :span="24">
      <el-card shadow="hover">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(img,index) in imgList" :key="index">
            <img v-bind:src="img.url">
          </el-carousel-item>
        </el-carousel>
      </el-card>
    </el-col>
  </div>
</template>
<script>
import { getRequest } from "../../api/api.js";
import { postRequest } from "../../api/api.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      imgList: []
    };
  },
  methods: {
    getimg: function() {
      getRequest("/carousel").then(resp => {
        var data = resp.data;
        this.imgList = data.obj;
      });
    }
  },
  created(){
    this.getimg();
  }
};
</script>
<style scoped>

</style>