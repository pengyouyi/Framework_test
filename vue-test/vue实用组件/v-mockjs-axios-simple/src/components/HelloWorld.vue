<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="(item, index) in data">{{item.licNumber}}</li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: []
    }
  },
  created() {
    this.$http.get('/api/vehicle').then( response =>{ 
      console.log( response );
      this.data = response.data.data;
    })
    .catch(error => console.log(error));

    // axios.get('/api/vehicle').then(response => {
    //   console.log(response)
    // })
    // .catch(error => console.log(error))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
