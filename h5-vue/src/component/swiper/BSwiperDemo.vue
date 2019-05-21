<template>
  <div class="slide-render-view">
    <div class="swiper1">
      <slide ref="slide"
             :showDot="true"
             :loop="true"
             :autoPlay="false"
             :bannerList="bannerList"
             :paddingTop="45.450"
             :initPageIndex="2"
             :scrollEndCallback="onScrollEnd"
      >
      </slide>
    </div>

    <div class="swiper4">
      <slide ref="slide"
             :showDot="true"
             :loop="true"
             :autoPlay="false"
             :bannerList="bannerList"
             :paddingTop="50.450"
             :column="1"
             :transformScale="true"
      >

      </slide>
    </div>

    <div class="swiper2">
      <slide ref="slide"
             :paddingTop="69.540"
             :column="2"
             :bannerList="bannerList"
      >

      </slide>
    </div>

    <div class="swiper3">
      <slide ref="slide"
             :column="3"
             :isUserDefined="true"
             :bannerList="list"
      >
        <template slot="user" slot-scope="props">
          <div class="user-wrap">
            {{list[props.$index]}}
          </div>
        </template>
      </slide>
    </div>
  </div>
</template>

<script>
  import Slide from 'lib/swiper/BSwiper'

  const items = [
    {
      linkUrl: 'http://y.qq.com/w/album.html?albummid=0044K2vN1sT5mE',
      image: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001YCZlY3aBifi.jpg',
      id: 11351
    },
    {
      linkUrl: 'https://y.qq.com/m/digitalbum/gold/Voice.vue?_video=true&id=2197820&g_f=shoujijiaodian',
      image: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg',
      id: 11372
    },
    {
      linkUrl: 'http://y.qq.com/w/album.html?albummid=001tftZs2RX1Qz',
      image: 'http://y.gtimg.cn/music/photo_new/T003R720x288M00000236sfA406cmk.jpg',
      id: 11378
    },
    {
      linkUrl: 'https://y.qq.com/msa/218/0_4085.html',
      image: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001s0BXx3Zxcwb.jpg',
      id: 11375
    },
    {
      linkUrl: 'https://y.qq.com/m/digitalbum/gold/Voice.vue?_video=true&id=2195876&g_f=shoujijiaodian',
      image: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000002cwng4353HKz.jpg',
      id: 11287
    }
  ];

  export default {
    computed: {
      bannerList() {
        console.log(items);
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
      Slide
    },
    methods:{
      onScrollEnd(page){
        console.log(page)
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
      padding: 20px;
    }
    .swiper3{
      padding: 20px;
    }
    .swiper4{
      padding: 20px;
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
