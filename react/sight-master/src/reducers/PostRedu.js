const initialState = {
  buttons: [
    {
      name: '最新',
      type: 'new',
      total: 0
    },
    {
      name: '未读',
      type: 'unread',
      total: 0
    }
  ],
  editorSelectValue: 'unclassified',
  inputThemeValue: '',
  editorValue: '',
  selectValue: 'all',
  code: 0,
  lists: [],
  count: 30,
  total: 0
};
const postRedu = (state = initialState, action) => {
  switch(action.type) {
    case 'POSTREDU':
      return Object.assign({}, state, action.data, action.lists);
    break;
    case 'THEMEREDU': 
      return Object.assign({}, state, action.data);
    case 'UPDATEREDU':
      return Object.assign({}, state, action.postRedu);
    case 'CLEARREDU':
      return Object.assign({}, state, action.postRedu);
    case 'UPDATEEDITOR':
      return Object.assign({}, state, action.datas);
    default:
      return state;
  }
}
export default postRedu;