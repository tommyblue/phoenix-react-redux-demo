import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showDocuments, saveNewDocument, updateDocument, deleteDocument } from '../actions';
import DocumentsList from '../components/DocumentsList.jsx';

class DocumentsTable extends Component {
  constructor(props) {
    super(props);
    this.onRefreshClick = this.onRefreshClick.bind(this);
    this.onSaveNewDocument = this.onSaveNewDocument.bind(this);
    this.onUpdateDocument = this.onUpdateDocument.bind(this);
    this.onDeleteDocument = this.onDeleteDocument.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(showDocuments());
  }

  onRefreshClick(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(showDocuments());
  }

  onSaveNewDocument(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(saveNewDocument(e.target.title.value));
  }

  onUpdateDocument(id, title) {
    const { dispatch } = this.props;
    dispatch(updateDocument(id, title));
  }

  onDeleteDocument(id) {
    const { dispatch } = this.props;
    dispatch(deleteDocument(id));
  }

  render() {
    return (<DocumentsList
      documents={this.props.documents}
      isLoading={this.props.isLoading}
      onRefreshClick={this.onRefreshClick}
      onSaveNewDocument={this.onSaveNewDocument}
      onUpdateDocument={this.onUpdateDocument}
      onDeleteDocument={this.onDeleteDocument}
    />);
  }
}

DocumentsTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  documents: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    isLoading: state.isLoading,
    documents: state.documents,
  }
);

export default connect(mapStateToProps)(DocumentsTable);
