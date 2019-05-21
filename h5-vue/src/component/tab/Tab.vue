<template>
  <section
    class="tab"
    :class="computedClass"
  >
    <ul class="tabs">
      <template v-for="(item, index) in data">
        <li v-if="item.oldPageLink">
          <a :href="item.oldPageLink">
            <slot :item-data="item">
              <span class="title">{{item.text}}</span>
            </slot>
          </a>
        </li>
        <router-link
          v-else
          :to="{name: item.routeName}"
          :replace="replace"
          :tab-index="index"
          tag="li"
        >
          <a>
            <slot :item-data="item">
              <span class="title">{{item.text}}</span>
            </slot>
          </a>
        </router-link>
      </template>

      <!--<li v-for="item in data">-->
        <!--<slot :tab-data="item">-->
          <!---->
        <!--</slot>-->
      <!--</li>-->
    </ul>
  </section>
</template>

<script>
  /**
   * @property {string}   props.type             tab类型{router: 导航, tab: 切换，filter: 条件筛选}
   * @property {string}   props.theme            样式主题{nav: 头部导航, classify: 分类筛选}
   * @property {boolean}  props.scroll           启用scroll滑动展示，如果不启用则使用flex布局平均分配
   */
  export default {
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      type: {
        default: 'tab',
        validator(value) {
          return ['router', 'tab', 'filter'].indexOf(value) !== -1
        }
      },
      theme: {
        default: 'classify',
        validator(value) {
          return ['nav', 'classify'].indexOf(value) !== -1
        }
      },
      scroll: {
        type: Boolean,
        default: true
      },
      replace: {
        type: Boolean,
        default: false
      },
      className: {
        type: String,
        default: ''
      }
    },
    computed: {
      computedClass() {
        return this.className + ` tab-${this.theme}`;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tab {
    >.tabs {
      a {
        display: block;
      }
    }
  }
  .tab-nav {
    background-color: #f9f9f9;
    > .tabs {
      display: flex;
      li {
        flex: 1;
        text-align: center;
      }
      .title {
        position: relative;
        display: inline-block;
        padding: 9px 3px;
        line-height: 21px;
        color: #999;
      }

      .router-link-active {
        .title {
          color: #333;
          &::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 900;
            width: 100%;
            height: 2px;
            background-color: #333;
          }
        }
      }
    }
  }
</style>
