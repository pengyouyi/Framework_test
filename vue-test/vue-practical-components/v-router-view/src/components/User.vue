<template>
  <div class="user">
    <h1>{{ msg }}</h1>
    <h2>{{$route.params.id}}</h2>
    <router-link :to="{name: 'UserProfile'}">Go to Profile</router-link>
    <router-link to='/user/posts'>Go to Posts</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      msg: 'Welcome to User'
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
