<template>
  <div class="News">
    {{msg}}
    <div @click="setInfo(334)">news 334</div>
    <div @click="setInfo(339)">news 339</div>
  </div>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      msg: 'Welcome to news'
    }
  },
  methods: {
  	setInfo(id) {
  		this.$router.push(`/news/information/${id}`)
  	}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
