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
      <div class="video-list-item-wrapper">
        <list :api-fn="fetchData" :pageSize="10" class="list-page">
          <template slot-scope="{item}">
            <VideoListItem :data="item"></VideoListItem>
          </template>
        </list>
      </div>
      <div class="publish-video-wrapper" v-if="show" ref="publish">
        <a href="/companyVideo/uploadPage" class="publish-video-btn"><i class="uricon-plus-w"></i>发视频</a>
      </div>
    </page-main>

  </page-wrap>

</template>

<script>
  import List from 'component/list/List';
  import VideoListItem from 'src/app/video/modules/VideoListItem'
  import {getDocumentRect} from 'utils/dom';
  import apiGetVideoList from 'api/video/apiGetVideoList';

  export default {
    components: {
      List,
      VideoListItem
    },
    data: () => {
      return {
        show: false,
        error: false,
        title: '视频show',
        oldScrollTop: 0,            //  之前的scrollTop值
      }
    },
    methods: {
      fetchData(data) {
        return apiGetVideoList(data)
      },
      scrollFn() {
        let {
          scrollTop
        } = getDocumentRect();

        let publishDom = this.$refs.publish;

        if(this.oldScrollTop >= scrollTop) {
          this.$removeClassName(publishDom, 'out')
        } else {
          this.$addClassName(publishDom, 'out')
        }

        if(scrollTop <= 10) {
          this.$removeClassName(publishDom, 'out')
        }

        this.oldScrollTop = scrollTop;
      }
    },
    created() {
      this.show = true;
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('scroll',this.scrollFn);
      });
    },
    destroyed() {
      window.removeEventListener('scroll',this.scrollFn);
    }
  }
</script>

<style lang="scss" scoped>
  .video-list-item-wrapper {
    padding: 0 20px 20px;
  }
  .publish-video-wrapper {
    position: fixed;
    z-index: 100;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    transition: bottom .2s;
    &.out {
      bottom: -100px;
    }
  }
  .publish-video-btn {
    display: block;
    height: 42px;
    line-height: 42px;
    background: #FFD53D;
    border-radius: 42px;
    font-size: 16px;
    text-align: center;
    padding: 0 25px;
  }
</style>
