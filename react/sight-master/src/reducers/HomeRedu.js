import { combineReducers } from 'redux';
const initialState = {
  count: 0,
  listData: [],
  total: 0,
  code: 0,
  message: '',
  isRender: false
};

const changeState = {
  code: 0,
  message: ''
};

const clearListData = {
  listData: [],
  isRender: true
};

const homeRedu = (state = initialState, action) => {
  switch(action.type) {
    case 'GETDATA':
      return Object.assign({}, state, action.datas);
    break;
    case 'CLEARREDU':
      return Object.assign({}, state, changeState);
    case 'CLEARLISTDATAREDU':
      return Object.assign({}, state, clearListData);
    default:
      return state;
  }
}
/*const reducers = combineReducers({
  homeRedu
});
export default reducers;*/
export default homeRedu;