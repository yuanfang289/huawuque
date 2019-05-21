const getData = (dispatch, count) => {
  dispatch({
    type:'GETDATA_SAGA',
    count
  });
}

const clear = (dispatch) => {
  dispatch({
    type: 'CLEARREDU'
  });
}

const clearListData = (dispatch) => {
  dispatch({
    type: 'CLEARLISTDATAREDU'
  })
}

export {
  getData,
  clear,
  clearListData
};