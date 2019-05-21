<template>
  <page-wrap
    :error="error"
    :hasDownloadBar="false"
  >
    <div v-title>{{title}}</div>

    <page-header
    >
      <topbar
        :type="'back'"
        :hideShareBtn="true"
      >
        <template slot="title">{{title}}</template>
      </topbar>

    </page-header>

    <page-main
      :show="show"
    >
      <div class="course-list-item-wrapper">
        <list :api-fn="fetchData" :pageSize="10" class="list-page">
          <template slot-scope="{item}">
            <CourseListItem :list="item"></CourseListItem>
          </template>
        </list>
      </div>
    </page-main>

  </page-wrap>

</template>

<script>
  import List from 'component/list/List';
  import CourseListItem from 'app/classroom/modules/CourseListItem';
  import apiSubjectList from 'api/classroom/apiSubjectList';

  export default {
    components: {
      List,
      CourseListItem
    },
    data: () => {
      return {
        show: false,
        error: false,
        title: '课程列表',
      }
    },
    methods: {
      fetchData(data) {
        return apiSubjectList(data)
      }
    },
    created() {
      this.show = true;
    },
    mounted() {

    },
  }
</script>

<style lang="scss" scoped>
  .course-list-item-wrapper {
    padding: 0 20px;
  }
</style>
