<template>
  <div class="comment">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论列表</span>
      </div>
      <div>
        <!-- el-table 表格组件
            data 表格的数组，要求是数组
            表格组件会使用 data 的数据 在内部自己进行遍历，不需要我们再写 v-for -->
        <el-table :data="comments" style="width: 100%">
          <!-- el-table-column 表格列组件
              prop 属性 用来指定渲染哪个数据字段
              label 属性 表头的名称
              也可以通过width设置每一列的宽度 -->
          <!-- 表格列默认只能渲染普通文本，如果想要渲染其他类型的数据  如：图片
              需要自定义表格列 -->
          <el-table-column prop="title" label="标题" width="600px">
            <!-- 自定义表格列  在template上声明 slot-scope='scope'，
            之后就可以通过scope.row 获取到遍历的当前项
            scope.row 相当于v-for 中的item -->
            <!-- <template slot-scope="scope" >
              <img width="60" :src="scope.row.cover.images[0]">
            </template> -->
          </el-table-column>
          <el-table-column label="评论状态">
            <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.comment_status"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="onStatusChange(scope.row)">
                </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数">
            <!-- <template slot-scope="scope">
              <el-tag :type="items[scope.row.status].type"> {{items[scope.row.status].label}} </el-tag>
            </template> -->
          </el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数">
          </el-table-column>
          <el-table-column label="操作">
                <!-- slot-scope="scope" -->
            <template>
            <el-link icon="el-icon-edit" :underline="false">修改</el-link>
            </template>
          </el-table-column>
        </el-table>
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
  name: 'CommentArticle',
  data () {
    return {
      comments: [],
      total_count: 0,
      page: 1
    }
  },
  created () {
    this.loadComment(1)
  },
  methods: {
    loadComment (page) {
      this.$axios({
        methos: 'GET',
        url: '/articles',
        params: {
          page,
          response_type: 'comment'
        }
      }).then(res => {
        console.log(res.data)
        this.comments = res.data.data.results
        this.total_count = res.data.data.total_count
      })
    },

    // 修改评论状态
    onStatusChange (data) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: data.id.toString()
        },
        data: {
          allow_comment: data.comment_status
        }
      }).then(res => {
        console.log(res.data)
        this.$message({
          type: 'success',
          message: `${data.comment_status ? '开启' : '关闭'}成功`
        })
      })
    },
    // 跳转对应的页数
    onCurrentPage (page) {
      this.page = page
      this.loadComment(page)
    }
  }

}
</script>

<style>

</style>
