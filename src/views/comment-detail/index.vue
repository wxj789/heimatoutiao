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
                    <template slot-scope="scope">
                        {{ scope.row.pubdate | dateFormat }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>

  </div>
</template>

<script>
// import moment from 'moment'
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
  // 使用过滤器修改时间格式
  // 有局部过滤器 和 全局过滤器
  // 作用：用于一些简单的文本格式化，例如：日期格式化处理
  // 过滤器中的函数可以直接在模板中使用
  // {{ 数据 | 过滤器函数名 }}
  //   filters: {
  //     dateFormat (value) {
  //       return moment(value).format('YYYY-MM-DD hh:mm:ss')
  //     }
  //   },
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
        const commentDetail = res.data.data.results
        // // 使用moment 修改时间格式
        // // 遍历
        // commentDetail.forEach(function (item) {
        //   item.pubdate = moment(item.pubdate).format('YYYY-MM-DD hh:mm:ss')
        // })
        this.commentDetail = commentDetail
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
