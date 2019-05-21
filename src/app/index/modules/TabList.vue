<template>
  <div class="tab-list-wrapper">
    <ul class="sub-tab" >
      <li v-if="data" :class="{active: currentTab === item}" v-for="(item, index) in tab" :key="index" @click="changeTab(item)">{{item}}</li>
    </ul>
    <div :class="[className, 'list-wrapper']">
      <slot :list="list"></slot>
    </div>
  </div>
</template>

<script>
  /**
   * @property {Object}   data         数据列表
   * @property {String}   className    列表class名
   */
  export default {
    props: {
      data: {
        type: Object
      },
      className: {
        type: String
      }
    },
    computed: {
      list() {
        let list = [];
        for(let item in this.data) {
          if(item === this.currentTab) {
            list = this.data[item];
            break;
          }
        }
        return list;
      },
      tab() {
        if(this.data) {
          return Object.keys(this.data);
        }
        return false;
      },
    },
    data: () => {
      return {
        currentTab: '',       //当前的选中标签
      }
    },
    methods: {
      changeTab(item) {
        this.currentTab = item;
        setTimeout(() => {
          this.$emit('tab-change');
        },100)
      },
    },
    created() {
      this.currentTab = Object.keys(this.data)[0];
    }
  }
</script>

<style lang="scss" scoped>

</style>
