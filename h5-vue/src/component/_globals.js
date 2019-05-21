import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
  // 其组件目录的相对路径
  './base',
  // 是否查询其子目录
  true,
  /\.(vue|js)$/
);

// For each matching file name...
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      fileName
      // 提取文件名
        .replace(/^\.\/[a-z]*\/?(.*)\.\w+$/, '$1')
    )
  );
  // 全局注册组件
  // 如果这个组件选项是通过 `export default` 导出的，
  // 那么就会优先使用 `.default`，
  // 否则回退到使用模块的根。
  Vue.component(componentName, componentConfig.default || componentConfig)
});
