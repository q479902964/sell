<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease " v-show="food.count>0" @click.stop.prevent="decreaseCart">
          <span class="inner icon-remove_circle_outline" ></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created () {
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
          this.food.count = 1
        } else {
          this.food.count++
        }
        this.$emit('add', event.target)
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }

</script>

<style lang="stylus" scoped>
  @import "../../comment/stylus/style.css"
  .cartcontrol{
    font-size: 0;
  }
  .cartcontrol .cart-decrease{
    display: inline-block;
    padding: 6px;
  }
  .move-enter-active, .move-leave-active {
    transition: all .4s linear;
    opacity:1;
    transform:translate3d(0,0,0)
  }
  .move-enter ,.move-leave{
    opacity: 0;
    transform:translate3d(24px,0,0)
  }
  .move-enter ,.move-leave .inner{
    transform rotate(180deg)
  }
  .cart-decrease .inner{
      display:inline-block
      transition:all .4s linear;
      transform rotate(0)
      line-height 24px
      font-size 24px
      color:rgb(0,160,220)
    }
  .cartcontrol .cart-count{
    display: inline-block;
    vertical-align:top;
    width:12px;
    padding-top:6px;
    line-height:24px;
    text-align:center;
    font-size:10px;
    color:rgb(147,153,159)
  }
  .cartcontrol .cart-add{
    display: inline-block;
    line-height 24px
    font-size 24px
    padding: 6px;
    color:rgb(0,160,220)
  }
</style>
