import Vue from 'vue';

import dom from 'lib/utils/dom';
Vue.use(dom);

import vueCookies from 'vue-cookies';
Vue.use(vueCookies);

import getSystemInfo from 'lib/utils/getSystemInfo';
Vue.use(getSystemInfo);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload);

import Toast from 'lib/toast';
Vue.use(Toast);

import xyDialog from 'lib/dialog';
Vue.use(xyDialog);

import Mask from 'lib/mask';
Vue.use(Mask);

import PopupLoading from 'lib/loading';
Vue.use(PopupLoading);

import NationalCode from 'component/nationalCode';
Vue.use(NationalCode);
