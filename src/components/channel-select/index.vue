<template>
  <div>
    <el-select placeholder="请选择" :value="value" @input="$emit('input', $event)">
      <el-option label="所有频道" :value="null"></el-option>
      <el-option
        v-for="channel in channels"
        :key="channel.id"
        :label="channel.name"
        :value="channel.id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ChannelSelect',
  data () {
    return {
      channels: []
    }
  },
  // props: ['value'],
  props: {
    value: {
      type: String
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
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
