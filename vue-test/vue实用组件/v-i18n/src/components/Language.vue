<template>
  <div class="hello">
    <router-link :to="router">{{toLang}}</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
  	lang() {
        return this.$route.meta.lang
  	},
  	toLang() {
  		return this.lang === 'english' ? 'chinese' : 'english' 
  	},
  	router() {
  		return {
  			path: this.$route.path.replace(this.lang, this.toLang),
  			query: this.$route.query
  		}
  	}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
