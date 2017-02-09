const isLoading = (state = false, action) => {
  switch (action.type) {
    case 'LOADING_DOCUMENTS':
    case 'SAVING_DOCUMENTS':
    case 'DELETING_DOCUMENT':
      return true;
    case 'RECEIVE_DOCUMENTS':
      return false;
    default:
      return state;
  }
};

export default isLoading;
