<template>
  <!-- 首页组件 -->
  <div>
    <!-- 行布局容器 gutter属性为栅格间隔 -->
    <el-row :gutter="20">
      <!-- 列布局容器 Element UI 将一行分为 24列，通过 span来表示占据的列数的份额-->
      <el-col :span="8">
        <!-- 卡片布局容器 shadow：设置阴影显示时机-->
        <!-- 用户登陆信息卡片栏 -->
        <el-card shadow="hover" class="mgb20" style="height:600px;">
          <div class="user-info">
            <!-- 用户头像 -->
            <img :src="avatar" class="user-avator" alt />
            <div class="user-info-cont">
              <!-- 用户名 -->
              <div class="user-info-name">{{name}}</div>
              <!-- 用户身份 -->
              <div>{{role}}</div>
            </div>
          </div>

          <div class="user-info-list">
            <span>性别：</span>
            {{userDetail.gender}}
          </div>
          <div class="user-info-list">
            <span>手机号码：</span>
            {{userDetail.phone}}
          </div>
          <div class="user-info-list">
            <span>邮箱地址：</span>
            {{userDetail.email}}
          </div>
          <div class="user-info-list">
            <span>居住地址：</span>
            {{userDetail.address}}
          </div>
        
        </el-card>
        <!-- Card 组件包括header和body部分，header部分需要有显式具名 slot 分发，同时也是可选的。 -->
      </el-col>
      <!-- 网站信息卡片；占据 16/24 的列份额 -->
      <el-col :span="16">
        <!-- 待办事项卡片 -->
        <el-card shadow="hover" style="height:600px;">
          <div slot="header" class="clearfix">
            <span>我的数据集</span>
            <router-link to="/adddataframe">
              <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
            </router-link>
          </div>
          <el-table
            :data="dataFrame"
            :show-header="false"
            height="500"
            style="width: 100%;font-size:14px;"
          >
            <!-- 当el-table元素中注入data对象数组后，在el-table-column中用prop属性来对应对象中的键名即可填入数据，用label属性来定义表格的列名。可以使用width属性来定义列宽。 -->

            <el-table-column>
              <template v-slot="scope">
                <!-- 这个插槽放置data中的title属性值 -->
                <router-link :to="{path:'/dataframeinfo?id='+scope.row.id }">
                  <div class="todo-item">{{scope.row.projectName}}</div>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template v-slot="scope">
                <router-link :to="{path:'editdataframe?id='+scope.row.id }">
                  <i class="el-icon-edit"></i>
                </router-link>
                <i @click="deleteDataFrame(scope.row.id,scope.$index)" class="el-icon-delete red"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Schart from "vue-schart";
import bus from "../../utils/bus";
import { getRequest } from "../../api/api.js";
import { deleteRequest } from "../../api/api.js";
export default {
  name: "dashboard",
  data() {
    return {
      // 从本地存储获取用户名
      userDetail: null,
      dataFrame: null,
      avatar: null,
      name: sessionStorage.getItem("ms_username"),
      // 待办事项卡片模拟数据

      // 图表公用模拟数据
      data: []
    };
  },
  components: {
    Schart
  },
  computed: {
    role() {
      // 利用三元表达式对用户登录后身份进行判定

      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  },
  // 在创建vue对象时，当html渲染之前就触发，只会触发一次；
  created() {
    this.handleListener();
    this.changeDate();
    this.getUserInfo();
    this.getDataFrame();
  },
  // activated,deactivated这两个生命周期函数一定是要在使用了keep-alive组件后才会有的
  // 在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发
  activated() {
    this.handleListener();
  },
  // 退出当前存在deactivated()函数页面时触发
  deactivated() {
    // 清除事件监听
    window.removeEventListener("resize", this.renderChart);
    // 清除监听
    bus.$off("collapse", this.handleBus);
  },
  methods: {
    deleteDataFrame(dataid, i) {
      console.log(i);

      this.$confirm("此操作将永久删除该数据集, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteRequest("/dataframe?id=" + dataid);
          this.dataFrame.splice(i, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getUserInfo: function() {
      getRequest("/userInfo").then(resp => {
        var data = resp.data;
        this.userDetail = data.obj;
        this.avatar = "/avatar/" + this.userDetail.id + ".jpg";
      });
    },
    getDataFrame: function() {
      getRequest("/dataframes").then(resp => {
        var data = resp.data;
        this.dataFrame = data.obj;
      });
    },
    changeDate() {
      // 获取 1970 年 1 月 1 日至今的毫秒数。
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        // 将data中的模拟数据转化为当前日期为基准的时间
        const date = new Date(now - (6 - index) * 86400000);
        // 将毫秒数转化为对应的日期时间并赋予给data.name，getMonth返回的是0~11所以要加1
        item.name = `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`;
      });
    },
    handleListener() {
      // 通过bus监听事件，在接受数据后调用handleBus方法
      bus.$on("collapse", this.handleBus);
      // 通过事件监听，判定浏览器尺寸，调用renderChart方法对图表进行重新渲染
      window.addEventListener("resize", this.renderChart);
    },
    handleBus(msg) {
      setTimeout(() => {
        this.renderChart();
      }, 300);
    },
    renderChart() {
      // bar 图表重新渲染
      this.$refs.bar.renderChart();
      // line 图表重新渲染
      this.$refs.line.renderChart();
    }
  }
};
</script>


<style scoped>
.user-info-list span {
  width: 20px;
}
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
  margin-top: 30px;
}

.user-info-list span {
  margin-left: 20px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
.red {
  color: #ff0000;
}
</style>

