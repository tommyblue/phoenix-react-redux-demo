import fetch from 'isomorphic-fetch';

function loadingDocuments() {
  return {
    type: 'LOADING_DOCUMENTS',
    isLoading: true,
  };
}

function savingDocument() {
  return {
    type: 'SAVING_DOCUMENT',
    isLoading: true,
  };
}

function deletingDocument() {
  return {
    type: 'DELETING_DOCUMENT',
    isLoading: true,
  };
}

function receiveDocuments(json) {
  return {
    type: 'RECEIVE_DOCUMENTS',
    documents: json.documents,
    isLoading: false,
  };
}

export function showDocuments() {
  return (dispatch) => {
    dispatch(loadingDocuments());
    return fetch('http://localhost:4000/api/v1/documents')
    .then(response => response.json())
    .then(json => dispatch(receiveDocuments(json)));
  };
}

export function saveNewDocument(title) {
  return (dispatch) => {
    dispatch(savingDocument());
    return fetch('http://localhost:4000/api/v1/documents', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          title,
        },
      }),
    })
    .then(() => {
      dispatch(showDocuments());
    });
  };
}

export function updateDocument(id, title) {
  return (dispatch) => {
    dispatch(savingDocument());
    return fetch(`http://localhost:4000/api/v1/documents/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          id,
          title,
        },
      }),
    })
    .then(() => {
      dispatch(showDocuments());
    });
  };
}

export function deleteDocument(id) {
  return (dispatch) => {
    dispatch(deletingDocument());
    return fetch(`http://localhost:4000/api/v1/documents/${id}`, {
      method: 'DELETE',
    }).then(() => dispatch(showDocuments()));
  };
}
