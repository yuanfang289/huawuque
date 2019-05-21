const initialState = {
  list: {
    browse: 0,
    classification: 'unclassified',
    editor_value: '',
    reply: 0,
    theme: '',
    user: ''
  }
};
const postRedu = (state = initialState, action) => {
  switch(action.type) {
    case 'POSTDETAILREDU':
      return Object.assign({}, state, action.list);
    break;
    default:
      return state;
  }
}
export default postRedu;