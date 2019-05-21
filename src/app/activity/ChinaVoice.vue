<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <!--<page-main :show="show">-->
      <main id="main" class="station-main">
        <img id="pic1" ref="pageWidth" :src="require('./img/voice/landing_page.jpg')"/>
        <div class="haixuan">
          <Banner v-if="banners1.length > 0" :bannerList="banners1" :autoPlay="autoPlay" :click="clickAw"></Banner>
        </div>
        <div class="huamao">
          <Banner v-if="banners2.length > 0" :bannerList="banners2" :autoPlay="autoPlay" :click="clickAw"></Banner>
        </div>
        <a href="https://m.urwork.cn//workstage/detail?id=10196" class="huamaoinfo" >

        </a>
        <a href="https://m.urwork.cn/activity/h5Detail?id=2190" class="join" ref="joinWidth">

        </a>
      </main>

    <!--</page-main>-->

  </page-wrap>
</template>

<script>
  import Banner from 'app/activity/modules/Banner';
  export default {
    components: {
      Banner
    },
    data: () => {
      return {
        show: false,
        title: '中国好声音优客工场官方报名通道',
        autoPlay:2500,
        clickAw:true,
        banners1:[
          {image:require('./img/voice/haixuan1.png')},
          {image:require('./img/voice/haixuan2.png')},
          {image:require('./img/voice/haixuan3.png')}
        ],
        banners2:[
          {image:require('./img/voice/huamao1.png')},
          {image:require('./img/voice/huamao2.png')},
          {image:require('./img/voice/huamao3.png')}
        ],
      }
    },
    methods:{

    },
    created() {
      this.show = true;
    },
    mounted() {
      let me = this;
      document.getElementById("pic1").onload = function () {
        let wid = window.getComputedStyle(me.$refs.pageWidth).width;
        let w = me.$refs.pageWidth.clientWidth;
        console.log(me.$refs.pageWidth.clientWidth);
        me.$refs.joinWidth.style.width = wid;
        me.$refs.joinWidth.style.marginLeft = -(w/2)+'px';
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isIOS) {
          if (screen.height == 812 && screen.width == 375){
            me.$refs.joinWidth.style.height = 8+'%';
          }else{
            me.$refs.joinWidth.style.height = 10+'%';
          }
        }
      }
    },
    updated(){
    }
  }
</script>

<style lang="scss">
  html,body{
    background: #3d0a07;
  }
  #main{
    max-width: 750px;
    position: relative;
    margin: 0 auto;
    text-align: center;
    background: #3d0a07;
    img{
      display: inline-block;
    }
    .haixuan{
      width: 83%;
      height: 6.5%;
      position: absolute;
      bottom: 24.2%;
      left:50%;
      margin-left:-42%; /*元素宽度的一半*/
      overflow: hidden;
    }
    .huamao{
      width: 83%;
      height: 6.5%;
      position: absolute;
      bottom: 12.1%;
      left:50%;
      margin-left:-42%; /*元素宽度的一半*/
      overflow: hidden;
    }
    .huamaoinfo{
      width: 83%;
      height: 6.5%;
      /*border: 1px solid blueviolet;*/
      position: absolute;
      bottom: 5.4%;
      left:50%;
      margin-left:-42.6%; /*元素宽度的一半*/
    }
    .join{
      width: 100%;
      height: 10%;
      position: fixed;
      bottom: 0;
      left: 50%;
      margin-left: -50%;
      background: url("./img/voice/join_btn.jpg") no-repeat;
      background-size: 100%;
      z-index: 100;
     }
    .swiper-wrapper{
        width: 100%;
        height: 100%;
      .img-wrap{
        img{
          height: 100%;
        }
      }
    }
/*    .join{
      width: 54%;
      height: 1.5%;
      border: 1px solid blueviolet;
      position: absolute;
      bottom: 0.5%;
      left:50%;
      margin-left:-27%; !*元素宽度的一半*!
    }*/
  }
</style>
