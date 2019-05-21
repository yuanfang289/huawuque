import { call, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import { fetchAvatar } from '../servers/layoutHead';

function* fetchAvatarFun(action) {
  let datas = yield call(fetchAvatar);
  if(datas.code === 500) {
    message.error(datas.error);
    return;
  }
  yield put({
    type: 'LAYOUTHEADREDU',
    datas,
  });
}

function* layoutHeadSaga() {
  yield takeLatest('GETAVATAR_SAGA', fetchAvatarFun);
}

export default layoutHeadSaga;