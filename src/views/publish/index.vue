<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ $route.params.id ? '编辑文章' : '发表文章'}}</span>
      </div>
      <el-form ref="form" :model="article" label-width="80px">
        <!-- 标题 -->
        <el-form-item label="标题：">
          <el-input placeholder="文章名称 不少于五个字符" v-model="article.title" style="width:400px"></el-input>
        </el-form-item>
        <!-- 内容 -->
        <el-form-item label="内容：">
          <!-- 富文本编辑器 -->
          <quillEditor
            style="height:440px"
            v-model="article.content"
            ref="myQuillEditor"
            :options="editorOption"
          ></quillEditor>
        </el-form-item>
        <br><br><br>
        <!-- 封面 -->
        <el-form-item label="封面：">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- <br>
          <el-image>
            <div slot="error" class="image-slot" style="font-size:60px;color:#999">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image> -->
        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="频道：">
          <!-- <el-select v-model="article.channel_id" placeholder="请选择">
              渲染频道列表
              <el-option
                v-for="channel in channels"
                :key="channel.id"
                :label="channel.name"
                :value="channel.id"
                ></el-option>
            </el-select> -->
            <ChannelSelect v-model="article.channel_id"></ChannelSelect>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="$route.params.id ? onEditArticle(false) : onSubmit(false)">发表</el-button>
          <el-button @click="$route.params.id ? onEditArticle(false) : onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 富文本：vue.js-->资源列表-->Awesome Vue
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import ChannelSelect from '@/components/channel-select'
export default {
  name: 'publish_article',
  components: {
    quillEditor,
    ChannelSelect
  },
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        }
        // channel_id: ''
      },
      editorOption: {}, // 富文本编辑器的配置选项
      channels: []
    }
  },
  created () {
    // this.loadChannels()
    if (this.$route.params.id) {
      this.loadArticle()
    }
  },
  methods: {
    onSubmit (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('login-token')}`
        // },
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        // console.log(res.data)
        this.$message({
          message: '恭喜你，发布成功',
          type: 'success'
        })
        this.article = {}
        this.$router.push('/article')
      }).catch(err => {
        console.log(err)
        this.$message.error('发布失败')
      })
    },
    loadArticle () {
      this.$axios({
        method: 'GET',
        url: `/articles/${this.$route.params.id}`
      }).then(res => {
        // console.log(res.data)
        this.article = res.data.data
      })
    },
    onEditArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.id}`,
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('login-token')}`
        // },
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        // console.log(res.data)
        this.$message({
          message: '恭喜你，编辑成功',
          type: 'success'
        })
        this.article = {}
        this.$router.push('/article')
      }).catch(err => {
        console.log(err)
        this.$message.error('发布失败')
      })
    }
    // loadChannels () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(res => {
    //     // console.log(res.data)

    //     this.channels = res.data.data.channels
    //   })
    // }
  }

}
</script>

<style lang="less" scoped>
  // .el-image {
  //   width: 200px;
  //   height: 200px;
  //   line-height: 200px;
  //   border: 1px solid #ccc;
  //   text-align: center;
  // }
</style>
