const initialState = {
  listData: [],
  total: 0,
  count: 0,
  code: 0,
  avatar: '//img.downfuture.com/images/user.png-avatar',
  userName: false,
  isShowSpin: false,
};

const CHANGE_SPIN = {
  isShowSpin: true,
};

const CANCEL_SPIN = {
  isShowSpin: false,
};
const userRedu = (state = initialState, action) => {
  switch(action.type) {
    case 'PERSONALREDU':
      return Object.assign({}, state, action.data);
    break;
    case 'CLEARREDU':
      return Object.assign({}, state, action.data);
    case 'CHANGE_SPIN':
      return Object.assign({}, state, CHANGE_SPIN);
    case 'CANCEL_SPIN':
      return Object.assign({}, state, CANCEL_SPIN);
    default:
      return state;
  }
}
export default userRedu;