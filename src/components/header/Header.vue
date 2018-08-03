<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="back" @click="hide()">
        <span class="icon-arrow_lift"></span>
      </div>
      <div class="avatar">
        <img width="64" height="64" :src="seller.image">
      </div>
      <div class="content">
        <div class="title">
           <span class="brand"></span>
           <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.profile}}/40分钟到达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]" ></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div @click="showDetail()" v-if="seller.supports" class="support-count">
        <!--<span class="count">{{seller.supports.length}}个</span>-->
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div @click="showDetail()" class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text" v-if="seller.bulletin">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.image" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <!--<div class="bulletin">-->
            <!--<p class="content">{{seller.profile}}</p>-->
          <!--</div>-->
          </div>
        </div>
        <div class="detail-close" @click="closeDetail()">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import star from '../star/star'
  export default {
    props: {
      seller: {
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      hide(){
        this.$router.push("/shop_list")
      },
      showDetail() {
        this.detailShow = true
      },
      closeDetail() {
        this.detailShow = false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      star
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../comment/stylus/style.css"
 .back{
    position:absolute
    top:0;
    left:0
  }
  .icon-arrow_lift{
    display:block
    font-size:20px
    color:#fff
  }
 .header{
   position: relative;
   color:#fff;
   background:rgba(7,17,27,0.5) ;
   overflow: hidden;
 }
  .content-wrapper{
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
  }
  .avatar{
    vertical-align: top;
    display: inline-block;
  }
  .avatar img{
    border-radius: 2px;
  }
  .content{
    display: inline-block;
    margin-left: 14px;
    font-size: 14px;
  }
  .title{
    margin: 2px 0 8px 0;
  }
  .brand{
    width: 30px;
    height: 18px;
    vertical-align: top;
    display: inline-block;
    background-image: url("brand@2x.png") ;
    background-size: 30px 18px;
    background-repeat: no-repeat;
  }
  .name{
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
 @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
   .brand{
     background-image: url("brand@3x.png");
   }
   .bulletin-title{
     background-image: url("bulletin@2x.png");
   }
 }
  .description{
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }
  .support .icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
  }
  .decrease{
    background-image: url("decrease_1@2x.png");
  }
  .discount{
    background-image: url("discount_1@2x.png");
  }
  .guarantee{
    background-image: url("guarantee_1@2x.png");
  }
  .invoice{
    background-image: url("invoice_1@2x.png");
  }
  .special{
    background-image: url("special_1@2x.png");
  }
  .text{
    line-height:12px ;
    font-size: 10px;
  }
  .support-count{
    position:absolute;
    right: 12px;
    bottom: 14px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0,0,0,0.2);
    text-align: center;
  }
  .count{
   font-size: 10px;
   vertical-align: top;
  }
  .support-count .icon-keyboard_arrow_right{
    margin-left: 2px;
    line-height: 24px;
    font-size: 10px;
  }
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7,17,27,0.2);
  }
    .bulletin-title{
      vertical-align: top;
      display: inline-block;
      width: 22px;
      height: 12px;
      background-image: url("bulletin@2x.png");
      background-size: 22px 12px;
      background-repeat: no-repeat;
      margin-top: 7px;
    }
  .bulletin-text{
    vertical-align: top;
    font-size: 10px;
    margin: 0 4px;
  }
  .bulletin-wrapper .icon-keyboard_arrow_right{
    position: absolute;
    font-size: 10px;
    right: 12px;
    top:9px;
  }
  .background{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .detail{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,0.8);
  }
 /*.fade-enter-active, .fade-leave-active {*/
   /*transition: all 0.5s;*/
   /*opacity: 1;*/
   /*background: rgba(7,17,27,0.8);*/
 /*}*/
 /*.fade-leave-active,.fade-enter-to{*/
   /*opacity: 1;*/
   /*background: rgba(7,17,27,0.8);*/
 /*}*/
  /*.fade-enter{*/
    /*opacity: 0;*/
    /*background: rgba(7,17,27,0);*/
  /*}*/
 .fade-enter-active, .fade-leave-active {
   transition: all .5s;
 }
 .fade-enter{
   opacity: 0;
 }
 .clearfix{
    display: inline-block;
  }
  .clearfix:after{
    display: block;
    content: '.';
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
  .detail-wrapper{
    min-height: 100%;
    width: 100%;
    /*display: flex;*/
    /*flex-flow: column;*/
  }
  .detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
    /*flex: 1;*/
  }
  .detail-main .name{
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  .detail-close{
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto ;
    clear: both;
    font-size: 32px;
    /*flex: 0;*/
  }
  .star-wrapper{
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }
 .detail-main .title{
    width: 80%;
    margin: 28px auto 24px auto;
    display: flex;
  }
 .detail-main .title .line{
    flex: 1;
    position: relative;
    top:-6px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
 .detail-main .title .text{
   padding: 0 12px;
   font-size: 14px;
   font-weight: 700;
 }
  .supports{
    width: 80%;
    margin: 0 auto;
  }
  .supports .support-item{
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }
  .support-item:last-child{
   margin-bottom: 0;
 }
 .support-item .icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }
  .support-item .decrease{
    background-image: url("decrease_2@2x.png");
  }
 .support-item .discount{
   background-image: url("discount_2@2x.png");
 }
 .support-item .guarantee{
   background-image: url("guarantee_2@2x.png");
 }
 .support-item .invoice{
   background-image: url("invoice_2@2x.png");
 }
 .support-item .special{
   background-image: url("special_2@2x.png");
 }
  .support-item .text{
    line-height: 16px;
    font-size: 12px;
  }
  .detail-main .bulletin{
    width: 80%;
    margin: 0 auto;
  }
 .detail-main .bulletin .content{
   padding: 0 12px;
   line-height: 24px;
   font-size: 12px;
 }
  .back{
    position:absolute
    top:10px
    left:0
  }
</style>
