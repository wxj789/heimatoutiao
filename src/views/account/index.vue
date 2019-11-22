<template>
  <div class="account">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户信息</span>
      </div>
      <div style="width:400px">
          <el-form ref="form" :model="accountInfo" label-width="100px">
            <el-form-item label="昵称：">
                <el-input v-model="accountInfo.name" ></el-input>
            </el-form-item>
            <el-form-item label="个人简介：">
                <el-input v-model="accountInfo.intro" ></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input v-model="accountInfo.mobile" ></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
                <el-input disabled v-model="accountInfo.email" ></el-input>
            </el-form-item>
            <el-button type="primary" style="margin-left:100px">提交修改</el-button>
          </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AccountInfo',
  data () {
    return {
      accountInfo: {}
    }
  },
  created () {
    this.loadInfo()
  },
  methods: {
    loadInfo () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        console.log(res.data)
        this.accountInfo = res.data.data
      })
    }
  }

}
</script>

<style>

</style>
