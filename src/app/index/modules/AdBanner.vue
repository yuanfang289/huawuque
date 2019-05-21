<template>
  <section class="ad-banner-wrapper">
    <Swiper ref="slide"
           :bannerList="bannerList"
           :paddingTop="default_paddingTop"
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
      },
      paddingTop:{
        type:Number,
      }
    },
    data: () => {
      return {
       default_paddingTop:40.420,
      }
    },
    components: {
      Swiper
    },
    created(){
      if(parseFloat(this.paddingTop)){
        this.default_paddingTop=this.paddingTop;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ad-banner-wrapper {
    padding: 0 20px;
    background: #f5f5f5;
  }
</style>
