<template>
  <section class="sort-picker" :class="className">
    <ul :class="className">
      <li
        v-for="item in data"
        @click="selectedHandler"
        :key="item.id"
        :data-id="item.id"
        :data-name="item.name"
        :class="{active: activeId == item.id}"
      >
        {{item.name}}
      </li>
    </ul>
  </section>
</template>

<script>
  /**
   * @property {string}    props.postName       传递的数据的name
   * @property {array}     props.data           渲染数据
   * @property {array}     props.value          初始化数据
   * @property {boolean}   props.multiple       是否多选
   * @property {string}    props.className      样式class名，会添加到组件各处
   */
  export default {
    props: {
      postName: {
        type: String,
        required: true
      },
      /**
       * @example
       * [{
       *  id: 1,
       *  name: '综合排序',
       * }, {
       *  id: 2,
       *  name: '加入时间
       * }]
       */
      data: {
        type: Array,
        required: true,
        validator(value) {
          let check = true;

          for (let i = 0; i < value.length; i++) {
            let item = value[i];

            // 数据必须包含id, name字段
            if (item.id === undefined || item.name === undefined) {
              console.warn('SortPicker: 数据必须包含id, name字段 -> ', JSON.stringify(item));
              check = false;
              break
            }
          }

          return check
        }
      },
      /**
       * @example
       * [1]
       */
      value: {
        type: Array,
        default() {
          return []
        },
        validator(value) {

          // 可以是空数组
          if (!value.length) return true;

          let check = true;
          for (let i = 0; i < 1; i++) {

            // 初始化值，只能是数字，或字符串
            if (typeof value[i] !== 'number' && typeof value[i] !== 'string') {
              check = false;
              break;
            }
          }

          return check
        }
      },
      className: {
        type: String,
        default: ''
      },
    },
    data: () => {
      return {
        isInit: true,
        id: '',
        name: '',
      }
    },
    computed: {
      activeId() {
        let id = this.id;
        if (this.isInit) {
          id = this.value[0];
          this.isInit = false;
        }
        return id
      }
    },
    methods: {
      selectedHandler(e) {
        let {
          id,
          name
        } = e.currentTarget.dataset;

        this.id = id;
        this.name = name;

        // 向上传递数据
        this.$emit('post-data', {
          name: this.postName,
          data: {
            sort: true,
            id,
            name
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sort-picker {
    position: absolute;
    top: 16px;
    right: 10px;
    width: 130px;
    background-color: #fff;
    border-radius: 3px;

    &::before {
      position: absolute;
      right: 15px;
      bottom: 100%;
      border: 4px solid rgba(0,0,0,0);
      border-bottom-color: #fff;
      content: "";
    }

    ul {
      overflow: hidden;
    }

    li {
      width: 100px;
      height: 34px;
      margin: 10px auto;
      color: #666;
      text-align: center;
      line-height: 34px;

      &.active {
        background-color: #ffd53d;
        border-radius: 34px;
        color: #333;
        font-weight: bold;
      }
    }
  }
</style>
