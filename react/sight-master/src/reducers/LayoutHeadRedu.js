const initialState = {
  userName: false,
  avatar: '//downfuture.com/user.png'
};
const LayoutHeadRedu = (state = initialState, action) => {
  switch(action.type) {
    case 'LAYOUTHEADREDU':
      return Object.assign({}, state, action.datas);
    break;
    default:
      return state;
  }
}
export default LayoutHeadRedu;