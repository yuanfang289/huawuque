import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import { message } from 'antd';
import { fetchPasswordChange } from '../servers/setting';

function* fetchPasswordChangeFun(action) {
  const data = yield call(fetchPasswordChange, action);
  if(data.code === 500) {
    message.error(data.error);
    return;
  }
  yield put({
    type: 'SETTINGREDU',
    data
  });
}

function* settingSaga() {
  yield takeLatest('PASSWORDCHANGE_SAGA', fetchPasswordChangeFun);
}

export default settingSaga;