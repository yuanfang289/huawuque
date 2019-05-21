<template>
  <div class="sub-title">
    <h2>{{title}}</h2>
    <aside class="sub-title-aside" v-if="asideShow">
      <slot>
        <a :href="linkUrl" class="sub-title-more" @click.prevent="moreHandler">更多</a>
      </slot>
    </aside>
  </div>
</template>

<script>
  /**
   * @property {string}     title             二级标题
   * @property {boolean}    asideShow         是否显示右边内容
   */
  export default {
    props: {
      title: {
        type: String
      },
      asideShow: {
        type: Boolean,
        default:true
      },
      linkUrl: {
        type: String,
        default: 'javascript:;'
      }
    },
    data: () => {
      return {

      }
    },
    methods: {
      moreHandler(){
        this.$emit('check-more');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sub-title{
    /*background: #fff;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2{
      font-size: 20px;
      line-height: 20px;
      font-weight: bold;
    }
    .sub-title-aside{
      padding-left: 5px;
      i {
        font-size: 16px;
        margin-right: 4px;
      }
      img {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
      span {
        font-size: 14px;
        line-height: 16px;
        color: #333333;
      }
    }
    .sub-title-more{
      font-size: 12px;
      color: #999999;
    }
  }
</style>
