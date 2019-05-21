import { call, put, takeEvery } from 'redux-saga/effects';
import { message } from 'antd';
import { fetchData, fetchIsLogin } from '../servers/home';

function* fetchDataFun(action) {
  const datas = yield call(fetchData, action);
  if(datas.code === 500) {
    message.error(datas.error);
    return;
  }
  datas.isRender = false;
  yield put({
    type: "GETDATA",
    datas
  });
}

function* homeSaga() {
  yield takeEvery("GETDATA_SAGA", fetchDataFun);
}

export default homeSaga;