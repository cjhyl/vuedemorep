<template>
  <div class="hello">
    <h1>{{ helloMsg }}</h1>
    <h2>{{ otherHelloMsg }}</h2>
    <button @click="changeMsg">修改文本</button>
    <el-row>
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </el-row>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations} from 'vuex';
export default {
  name: 'HelloWorld',
  data () {
    return {
      //msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
    ...mapState([
      'helloMsg'
    ]),
    ...mapGetters([
      'otherHelloMsg'
    ])
  },
  mounted(){
    //console.log('ttt',Mock)
  },
  methods:{
    ...mapMutations([
      'helloMsgChange'
    ]),
    changeMsg(){
      this.helloMsgChange("helloMsg changed !");
    }
  },
}
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
