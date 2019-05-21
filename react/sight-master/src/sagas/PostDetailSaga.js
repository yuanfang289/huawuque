import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import { message } from 'antd';
import { fetchGetPostDetail } from '../servers/postDetail';

function* fetchPostDetailFun(action) {
  let detail = yield call(fetchGetPostDetail, action.postId);
  if(detail.code === 500) {
    message.error(detail.error);
    return;
  }
  detail = detail.list;
  let list = {};
  ({ list: list.userAvatar = detail.avatar, list: list.browse = detail.browse, list: list.classification = detail.classification, list: list.editor_value = detail.editor_value, list: list.reply = detail.reply, list: list.theme = detail.theme, list: list.user = detail.user, list: list.time = detail.time } = {});
  yield put({
    type: 'POSTDETAILREDU',
    list,
  });
}

function* postDetailSaga() {
  yield takeLatest('GETPOSTDETAIL_SAGA', fetchPostDetailFun);
}

export default postDetailSaga;