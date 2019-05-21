<template>
  <page-wrap
    :gray-bg="true"
  >
    <div v-title>{{title}}</div>

    <page-header
      :hideTitle="true"
    >
      <topbar
        :type="'back'"
      >
        <template slot="title">{{title}}</template>
      </topbar>

      <company-list-filter
        @post-data="postDataEvent"
        @init-filter="initFilter"
        :api-fn="filterApi"
        :value="queryData"
      />
    </page-header>

    <page-main
      :has-go-back="true"
      :has-go-top="true"
      :show="show"
    >
      <list :api-fn="fetchData" :query-data="queryData" :forceRefresh="forceRefresh" class="list-page" :className="'ucompany-list'">
        <template slot-scope="{item}">
          <div class="ucompany-item">
            <router-link :to="{name: 'companyDetail', params: {id: item.companyId}}">
              <dl class="ucompany-hd">
                <dt>
                  <Img :crop-rule="'aspectFit'" :src="`http://7xp26u.com1.z0.glb.clouddn.com/${item.logo}`" alt=""/>
                </dt>
                <dd>
                  <p class="name">{{item.companyName}}</p>
                  <p class="attrs"> {{item.companySizeStr}} | {{item.establishYear}}年{{item.establishMonth}}月成立</p>
                  <div class="tags">
                    <div class="tag" v-for="tag in item.categoryList"><span>{{tag.categoryName}}</span></div>
                  </div>
                </dd>
              </dl>
            </router-link>
            <div class="ucompany-bd">
              <router-link :to="{name: 'companyDetail', params: {id: item.companyId}}">
                <div class="specialty">
                  <p><span class="label">服务</span>
                    <span>{{item.business}}</span>
                  </p>
                  <p><span class="label need">需求</span>
                    <span>{{item.needHelp}}</span>
                  </p>
                </div>
              </router-link>
              <div class="actions">
                <span>粉丝 {{item.fansCount}}</span>
                <span>合作留言 {{item.totalNum}}</span>
                <div class="btns">
                  <a href="#" class="btn btn-def" companyid="1084" data-flag="0" name="companyFollow"><i class="uricon-plus-w"></i><span>关注</span></a>
                  <a href="#" class="btn btn-primary-market" name="publishCompanyComment" companyid="1084" companyname="行业1"><i class="uricon-pinglun"></i><span>留言</span></a>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template slot="nodata">暂无相关查询结果</template>
      </list>
    </page-main>

  </page-wrap>
</template>

<script>
  import CompanyListFilter from './modules/CompanyListFilter';
  import List from 'component/list/List';
  import apiCompanyPortraitList from 'api/market/company/apiCompanyPortraitList';
  import apiCompanyRegister from 'api/market/company/apiCompanyRegister';
  import apiUWCompanySearchJson from 'api/market/company/apiUWCompanySearchJson';

  export default {
    data: () => {
      return {
        show: false,
        title: '企业列表',
        queryData: {},
        forceRefresh: false,
        filterApi: {
          registerCity: apiCompanyRegister,
          searchJson: apiUWCompanySearchJson
        }
      }
    },
    components: {
      CompanyListFilter,
      List
    },
    methods: {
      fetchData(data) {
        return apiCompanyPortraitList(data)
      },
      initFilter() {
        this.show = true;
      },
      postDataEvent(data) {
        this.queryData = data;
        // console.log('companyPortraitList: ', data);
      }
    },
    created() {
        // 测试初始化筛选
        // this.queryData = {registerProvince: "110000", cityCode: "440300", workStageId: "90160"};
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .scroll-wrapper.list-page {
    position: absolute;
    top: 45px;
    bottom: 0;
    width: 100%;
    height: auto;
  }

  .ucompany-list {
    padding: 10px 20px;
    li {
      @include padding-v(10px);
    }
  }

  .ucompany-item {
    background-color: #f2f2f2;
    border: 1px solid #fff;
    border-radius: 6px;
    box-shadow: 0 4px 20px rgba(159,159,159,.22);

    .ucompany-hd {
      display: flex;
      height: 92px;
      padding: 6px 8px;
      dt {
        overflow: hidden;
        width: 80px;
        height: 80px;
        flex-basis: 80px;
        flex-shrink: 0;
        flex-grow: 0;
        background-color: #fff;
        border-radius: 6px;
      }
      dd {
        min-width: 0;
        flex-grow: 1;
        padding-top: 4px;
        padding-left: 11px;
      }
    }
    .ucompany-bd {
      padding: 9px 11px 10px 12px;
      background-color: #fff;
    }
    .name {
      @include text-overflow;
      margin-bottom: 3px;
      color: #333;
      font-size: 14px;
      font-weight: bold;
    }
    .attrs {
      @include text-overflow;
      margin-bottom: 7px;
      color: #666;
      font-size: 12px;
    }
    .tags {
      @include clearfix;
      .tag {
        float: left;
        height: 15px;
        margin-right: 5px;
        @include padding-h(3px);
        color: #666;
        font-size: 12px;
        line-height: 16px;
        @include border(#ddd);
        &::before {
          border-radius: 3px;
        }
        span {
          display: block;
          transform: scale(.91667);
        }
      }
    }
    .specialty {
      font-size: 12px;
      line-height: 14px;
      .label {
        display: inline-block;
        margin-right: 7px;
        @include padding-h(3px);
        background-color: #86b0da;
        border-radius: 2px;
        color: #fff;
        vertical-align: bottom;
        &.need {
          background-color: #b3bec9;
        }
      }
      p {
        @include text-overflow;
        margin-bottom: 14px;
        &:first-child {
          margin-bottom: 9px;
        }
      }
    }
    .actions {
      @include clearfix;
      line-height: 24px;
      >span {
        float: left;
        margin-right: 18px;
        color: #999;
        font-size: 12px;
        &:last-of-type {
          margin-right: 0;
        }
      }
      .btns {
        float: right;
      }
      .btn {
        float: left;
        width: 58px;
        height: 24px;
        @include padding-h(0);
        border: none;
        border-radius: 24px;
        line-height: 24px;
        &:last-child {
          margin-left: 10px;
        }
        &.btn-def {
          background-color: #f2f2f2;
        }
        i {
          margin-right: 2px;
          font-size: 15px;
        }
        span {
          display: inline-block;
          transform: scale(.91667);
        }
      }
    }
  }
</style>
