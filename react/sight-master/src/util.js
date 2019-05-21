const userTips = {
  userRedu: undefined,
  clearCode: undefined,
  history: undefined,
  clear: undefined,
  dispatch: undefined,
  alertMessage: function() {
    const { code } = this.userRedu;
    if(code === 400) {
      this.clearCode(this.dispatch);
    } else if(code === 200) {
      setTimeout(() => {
        this.clear(this.dispatch);
        this.history.push('/');
      }, 500);
    }
  }
}
export { userTips };