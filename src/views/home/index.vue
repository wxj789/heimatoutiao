<template>
  <div>
    <el-container>
      <!-- 左侧导航 -->
      <el-aside style="width:220px">
        <div class="aside">
          <img src="../../assets/img/logo_admin.png" alt="">
        </div>
        <!-- 左侧菜单 -->
        <el-menu style="width:221px" background-color='#353b4e' text-color='#adafb5' active-text-color="#ffd04b">
          <el-menu-item>首页</el-menu-item>
          <!-- 二级菜单 -->
          <el-submenu>
            <template slot="title">内容管理</template>
            <el-menu-item>发布文章</el-menu-item>
            <el-menu-item>内容列表</el-menu-item>
            <el-menu-item>评论列表</el-menu-item>
            <el-menu-item>素材管理</el-menu-item>
          </el-submenu>
          <!-- 二级菜单 -->
          <el-submenu>
            <template slot="title">粉丝管理</template>
            <el-menu-item>图文数据</el-menu-item>
            <el-menu-item>粉丝概况</el-menu-item>
            <el-menu-item>粉丝画像</el-menu-item>
            <el-menu-item>粉丝列表</el-menu-item>
          </el-submenu>
          <el-menu-item>账户信息</el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧 -->
      <el-container>
        <el-header>
          <header-a></header-a>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headerA from '../../components/header.vue'
export default {
  name: 'home',
  components: {
    'header-a': headerA
  }
}
</script>
<style lang="less" scoped>
  .el-aside {
    background: #323745;
    height: 100vh;
    overflow: hidden;
    .aside {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 30px;
      }
    }
    // .menu {
    //   background-color: #353b4e;
    //   text-color: #adafb5;
    //   // :active:#aaa
    // }
  }
</style>
