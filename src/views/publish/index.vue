<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题：">
          <el-input placeholder="文章名称" v-model="article.title" style="width:400px"></el-input>
        </el-form-item>
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
        <el-form-item label="频道：">
          <el-select v-model="article.channel_id" placeholder="请选择">
              <!-- 渲染频道列表 -->
              <el-option
                v-for="channel in channels"
                :key="channel.id"
                :label="channel.name"
                :value="channel.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发表</el-button>
          <el-button>存入草稿</el-button>
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
export default {
  name: 'publish_article',
  components: {
    quillEditor
  },
  data () {
    return {
      article: {
        title: '',
        content: '',
        channel_id: ''
      },
      editorOption: {}, // 富文本编辑器的配置选项
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        // console.log(res.data)

        this.channels = res.data.data.channels
      })
    }
  }

}
</script>

<style>

</style>
