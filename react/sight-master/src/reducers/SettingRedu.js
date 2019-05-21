const initialState = {
  code: 0,
  message: '',
  isgo: true
};

const changeState = {
  code: 0,
  message: ''
};
const settingRedu = (state = initialState, action) => {
  switch(action.type) {
    case 'SETTINGREDU':
      return Object.assign({}, state, action.data);
    break;
    case 'CLEARREDU':
      return Object.assign({}, state, changeState);
    default:
      return state;
  }
}
export default settingRedu;