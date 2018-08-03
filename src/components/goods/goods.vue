<template xmlns:ref="http://www.w3.org/1999/xhtml">
  <div>
    <div class="goods">
      <!--<div class="menu-wrapper" ref="menuWrapper">-->
        <!--<ul>-->
          <!--<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">-->
            <!--<span class="text border-1px">-->
              <!--<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}-->
            <!--</span>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list food-list-hook">
            <h1 class="title">菜单</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="food in goods" class="food-item border-1px">
                <div class="icon">
                  <img  width="57" height="57" :src="food.image">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.profile}}</p>
                  <div class="extra">
                    <span class="count">剩余{{food.left}}份</span><span>评分{{food.score}}</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span><span class="old"  v-show="food.discount">¥{{food.price/food.discount}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @add="addFood"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :select-foods="selectFoods" :deliveryPrice="seller.delivePrice" :minPrice="seller.minPrice" ref="shopcart"></shopcart>
    </div>
    <food :food="selectedFood" ref="food" @add="addFood"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import food from '../food/food'
  const ERR_OK = 0
  export default {
    // props: {
    //   seller: {
    //   }
    // },
    data() {
      return {
        goods: {},
        seller:{},
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    methods: {
      addFood(target) {
        this._drop(target);
      },
      selectMenu(index, ev) {
        // if (!ev.constructed) {
        //    return
        // }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
        console.log(index)
      },
      selectFood(food,event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      _initScroll() {
        // this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        //   click: true
        // })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _drop(target) {
        //体验优化，异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        // this.goods.forEach((good) => {
        //     if (good.left) {
        //       foods.push(good)
        //     }
        // })
        for(var i=0;i<this.goods.length;i++){
          if(this.goods[i].count){
            foods.push(this.goods[i])
          }
        }
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    //   this.$http.get('/api/goods').then((response) => {
    //   response = response.body
    //   if (response.errno === ERR_OK) {
    //     this.goods = response.data
    //     this.$nextTick(() => {
    //       this._initScroll()
    //       this._calculateHeight()
    //     })
    //   }
    // })
    },
    mounted(){
      var str1 = sessionStorage.seller;
      this.seller = JSON.parse(str1).seller;
      this.goods = this.seller.foods||this.$route.params.seller.foods;
      console.log(this.goods)
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../comment/stylus/style.css"
  .goods{
    position: absolute;
    display: flex;
    top:174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
  }
  .goods .menu-wrapper{
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }
  .goods .menu-wrapper .menu-item{
    display: table;
    width: 56px;
    height: 54px;
    line-height: 14px;
    padding: 0 12px;
  }
  .goods .menu-wrapper .current{
    position:relative;
    z-index:10;
    margin-top:-1px;
    background:#fff;
    font-weight:700;
  }
  .goods .menu-wrapper .current . text{
    border: 0
  }
  .goods .menu-wrapper .icon{
    display: inline-block;
    vertical-align:top;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }
  .goods .menu-wrapper .text{
    font-size: 12px;
    display: table-cell;
    width: 56px;
    vertical-align: middle;
  }
  .border-1px{
    position: relative;
  }
  .border-1px:after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-bottom:1px solid rgba(7,17,27,0.1);
    content:' ';
  }
  .decrease{
    background-image: url("decrease_3@2x.png");
  }
  .discount{
    background-image: url("discount_3@2x.png");
  }
  .guarantee{
    background-image: url("guarantee_3@2x.png");
  }
  .invoice{
    background-image: url("invoice_3@2x.png");
  }
  .special{
    background-image: url("special_3@2x.png");
  }
  .goods .foods-wrapper{
    flex: 1;
  }
  .foods-wrapper .title{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147,153,159);
    background: #f3f5f7;
  }
  .foods-wrapper .food-item{
    display: flex;
    margin: 18px;
    padding-bottom:18px;
  }
  .foods-wrapper .food-item:last-child:after{
    display: none;
  }
  .foods-wrapper .food-item:last-child{
    margin-bottom: 0;
  }
  .foods-wrapper .food-item .icon{
    flex: 0 0 57px;
    margin-right: 10px;
  }
  .foods-wrapper .food-item .content{
    flex: 1;
  }
  .foods-wrapper .food-item .content .name{
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .foods-wrapper .food-item .content .desc{
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .foods-wrapper .food-item .content .extra{
    line-height: 10px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .foods-wrapper .food-item .content .count{
    margin-right: 12px;
  }
  .foods-wrapper .food-item .content .price{
    font-weight: 700;
    line-height: 24px;
  }
  .foods-wrapper .food-item .content .cartcontrol-wrapper{
    position:absolute;
    right 0;
    bottom 12px
  }
  .foods-wrapper .food-item .content .price .now{
    margin-right: 18px;
    font-size: 14px;
    color: rgb(240,20,20);
  }
  .foods-wrapper .food-item .content .price .old{
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147,153,159);
  }

</style>
