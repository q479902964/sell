<template>
    <div class="shop_list">
      <div class="image-header">
      <div class="user_info" @click="jump_userinfo">
        <img class="user_avater" :src="avater"></img>
      </div>
      <span class="header_title">美食</span>
      </div>
      <div class="search-box">
        <img src="./Search.png" class="search_img">
        <input type="text" placeholder="请输入商家或商品名称" value="" class="search-text" v-model="searchString"/>
      </div>
      <div class="hot_food">
        <span class="hot" style="color: #ff0000;font-size: 12px">HOT</span>
        <span class="hot_list">麻辣烫</span>
        <span class="hot_list">粥</span>
        <span class="hot_list">湘菜</span>
      </div>
      <div class="food_list">
        <!--<div class="food" @click="jump_shop()">-->
          <!--<div class="left-box">-->
            <!--<img class="avater" src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg">-->
          <!--</div>-->
          <!--<div class="right-box">-->
            <!--<div class="shop_name">沙县小吃</div>-->
            <!--<div class="shop_score">-->
              <!--<star :size="36" :score="3.7"></star>-->
              <!--<span class="score">3.7</span>-->
              <!--<span class="sell_num">月售1076</span>-->
            <!--</div>-->
            <!--<div class="description">-->
              <!--<span class="send_price">起送￥15</span>-->
              <!--<span class="send_price">免配送费</span>-->
              <!--<span class="send_price">人均￥14</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="food" v-for="item in filteredFile" @click="jump_shop(item)">
          <div class="left-box">
            <img class="avater" :src="item.image">
          </div>
          <div class="right-box">
            <div class="shop_name">{{item.name}}</div>
            <div class="shop_score">
              <star :size="36" :score="item.score"></star>
              <span class="score">{{item.score}}</span>
              <!--<span class="sell_num">月售{{item.sellCount}}</span>-->
            </div>
            <div class="description">
              <span class="send_price">起送￥{{item.minPrice}}</span>
              <span class="send_price">配送费￥{{item.delivePrice}}</span>
              <!--<span class="send_price">人均￥{{}}</span>-->
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import star from '../star/star.vue'
  export default {
    data(){
      return{
        userinfo:{},
        seller: {
        },
        username:"",
        avater:"",
        searchString:""
      }
    },
    computed:{
      filteredFile: function () {
        var file_array = this.seller,
          searchString = this.searchString;
        if(!searchString){
          return file_array;
        }else {
          searchString = searchString.trim().toLowerCase();
          file_array = file_array.filter(function(item){
            if(item.name.toLowerCase().indexOf(searchString) !== -1){
              return item;
            }
          })
          // Return an array with the filtered data.
          return file_array;
        }
      }
    },
    methods:{
      jump_shop(item){
        console.log(item)
        if(item.status){
          this.$router.push({name:'shop',params:{seller:item}});
        }else{
          alert("商家关门了")
        }
      },
      jump_userinfo(){
        this.$router.push({name:'userinfo',params:{userinfo:this.userinfo}})
      },
      getScore(s){
        console.log(s)
        return (s/100)*5.0;
      }
    },
    components:{
      star
    },
    mounted(){
      var str = sessionStorage.username;
      this.username = JSON.parse(str).username;
      console.log(this.username)
      this.$http.get('http://172.20.10.2:8080/SellDishInfo').then((response) => {
        response = response.body
        this.seller = response.seller;
        console.log(this.seller);
      })
      this.$http.get('http://172.20.10.2:8080/UserInfo?userid='+this.username).then((response) => {
        response = response.body
        this.userinfo = response;
        this.avater = this.userinfo.avater;
        var obj = { userinfo:this.userinfo };
        var str = JSON.stringify(obj);
        sessionStorage.userinfo = str;
        console.log(this.userinfo);
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../comment/stylus/style.css"
  .shop_list{
    background-image url("./bg.jpg")
    width 100%;
    height 100%
    background-size cover;
  }
  .image-header{
    width 100%;
    height 50px;
    text-align center
  }
  .image-header .user_info{
    width 50px;
    height:50px;
    position:absolute;
    top:-3px;
    left:0;
  }
  .user_avater{
    display:inline-block;
    padding:10px;
    font-size:20px;
    color:#07111b;
    width 100%;
    height 100%;
    border-radius 50%;
  }
  .header_title{
    display inline-block;
    width 45px;
    margin:20px auto;
    font-size:20px;
    color #ff0000;
  }
  .search-box{
    width 95%;
    margin 20px auto;
    height 25px;
    border-radius 10px;
    background #D3D3D3;
  }
  .search-box .search_img{
    width 20px;
    height 20px;
    line-height 25px;
    padding-left 10px;
    padding-top 2px;
  }
  .search-text{
    width 50%;
    height 20px;
    background transparent;
    line-height 25px;
    position relative;
    bottom 3px;
    outline none;
    border 0;
  }
  .hot_food{
    margin-left 12px;
  }
  .hot_food .hot_list{
    display inline-block;
    background #D3D3D3;
    padding 3px;
    font-size 12px;
    border-radius 3px;
    margin-left 10px;
    color #696969;
  }
  .food_list{
    width 90%;
    margin 0 auto;
  }
  .left-box{
    float left
    width 50px;
    height 50px;
  }
  .left-box img{
    width 100%;
    height 100%;
  }
  .right-box{
    float right
    width 82%;
  }
  .food{
    margin-top 20px;
    height:50px;
  }
    .shop_name{
      font-size 15px;
      font-weight 700;
    }
  .shop_score{
    margin-top 5px;
  }
  .shop_score .star{
    width 40%;
    float left
  }
  .shop_score span{
    display inline-block;
    float left;
    color #696969;
    font-size 12px;
    margin-top 2px;
    margin-left 10px;
  }
  .description{
    clear both;
    margin-top 25px;
    color #696969;
    font-size 12px;
  }
  .description span{
    border-left 1px solid  #696969;
    padding-left 3px;
  }
  .description span:first-of-type{
    border-left 0;
  }
</style>
