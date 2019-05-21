import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { message } from 'antd';
import { fetchAvatar, fetchUploadImages, fetchUploadAvatar, fetchImages, fetchSignOut } from '../servers/personal';

function* fetchFirstImagesFun(action) {
  let data = yield call(fetchImages, action);
  if(data.code === 500) {
    message.error(data.error);
    return;
  }
  yield put({
    type: 'PERSONALREDU',
    data,
  });
}

function* fetchUploadAvatarFun(action) {
  yield put({
    type: 'CHANGE_SPIN'
  });
  const data = yield call(fetchUploadAvatar, action);
  if(data.code === 500) {
    yield put({
      type: 'CANCEL_SPIN'
    });
    message.error(data.error);
    return;
  }
  message.success('上传成功');
  data.isShowSpin = false;
  yield put({
    type: 'PERSONALREDU',
    data,
  });
}

function* fetchImagesFun(action) {
  let images = yield call(fetchImages, action);
  if(images.code === 500) {
    message.error(images.error);
    return;
  }
  let data = {};
  data.listData = images.listData;
  data.total = images.total;
  data.count = images.count;
  yield put({
    type: 'PERSONALREDU',
    data,
  });
}

function* fetchSignOutFun(action) {
  let data = yield call(fetchSignOut);
  data = JSON.parse(data);
  yield put({
    type: 'CLEARREDU',
    data,
  });
  action.history.push('/');
}

function* personalSaga() {
  yield takeLatest('GETFIRSTIMAGES_SAGA', fetchFirstImagesFun);
  yield takeLatest('UPLOADAVATAR_SAGA', fetchUploadAvatarFun);
  yield takeLatest('GETIMAGES_SAGA', fetchImagesFun);
  yield takeLatest('SIGNOUT_SAGA', fetchSignOutFun);
}

export default personalSaga;