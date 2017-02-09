import React, { PropTypes, Component } from 'react';

class Document extends Component {
  constructor(props) {
    super(props);
    this.toggleShowEditForm = this.toggleShowEditForm.bind(this);
    this.renderDocument = this.renderDocument.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.state = { showEditForm: false };
  }

  toggleShowEditForm() {
    this.setState({ showEditForm: !this.state.showEditForm });
  }

  saveForm(e) {
    e.preventDefault();
    this.toggleShowEditForm();
    this.props.onUpdateDocument(this.props.id, e.target.title.value);
  }

  deleteDocument(e) {
    e.preventDefault();
    this.props.onDeleteDocument(this.props.id);
  }

  renderDocument() {
    return (
      <tr>
        <td>#{this.props.id.substr(0, 8)}</td>
        <td>{this.props.title}</td>
        <td>
          <button
            className="button is-small is-outlined"
            onClick={this.toggleShowEditForm}
          >Edit</button>
          &nbsp;
          <button
            className="button is-small is-outlined is-danger"
            onClick={this.deleteDocument}
          >Delete</button>
        </td>
      </tr>
    );
  }

  renderForm() {
    return (
      <tr>
        <td colSpan="3">
          <form onSubmit={this.saveForm}>
            <p className="control has-addons">
              <input className="input is-small" name="title" defaultValue={this.props.title} />
              <button className="button is-small is-outlined is-success" type="submit">Save</button>
            </p>
          </form>
        </td>
      </tr>
    );
  }

  render() {
    return this.state.showEditForm ? this.renderForm() : this.renderDocument();
  }
}

Document.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onUpdateDocument: PropTypes.func.isRequired,
  onDeleteDocument: PropTypes.func.isRequired,
};

export default Document;
