import { useEffect, useState } from "react";
import { Modal, Button, Card, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { addDataToAPI, getDataFromAPI, deleteDataAPI } from "../../../config/redux/action";
import Edit from "../../organisms/Edit";
import InputForm from "../../organisms/InputForm";

const Dashboard = (props) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [state, setState] = useState({
    userId: userData.uid,
    title: "",
    content: "",
    date: new Date().getTime(),
  });
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editData, setEditData] = useState('');
  const posts = props.globalNotes;

  useEffect(() => props.getData(userData.uid), []);

  const postDataHandler = (event) => {
    event.preventDefault();
    props.postData(state);
  };

  return (
    <div>
      <h2>Dashboard Page</h2>
      <p>{userData.email}</p>
      <InputForm state={state} setState={setState} onSubmit={postDataHandler} />

      <hr />
      <Row>
        {posts.map((post) => (
            <Card
              style={{ width: "18rem" }}
              className="mr-3 mb-3"
              key={post.id}
            >
              <Card.Body>
                <Card.Title>{post.data.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {new Date(post.data.date).toLocaleString()}
                </Card.Subtitle>
                <Card.Text>{post.data.content}</Card.Text>
                <Button onClick={() => setShowEdit(true) & setEditData(post)}>Edit</Button>
                <Button variant="danger" className="ml-1" onClick={() => setShowDeleteDialog(true) & setEditData(post)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
        ))}
      </Row>
<Edit
  show={showEdit}
  onHide={() => setShowEdit(false)}
  data={editData}
/>

<Modal centered show={showDeleteDialog}>
  <Modal.Body>
    <p>Are you sure to delete note ?</p>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
    <Button variant="danger" onClick={event => event.preventDefault() & props.deleteData(editData) & setShowDeleteDialog(false)}>Delete</Button>
  </Modal.Footer>
</Modal>
    </div>
  );
};

const globalState = (state) => ({
  globalUser: state.user,
  globalNotes: state.notes,
});

const globalDispatch = (dispatch) => ({
  postData: (data) => dispatch(addDataToAPI(data)),
  getData: (data) => dispatch(getDataFromAPI(data)),
  deleteData: data => dispatch(deleteDataAPI(data))
});

export default connect(globalState, globalDispatch)(Dashboard);
