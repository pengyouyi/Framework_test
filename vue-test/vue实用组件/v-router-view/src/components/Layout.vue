<template>
  <div class="layout">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <router-link to='/foo'>Go to Foo</router-link>
    <router-link to='/bar'>Go to Bar</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
      msg: 'Welcome to Layout'
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
