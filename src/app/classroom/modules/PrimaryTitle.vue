<template>
  <div class="primary-title">
    <h2>{{title}}</h2>
    <aside class="aside">
      <slot name="aside"></slot>
    </aside>
  </div>
</template>

<script>
  /**
   * @property {string}   title         一级标题
   */
  export default {
    props: {
      title: {
        type: String
      }
    },
    data: () => {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .primary-title{
    background: #fff;
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2{
      font-size: 22px;
      line-height: 31px;
      font-weight: bold;
    }
  }
</style>
