<template>
  <div class="from-btn-group" :style="'padding-top:' + top + 'px'">
    <slot name="button"></slot>
    <slot name="tip"></slot>
  </div>
</template>

<script>
  /**
   * @property {number}   top          上边距
   */
  export default {
    props: {
      top: {
        type: Number,
      }
    }
  }
</script>

<style lang="scss">
  .from-btn-group{
    p{
      padding: 15px 8px 0;
      font-size: 12px;
      color: #999999;
      text-align: center;
      .orange{
        color: #FFA600;
      }
    }
  }
</style>
