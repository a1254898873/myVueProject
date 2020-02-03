<template>
  <div class="container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <el-table :data="userList" border style="width: 100%">
          <el-table-column prop="id" label="编号" width="100"></el-table-column>
          <el-table-column prop="username" label="用户名" width="150"></el-table-column>
          <el-table-column prop="gender" label="性别" width="100"></el-table-column>
          <el-table-column prop="phone" label="手机" width="150"></el-table-column>
          <el-table-column prop="email" label="邮件" width="150"></el-table-column>
          <el-table-column prop="address" label="地址" width="300"></el-table-column>

          <el-table-column label="操作" width="200">
            <template v-slot="scope">
              <el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="user.curPage"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="user.pageNumber"
            layout="total,sizes,  prev, pager, next, jumper"
            :total="user.totalAmount"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="项目管理" name="second">
        <el-table :data="dataFrames" border style="width: 100%">
          <el-table-column prop="id" label="编号" width="100"></el-table-column>
          <el-table-column prop="projectName" label="项目名" width="300"></el-table-column>
          <el-table-column prop="createBy" label="作者" width="100"></el-table-column>

          <el-table-column label="操作" width="200">
            <template v-slot="scope">
              <router-link :to="{path:'editdataframe?id='+scope.row.id }">
                <el-button type="text" icon="el-icon-edit">编辑</el-button>
              </router-link>
              <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="deleteDataFrame(scope.row.id,scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChangeDataframe"
            @current-change="handleCurrentChangeDataframe"
            :current-page="user.curPage"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="user.pageNumber"
            layout="total,sizes,  prev, pager, next, jumper"
            :total="user.totalAmount"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="轮播设置" name="third">
        <el-table :data="imgList" border style="width: 100%">
          <el-table-column prop="id" label="编号" width="100"></el-table-column>
          <el-table-column prop="name" label="名称" width="200"></el-table-column>
          <el-table-column prop="url" label="链接" width="600"></el-table-column>

          <el-table-column label="操作" width="200">
            <template v-slot="scope">
              <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="deleteImg(scope.row.id,scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>添加图片</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="addImg">添加</el-button>
          </div>
          <el-form ref="img" :model="img" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model="img.name"></el-input>
            </el-form-item>
            <el-form-item label="链接">
              <el-input v-model="img.url"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getRequest } from "../../api/api.js";
import { postRequest } from "../../api/api.js";
import { deleteRequest } from "../../api/api.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      activeName: "first",
      user: {
        curPage: 1,
        pageNumber: 10,
        totalAmount: 10
      },
      dataframe: {
        cur_page: 1, //默认在第一页

        pageNum: 10, //默认每页显示1条数据

        totalCount: 10 //默认总条数为一条
      },
      userList: [],
      dataFrames: [],
      imgList: [],
      form: {
        id: "",
        username: "",
        gender: "",
        email: "",
        phone: "",
        address: ""
      },
      img: {
        name: "",
        url: ""
      },
      idx: -1,
      editVisible: false
    };
  },
  methods: {
    addImg(){
      postRequest("/carousel",this.img).then(resp => {
        if (resp && resp.status == 200) {
          this.getimg();
           Message.success({ message: "添加成功!" });
        }
      });
    },
    deleteImg(dataid, i) {
      console.log(i);

      this.$confirm("此操作将永久删除该图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteRequest("/carousel?id=" + dataid);
          this.imgList.splice(i, 1);
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
    getimg: function() {
      getRequest("/carousel").then(resp => {
        var data = resp.data;
        this.imgList = data.obj;
      });
    },
    deleteDataFrame(dataid, i) {
      console.log(i);

      this.$confirm("此操作将永久删除该数据集, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteRequest("/dataframe?id=" + dataid);
          this.dataFrames.splice(i, 1);
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
    handleCurrentChangeDataframe(val) {
      console.log(val);
      this.dataframe.cur_page = val;
      this.getDataFrame(); //获取用户点击的当前页后刷新页面数据
    },
    handleSizeChangeDataframe(val) {
      console.log(val);
      this.dataframe.pageNum = val;
      this.getDataFrame(); //根据用户获取的每页显示页面数量显示页面
    },
    getTotal: function() {
      getRequest(
        "/page/total?page=" +
          this.dataframe.cur_page +
          "&size=" +
          this.dataframe.pageNum
      ).then(resp => {
        var data = resp.data;
        this.dataframe.totalCount = data.obj;
      });
    },
    getDataFrame: function() {
      getRequest(
        "/page/dataframes?page=" +
          this.dataframe.cur_page +
          "&size=" +
          this.dataframe.pageNum
      ).then(resp => {
        var data = resp.data;
        this.dataFrames = data.obj;
      });
    },
    handleEdit(index, row) {
      this.idx = index;
      this.form.id = row.id;
      this.form.username = row.username;
      this.form.gender = row.gender;
      this.form.email = row.email;
      this.form.phone = row.phone;
      this.form.address = row.address;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      postRequest("/edituser", this.form).then(resp => {
        if (resp && resp.status == 200) {
          this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        }
      });
      this.editVisible = false;

      this.$set(this.userList, this.idx, this.form);
    },
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          deleteRequest("/user?id=" + this.userList[index].id);
          this.$message.success("删除成功");
          this.userList.splice(index, 1);
        })
        .catch(() => {});
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.user.curPage = val;
      this.getUserList(); //获取用户点击的当前页后刷新页面数据
    },
    handleSizeChange(val) {
      console.log(val);
      this.user.pageNumber = val;
      this.getUserList(); //根据用户获取的每页显示页面数量显示页面
    },
    getUserAmount() {
      getRequest(
        "/user/pages?page=" +
          this.user.curPage +
          "&size=" +
          this.user.pageNumber
      ).then(resp => {
        var data = resp.data;
        this.totalAmount = data.obj;
      });
    },
    getUserList() {
      getRequest(
        "/user/page?page=" + this.user.curPage + "&size=" + this.user.pageNumber
      ).then(resp => {
        var data = resp.data;
        this.userList = data.obj;
      });
    }
  },
  created() {
    this.getUserAmount();
    this.getUserList();
    this.getTotal();
    this.getDataFrame();
    this.getimg();
  }
};
</script>
<style scoped>
.red {
  color: #ff0000;
}
.box-card{
  margin: 10px;
}
</style>