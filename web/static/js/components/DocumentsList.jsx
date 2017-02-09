import React, { PropTypes } from 'react';
import Document from './Document.jsx';
import NewDocument from './NewDocument.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

const DocumentsList = (
{ documents, isLoading, onRefreshClick,
  onSaveNewDocument, onUpdateDocument, onDeleteDocument,
}) => (
  <div>
    <button className="button is-info is-medium" onClick={onRefreshClick}>Refresh</button>
    <h2 className="title">Documents:</h2>
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {documents.map(document =>
          <Document
            key={document.id}
            onUpdateDocument={onUpdateDocument}
            onDeleteDocument={onDeleteDocument}
            {...document}
          />,
        )}
      </tbody>
    </table>
    <NewDocument onSaveNewDocument={onSaveNewDocument} />
    <LoadingSpinner isLoading={isLoading} />
  </div>
);

DocumentsList.propTypes = {
  onRefreshClick: PropTypes.func.isRequired,
  onSaveNewDocument: PropTypes.func.isRequired,
  onUpdateDocument: PropTypes.func.isRequired,
  onDeleteDocument: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default DocumentsList;
