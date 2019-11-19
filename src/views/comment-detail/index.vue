<template>
  <div class="commentDetail">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-button style="float: left; padding: 3px 0" type="text">返回全部图文</el-button>
        </div>
        <div>
            <el-table :data="commentDetail" border style="width: 100%;">
                <el-table-column
                    label="头像"
                    width="180">
                    <template slot-scope="scope">
                        <img height=50 :src="scope.row.aut_photo" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="评论内容">
                </el-table-column>
                <el-table-column prop="like_count" label="点赞数">
                </el-table-column>
                <el-table-column prop="reply_count" label="回复数">
                </el-table-column>
                <el-table-column label="是否点赞">
                    <template slot-scope="scope">
                        <!-- {{ scope.row.is_liking === 1 ? '已赞' : '未赞' }} -->
                        <el-switch
                            v-model='scope.row.is_liking'
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="is_top" label="是否置顶">
                    <template slot-scope="scope">
                        {{ scope.row.is_top === 1 ? '已置顶' : '未置顶' }}
                        <!-- <el-switch
                            v-model='scope.row.is_top'
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch> -->
                    </template>
                </el-table-column>
                <el-table-column prop="pubdate" label="发布时间">
                </el-table-column>
            </el-table>
        </div>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'commentDetail',
  data () {
    return {
      commentDetail: []
    }
  },
  // 获取路由参数，除了 this.$route.params.id 外
  // 可以通过 props 更为简洁的方法获取
  // 用起来和 data 数据一样
  props: {
    id: {
      type: String,
      required: true
    }
  },
  created () {
    this.loadCommentDetail()
  },
  methods: {
    loadCommentDetail () {
      this.$axios({
        method: 'GET',
        url: '/comments',
        params: {
          type: 'a',
          // 获取路由参数 this.$route.params.id
          //   source: this.$route.params.id
          source: this.id
        },
        data: {
          allow_comment: true
        }
      }).then(res => {
        console.log(res.data)
        this.commentDetail = res.data.data.results
      }).catch(err => {
        console.log(err)
        this.$message.error('获取失败')
      })
    }
  }

}
</script>

<style>
</style>
