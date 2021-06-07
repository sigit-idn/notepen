import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import InputForm from "../InputForm";
import { connect } from "react-redux";
import { updateDataAPI } from "../../../config/redux/action";

const Edit = (props) => {
  const [state, setState] = useState({
    id: props.data?.id,
    title: props.data?.data?.title,
    content: props.data?.data?.content,
    date: new Date().getTime(),
  });

  const updateDataHandler = (event) => {
    event.preventDefault();
    props.updateAPI(state)
  }

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Note
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputForm
          currentValue={props.data}
          state={state}
          setState={setState}
          onSubmit={updateDataHandler}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const globalDispatch = (data) => dispatch => ({
  updateAPI : data => dispatch(updateDataAPI(data))
})

export default connect(null, globalDispatch)(Edit);
