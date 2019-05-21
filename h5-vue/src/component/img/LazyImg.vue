<template>
  <img v-lazy="imgObj" :alt="alt"/>
</template>

<script>
  /**
   * 使用 vue-lazyload 加载图片
   *
   * @property {string}   src
   * @property {string}   error      加载失败的图片
   * @property {string}   loading    加载中的图片
   * @property {string}   alt
   * @property {string}   rule       裁剪规则
   */
  export default {
    props: {
      src: {
        type: String,
        required: true
      },
      error: {
        type: String
      },
      loading: {
        type: String
      },
      alt: {
        type: String,
        default: ''
      },
      rule: {
        type: String
      }
    },
    computed: {
      imgObj() {
        return {
          src: this.src + this.rule,
          loading: this.loading,
          error: this.error
        }
      }
    },
    mounted() {
      this.$Lazyload.$on('error', () => {
        this.$emit('img-error');
      })
    }
  }
</script>
