<template>
  <router-link :to="href">
    <slot></slot>
  </router-link>
</template>

<script>
  export default {
    props: {
      href: [String, Object],
      required: true
    },
  }
</script>
