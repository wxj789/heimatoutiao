<template>
  <div class="article">
    <!-- 全部图文 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
      <span>全部图文</span>
      </div>
      <div class="text item">
        <el-form>
          <el-form-item label="文章状态：">
            <el-radio-group v-model="formData.status">
              <el-radio label="全部"></el-radio>
              <el-radio label="草稿"></el-radio>
              <el-radio label="待审核"></el-radio>
              <el-radio label="审核通过"></el-radio>
              <el-radio label="审核失败"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道列表：">
            <el-select v-model="formData.channel_id" placeholder="请选择">
              <el-option label="c++" value="c++"></el-option>
              <el-option label="ios" value="ios"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间选择：">
            <el-date-picker
              v-model="rangeDater"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 内容 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
      <span>共找到{{ num }}条符合条件的内容</span>
      </div>
      <div>
        <!-- el-table 表格组件
            data 表格的数组，要求是数组
            表格组件会使用 data 的数据 在内部自己进行遍历，不需要我们再写 v-for -->
        <el-table :data="articles" style="width: 100%">
          <!-- el-table-column 表格列组件
              prop 属性 用来指定渲染哪个数据字段
              label 属性 表头的名称
              也可以通过width设置每一列的宽度 -->
          <!-- 表格列默认只能渲染普通文本，如果想要渲染其他类型的数据  如：图片
              需要自定义表格列 -->
          <el-table-column prop="img" label="封面">
            <!-- 自定义表格列  在template上声明 slot-scope='scope'，
            之后就可以通过scope.row 获取到遍历的当前项
            scope.row 相当于v-for 中的item -->
            <template slot-scope="scope" >
              <img width="60" :src="scope.row.cover.images[0]">
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题">
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-tag :type="items[scope.row.status].type"> {{items[scope.row.status].label}} </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="日期">
          </el-table-column>
          <el-table-column label="操作">
            <el-link icon="el-icon-edit" :underline="false">编辑</el-link>&nbsp;
            <el-link icon="el-icon-delete" :underline="false">查看</el-link>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px;margin-left:360px"
        background
        layout="prev, pager, next"
        :total="num"
        @current-change="onPageChange"
        >
        <!-- :disabled="loading"  表格加载时，是否禁止分页的禁用 -->
      </el-pagination>

    </el-card>

  </div>
</template>

<script>
export default {
  // name: 'article',
  data () {
    return {
      formData: {
        status: [],
        channel_id: ''
        // begin_pubdate: '',
        // end_pubate: ''
      },
      rangeDater: '',
      tableData: [
        {
          img: '',
          title: '1',
          status: '2',
          pubdate: '3'
        }
      ],
      articles: [],
      num: 0,
      items: [
        { type: 'danger', label: '草稿' },
        { type: '', label: '待审核' },
        { type: 'success', label: '已发表' },
        { type: 'warning', label: '审核失败' },
        { type: 'info', label: '已删除' }
      ],
      loading: true // 表格的load状态
    }
  },
  created () {
    this.loadArticle(1)
  },
  methods: {
    loadArticle (page = 1) {
      // 加载loading
      this.loading = true
      const token = window.localStorage.getItem('login-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        // 添加请求头
        headers: {
          // 名字：值
          // 后端要求把 token 放到请求头中，并赋值给 Authorization
          // 注意：token的格式要求：Bearer token
          // Bearer 后有一个空格隔开
          Authorization: `Bearer ${token}`
        },
        params: {
          page,
          pre_page: 10
        }
      }).then(res => {
        console.log(res.data)
        this.articles = res.data.data.results
        this.num = res.data.data.total_count
      }).catch(err => {
        console.log(err, '失败')
      })
    },
    onPageChange (page) {
      // console.log(page)
      this.loadArticle(page)
    }
  }

}
</script>

<style>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    margin-bottom: 10px;
  }

</style>
