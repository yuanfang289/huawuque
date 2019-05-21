const getAvatar = (dispatch) => {
  dispatch({
    type: 'GETAVATAR_SAGA'
  });
}
export {
  getAvatar
};