<template>
  <div>
    <div>
      <van-search placeholder="经名 繁\简" v-model="value"  @search="onSearch"/>
    </div>
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了~"
      >
        <van-cell
          v-for="item in list"
          :key="item.title"
          :title="item.title"
          @click="readbook(item)"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  /* components: {
    [Search.name]: Search,
    [List.name]: List
  }, */
  data: function () {
    return {
      value: '',
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onSearch () {
      const axios = require('axios')
      axios.get('https://cbdata.dila.edu.tw/v1.2/toc?q=' + this.value)
        .then((response) => {
          console.log(response)
          // this.list = response.data.results
          for (let i = 0; i < response.data.num_found; i++) {
            // console.log(response.data.results[i])
            this.list.push(response.data.results[i])
          }
          this.loading = false
          this.finished = true
        })
        .catch((error) => {
        // handle error
          console.log(error)
        })
        .finally(() => {
        // always executed
        })
    },
    readbook (item) {
      this.$router.push({ name: 'reader', params: item })
    },
    onLoad () {
      /*
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
      */
    }
  }
}
</script>
