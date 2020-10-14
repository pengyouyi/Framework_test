<template>
  <div class="project">
    <h1>{{ msg }}</h1>
    <div id="Pagination" :total="total" :limit="limit">
      <ul id="turn">
        <li v-for="i in showingPages" @click="onRouter(i)">{{i}}</li>
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
  data () {
    return {
      msg: 'Welcome to Project',
      token:'',
      limit: 3,
      projects: [],
      defaultOrdering: '-upload_date',
      currentPage: parseInt(this.$route.params.page),
      total: 0
    }
  },
  computed: {
  	totalPage() {
  		return Math.ceil(this.total / this.limit);
  	},
  	showingPages() {
  		var temp = [];
  		for (var i = 0; i < this.totalPage; i++) {
  			temp.push(i + 1);
  		}
  		return temp;
  	}
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    // 翻页
    onRouter(page = 1) {
      this.$router.push(`/project/library/${page}`);
    },

    // 获取项目数据
    getProjects(page=this.currentPage) {
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
        	this.projects = [];
        	this.total = res.data.count;
            this.projects = res.data.results;
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err);
      })
    },

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

  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
#turn {
	margin: 20px auto;
    overflow: hidden;
    line-height: 40px;
}
#turn li{
	display: inline-block;
	cursor: pointer;
	width: 40px;
	border:1px solid green;
	margin-bottom: 10px;
}
</style>
