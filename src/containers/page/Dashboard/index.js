import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

const Dashboard = (props) => {
  return (
    <div>
      <h2>Dashboard Page</h2>
      <p>{props.globalUser}</p>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

const globalState = (state) => ({
  globalUser: state.user,
});

const globalDispatch = (dispatch) => {};

export default connect(globalState, globalDispatch)(Dashboard);
