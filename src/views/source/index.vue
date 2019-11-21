<template>
  <div class="source">
      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图片管理</span>
      </div>
      <div style="margin-bottom:20px">
        <el-radio-group v-model="radio1" @change="onCollect">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button  label="收藏"></el-radio-button>
        </el-radio-group>
        <el-button style="float:right" type="primary">上传图片</el-button>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col
            class="col-item"
            :xs="24"
            :sm="12"
            :md="4"
            v-for="item in images"
            :key="item.id"
          >
            <el-card :body-style="{ padding: '0px' }">
              <img style="" :src="item.url" class="image" height="200">
              <div style="padding: 14px; font-size:24px">
                <span @click="onIsCollected(item)" class="el-icon-star-on" style="cursor: pointer;" :class="{color: item.is_collected}"></span>
                <span @click="onDelete(item)" class="el-icon-delete-solid" style="margin-left:100px;cursor: pointer;"></span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <!-- 分页 -->
      <div style="margin-top:20px;margin-left:400px">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total_count"
            @current-change="onCurrentPage">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'source-list',
  data () {
    return {
      radio1: '全部',
      images: [],
      total_count: 0,
      page: 1
    }
  },
  created () {
    this.loadImage(1)
  },
  methods: {
    loadImage (page) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: false,
          page,
          per_page: 12
        }
      }).then(res => {
        console.log(res.data)
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
      })
    },
    onIsCollected (item) {
      this.$axios({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        item.is_collected = !item.is_collected
        // this.loadImage()
      })
    },
    onCurrentPage (page) {
      this.page = page
      this.loadImage(page)
    },
    // 删除
    onDelete (item) {
      this.$axios({
        method: 'DELETE',
        url: `/user/images/${item.id}`
      }).then(res => {
        console.log(res.data)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.loadImage(this.page)
      }).catch(err => {
        console.log(err)
        this.$message.error('删除失败')
      })
    },
    // 收藏
    onCollect (value) {
      if (value === '收藏') {
        this.$axios({
          method: 'GET',
          url: '/user/images',
          params: {
            collect: true,
            page: 1,
            per_page: 12
          }
        }).then(res => {
          console.log(res.data)
          this.images = res.data.data.results
          this.total_count = res.data.data.total_count
        })
      } else if (value === '全部') {
        this.loadImage()
      }
    }
  }
}
</script>
<style  lang='less' scoped>
.col-item {
  margin-bottom: 20px;
  .action {
    display: flex;
    justify-content: center;
    font-size: 24px;
  }
}
.color {
  color: #f00;
}

</style>
