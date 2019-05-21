<template>
  <a :href="href">
    <slot></slot>
  </a>
</template>

<script>
  export default {
    props: {
      href: String,
      required: true
    },
  }
</script>
