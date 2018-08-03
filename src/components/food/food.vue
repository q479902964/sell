<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <span class="icon-arrow_lift"></span>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">剩余{{food.left}}份</span>
            <span class="rating">评分{{food.score}}</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span><span class="old"  v-show="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood"  :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count||food.count===0">加入购物车</div>
          </transition>
        </div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType,rating.text)"  v-for="rating in food.ratings" class="rating-item">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" width="12" height="12" :src="rating.avatar">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="text">
                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}">{{rating.text}}</span>
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import split from '../split/split'
  import ratingselect from '../ratingselect/ratingselect'
  import {formatDate} from '../../comment/js/date'
  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      addFood(target) {
        this.$emit('add', target);
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
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartcontrol,
      ratingselect,
      split
    }
  };
</script>
<style lang="stylus" scoped>
  @import "../../comment/stylus/style.css"
  .food{
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    transform: translate3d(0, 0, 0);
  }
  .move-enter-active, .move-leave-active{
    transition: all 0.2s linear;
  }
  .move-enter, .move-leave-active{
    transform: translate3d(100%,0,0);
  }
  .image-header{
    position: relative;
    width: 100%;
    height:0;
    padding-top:100%;
  }
  .image-header img{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
  }
  .image-header .back{
    position:absolute
    top:10px
    left:0
  }
  .icon-arrow_lift{
    display:block
    padding:10px
    font-size:20px
    color:#fff
  }
  .content{
    padding:18px
    position relative
  }
  .content .title{
    line-height:14px
    margin-bottom:8px
    font-size:14px
    font-weight:700
    color:rgb(7,17,27)
  }
  .content .detail{
    margin-bottom:18px
    line-height:10px
    height 10px
    font-size:0
  }
  .content .detail .sell-count,.rating{
    font-size:10px
    color:rgb(147,153,159)
  }
  .content .detail .sell-count{
    margin-right:12px
  }
  .content .price{
    font-weight: 700;
    line-height: 24px;
  }
  .content .price .now{
    margin-right: 18px;
    font-size: 14px;
    color: rgb(240,20,20);
  }
  .content .price .old{
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .cartcontrol-wrapper{
    position:absolute
    right:12px
    bottom:12px
  }
  .buy{
    position:absolute
    right:18px
    bottom:18px
    z-index:10
    height:24px
    line-height:24px
    padding:0 12px
    box-sizing:border-box
    border-radius:12px
    font-size:10px
    color: #fff
    background:rgb(0,160,220)
    opacity:1
  }
  .fade-enter-active, .fade-leave-active{
    transition: all 0.2s;
  }
  .fade-enter, .fade-leave-active{
    opacity:0;
  }
  .info{
    padding:18px
  }
  .info .title{
    line-height 14px
    margin-bottom 6px
    font-size 14px
    color: rgb(7,17,27)
  }
  .info .text{
    line-height 24px
    padding 0 8px
    font-size 12px
    color:rgb(77,85,93)
  }
  .rating{
    padding-top:18px;
  }
  .rating .title{
    line-height 14px
    margin-left:18px
    font-size 14px
    color: rgb(7,17,27)
  }
  .rating .rating-wrapper{
    padding:0 18px;
  }
  .rating .rating-wrapper .rating-item{
    position:relative;
    padding:16px 0;
  }
  .rating .rating-wrapper .rating-item:after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7,17,27,0.1);
    content: ' '
  }
  .rating .rating-wrapper .rating-item .user{
    position:absolute;
    right:0;
    top:16px;
    font-size:0;
    line-height:12px;
  }
  .rating .rating-wrapper .rating-item .user .name{
    display:inline-block;
    margin-right:6px;
    vertical-align:top;
    font-size:10px;
    color:rgb(147,153,159)
  }
  .rating .rating-wrapper .rating-item .user .avatar{
    border-radius 50%
  }
  .rating .rating-wrapper .rating-item .time{
    margin-bottom:6px;
    line-height 12px;
    font-size 10px;
    color:rgb(147,153,159)
  }
  .rating .rating-wrapper .rating-item .text{
    line-height:16px;
    font-size:12px;
    color:rgb(7,17,27)
  }
  .icon-thumb_up,.icon-thumb_down{
    line-height:24px;
    margin-right:4px;
    font-size:12px;
  }
  .icon-thumb_up{
    color:rgb(0,160,220)
  }
  .icon-thumb_down{
    color:rgb(147,153,159)
  }
  .rating .rating-wrapper .no-rating{
    padding:16px;
    font-size:12px;
    color:rgb(147,153,159)
  }
</style>
