<template>
  <section class="nodata">
    <div class="nodata-inner">
      <img :src="img" class="img">
      <div class="nodata-desc">
        <slot>暂无课程</slot>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'noData'
      }
    },
    computed: {
      img() {
          return require('assets/images/interface/no-course.png')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nodata {
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;

    .nodata-inner {
      position: absolute;
      top: 35%;
      left: 0;
      width: 100%;
    }

    .img {
      display: block;
      width: 290px;
      height: 145px;
      margin: 0 auto;
    }

    .nodata-desc {
      color: #666;
      font-size: 14px;
      text-align: center;
    }
  }
</style>
