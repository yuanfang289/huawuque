const register = (dispatch, values) => {
  dispatch({
    type:'REGISTER_SAGA',
    values
  });
}

const clear = (dispatch) => {
  dispatch({
    type:'CLEARREDU'
  });
}

const clearCode = (dispatch) => {
  dispatch({
    type:'CLEARCODEREDU'
  });
}

const updatePassword = (dispatch, values) => {
  dispatch({
    type:'UPDATEPASSWORD_SAGA',
    values
  });
}

const login = (dispatch, values) => {
  dispatch({
    type:'LOGIN_SAGA',
    values
  });
}

const tips = (dispatch, tipsArray) => {
  dispatch({
    type: 'SEND_TIPS',
    tipsArray
  });
}

const getCode = (dispatch, number, phone) => {
  dispatch({
    type: 'GET_CODE_SAGA',
    number,
    phone
  });
}

export {
  register,
  clear,
  updatePassword,
  login,
  tips,
  getCode,
  clearCode
};