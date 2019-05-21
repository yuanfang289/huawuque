<template>
  <main id="main">
    <page-loading v-if="!show"/>

    <div class="main-inner" v-if="show">
      <slot></slot>
    </div>
  </main>
</template>

<script>
  import PageLoading from 'lib/loading/PageLoading';
  import ServerError from 'component/ServerError';

  /**
   * @property {boolean}  show        是否显示页面内容，默认显示loading动画
   */
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    components: {
      PageLoading,
      ServerError
    }
  }
</script>
