import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import { message } from 'antd';
import { fetchCreateTheme, fetchGetPost } from '../servers/post';

function* fetchGetPostFun(action) {
  let lists = yield call(fetchGetPost, action.count, action.selectValue);
  if(lists.code === 500) {
    message.error(lists.error);
    return;
  }
  yield put({
    type: 'POSTREDU',
    lists
  });
}

function* fetchPostDatasFun(action) {
  let lists = yield call(fetchGetPost, action.count, action.selectValue);
  if(lists.code === 500) {
    message.error(lists.error);
    return;
  }
  yield put({
    type: 'POSTREDU',
    lists
  }); 
}

function* fetchCreateThemeFun(action) {
  let data = yield call(fetchCreateTheme, action.datas);
  if(data.code === 500) {
    message.error(data.error);
    return;
  }
  yield put({
    type: 'POSTREDU',
    data
  });
}

function* fetchUpdateSelectFun(action) {
  let editorSelectValue = action.editorSelectValue;
  let postRedu = action.postRedu;
  postRedu.editorSelectValue = editorSelectValue;
  yield put({
    type: 'UPDATEREDU',
    postRedu
  });
}

function* fetchUpdateInputThemeFun(action) {
  let inputThemeValue = action.inputThemeValue;
  let postRedu = action.postRedu;
  postRedu.inputThemeValue = inputThemeValue;
  yield put({
    type: 'UPDATEREDU',
    postRedu
  });
}

function* fetchClearCodeFun(action) {
  if(action.style === 2) {
    action.postRedu.code = 0;
  } else {
    action.postRedu.code = 0;
    action.postRedu.inputThemeValue = '';
    action.postRedu.editorValue = '';
    action.postRedu.editorSelectValue = 'unclassified';
  }
  let postRedu = action.postRedu;
  yield put({
    type: 'CLEARREDU',
    postRedu
  });
}

function* fetchUpdateEditorFun(action) {
  let datas = {};
  let editorValue = action.content;
  datas.editorValue = editorValue;
  yield put({
    type: 'UPDATEEDITOR',
    datas
  }); 
}

function* postSaga() {
  yield takeLatest('GETPOST_SAGA', fetchGetPostFun);
  yield takeLatest('CREATETHEME_SAGA', fetchCreateThemeFun);
  yield takeLatest('UPDATESELECT_SAGA', fetchUpdateSelectFun);
  yield takeLatest('UPDATEINPUTTHEME_SAGA', fetchUpdateInputThemeFun);
  yield takeLatest('CLEARCODE_SAGA', fetchClearCodeFun);
  yield takeLatest('GETPOSTDATAS_SAGA', fetchPostDatasFun);
  yield takeLatest('EDITORVALUE_SAGA', fetchUpdateEditorFun);
}

export default postSaga;