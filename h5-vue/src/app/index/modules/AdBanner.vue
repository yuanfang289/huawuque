<template>
  <section class="ad-banner-wrapper">
    <Swiper ref="slide"
           :bannerList="bannerList"
           :paddingTop="40.420"
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

      }
    },
    components: {
      Swiper
    }
  }
</script>

<style lang="scss" scoped>
  .ad-banner-wrapper {
    padding: 15px 20px;
    background: #f5f5f5;
  }
</style>
