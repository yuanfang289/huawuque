<template>
  <section class="banner-wrapper">
    <Swiper ref="slide"
           :bannerList="bannerList"
           :paddingTop="36.5"
            :slideRadius="0"
            :autoPlay=autoPlay
            :click=clickAw
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
      autoPlay: {
        type: [Number, Boolean],
        default: 2500
      },
      clickAw: {
        type: Boolean,
        default: true
      }
    },
    data: () => {
      return {

      }
    },
    components: {
      Swiper
    }
  }
</script>

<style lang="scss" scoped>
  .banner-wrapper {
    background: #f5f5f5;
  }
</style>
