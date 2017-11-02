import React from 'react';

function MessagesForm({ handleSubmit, handleChange, message }) {

  return (
    <div className="row">
      <div className="col-sm-12">

        <form
          onSubmit={handleSubmit}
          className="form-horizontal">

          <div className="form-group">
            <div className="text-area">
              <textarea
                name="text"
                value={message.text}
                onChange={handleChange}
                className="form-control">
              </textarea>
            </div>
            <button className="btn btn-default message-send" disabled={!message.text}>
              <i className="fa fa-paper-plane-o btn"></i>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default MessagesForm;
