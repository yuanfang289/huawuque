const getPost = (dispatch, count, selectValue) => {
  dispatch({
    type: 'GETPOST_SAGA',
    count,
    selectValue
  });
}

const getPostDatas = (dispatch, count, selectValue) => {
  dispatch({
    type: 'GETPOSTDATAS_SAGA',
    count,
    selectValue
  }); 
}

const createTheme = (dispatch, datas) => {
  dispatch({
    type: 'CREATETHEME_SAGA',
    datas
  });
}

const saveSelectValue = (dispatch, editorSelectValue, postRedu) => {
  dispatch({
    type: 'UPDATESELECT_SAGA',
    editorSelectValue,
    postRedu
  }); 
}

const saveinputThemeValue = (dispatch, inputThemeValue, postRedu) => {
  dispatch({
    type: 'UPDATEINPUTTHEME_SAGA',
    inputThemeValue,
    postRedu
  }); 
}

const clearCode = (dispatch, postRedu, style) => {
  dispatch({
    type: 'CLEARCODE_SAGA',
    postRedu,
    style
  });
}

const updateEditorValue = (dispatch, content) => {
  dispatch({
    type: 'EDITORVALUE_SAGA',
    content
  });
}
export {
  getPost,
  createTheme,
  saveSelectValue,
  saveinputThemeValue,
  clearCode,
  getPostDatas,
  updateEditorValue
};