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
    <van-popup v-model="show"  position="top" :style="{ width: '40%', height:'100%'}" >
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
    <!--中间读经界面-->
    <van-row type="flex">
      <van-col :span='24'>
        <div id="readerid">
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
}
</style>
