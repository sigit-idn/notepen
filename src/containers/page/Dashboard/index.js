import { useEffect, useState } from "react";
import { Form, Button, Card, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { addDataToAPI, getDataFromAPI } from "../../../config/redux/action";

const Dashboard = (props) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [state, setState] = useState({
    userId: userData.uid,
    title: "",
    content: "",
    date: new Date().getTime(),
  });
  const posts = props.globalNotes;

  useEffect(() => {
      console.log("2");
    props.getData(userData.uid)
  }, []);

  console.log(posts);

  const changeHandler = (event) =>
    setState({ ...state, [event.target.id]: event.target.value });

  const postDataHandler = (event) => {
    event.preventDefault();
    props.postData(state);
  };
  return (
    <div>
      <h2>Dashboard Page</h2>
      <p>{userData.email}</p>
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
      <Row>
        {posts.map((post) => (
          <Card style={{ width: "18rem" }} className="mr-3 mb-3">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {new Date(post.date).toLocaleString()}
              </Card.Subtitle>
              <Card.Text>{post.content}</Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        ))}
      </Row>
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
});

export default connect(globalState, globalDispatch)(Dashboard);
