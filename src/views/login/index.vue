<template>
    <div class="login">
        <!-- elementUI card卡片组件 -->
        <el-card class="login-card">
            <!-- 卡片内容 插槽内容 el-card 已经定义好了 -->
            <div class="title">
                <img src="../../assets/img/logo_index.png" alt="">
            </div>
            <!-- 表单 -->
            <el-form style="margin-top:25px">
                <el-form-item>
                    <!-- 放值表单组件 -->
                    <!-- 手机号 -->
                    <el-input placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <!-- 验证码 -->
                    <el-input style="width:240px" placeholder="验证码"></el-input>
                    <el-button plain style="float:right;width:140px">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <!-- 勾选同意框 -->
                    <el-checkbox>我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私条款</el-link></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

// lang="less" 定义写.less文件
// 加scoped属性，使样式只对当前组件有作用
<style lang="less" scoped>
    .login {
        height: 100vh; // 占当前屏幕的100%高度
        background-image: url('../../assets/img/login_bg.jpg');
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;

        .login-card {
            width: 440px;
            height: 360px;
            .title {
                text-align: center;
                img {
                    height: 45px;
                }
            }
        }
    }
</style>
