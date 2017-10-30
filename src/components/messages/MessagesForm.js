import React from 'react';

function MessagesForm({ handleSubmit, handleChange, users, message }) {
  return (
    <div className="row">
      <div className="col-sm-12">

        <form
          onSubmit={handleSubmit}
          className="form-horizontal">

          {/* <div className="form-group">
            <select
              name="to" value={message.to}
              onChange={handleChange}
              className="form-control">
              {users.map(user =>
                <option key={user.id}
                  value={user.id}>{user.username}</option>)}
            </select>
          </div> */}

          <div className="form-group">
            <div className="col-sm-10">
              <textarea
                name="text"
                value={message.text}
                onChange={handleChange}
                className="form-control">
              </textarea>
            </div>
            <button className="btn btn-default col-sm-2">
              <i className="fa fa-paper-plane-o btn"></i>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default MessagesForm;
