import React ,{useState, useContext} from "react";

function Modal(props) {

    const {note, handleChange, handleSubmit}=props;

  return (
    <div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit note
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              
                <div class="mb-3">
                  <label for="title" class="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="etitle"
                    name="etitle"
                    placeholder="Enter title here"
                    onChange={handleChange}
                    value={note.etitle}
                  />
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">
                    Text
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Enter note here"
                    onChange={handleChange}
                    value={note.edescription}
                  />
                </div>
                <div class="mb-3">
                  <label for="title" class="form-label">
                    Tag(optional)
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Enter tag here"
                    onChange={handleChange}
                    value={note.etag}
                  />
                </div>
              </div>
            
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit} disabled={note.etitle.length<3 || note.edescription.length<3}>
                Save changes
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Modal;
