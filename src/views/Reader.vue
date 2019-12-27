<template>
  <div>
    <van-nav-bar
      :title='this.$route.params.title'
      left-text="返回"
      right-text="主页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-row type="flex">
      <van-col span="12" v-bind:style="{display:isshowsidebar}">
        <van-list>
          <van-cell
          v-for="item in items"
          :key="item.name"
          :title="item.name"
          @click="selectChapter(item.url)"
          />
        </van-list>
      </van-col>
      <van-col :span='contextWidth'>
        <div id="readerid"  @click="hiddenSidebar">
            <span v-html="bookhtml"></span>
        </div>
      </van-col>
    </van-row>
    <van-tabbar v-model="active" @change="readerset" style="z-index:2">
      <van-tabbar-item @click="showOrHiddenSidebar">目录</van-tabbar-item>
      <van-tabbar-item >模式</van-tabbar-item>
      <van-tabbar-item >字体</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'reader',
  data: function () {
    return {
      bookhtml: null,
      activeKey: 0,
      isshowsidebar: 'none',
      items: [],
      contextWidth: 24,
      active: ''
    }
  },
  mounted: function () {
    let url = 'https://cbdata.dila.edu.tw/v1.2/download/html/' + this.$route.params.work + '_001.html'
    this.requestChapter(url)
    this.$emit('isshow', false)
    for (let i = 1; i <= this.$route.params.juan; i++) {
      this.items.push(i + '卷')
      this.items.push({ 'name': i + '卷',
        'url': 'https://cbdata.dila.edu.tw/v1.2/download/html/' + this.$route.params.work + '_' + this.PrefixInteger(i, 3) + '.html'
      })
    }
  },
  methods: {
    hiddenSidebar () {
      this.isshowsidebar = 'none'
      this.contextWidth = 24
    },
    showSidebar () {
      this.isshowsidebar = 'inline'
      this.contextWidth = 12
    },
    showOrHiddenSidebar () {
      if (this.isshowsidebar === 'none') {
        this.showSidebar()
      } else {
        this.hiddenSidebar()
      }
    },
    readerset (index) {
      console.log(index)
      console.log(this.active)
    },
    selectChapter (url) {
      this.requestChapter(url)
      this.hiddenSidebar()
    },
    requestChapter (url) {
      const axios = require('axios')
      axios.get(url)
        .then((response) => {
          this.bookhtml = response.data
          // 新章节从第一行开始展示
          document.body.scrollTop = document.documentElement.scrollTop = 0
        })
        .catch((error) => {
        // handle error
          console.log(error)
        })
        .finally(() => {
        // always executed
        })
    },
    onClickLeft () {
      console.log('back')
    },
    onClickRight () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style>
#readerid{
  margin: 14px 14px;
}
</style>
