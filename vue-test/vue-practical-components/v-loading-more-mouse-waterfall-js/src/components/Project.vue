<template>
  <div class="project">
    <h1>Projects</h1>
    <ul class="project-section waterfall">
      <li v-for="project in projects" class='item' refs='myItem'>
        <div class="item-content" v-for="item in project">
          <h2>{{item.name}}</h2>
          <img class="img-news" :src="item.cover_image" alt="">
          <div>{{item.summary}}</div>
        </div>
      </li>
    </ul>
    <LoadingMore :disabled="disabled" :show="haveMore" @loading="getProjects"></LoadingMore>
  </div>
</template>

<script>
import LoadingMore from '../base/loadingMore';
export default {
  components: {
    LoadingMore
  },
  data () {
    return {
      msg: 'Welcome to Project',
      token:'',
      limit: 3,
      projects: [
        [],
        [],
        []
      ],
      defaultOrdering: '-upload_date',
      page: 0,
      haveMore: true,
      disabled: false,
      loading: false,
    }
  },
  computed: {
    projectsCols() {
      return document.getElementsByClassName('item')
    }
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    // 获取项目数据
    getProjects() {
      // 首先获取一个token
      this.$axios.post('http://test.pandanc.com/api/v1/accounts/rest-auth/login/',{
        username: 'andrew_wilson',
        password: 'QRY7tYdC'
      }).then( res=> {
        this.token = res.data.token;
        this.disabled = true;
        this.page++;
        // 获取projects
        this.$axios.get('http://test.pandanc.com/api/v1/projects/project/', {
          params: {
            limit: this.projects.length * 2,
            offset: this.projects.length * 2 * (this.page - 1),
            ordering: this.defaultOrdering
          },
          headers: {
            Authorization: `JWT ${this.token}`
          },
        }).then( res => {
          this.haveMore = res.data.next;
          this.pushProjects(res.data.results)
          console.log(this.page)
        }).catch(err => {
          console.log(err);
          this.disabled = false;
        })
      }).catch(err => {
        console.log(err);
        this.disabled = false;
      })
    },
    pushProjects(results, index = 0) {
      if (results[index]) {
        // 向最短的列中追加数据
        this.projects[this.$utils.getMinCol(this.projectsCols)].push(results[index]);
        this.$nextTick(() => {
          this.pushProjects(results, index + 1);
        })
      } else {
        this.disabled = false;
      }
    }
  }
};
</script>

<style scoped>
ul,li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.img-news {
  width: 200px;
  height: 300px;
}
.waterfall {
  border: 1px solid #333;
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
}
.item {
  width:300px;
  float: left;
  margin-left:20px;
}
.item-content {
  height: auto;
  box-sizing: border-box;
  border: 1px solid red;
  margin-bottom:20px;
}
</style>