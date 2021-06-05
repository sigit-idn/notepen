import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import InputForm from "../InputForm";

const Edit = (props) => {
  const [state, setState] = useState({
    // userId: props.userData.uid,
    title: "",
    content: "",
    date: new Date().getTime(),
  });


  const updateDataHandler = () => {}

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Edit</h4>

        <InputForm
          currentValue={props.data}
          state={state}
          setState={setState}
          onSubmit={updateDataHandler}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Edit;
