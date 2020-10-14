<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>

  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.setCookie()
    console.log(Cookies.get())
    // console.log(Cookies.get('address'))
    // console.log(Cookies.getJSON());
    // console.log(Cookies.getJSON('address'));
    // console.log(Cookies.get('nothing'))
  },
  methods: {
    setCookie() {
      Cookies.set('name', 'pengyouyi')
      Cookies.set('age', 20)
      Cookies.set('address', {foo: 'bar'})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
