<template>
  <div>
    <div class="video--list-item video--list-object" v-if="Object.prototype.toString.call(list) === '[object Object]'">
      <div class="img-wrapper">
        <a
          class="img-link-wrapper"
          :href="`/companyVideo/getVideoDetail?id=${list.id}`"
        >
          <Img :src="list.videoCover" mode="none"/>
          <div class="top-mask" v-if="list.title"></div>
          <div class="top-text" v-if="list.title">{{list.title}}</div>
          <div class="play-icon"></div>
        </a>
      </div>
      <div class="video-text">
        <div class="video-company">
          <a :href="`/market/companyDetail?id=${list.companyId}`" >
            <img v-if="list.companyLogo" :src="list.companyLogo" alt="">
            <img src="../../../static/images/company/company_default.png" alt="" v-else>
            <span>{{list.companyName}}</span>
          </a>
        </div>
        <div class="video-operate">
          <a
            :href="`/companyVideo/getVideoDetail?id=${list.id}`"
          >
            <img src="../../../static/images/video/play-number.png" alt="">
            <span>{{list.playedCnt | numberComputed}}</span>
          </a>
          <a
            :href="`/companyVideo/getVideoDetail?id=${list.id}`"
          >
            <img src="../../../static/images/video/pl.png" alt="">
            <span>{{list.commentCnt | numberComputed}}</span>
          </a>
          <a href="javascript:;" @click="likeFn(list, $event)">
            <img v-if="list.liked" src="../../../static/images/video/dz-active.png" alt="">
            <img src="../../../static/images/video/dz.png" alt="" v-else>
            <span :class="{active: list.liked}">{{list.likedCnt | numberComputed}}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="video--list-item" v-else v-for="item in list" :key="item.id">
      <div class="img-wrapper">
        <a
          class="img-link-wrapper"
          :href="`/companyVideo/getVideoDetail?id=${item.id}`"
        >
          <Img :src="item.videoCover" mode="none"/>
          <div class="top-mask" v-if="item.title"></div>
          <div class="top-text" v-if="item.title">{{item.title}}</div>
          <div class="play-icon"></div>
        </a>
      </div>
      <div class="video-text">
        <div class="video-company">
          <a :href="`/market/companyDetail?id=${item.companyId}`" >
            <img v-if="item.companyLogo" :src="item.companyLogo" alt="">
            <img src="../../../static/images/company/company_default.png" alt="" v-else>
            <span>{{item.companyName}}</span>
          </a>
        </div>
        <div class="video-operate">
          <a
            :href="`/companyVideo/getVideoDetail?id=${item.id}`"
          >
            <img src="../../../static/images/video/play-number.png" alt="">
            <span>{{item.playedCnt | numberComputed}}</span>
          </a>
          <a
            :href="`/companyVideo/getVideoDetail?id=${item.id}`"
          >
            <img src="../../../static/images/video/pl.png" alt="">
            <span>{{item.commentCnt | numberComputed}}</span>
          </a>
          <a href="javascript:;" @click="likeFn(item, $event)">
            <img v-if="item.liked" src="../../../static/images/video/dz-active.png" alt="">
            <img src="../../../static/images/video/dz.png" alt="" v-else>
            <span :class="{active: item.liked}">{{item.likedCnt | numberComputed}}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import toPage from 'nativeFix/component/toPage/toPage'
  import apiVideoClickLikedCnt from 'api/video/apiVideoClickLikedCnt'

  /**
   * @property {Array, Object}   data                视频列表
   */
  export default {
    props: {
      data: {
        type: [Array, Object],
        required: true
      }
    },
    components: {
      toPage
    },
    data() {
      return {
        list: null, //  视频列表
      }
    },
    methods: {
      likeFn(list, e) {
        let target = e.target;
        if (target.lock) return;
        target.lock = true;

        list.liked = true;
        apiVideoClickLikedCnt({
          id: list.id
        }).then(res => {
          list.likedCnt = res;
          target.lock = false;
        }).catch(() => {
          target.lock = false;
        })
      }
    },
    created() {
      this.list = this.data;

      if(this.list.length) {
        this.list.forEach(item => {
          item.liked = false;
        });
      } else {
        Vue.set(this.list, 'liked', false);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/mixins";

  .video--list-item {
    position: relative;
    padding: 20px 0;
    @include border-bottom(#E5E5E5);
    &:last-child {
      @include border-bottom(transparent);
    }
    .img-wrapper {
      height: 188px;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
    }
    .img-link-wrapper {
      display: block;
      height: 100%;
      .img-wrap {
        background: #333;
      }
    }
    .top-mask{
      position: absolute;
      top: 0;
      width: 100%;
     height: 100%;
      background: rgba(51,51,51,.1);
    }
    .top-text {
      position: absolute;
      top: 0;
      width: 100%;
      padding: 8px 12px;
      font-size: 16px;
      color: #FFFFFF;
      word-break: break-all;
      word-wrap: break-word;
    }
    .play-icon {
      @include position-center;
      width: 50px;
      height: 50px;
      background: url("../../../static/images/video/play.png") no-repeat;
      background-size: 50px 50px;
    }
    .video-text {
      @include clearfix;
      padding-top: 13px;
      .video-company {
        float: left;
        width: 170px;
        @include text-overflow;
        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #EAEAEA;
          background: #fff;
          margin-right: 2px;
        }
        span {
          font-size: 12px;
          color: #7A808F;
        }
      }
      .video-operate {
        float: right;
        a {
          &:nth-child(1) {
            margin-right: 5px;
          }
          &:nth-child(2) {
            margin-right: 5px;
          }
        }
        img {
          width: 16px;
          height: 16px;
        }
        span {
          position: relative;
          top: -9px;
          left: -3px;
          font-size: 7px;
          &.active {
            color: #FF762E;
          }
        }
      }
    }
  }
  .video--list-item.video--list-object {
    @include border-bottom(#E5E5E5);
  }

</style>
