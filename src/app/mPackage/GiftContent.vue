<template>
  <page-wrap class="page-main">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
       <div style="padding: 15px" v-html="data.context">
          <!--<div class="img">-->
            <!--<img class="img" :src="data.image" onerror="javascript:this.src='https://assets.urwork.cn/image/g_def.png';">-->
          <!--</div>-->
       </div>
    </page-main>

  </page-wrap>
</template>

<script>
  import apiSelectGiftById from 'api/mPackage/apiSelectGiftById';
  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        title: '详情',
        data:'',
        giftId:''
      }
    },
    methods:{
       getContent() {
         apiSelectGiftById({id:this.giftId}).then(res=>{
             this.show = true;
             this.data = res;
         })
       }
    },
    created() {
        this.title = this.$route.query.giftId.split("_")[2];
        this.giftId = this.$route.query.giftId.split("_")[0];
        this.getContent();
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .page-main{
    background-color: #f8f8f8;
  }
</style>


