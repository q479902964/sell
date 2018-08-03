<template>
    <div class="shop">
      <vheader :seller="seller"></vheader>
      <div class="tab border-1px">
        <div class="tab-item">
          <router-link :to="{name:'goods',params:{seller:seller}}">商品</router-link>
        </div>
        <!--<div class="tab-item">-->
          <!--<router-link to="/shop/ratings">评论</router-link>-->
        <!--</div>-->
        <div class="tab-item">
          <router-link :to="{name:'seller',params:{seller:seller}}">商家</router-link>
        </div>
      </div>
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
</template>

<script>
  import { urlParse } from '../../comment/js/util';
  import vheader from '../header/Header.vue'
  const ERR_OK = 0
  export default {
    data(){
      return{
        seller: {
        }
      }
    },
    components:{
      vheader
    },
    created () {

    },
    mounted(){
      if(this.$route.params.seller){
        this.seller = this.$route.params.seller
        var obj = { seller:this.seller };
        var str = JSON.stringify(obj);
        sessionStorage.seller = str;
      }else{
        var str1 = sessionStorage.seller;
        this.seller = JSON.parse(str1).seller;
      }
      this.$router.push("/shop/goods");
    }
  }
</script>

<style scoped>

</style>
