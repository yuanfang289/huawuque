const passwordChange = (dispatch, values) => {
  dispatch({
    type:'PASSWORDCHANGE_SAGA',
    values
  });
}

const clear = (dispatch) => {
  dispatch({
    type:'CLEARREDU'
  });
}
export {
  passwordChange,
  clear
};