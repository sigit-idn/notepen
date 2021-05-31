import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { addDataToAPI } from "../../../config/redux/action";

const Dashboard = (props) => {
  const [state, setState] = useState({
    userId: props.globalUser.uid,
    title: "",
    content: "",
    date: new Date().getTime(),
  });
  const changeHandler = (event) =>
    setState({ ...state, [event.target.id]: event.target.value });

    const postDataHandler = (event) => {
    event.preventDefault();
    props.postData(state);
  };
  return (
    <div>
      <h2>Dashboard Page</h2>
      <p>{props.globalUser.email}</p>
      <Form className="mb-3" onSubmit={postDataHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="title"
            onChange={changeHandler}
            type="text"
            placeholder="Enter title"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            id="content"
            onChange={changeHandler}
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>

      <hr />

      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Card Subtitle
          </Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

const globalState = (state) => ({
  globalUser: state.user,
});

const globalDispatch = (dispatch) => ({
  postData: (data) => dispatch(addDataToAPI(data)),
});

export default connect(globalState, globalDispatch)(Dashboard);
