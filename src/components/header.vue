<template>
<!-- 头部组件 -->
    <el-row class="header" type="flex" justify="space-between" align="middle">
        <!-- 左侧 -->
        <el-col class="left" :span="6">
            <i class="el-icon-s-unfold" style="font-size:20px"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <!-- 右侧 -->
        <el-col class="right" :span="3">
            <!-- 头像 -->
            <img :src="accountInfo.photo" alt="">
            <!-- 用户信息 -->
            <el-dropdown trigger="click">
                 <span>{{ accountInfo.name }}<i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >个人信息</el-dropdown-item>
                <el-dropdown-item >GIT地址</el-dropdown-item>
                <!-- 如果想要给一个组件注册一个原生js事件
                    使用 .native 修饰符 -->
                <el-dropdown-item @click.native="onLogout" >退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
import eventBus from '../views/utils/event-bus'
export default {
  data () {
    return {
      accountInfo: {}
    }
  },
  created () {
    this.loadInfo()
    // 在初始化中监听自定义事件
    // 订阅
    eventBus.$on('updata-user', accountInfo => {
      this.accountInfo = accountInfo
    })
  },
  methods: {
    onLogout () {
      this.$confirm('确定要退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('login-token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    loadInfo () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        // console.log(res.data)
        this.accountInfo = res.data.data
      }).catch(() => {
        this.$message.error('用户信息加载失败！')
      })
    }
  }

}
</script>

<style lang="less" scoped>
  .header {
    background-color: #fff;
    height: 50px;
    .left {
      span {
        margin-left: 5px;
        vertical-align: top;
      }
    }
    .right {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 8px;
      }
      .el-dropdown {
        cursor: pointer;
      }
    }
  }

</style>
