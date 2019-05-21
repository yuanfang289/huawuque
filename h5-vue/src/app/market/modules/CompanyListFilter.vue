<template>
  <filter-base
    v-if="show"
    @post-data="postDataEvent"
    :tabs="tabs"
    :post-name="postName"
    :data="data"
    :value="value"
  />
</template>

<script>
  import Vue from 'vue';
  import FilterBase from 'component/filter/FilterBase';

  export default {
    components: {
      FilterBase
    },
    props: {
      apiFn: {
        type: Object,
        required: true,
        validator(value) {
          const keys = Object.keys(value);
          return keys.includes('registerCity') && keys.includes('searchJson')
        }
      },
      value: {
        type: Object
      }
    },
    data: () => {
      return {
        show: false,
        tabs: [
          {
            text: '城市',
            name: 'register'
          },
          {
            text: '社区',
            name: 'workstage'
          },
          {
            text: '行业',
            name: 'category'
          },
          {
            sort: true,
            icon: 'uricon-sort',
            name: 'orderType'
          }
        ],
        postName: {
          register: ['registerProvince', 'registerCity'],
          workstage: ['cityCode', 'workStageId'],
          category: ['categoryParent', 'typeId'],
          orderType: ['orderType']
        },
        data: {}
      }
    },
    methods: {
      initFilter() {
        this.show = true;
        this.$emit('init-filter');
      },
      fetchData() {
        const apis = this.apiFn;

        // TODO 显式声明，明确请求顺序
        let promiseArray = [
          apis.registerCity(),
          apis.searchJson()
        ];

        Promise.all(promiseArray).then(res => {
          const searchJson = res[1];

          let register  = res[0] || [],
              workstage = searchJson.workstage || {},
              category  = searchJson.category  || {};

          // 直辖市
          let charteredCities = ['110000', '120000', '310000', '500000'];

          // 格式化注册地数据
          let retRegister = [{
            id: '',
            name: '全部',
            list: [{
              id: '',
              name: '全部城市'
            }]
          }];

          register.forEach(item => {
            let id   = item.geoCode;
            let name = item.geoName;
            let list = [];

            const isChartered = charteredCities.indexOf(id) > -1;
            if (!isChartered) {
              list.push({
                id,
                name: '全部'
              });
            }

            item.cities.forEach(city => {
              list.push({
                id: city.geoCode,
                name: city.geoName
              })
            });

            retRegister.push({
              id,
              name,
              list
            });
          });

          // 格式化社区数据
          let retWorkstage = [{
            id: '',
            name: '全部',
            list: [{
              id: '',
              name: '全部社区'
            }]
          }];

          for (let prop in workstage) {
            let item = workstage[prop] || [];
            let id   = item[0].cityCode;
            let name = prop;
            let list = [];

            list.push({
              id,
              name: '全部'
            });

            item.forEach(item => {
              list.push({
                id: item.id,
                name: item.stageName
              })
            });

            retWorkstage.push({
              id,
              name,
              list
            });
          }

          // 格式化行业分类数据
          let retCategory = [{
            id: '',
            name: '全部',
            list: [{
              id: '',
              name: '全部行业'
            }]
          }];

          for (let prop in category) {
            if (!category.hasOwnProperty(prop)) continue;

            let item = category[prop] || [];
            let id = item[0].categoryParent;
            let name = prop;
            let list = [];

            list.push({
              id,
              name: '全部'
            });

            item.forEach(item => {
              list.push({
                id: item.id,
                name: item.categoryName
              })
            });

            retCategory.push({
              id,
              name,
              list
            });
          }

          // 格式化排序数据

          let retOrderType = [{
            id: 1,
            name: '综合排序'
          }, {
            id: 2,
            name: '加入时间'
          }, {
            id: 3,
            name: '最新留言'
          }];

          Vue.set(this.data, 'register' , retRegister);
          Vue.set(this.data, 'workstage', retWorkstage);
          Vue.set(this.data, 'category' , retCategory);
          Vue.set(this.data, 'orderType', retOrderType);

          this.initFilter();
        });
      },
      postDataEvent(data) {
        this.$emit('post-data', data);
      }
    },
    created() {
      this.fetchData();
    }
  }
</script>
