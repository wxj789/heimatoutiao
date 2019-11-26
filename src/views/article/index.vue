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
              <el-radio :label="null">全部</el-radio>
              <el-radio label="0">草稿</el-radio>
              <el-radio label="1">待审核</el-radio>
              <el-radio label="2">审核通过</el-radio>
              <el-radio label="3">审核失败</el-radio>
              <!-- <el-radio label="4">已删除</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道列表：" >
            <!-- <el-select v-model="formData.channel_id" placeholder="请选择"> -->
              <!-- 单独添加一个所有频道的标签 -->
              <!-- <el-option label="所有频道" :value="null"></el-option> -->
              <!-- 渲染频道列表 -->
              <!-- <el-option
                v-for="channel in channels"
                :key="channel.id"
                :label="channel.name"
                :value="channel.id"
                ></el-option> -->
              <!-- <el-option label="ios" value="ios"></el-option> -->
            <!-- </el-select> -->
            <ChannelSelect
              v-model="formData.channel_id"></ChannelSelect>
          </el-form-item>
          <el-form-item label="时间选择：">
            <el-date-picker
              v-model="rangeDater"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
              <!-- value-format：指定输入框日期的格式 -->
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              style="margin-left:80px"
              type="primary"
              round
              @click="loadArticle(1)"
              >查询</el-button>
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
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="articles" style="width: 100%">
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
            <template  slot-scope="scope">
            <el-link icon="el-icon-edit" :underline="false" @click="$router.push(`/publish/${scope.row.id}`)">编辑</el-link>&nbsp;
            <el-link icon="el-icon-delete" :underline="false" @click="onDelete(scope.row.id)">删除</el-link>
            </template>
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
        :disabled="loading"
        >
        <!-- :disabled="loading"  表格加载时，是否禁止分页的禁用 -->
      </el-pagination>

    </el-card>

  </div>
</template>

<script>
import ChannelSelect from '../../components/channel-select'
export default {
  name: 'article-list',
  components: {
    ChannelSelect
  },
  data () {
    return {
      formData: {
        status: null
        // channel_id: null
        // begin_pubdate: '',
        // end_pubdate: ''
      },
      rangeDater: [], // 开始和结束时间
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
      loading: true, // 表格的load状态
      // channels: [], // 频道数据
      page: 1
    }
  },
  created () {
    // 加载文章列表
    this.loadArticle(1)
    // 加载频道列表
    // this.loadChannels()
  },
  methods: {
    loadArticle (page = 1) {
      // 加载文章列表loading
      this.loading = true
      // const token = window.localStorage.getItem('login-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        // 添加请求头
        // headers: {
        //   // 名字：值
        //   // 后端要求把 token 放到请求头中，并赋值给 Authorization
        //   // 注意：token的格式要求：Bearer token
        //   // Bearer 后有一个空格隔开
        //   Authorization: `Bearer ${token}`
        // },
        params: {
          // 增加文章状态
          status: this.formData.status,
          page,
          pre_page: 10,
          // 增加频道id
          channel_id: this.formData.channel_id,
          // 增加起止时间
          begin_pubdate: this.rangeDater ? this.rangeDater[0] : null, // 开始时间
          end_pubdate: this.rangeDater ? this.rangeDater[1] : null // 结束时间
        }
      }).then(res => {
        // console.log(res.data)
        this.articles = res.data.data.results
        this.num = res.data.data.total_count
      }).catch(err => {
        console.log(err, '失败')
      }).finally(() => {
        this.loading = false
      })
    },

    // 获取文章频道
    // loadChannels () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(res => {
    //     // console.log(res.data)

    //     this.channels = res.data.data.channels
    //   })
    // },
    // 根据页数显示不同的文字列表
    onPageChange (page) {
      // console.log(page)
      this.loadArticle(page)
      this.page = page
    },
    // 删除文章
    onDelete (id) {
      this.$axios({
        method: 'DELETE',
        url: `/articles/${id}`
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('login-token')}`
        // }
      }).then(res => {
        // console.log(res.data)
        // 删除成功，重新加载当前页的文章列表
        this.loadArticle(this.page)
      })
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
