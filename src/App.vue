<template>
  <div id="app" style="height:100%;">
    <router-view></router-view>
  </div>
</template>

<script>
  import login from './components/login/login.vue'
  import { urlParse } from './comment/js/util';
  const ERR_OK = 0
export default {
  data () {
    return {
      seller: {
      }
    }
  },
  created () {
    // this.$http.get('/api/seller'+'?id=' + this.seller.id).then((response) => {
    //   response = response.body
    //   if (response.errno === ERR_OK) {
    //     this.seller = Object.assign({}, this.seller, response.data);
    //   }
    // })
  },
  components: {
    login
  }
}
</script>

<style>
  body, html{
    height: 100%;
    line-height: 1;
    font-weight: 200;
    font-family: 'PingFang SC','STHeitiSC-Light','Helvetica-Light',Arial;
  }
#app .tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7,17,27,0.1) ;
  position: relative;
}
#app .tab::after{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top:1px solid rgba(7,17,27,0.1);
  content:' ';
}
@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5){
  .border-1px::after{
    -webkit-transform : scaleY(0.7);
    transform: scaleY(0.7)
  }
}
@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){
    .border-1px::after{
      -webkit-transform : scaleY(0.5);
      transform: scaleY(0.5)
    }
  }

.tab-item{
    flex: 1;
    text-align: center;
    color: #ff0000;
  }
  .tab-item a{
    display: block;
    text-decoration: none;
    font-size: 14px;
    color: rgb(77,85,93);
  }
.tab-item a.active{
    color:rgb(240,20,20);
  }
</style>
