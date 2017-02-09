const documents = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_DOCUMENTS':
      return action.documents;
    default:
      return state;
  }
};

export default documents;
