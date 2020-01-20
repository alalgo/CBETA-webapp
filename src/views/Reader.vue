<template>
  <div>
    <!--顶部导航-->
    <van-nav-bar
      :title='this.$route.params.title'
      left-text="返回"
      right-text="主页"
      left-arrow
      fixed="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!--目录-->
    <van-popup v-model="show"  position="left" :style="{ width: '40%', height:'100%'}" :overlay-style="{backgroundColor:'rgba(192, 208, 145, 0.56)'}">
      <van-row type="flex">
        <van-col span="12" >
          <van-list>
            <van-cell
            v-for="item in items"
            :key="item.name"
            :title="item.name"
            @click="selectChapter(item.url)"
            />
          </van-list>
        </van-col>
      </van-row>
    </van-popup>
    <!--搜索时的加载提示-->
    <div class="prompt" v-if="loading">
      <van-loading size="24px" >加载中...</van-loading>
    </div>
    <!--搜索失败提示-->
    <div class="prompt" v-if="error">
      <span>取经失败...</span>
    </div>
    <!--中间读经界面-->
    <van-row type="flex">
      <van-col :span='24'>
        <div id="readerid" >
            <span v-html="bookhtml"></span>
        </div>
      </van-col>
    </van-row>
    <!--底部功能按钮-->
    <van-tabbar v-model="active" @change="readerset" style="z-index:2">
      <van-tabbar-item @click="showPopup">目录</van-tabbar-item>
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
      show: false,
      activeKey: 0,
      items: [],
      active: '',
      loading: false,
      error: false
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
    document.body.scrollTop = document.documentElement.scrollTop = 0
  },
  methods: {
    showPopup () {
      this.show = true
    },
    readerset (index) {

    },
    selectChapter (url) {
      this.requestChapter(url)
      this.hiddenSidebar()
    },
    requestChapter (url) {
      this.loading = true
      this.error = false

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
          this.error = true
        })
        .finally(() => {
        // always executed
          this.loading = false
        })
    },
    onClickLeft () {
      // this.$router.go(-1)
      this.$router.back(-1)
    },
    onClickRight () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style>
/*禁止横向滚动条*/
html,body{
  overflow:hidden;
  overflow-y:auto;
}
/*经文正文样式*/
#readerid{
  margin: 14px 14px;
  padding-top: 9%;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
}
.prompt{
  padding-top: 30%;
}
</style>
