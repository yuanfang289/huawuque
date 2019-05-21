<template>
  <div>
    <p v-html="htmlContent"></p>
  </div>
</template>

<script>
  import {parseReply, parseAt} from 'filters/utils/index';

  /**
   * @property {string}     content         文本
   */
  export default {
    props: {
      content: {
        type: String,
        request: true
      }
    },
    data: () => {
      return {

      }
    },
    computed: {
      htmlContent(){
        return parseReply(parseAt(this.content))
      }
    },
    methods: {

    }
  }
</script>
<style lang="scss">
  .at{
    color: #2c67b2;
  }
</style>
