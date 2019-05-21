const getPostDetail = (dispatch, postId) => {
  dispatch({
    type: 'GETPOSTDETAIL_SAGA',
    postId,
  });
}
export { 
  getPostDetail
};