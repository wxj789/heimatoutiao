<template>
  <div class="account">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户信息</span>
      </div>
      <div class="list">
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
                <el-button type="primary" style="margin-left:100px" @click="onConfirm">提交修改</el-button>
            </el-form>
        </div>
        <div class="right"  :model="accountInfo">
            <img style="width:200px; margin-bottom:20px" :src="accountInfo.photo" alt="">
            <el-button type="primary" @click="onLoadImage">修改头像</el-button>
            <input type="file" hidden ref="image" @change="onSelectImage" >
        </div>
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
        // console.log(res.data)
        this.accountInfo = res.data.data
      })
    },
    onConfirm () {
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: this.accountInfo
      }).then(res => {
        // console.log(res.data)
      })
    },
    onLoadImage () {
      this.$refs.image.click()
    },
    onSelectImage () {
      const file = this.$refs.image.files[0]
      const fd = new FormData()
      fd.append('photo', file)
      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        data: fd
      }).then(res => {
        // console.log(res.data)
        this.loadInfo()
      })
    }
  }

}
</script>

<style lang="less" scoped>
.list {
    display: flex;
    justify-content: space-between;
    .right {
        display: flex;
        flex-direction: column;
        margin-right: 300px;
    }
}
</style>
