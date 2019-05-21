<template>
  <page-wrap class="page-wrapper">
    <title v-title>未找到相关页面</title>

    <page-header
      :is-fixed="true"
    >
      <topbar
        :type="'back'"
        :theme="'transDef'"
      ></topbar>
    </page-header>

    <page-main :show="true">
      <div class="title">
        <h2>很抱歉！您访问的页面不存在...</h2>
      </div>
      <div class="main">
        <div class="desc">
          <h3>您可以：</h3>
          <ol>
            <li>1、检查刚才的输入</li>
            <li>2、试试选择重新打开或者返回上一页</li>
            <li>3、访问本站其他内容</li>
          </ol>
        </div>
      </div>
    </page-main>

  </page-wrap>
</template>

<style lang="scss" scoped>
  .main {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: url("../assets/images/interface/404/404.png") no-repeat 50% 55%;
    background-size: 90%;
  }
  .title {
    position: absolute;
    bottom: 75%;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 170px;
    background: url("../assets/images/interface/404/cloud-404.png") no-repeat 50% 50%;
    background-size: 75%;
    &::before {
      display: block;
      padding-top: 38.6667%;
      content: "";
    }

    h2 {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      color: #666;
      font-size: 18px;
      text-align: center;
    }
  }
  .desc {
    position: absolute;
    left: 50%;
    bottom: 0;
    height: 170px;
    transform: translateX(-50%);
    color: #666;
    font-size: 15px;
    line-height: 30px;
    white-space: nowrap;
    h3 {
      font-weight: bold;
    }
  }
</style>
