<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p @click="goFoo">goFoo</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    goFoo() {
      this.$router.push({name: 'Foo'})
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('组件内 HelloWorld beforeRouteEnter')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('组件内 HelloWorld beforeRouteUpdate')
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('组件内 HelloWorld beforeRouteLeave')
    const answer = confirm('Do you really want to leave')
    if (answer) {
      next()
    } else {
      next(false)
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
