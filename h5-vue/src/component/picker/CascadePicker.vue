<template>
  <section class="cascade-picker" :class="className">
    <div class="picker-item picker-menu" :class="className">
      <scroll
        ref="menuScroll"
        :data="data"
        :bounce="false"
      >
        <ul slot-scope="{listData}" :class="className">
          <li
            ref="menuLi"
            v-for="item in listData"
            @click="parentSelectHandler"
            :data-id="item.id"
            :data-name="item.name"
            :class="{active: parentId == item.id}"
          >{{item.name}}</li>
        </ul>
      </scroll>
    </div>
    <div class="picker-item picker-sub-menu" :class="className">
      <scroll
        ref="subMenuScroll"
        :data="subMenuData"
        :bounce="false"
      >
        <ul slot-scope="{listData}" :class="className">
          <li
            ref="subMenuLi"
            v-for="item in listData"
            @click="childSelectHandler"
            :data-id="item.id"
            :data-name="item.name"
            :class="{active: childId == item.id}"
          >{{item.name}}</li>
        </ul>
      </scroll>
    </div>
  </section>
</template>

<script>
  import Scroll from 'lib/scroll/Scroll';

  export default {
    components: {
      Scroll
    },
    /**
     * @property {string}    props.postName                传递的数据的name
     * @property {array}     props.data                    渲染数据
     * @property {array}     props.value                   初始化数据
     * @property {boolean}   props.multiple                是否多选
     * @property {boolean}   props.disabledMultiClassify   禁止跨一级分类多选，multiple为true时才能生效
     * @property {string}    props.className               样式class名，会添加到组件各处
     */
    props: {
      show: {
        type: Boolean,
        default: false
      },
      postName: {
        type: String,
        required: true
      },
      /**
       * @example
       * [{
       *  id: 1,
       *  name: 'name',
       *  list: [{
       *    id: 11,
       *    name: 'subName',
       *  }]
       * }]
       * @desc TODO 如果添加name='全部'，则id必须为''或父级id
       */
      data: {
        type: Array,
        required: true,
        validator(value) {
          let check = true;

          for (let i = 0; i < value.length; i++) {
            let item = value[i];

            // 数据必须包含list, id, name字段
            if (item.list === undefined || item.id === undefined || item.name === undefined) {
              check = false;
              break
            }
          }

          return check
        }
      },
      /**
       * @example
       * [1, 11]
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
          for (let i = 0; i < 2; i++) {

            // 初始化值，只能是数字，或字符串
            if (typeof value[i] !== 'number' && typeof value[i] !== 'string') {
              check = false;
              break;
            }
          }

          return check
        }
      },
      multiple: {
        type: Boolean,
        default: false
      },
      disabledMultiClassify: {
        type: Boolean,
        default: true
      },
      className: {
        type: String,
        default: ''
      }
    },
    watch: {
      show(show) {
        if (show) {
          this.scrollHeight = this.$refs.menuScroll.$el.offsetHeight;
          this.initPostData();
          this.$nextTick(() => {
            this.menuScrollTo();
            this.subMenuScrollTo();
          });

          // TODO 原生APP补丁
          this.$DANativeApi.setIsRefresh({
            isRefresh: false
          })
        } else {
          if (this.oldParentId !== this.parentId) {
            this.parentId = this.oldParentId;
          }

          // TODO 原生APP补丁
          this.$DANativeApi.setIsRefresh({
            isRefresh: true
          })
        }
      }
    },
    data: () => {
      /**
       * @property {number}
       */
      return {
        scrollHeight: 0,
        oldParentId: '',
        parentId: '',
        parentName: '',
        childId: '',
        childName: ''
      }
    },
    computed: {
      subMenuData() {
        let data = [];
        for (let i = 0; i < this.data.length; i++) {
          let item = this.data[i];

          // TODO 这里不能使用 === 判断，parentId可能是字符串
          if (item.id == this.parentId) {
            data = item.list;
            break
          }
        }
        return data
      },
    },
    methods: {
      postData() {
        // 选中项为"全部"
        let isAll = this.parentId === this.childId;

        // 向上传递数据
        this.$emit('post-data', {
          name: this.postName,
          data: {
            isAll,
            parentId: this.parentId,
            parentName: this.parentName,
            childId: this.childId,
            childName: this.childName
          }
        });
      },
      parentSelectHandler(e) {
        let {
          id,
          name
        } = e.currentTarget.dataset;

        this.subMenuScrollTo(id);

        this.parentId = id;
        this.parentName = name;
      },
      childSelectHandler(e) {
        let {
          id,
          name
        } = e.currentTarget.dataset;

        this.childId = id;
        this.childName = name;
        this.oldParentId = this.parentId;

        this.postData();
      },
      menuScrollTo() {
        let parentElem = this.$refs.menuLi;
        let menuScroll = this.$refs.menuScroll;
        for (let i = 0; i < parentElem.length; i++) {
          let elem = parentElem[i];

          // 当前选中项滚动到顶部
          if (elem.classList.contains('active')) {
            menuScroll.refresh();
            if (elem.offsetTop + elem.offsetHeight > this.scrollHeight) {
              menuScroll.scrollToElement(elem, 200);
            } else {
              menuScroll.scrollTo(0, 0);
            }
            break
          }
        }
      },
      subMenuScrollTo(parentId) {
        let childElem = this.$refs.subMenuLi;
        let subMenuScroll = this.$refs.subMenuScroll;
        if (parentId === undefined || parentId == this.oldParentId) {
          for (let i = 0; i < childElem.length; i++) {
            let elem = childElem[i];

            // 当前选中项滚动到顶部
            if (elem.classList.contains('active')) {
              subMenuScroll.refresh();
              if (elem.offsetTop + elem.offsetHeight > this.scrollHeight) {
                subMenuScroll.scrollToElement(elem, 200);
              } else {
                subMenuScroll.scrollTo(0, 0);
              }
              break
            }
          }
        } else {
          subMenuScroll.scrollTo(0, 0);
        }
      },
      initPostData() {
        let data = this.data;
        let value = this.value;
        let parentId, parentName, childId, childName;

        if (!value.length) {

          // 如果没有初始值，则使用第一条数据(全部)作为默认数据
          parentId   = data[0].id;
          parentName = data[0].name;
          childId    = data[0].list[0].id;
          childName  = data[0].list[0].name;

        } else {

          for (let i = 0; i < data.length; i++) {
            let parentItem = data[i];
            if (parentItem.id != value[0]) continue;

            parentId = parentItem.id;
            parentName = parentItem.name;

            let list = parentItem.list;
            for (let j = 0; j < list.length; j++) {
              let childItem = list[j];
              if (childItem.id != value[1]) continue;

              childId = childItem.id;
              childName = childItem.name;
              break
            }

            if (childId !== undefined && childName !== undefined) break
          }

        }

        this.parentId    = parentId;
        this.parentName  = parentName;
        this.oldParentId = parentId;
        this.childId     = childId;
        this.childName   = childName;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  $picker-item-height: 350px;

  .cascade-picker {
    overflow: hidden;
    display: flex;
    height: $picker-item-height;
    background-color: #f8f8f8;

    .picker-item {
      min-width: 0;
      height: $picker-item-height;
    }
    .picker-menu, .picker-sub-menu {
      li {
        @include text-overflow;
        position: relative;
        padding: 16px 15px;
        color: #666;
        font-size: 14px;
      }
    }
    .picker-menu {
      width: 120px;
      flex-basis: 120px;
      flex-grow: 0;
      flex-shrink: 0;
      background-color: #fff;

      li {
        text-align: center;
        &.active {
          position: relative;
          background-color: #f8f8f8;
          color: #333;
          font-weight: bold;
          &::before {
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background-color: #ffd400;
            content: "";
          }
        }
      }
    }
    .picker-sub-menu {
      flex-grow: 1;
      li {
        padding-right: 50px;

        &.active {
          color: #333;
          font-weight: bold;
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 20px;
            transform: translateY(-60%);
            width: 15px;
            height: 15px;
            background: url('../../assets/images/interface/picker-right.png') no-repeat;
            background-size: 100%;
          }
        }
      }
    }
  }
</style>
