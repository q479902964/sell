<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>

      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import star from '../star/star'
  import split from '../split/split'
  import ratingselect from '../ratingselect/ratingselect'
  import {formatDate} from '../../comment/js/date'
  // // const POSITIVE = 0;
  // // const NEGATIVE = 1;
  const ERR_OK = 0;
  const ALL = 2;
  export default {
    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date,"yyyy-MM-dd hh:mm");
      }
    },
    props:{
      seller:{
        type:Object
      }
    },
    components:{
      ratingselect,
      split,
      star
    },
    data(){
      return {
        ratings:[],
        selectType:ALL,
        onlyContent:true,
      }
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.ratings = response.data
          this.$nextTick(()=>{
            this.scroll = new BScroll(this.$refs.ratings,{
              click:true
            })
          })
        }
      })
    },
    methods:{
      needShow(type,text){
        if(this.onlyContent&&!text){
          return false;
        }
        if(this.selectType===ALL){
          return true;
        }else {
          return type===this.selectType;
        }
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
    }
  }
</script>

<style scoped>
  @import "../../comment/stylus/style.css";
  .ratings{
    position:absolute;
    top:174px;
    left: 0;
    width: 100%;
    overflow: hidden;
  }
  .ratings .overview{
    display: flex;
    padding: 18px 0;
  }
  .ratings .rating-wrapper{
    padding: 0 18px;
  }
  .ratings .rating-wrapper .rating-item{
    display: flex;
    padding: 18px 0;
    position: relative;
  }
  .ratings .rating-wrapper .rating-item:after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-bottom:1px solid rgba(7, 17, 27, 0.1);
    content:' ';
  }
  .ratings .rating-wrapper .rating-item .avatar{
    flex: 0 0 28px;
    width: 28px;
    margin-right: 12px;
  }
  .ratings .rating-wrapper .rating-item .avatar img{
    border-radius: 50%;
    width: 28px;
    height: 28px;
  }
  .ratings .rating-wrapper .rating-item .content{
    position: relative;
    flex: 1;
  }
  .ratings .rating-wrapper .rating-item .content .name{
    margin-bottom: 4px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(7, 17, 27);
  }
  .ratings .rating-wrapper .rating-item .content .star-wrapper{
    margin-bottom: 6px;
    font-size: 0;
  }
  .ratings .rating-wrapper .rating-item .content .star-wrapper .star{
    display: inline-block;
    margin-right: 6px;
    vertical-align: top;
  }
  .ratings .rating-wrapper .rating-item .content .star-wrapper .delivery{
    display: inline-block;
    vertical-align: top;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .ratings .rating-wrapper .rating-item .content .text{
    margin-bottom: 8px;
    line-height: 18px;
    color: rgb(7, 17, 27);
    font-size: 12px;
  }
  .ratings .rating-wrapper .rating-item .content .recommend{
    line-height: 16px;
    font-size: 0;
  }
  .ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_up, .item{
    display: inline-block;
    margin: 0 8px 4px 0;
    font-size: 9px;
  }
   .icon-thumb_up{
     color: rgb(0, 160, 220);
   }
  .item{
    padding: 0 6px;
    border: 1px solid rgba(7, 17, 27, 0.1);
    border-radius: 1px;
    color: rgb(147, 153, 159);
    background: #fff;
  }
  .ratings .rating-wrapper .rating-item .content .time{
    position: absolute;
    top: 0;
    right: 0;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .ratings .overview .overview-left{
    flex: 0 0 137px;
    width: 137px;
    border-right: 1px solid rgba(7,17,27,0.1);
    text-align: center;
    padding: 6px 0;
  }
  @media only screen and (max-width: 320px){
    .ratings .overview .overview-left{
      flex: 0 0 120px;
      width: 120px;
    }
    .ratings .overview .overview-right{
      padding-left:6px;
    }
  }
  .ratings .overview .overview-left .score{
    font-size: 24px;
    line-height: 28px;
    color:rgb(255,153,0);
    margin-bottom: 6px;
  }
  .ratings .overview .overview-left .title{
    font-size: 12px;
    line-height: 12px;
    color:rgb(7,17,27);
    margin-bottom: 8px;
  }
  .ratings .overview .overview-left .rank{
    line-height: 10px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .ratings .overview .overview-right{
    flex:1;
    padding:6px 0 6px 24px;
  }
  .ratings .overview .overview-right .score-wrapper{
    line-height: 18px;
    margin-bottom: 8px;
    font-size: 0;
  }
  .ratings .overview .overview-right .score-wrapper .title{
    display: inline-block;
    line-height: 18px;
    vertical-align: top;
    font-size: 12px;
    color: rgb(7,17,27);
  }
  .ratings .overview .overview-right .score-wrapper .star{
    display:inline-block;
    margin: 0 12px;
    vertical-align: top;
  }
  .ratings .overview .overview-right .score-wrapper .score{
    display: inline-block;
    line-height: 18px;
    vertical-align: top;
    font-size: 12px;
    color: rgb(255, 153, 0);
  }
  .ratings .overview .overview-right .delivery-wrapper{
    font-size: 0;
  }
  .ratings .overview .overview-right .delivery-wrapper .title{
    line-height: 18px;
    font-size: 12px;
    color: rgb(7,17,27);
  }
  .ratings .overview .overview-right .delivery-wrapper .delivery{
    font-size: 12px;
    color: rgb(147,153,159);
    margin-left: 12px;
  }
</style>
