<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="block positive" :class="{'active1':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active1':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active3':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props:{
      ratings:{
        type:Array,
        default(){
          return [];
        }
      },
      selectType:{
        type: Number,
        default: ALL
      },
      onlyContent:{
        type:Boolean,
        default:false
      },
      desc:{
        type:Object,
        default(){
          return {
            all:'全部',
            positive:'满意',
            negative:'不满意'
          };
        }
      }
    },
    computed:{
      positives(){
        return this.ratings.filter((rating)=>{
          return rating.rateType === POSITIVE
        })
      },
      negatives(){
        return this.ratings.filter((rating)=>{
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods:{
      select(type,event){
        if(!event._constructed){
          return
        }
        // this.selectType= type
        this.$emit("select",type)
      },
      toggleContent(event){
        if(!event._constructed){
          return
        }
        // this.onlyContent = !this.onlyContent
        this.$emit("toggle",this.onlyContent)
      }
    }
  }
</script>

<style scoped>
  @import "../../comment/stylus/style.css";
  .ratingselect .rating-type{
    padding:18px 0;
    margin:0 18px;
    position: relative;
    font-size:0;
  }
  .rating-type:after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7,17,27,0.1);
    content: ' '
  }
  .ratingselect .rating-type .block{
    display: inline-block;
    padding: 8px 12px;
    margin-right:8px;
    border-radius:1px;
    color:rgb(77,85,93);
    font-size:12px
  }
  .ratingselect .rating-type .count{
    margin-left: 2px;
    font-size: 8px;
  }
  .ratingselect .rating-type  .positive{
    background: rgba(1,160,220,0.2);
  }
  .ratingselect .rating-type .active1{
    background: rgb(0,160,220);
    color:#fff;
  }
  .ratingselect .rating-type .negative{
    background: rgba(77,85,93,0.2);
  }
  .ratingselect .rating-type .active3{
    background:rgb(77,85,93);
    color:#fff;
  }
  .ratingselect .switch{
    padding: 12px 18px;
    line-height: 24px;
    border-bottom:1px solid rgba(7,17,27,0.1);
    color:rgb(147,153,159);
  }
  .ratingselect .on{
    color:#00c850;
  }
  .ratingselect .switch .icon-check_circle{
    display: inline-block;
    vertical-align: top;
    margin-right: 4px;
    font-size: 24px;
  }
  .ratingselect .switch .text{
    font-size: 12px;
  }
</style>
