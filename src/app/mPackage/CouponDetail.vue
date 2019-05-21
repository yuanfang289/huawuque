<template>
  <page-wrap class="page-coupon-detail">
    <title v-title>{{title}}</title>
    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>
    <main id="main" class="station-main">
        <div class="title-info">
            <div class="left">
                <span class="price"> <span class="icon">¥</span>55</span>
            </div>
            <div class="line-row"></div>
            <div class="right">
                <h4>会员赠送会议室券</h4>
                <p>2019.03.03-2019.04.30</p>
            </div>
        </div>
        
    </main>
  </page-wrap>
</template>

<script>
  export default {
    data: () => {
      return {
        show: false,
        title:'代金券'
      }
    },
    methods: {
    },
    created() {
      setTimeout(() => {
        this.show = true;
      }, 200)
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  .page-coupon-detail{
      background: #f5f5f5;
  }
  #main{
      padding: 20px;
      .title-info{
          height: 89px;
          padding: 18px 0;
          background: #FFFFFF;
          box-shadow: 0 5px 10px 0 rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .left{
              width: 85px;
              height: 100%;
              font-family: PingFangSC-Semibold;
              color: #FF6C00;
              font-weight: 600;
              display: flex;
              align-items: center;
              justify-content: center;
            .price{
                font-size: 25px;
                position: relative;
                .icon{
                    font-size: 12px;
                    position: absolute;
                    bottom: 5px;
                    left: -10px;
                }
            }
          }
          .line-row{
            height: 100%;
            width: 1px;
            background: #f5f5f5;
          }
          .right{

          }
      }
  }
</style>
