<template>
  <div class="notice-list">
    <transition class="notice-inner" name="slide" mode="out-in">
      <div :key="item.id">
        <!--<p>{{item.text}}</p>-->
        <p>
          <img v-if="item.headImg" :src="item.headImg+'?imageMogr2/auto-orient/thumbnail/!50x50r/gravity/Center/crop/50x50/format/'+isWebp" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">
          <img v-else="" src="https://assets.urwork.cn/image/headImg.png">
          <span style="margin-left: 10px">{{item.text | delFinallyNumArry0}}<em>{{item.text.match(/([0-9]*)[^0-9]*$/)[1]}}</em> {{item.text | delFinallyNumArry1}}</span>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
  /**
   * @property {Array}   noticeList        数据列表 text： 通知文本 linkUrl：通知链接
   * @property {Number}  interval          停留间隔
   */
  export default {
    props: {
      noticeList: {
        type: Array,
        default: [{text:'',headImg:''}]
      },
      interval: {
        type: Number,
        default: 2500
      }
    },
    data() {
      return {
        number: 0,
      }
    },
    computed: {
      item() {
        return {
          id: this.number,
          text: this.noticeList[this.number].text,
          headImg:this.noticeList[this.number].headImg,
        }
      },
      isWebp (){
        if(document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0){
            return 'webp'
          }else{
            return 'jpeg'
          }
        }
    },
    mounted() {
      this.startMove()
    },
    methods: {
      startMove() {
        setTimeout(() => {
          if (this.number === this.noticeList.length - 1) {
            this.number = 0;
          } else {
            this.number += 1;
          }
          this.startMove();
        }, this.interval)
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/mixins";

  .notice-list {
    overflow: hidden;
    p {
      width: 100%;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #808080;
      @include text-overflow;
      em{
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #000000;
        padding: 0 5px;
      }
    }

    p{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      img{
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
      em{
        color: #000000;
      }
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.1s linear;
  }
  .slide-leave-to {
    transform: translateY(-20px);
  }
  .slide-enter {
    transform: translateY(20px);
  }
</style>
