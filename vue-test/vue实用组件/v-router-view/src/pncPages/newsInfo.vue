<template>
  <div class="News">
    {{msg}}
    <div>{{news.title}}</div>
  </div>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      msg: 'Welcome to news',
      news: {}
    }
  },
  mounted() {
    this.getNews()
  },
  methods: {
    getNews() {
    	this.$axios.get(`http://test.pandanc.com/api/v1/news/entry/${this.$route.params.id}`)
    	.then(res => {
    		this.news = res.data
    	})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
