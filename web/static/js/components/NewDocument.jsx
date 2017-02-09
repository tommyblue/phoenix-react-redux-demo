import React, { PropTypes } from 'react';

const NewDocument = ({ onSaveNewDocument }) => (
  <form onSubmit={onSaveNewDocument}>
    <h2 className="title">Create new document</h2>
    Document title:
    <p className="control has-addons">
      <input className="input" name="title" />
      <button className="button is-primary" type="submit">Save</button>
    </p>
  </form>
);

NewDocument.propTypes = {
  onSaveNewDocument: PropTypes.func.isRequired,
};

export default NewDocument;
