<template>
    <div class="login">
        <!-- elementUI card卡片组件 -->
        <el-card class="login-card">
            <!-- 卡片内容 插槽内容 el-card 已经定义好了 -->
            <div class="title">
                <img src="../../assets/img/logo_index.png" alt="">
            </div>
            <!-- 表单 -->
            <!-- model属性  绑定表单数据对象  rules属性：绑定校验规则对象 -->
            <el-form ref="formObj" style="margin-top:25px" :model="loginForm" :rules="loginRules">
                <el-form-item prop="mobile">
                    <!-- 放值表单组件 -->
                    <!-- 手机号 -->
                    <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <!-- 验证码 -->
                    <el-input v-model="loginForm.code" style="width:240px" placeholder="验证码"></el-input>
                    <el-button plain style="float:right;width:140px">发送验证码</el-button>
                </el-form-item>
                <el-form-item prop="checked">
                    <!-- 勾选同意框 -->
                    <el-checkbox v-model="loginForm.checked">我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私条款</el-link></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button @click="login" type="primary" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 要校验的整个表单数据
      loginForm: {
        mobile: '',
        code: '',
        checked: ''
      },
      //   校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入六位数字的验证码' }
        ],
        checked: [
          // validator 自定义校验函数
          { validator (rules, value, callback) {
            //   rules 代表当前的规则  一般没用
            // value 代表当前的值  表单字段checked的值
            // callback 回调函数
            if (value) {
              // 如果是true 就是已经选中，通过验证
              callback() // 验证通过  直接调用callback
            } else {
              // false 没被选中，不通过验证
              callback(new Error('请您仔细阅读协议和条款，并同意')) // 验证没有通过，也调用callback  在函数内定义错误提示
            }
          } }
        ]
      }
    }
  },
  methods: {
    login () {
      //   this.$refs.xxx 获取ref属性值为xxx的dom元素
    //   this.$refs.formObj 获取el-form
    // validate()方法内是一个回调函数   回调函数出入两个参数（校验是否成功，未通过校验的字段>对象）
      this.$refs.formObj.validate((isOk) => {
        if (isOk) {
          //   校验通过，继续下一步 调接口 登录
          this.$axios.post('/authorizations', this.loginForm).then(res => {
            localStorage.setItem('login-token', res.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              message: '请填写正确的信息',
              type: 'warning'
            })
          })
        }
      })
    }
  }

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
