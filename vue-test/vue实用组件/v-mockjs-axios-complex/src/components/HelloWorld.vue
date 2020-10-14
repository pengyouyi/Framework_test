<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { getFeedback } from '../api/feedback';
import { getProjectClassify } from '../api/project_classify';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    // getFeedback().then((res) => {
    //   console.log(res);
    // });
    getProjectClassify().then((res) => {
      console.log(res);
    })
  }
}
</script>

<style scoped>

</style>
