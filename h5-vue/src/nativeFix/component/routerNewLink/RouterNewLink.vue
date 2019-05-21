<template>
  <a href="javascript:;"
     @click.prevent="clickHandler"
  >
    <slot></slot>
  </a>
</template>

<script>
  import getLocation from 'utils/getLocation';
  import {isApp} from 'nativeFix';

  /**
   * @property  {string}    props.routerPath              路由的path
   * @property  {string}    props.routerName              路由的name
   */
  export default {
    props: {
      routerPath: {
        type: String,
        required: true
      },
      routerName: {
        type: String,
        required: true
      },
    },
    methods: {
      clickHandler(e) {
        let origin = getLocation().origin;
        this.$emit('router-before');
        if(isApp()){
          this.$DANativeApi.navigateTo({
            url: origin + this.routerPath
          })
        } else {
          this.$router.push({name: this.routerName});
        }
      }
    }
  }
</script>
