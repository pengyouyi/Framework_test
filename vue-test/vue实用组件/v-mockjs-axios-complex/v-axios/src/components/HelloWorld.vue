<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="item in news">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      news: []
    }
  },
  created() {
    this.getNews();
  },
  methods: {
    getNews() {
      this.$axios.get("http://test.pandanc.com/api/v1/news/entry/").then(res => {
        console.log(res.data);
        this.news = res.data.results;
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
