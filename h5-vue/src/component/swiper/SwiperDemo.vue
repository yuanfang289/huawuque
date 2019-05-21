<template>
  <div class="slide-render-view">
    <div class="swiper1">
      <swiper
        :bannerList="bannerList"
        :autoPlay="false"
        :paddingTop="50.450"
        :scrollEndCallback="scrollEndFn"
      ></swiper>
    </div>

   <div class="swiper2">
      <swiper
        :bannerList="bannerList"
        :autoPlay="false"
        :paddingTop="50.450"
        :column="1"
        :transformScale="true"
      ></swiper>
    </div>

     <div class="swiper3">
      <swiper
        :bannerList="bannerList"
        :autoPlay="false"
        :paddingTop="69.540"
        :column="2"
      ></swiper>
    </div>

    <div class="swiper4">
      <swiper
         :column="3"
         :showDot="false"
         :loop="false"
         :autoPlay="false"
         :isUserDefined="true"
         :bannerList="list"
      >
        <template slot="user" slot-scope="{item}">
          <div class="user-wrap">
            {{item}}
          </div>
        </template>
      </swiper>
    </div>

  </div>
</template>

<script>
  import Swiper from 'lib/swiper/Swiper'

  const items = [
    {
      linkUrl: 'http://y.qq.com/w/album.html?albummid=0044K2vN1sT5mE',
      image: 'http://7xp26u.com1.z0.glb.clouddn.com/8311066e-e549-48a4-8373-2022e2b558d5.jpg',
      id: 11351
    },
    {
      linkUrl: 'https://y.qq.com/m/digitalbum/gold/Voice.vue?_video=true&id=2197820&g_f=shoujijiaodian',
      image: 'https://image.urwork.cn/b3b17011-350e-461c-af12-5eb861653c69.jpg',
      id: 11372
    },
    {
      linkUrl: 'http://y.qq.com/w/album.html?albummid=001tftZs2RX1Qz',
      image: 'https://image.urwork.cn/c30c57e5-5bf4-499b-88e3-07d6b945e44f.jpg',
      id: 11378
    },
    {
      linkUrl: 'https://y.qq.com/msa/218/0_4085.html',
      image: 'https://image.urwork.cn/a4bd1b49-ddfd-4bdd-b3ed-4a603c5c50d0.jpg',
      id: 11375
    },
    {
      linkUrl: 'https://y.qq.com/m/digitalbum/gold/Voice.vue?_video=true&id=2195876&g_f=shoujijiaodian',
      image: 'https://image.urwork.cn/514f3824-c0ee-4cc2-b055-43b68d829ac6.jpg',
      id: 11287
    }
  ];

  export default {
    computed: {
      bannerList() {
        return items
      }
    },
    data:() => {
      return {
        list:[
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8
        ]
      }
    },
    components:{
      Swiper
    },
    methods:{
      scrollEndFn(swiper) {
        console.log(swiper.activeIndex)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .slide-render-view{
    .swiper1{
      padding: 20px;
    }
    .swiper2{
      //  外包围左右padding值必须和wrapperPadding保持一致。
      padding: 15px;
    }
    .swiper3{
      padding: 15px;
    }
    .swiper4{
      padding: 15px;
    }
    .user-wrap{
      background: #f5f5f5;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
