<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="fanye">
      <ul id="turn">
        <li @click="onRouter(1)">1</li>
        <li @click="onRouter(2)">2</li>
        <li @click="onRouter(3)">3</li>
        <li @click="onRouter(4)">4</li>
        <li @click="onRouter(5)">5</li>
      </ul>
    </div>
    <ul>
      <li v-for="item in projects">
        <h2>{{item.name}}</h2>
        <img :src="item.cover_image" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Hello',
      token:'',
      limit: 3,
      projects: [],
      defaultOrdering: '-upload_date',
    }
  },
  mounted() {
    this.getProjects(1);
  },
  methods: {
    // getToken() {
    //   this.$axios.post('http://test.pandanc.com/api/v1/accounts/rest-auth/login/',{
    //     username: 'pengyouyi',
    //     password: 'pengyouyi'
    //   }).then( res=> {
    //     console.log(res.data.token)
    //     this.token = res.data.token;
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // },
    // getProjects() {
    //   this.$axios.get('http://test.pandanc.com/api/v1/projects/project/', {
    //     headers: {
    //       Authorization: `JWT ${this.token}`
    //     }
    //   }).then( res=> {
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    

    // 翻页
    onRouter(page = 1) {
      this.getProjects(page)
    },
    getProjects(page) {
      // 首先获取一个token
      this.$axios.post('http://test.pandanc.com/api/v1/accounts/rest-auth/login/',{
        username: 'pengyouyi',
        password: 'pengyouyi'
      }).then( res=> {
        this.token = res.data.token;
        // 获取projects
        this.$axios.get('http://test.pandanc.com/api/v1/projects/project/', {
          
          params: {
            limit: this.limit,
            offset: this.limit * (page - 1),
            ordering: this.defaultOrdering
          },
          headers: {
            Authorization: `JWT ${this.token}`
          },
        }).then( res=> {
          this.projects = res.data.results;
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err);
      })
    },

  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
</style>
