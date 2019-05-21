<template>
  <div class="form-title-wrapper">
    <slot></slot>
  </div>
</template>

<script>

  export default {
    props: {

    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .desktop{
    .form-title-wrapper{
      .bubble-tip{
        display: none;
      }
    }
  }

  .form-title-wrapper {
    position: relative;
    padding: 30px 0;
    .form-title {
      a{
        position: relative;
        font-size: 23px;
        font-weight: 600;
        color: #999999;
        &.active{
          color: #333;
        }
        &:nth-child(1){
          padding-right: 13px;
        }
        &:nth-child(2){
          padding-left: 15px;
          &::before{
            content: " ";
            border-left: 1px solid #333;
            height: 18px;
            width: 1px;
            @include position-center-y;
            left: 0;
          }
        }
      }
    }
    .bubble-tip {
      position: absolute;
      bottom: -5px;
      left: 0;
      padding: 11px 10px 7px;
      line-height: 14px;
      background-image: url("../../assets/images/login/bubble.png");
      background-size: 100% 100%;
      a{
        font-size: 12px;
      }
    }
    .form-title-tip {
      padding-top: 5px;
      p{
        font-size: 16px;
        color: #666666;
      }
      .orange{
        color: #FFA600;
        padding-left: 10px;
      }
    }
  }
</style>
