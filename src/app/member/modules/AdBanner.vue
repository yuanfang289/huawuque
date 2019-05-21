<template>
  <section class="ad-banner-wrapper">
    <Swiper ref="slide"
           :bannerList="bannerList"
           :paddingTop="40.420"
           :autoPlay="autoPlay"
    >
    </Swiper>
  </section>
</template>

<script>
  import Swiper from 'lib/swiper/Swiper'

  /**
   * @property {Array}   iconList         数据列表
   */
  export default {
    props: {
      bannerList: {
        type: Array,
        required: true
      }
    },
    data: () => {
      return {
        autoPlay:false
      }
    },
    components: {
      Swiper
    },
    created() {
       this.bannerList.length==1? this.autoPlay = false:this.autoPlay = 3000
    }
  }
</script>

<style lang="scss" scoped>
  .ad-banner-wrapper {
    background: #f5f5f5;
  }
  /deep/ .swiper-container{
    border-radius: 6px!important;
  }
</style>
