<template>
  <page-main
    :show="show"
  >
    <div class="consult-list-item-wrapper">
      <list :api-fn="fetchData" :pageSize="10" class="list-page">
        <template slot-scope="{item}">
          <ConsultListItem :list="item"></ConsultListItem>
        </template>
      </list>
    </div>
  </page-main>
</template>

<script>
  import ServerError from 'component/ServerError';
  import List from 'component/list/List';
  import ConsultListItem from 'src/app/news/modules/ConsultListItem'
  import apiGetnewslistpageJson from 'api/consult/apiGetnewslistpageJson';

  export default {
    components: {
      ServerError,
      List,
      ConsultListItem
    },
    data: () => {
      return {
        show: false,
      }
    },
    methods: {
      fetchData(data) {
        return apiGetnewslistpageJson(data)
      },
    },
    created() {
      this.show = true;
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  .consult-list-item-wrapper {
    padding: 0 20px 20px;
  }
</style>
