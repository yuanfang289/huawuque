import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects';

import { fetchAvatar } from '../servers/detail';

function* fetchAvatarFun(action) {
  
}

function* detailSaga() {
  yield takeLatest('GETDETAILAVATAR_SAGA', fetchAvatarFun);
}

export default detailSaga;