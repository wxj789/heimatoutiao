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
            <img src="../assets/img/avatar.jpg" alt="">
            <!-- 用户信息 -->
            <el-dropdown trigger="click">
                 <span>嘴角笑意<i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >个人信息</el-dropdown-item>
                <el-dropdown-item >GIT地址</el-dropdown-item>
                <el-dropdown-item >退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .left {
        span {
        margin-left: 5px;
        vertical-align: top;
        }
    }
    .right {
        img {
            width: 40px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 8px;
        }
        .el-dropdown {
            cursor: pointer;
        }
    }
</style>
