<template>
  <component :is="modeName" :class="className" :href="href"><slot></slot></component>
</template>

<script>
  import LinkA from 'component/link/LinkA';
  import LinkRouter from 'component/link/LinkRouter';

  /**
   * @property {string}    href
   * @property {string}    type     链接展示类型['text', 'button']，默认text
   * @property {string}    mode     组件模式{link: router-link, a: 普通a标签}，默认link
   */
  export default {
    props: {
      href: {
        type: [String, Object],
        required: true
      },
      type: {
        validator(value) {
          return ['text', 'button'].indexOf(value) !== -1
        },
        default: 'text'
      },
      mode: {
        validator(value) {
          return ['link', 'a'].indexOf(value) !== -1
        },
        default: 'link'
      }
    },
    computed: {
      modeName() {
        return this.mode === 'link' ? 'link-router' : 'link-a'
      },
      className() {
        return this.type === 'button' ? 'btn' : ''
      }
    },
    components: {
      LinkA,
      LinkRouter
    }
  }
</script>

<style lang="scss">
  // assets-->scss-->form-->button.scss
</style>
