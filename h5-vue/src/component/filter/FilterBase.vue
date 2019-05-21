<template>
  <section class="filter-picker">
    <!--filter-tab-->
    <div class="filter-tab" ref="filterTab">
      <template v-for="tab in tabs">
        <!-- 菜单 -->
        <div
          v-if="!tab.sort"
          ref="tabMenu"
          class="filter-tab-item"
          :class="{active: showName === tab.name}"
          :style="menuWidthStyle"
          :key="tab.name"
        >
          <a href="javascript:;"
             class="filter-action"
             :class="{active: showName === tab.name}"
             :data-name="tab.name"
             @click="toggleTabHandler"
          >
            <span>{{tabsValues[tab.name] || tab.text}}</span>
            <i class="arrow uricon-arrow-dropdown"></i>
          </a>
        </div>
        <!-- /菜单 -->

        <!-- 排序 -->
        <div
          v-if="tab.sort"
          ref="tabSort"
          class="filter-tab-item is-sort"
          :class="{active: showName === tab.name}"
          :key="tab.name"
        >
          <a href="javascript:;"
             class="filter-action is-sort"
             :class="{active: showName === tab.name}"
             :data-name="tab.name"
             @click="toggleTabHandler"
          >
            <i class="uricon-sort"></i>
          </a>
        </div>
        <!-- /排序 -->
      </template>
    </div>
    <!--/filter-tab-->

    <!--filter-body-->
    <transition name="filter-fade" v-if="valueIsFormat">
      <div v-show="showName" class="filter-body">
        <template v-for="tab in tabs">
          <cascade-picker
            class="menu-item"
            v-show="showName === tab.name"
            v-if="!tab.sort"
            @post-data="postDataEvent"
            :show="showName === tab.name"
            :data="data[tab.name]"
            :data-name="tab.name"
            :key="tab.name"
            :post-name="tab.name"
            :class="{active: showName === tab.name}"
            :value="values[tab.name]"
          />

          <sort-picker
            class="sort-item"
            v-show="showName === tab.name"
            v-if="tab.sort"
            @post-data="postDataEvent"
            :data="data[tab.name]"
            :data-name="tab.name"
            :key="tab.name"
            :post-name="tab.name"
            :class="{active: showName === tab.name}"
            :value="values[tab.name]"
          />
        </template>
      </div>
    </transition>
    <!--/filter-body-->
  </section>
</template>

<script>

  import Vue from 'vue';
  import CascadePicker from 'component/picker/CascadePicker';
  import SortPicker from 'component/picker/SortPicker';

  /**
   * @property {object}    props.data           选项渲染数据
   * @property {array}     props.tabs           筛选tab的渲染数据
   * @property {object}    props.value          初始化已选项的参数
   * @property {object}    props.postName       定义postData的数据格式
   * @property {boolean}   props.useQueryParam  使用location查询参数，存取是查询条件
   */
  export default {
    props: {
      /**
       * 选项渲染数据
       *
       * @example
       * {
       *  register: [],
       *  orderType: []
       * }
       */
      data: {
        type: Object,
        required: true,
        default: () => {
          return {}
        }
      },
      /**
       * 筛选tab的渲染数据
       *
       * @desc 字段name，对应选项渲染数据的key
       * @example
       * [{
       *  text: '城市',
       *  name: 'register'
       * },
       * {
       *  sort: true,
       *  icon: 'uricon-sort',
       *  name: 'orderType'
       * }]
       */
      tabs: {
        type: Array,
        required: true,
        validator(value) {
          if (!value.length) return false;

          let check = true;
          for (let i = 0; i < value.length; i++) {
            let item = value[i];

            let checkSort = item.sort && (!item.icon || !item.name);
            let checkSelect = !item.sort && (!item.text || !item.name);

            if (checkSort || checkSelect) {
              console.warn('FilterBase: 格式错误的数据 -> ', JSON.stringify(item));
              check = false;
              break;
            }
          }

          return check
        }
      },
      /**
       * 初始化已选项的参数
       *
       * @desc 参数对象，不在postName中定义的name会被忽略
       * @example
       * {
       *  key: value,
       *  key2: value2,
       *  key3: value3
       * }
       */
      value: {
        type: Object,
        default: () => {
          return {}
        }
      },
      /**
       * postData数据的name
       *
       * @desc 参数对象的key，要和tabs的name对应
       * @desc 排序数组长度为1，选项数组长度为2
       * @example
       * {
       *  key: ['parentName', 'childName'],
       *  key2: ['name']
       * }
       */
      postName: {
        type: Object,
        required: true,
        default: () => {
          return {}
        },
        validator(value) {
          let check = true;
          for(let item in value) {
            if (!value.hasOwnProperty(item)) continue;
            if (Object.prototype.toString.call(value[item]) !== '[object Array]') {
              check = false;
              break;
            }
          }

          return check
        }
      },
      useQueryParam: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      /**
       * @property {string}   menuWidthStyle     菜单宽度样式
       * @property {string}   showName           显示的菜单的名称
       * @property {object}   values             初始化选择中的values
       */
      return {
        valueIsFormat: false,
        menuWidthStyle: '',
        showName: '',
        tabsValues: {},
        values: {},
        postData: {}
      }
    },
    components: {
      CascadePicker,
      SortPicker
    },
    methods: {
      postDataEvent(res) {
        let {
          name, data
        } = res;
        Vue.set(this.postData, name, data);

        this.updateTabValue(name, data);
        this.updateValues(name, data);

        // 延迟隐藏菜单，确保能看到选项被选中效果
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showName = '';
          this.maskInst && this.maskInst.hide();

          let postData = this.formatPostData();
          this.$emit('post-data', postData);

          if (!this.useQueryParam) return;

          // TODO 实时更改location.search，bug: 会刷新页面。 ZhangHaiBin
          //   this.$router.push({
          //     name: this.$route.name,
          //     query: postData
          //   })
        }, 50);
      },
      tabWidthStyle() {
        let menuRef = this.$refs.tabMenu;
        let sortRef = this.$refs.tabSort;
        let menuCount = menuRef.length;
        let sortCount = sortRef.length;
        let sortWidth = 0;
        let menuWidth = 0;
        let filterTabWidth = this.$refs.filterTab.clientWidth;

        if (sortCount) {
          sortWidth = sortRef[0].clientWidth;
        }

        menuWidth = (filterTabWidth - sortCount * sortWidth) / menuCount;
        this.menuWidthStyle = `width: ${menuWidth}px; flex-basis: ${menuWidth}px;`;
      },
      toggleTabHandler(e) {
        const {
          name
        } = e.currentTarget.dataset;

        if (this.showName === name) {
          this.showName = '';
          this.maskInst && this.maskInst.hide();
        } else {
          // 只有菜单没有显示，才会显示遮罩
          if (this.showName === '') {
            this.maskInst = this.$showMask({
              zIndex: 899,
              onHide: () => {
                this.showName = '';
              }
            });
          }

          this.showName = name;
        }
      },
      initTabValue() {
        let values = this.values;

        // 遍历初始value
        for (let prop in values) {
          if (!values.hasOwnProperty(prop)) continue;

          let tabName = '', name = prop;

          let postData = {};

          // values[key]
          let item = values[prop];
          let parentId, childId, isSort = false;

          // 获取初始化值
          if (item.length === 1) {
            isSort = true;
            parentId = item[0];
          } else {
            parentId = item[0];
            childId  = item[1];
          }

          // 遍历data Object，以获取对应初始id的文本
          for (let data in this.data) {
            if (!this.data.hasOwnProperty(data)) continue;
            if (data != prop) continue;

            // data[key]
            let dataArray = this.data[data];

            // 遍历data Array
            for (let i = 0; i < dataArray.length; i++) {
              let item = dataArray[i];

              // 排序菜单
              if (isSort) {
                if (parentId == item.id) {
                  tabName = item.name;

                  postData = {
                    sort: true,
                    id: parentId,
                    name: tabName
                  };
                  break
                }
                continue
              }

              if (parentId != item.id) continue;

              let parentName = item.name;
              let list = item.list;

              // 遍历child
              for (let j = 0; j < list.length; j++) {
                let child = list[j];

                if (childId != child.id) continue;

                tabName = child.name;

                // childName 等于全部，使用parentName
                let isAll = parentId == child.id;
                if (isAll) tabName = parentName;

                postData = {
                  isAll,
                  parentId: parentId,
                  parentName: parentName,
                  childId: childId,
                  childName: child.name
                };

                break
              }

              if (tabName) break
            }

            if (tabName) break
          }

          Vue.set(this.tabsValues, name, tabName);
          if (tabName) Vue.set(this.postData, name, postData);
        }

        this.valueIsFormat = true;

        // 初始化postData
        this.$emit('post-data', this.formatPostData());
      },
      updateTabValue(name, data) {

        // 排序菜单，不需要设置tab文本
        if (data.sort) return;

        let tabName = '';
        const {
          parentId, parentName,
          childId, childName
        } = data;

        if (parentId) {
          tabName = childName;

          // childName 等于全部，使用parentName
          if (parentId === childId) {
            tabName = parentName;
          }
        }

        Vue.set(this.tabsValues, name, tabName);
      },
      updateValues(name, data) {
        if (data.sort) {
          Vue.set(this.values, name, [data.id]);
          return
        }

        const {
          parentId, childId
        } = data;
        Vue.set(this.values, name, [parentId, childId])
      },
      formatPostData() {
        let postData = {};
        let postName = this.postName;

        // 去除Vue添加的get\set方法
        let data = JSON.parse(JSON.stringify(this.postData));

        for (let prop in data) {
          if (!data.hasOwnProperty(prop)) continue;
          let item = data[prop];

          // 排序菜单
          if (item.sort) {
            let name = postName[prop][0];
            postData[name] = item.id;
            continue
          }

          // 父级和子级选项中的，"全部"选项被选中时，不需要添加到postData中
          if (item.parentId === '') continue;

          // 选中子级中的"全部"，只返回parentId
          if (item.isAll) {
            let name = postName[prop][0];
            postData[name] = item.parentId;
          } else {
            let parentName = postName[prop][0];
            let childName  = postName[prop][1];
            postData[parentName] = item.parentId;
            postData[childName]  = item.childId;
          }
        }

        return postData;
      },
      initValues() {
        let values = {};
        let postName = this.postName;
        let value = this.useQueryParam ? this.$route.query : this.value;

        // 遍历postName
        for (let key in postName) {
          if (!postName.hasOwnProperty(key)) continue;
          let nameArray = postName[key];

          // 添加属性
          values[key] = [];

          nameArray.forEach((name, index) => {

            // 添加空数据
            values[key].push('');

            for (let valueKey in value) {
              if (!value.hasOwnProperty(valueKey)) continue;
              if (valueKey === name) {
                values[key][index] = value[valueKey];
                break
              }
            }
          });

          // 当初始化参数只有父级value值时，子菜单value值则与父级相同，(排序不用处理)
          if (values[key].length === 2 && values[key][0] && !values[key][1]) {
            values[key][1] = values[key][0];
          }

          // 清理没有值的数组
          if (values[key].length === 2) {
            if (!values[key][0] && !values[key][1]) values[key] = [];
          } else {
            if (!values[key][0]) values[key] = [];
          }

          // 如果只传入子菜单value值，则抛出错误
          if (!values[key][0] && values[key][1]) {
            throw new Error('找不到 "' + key + '" 对应的父级value值');
          }

          // Vue.set(this.values, key, values[key]);
        }

        this.values = values;

        this.initTabValue();
      }
    },
    mounted() {
      this.tabWidthStyle();
      this.initValues();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  $filter-tab-height: 36px;

  .filter-picker {
    position: relative;
    height: $filter-tab-height;
    background-color: #fff;

    .filter-tab {
      display: flex;
      height: $filter-tab-height;
    }
    .filter-tab-item {
      min-width: 0;
      flex-grow: 0;
      flex-shrink: 0;

      &.is-sort {
        width: 53px;
        flex-basis: 53px;
      }
    }

    .filter-action {
      position: relative;
      z-index: 1;
      display: block;
      height: 100%;
      padding: 8px 10px 8px 5px;
      color: #666;
      font-size: 13px;
      text-align: center;
      line-height: 20px;
      transition: all .2s;

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal!important;
        word-break: normal!important;
        margin-left: -10px;
        display: inline-block;
        vertical-align: bottom;
        max-width: calc(100% - 26px);
      }
      i {
        position: absolute;
        top: 50%;
        font-size: 17px;
        text-align: center;
        line-height: 1;
        transform-origin: 50% 50%;
      }

      &.active {
        color: #333;
        font-weight: bold;
        &:not(.is-sort) {
          i {
            color: #646464;
            transform: scale(.5) rotate(-180deg);
          }
        }
      }

      &.is-sort {
        color: #b3b3b3;
        &::before {
          position: absolute;
          top: 50%;
          left: 0;
          width: 1px;
          height: 40px;
          background-color: $border-def;
          transform: scale(.5) translateY(-50%);
          transform-origin: 0 0;
          content: "";
        }
        i {
          left: 50%;
          transform: translate(-50%, -50%);
        }

        &.active {
          color: #333;
          font-weight: bold;
        }
      }
      &:not(.is-sort) {
        i {
          width: 18px;
          height: 18px;
          margin-top: -9px;
          color: #b3b3b3;
          font-size: 18px;
          transform: scale(.5);
          transition: transform .3s;
        }
      }
    }

    .filter-body {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
    }
  }

  .filter-fade-enter-active, .filter-fade-leave-active {
    transition: .2s ease-in;
  }
  .filter-fade-enter, .filter-fade-leave-to {
    opacity: 0;
  }
</style>
