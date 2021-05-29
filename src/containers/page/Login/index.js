import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import firebase from "../../../config/firebase";

const Login = ({popupProps}) => {
  const [state, setState] = useState({ email: "", password: "" });
  const [notif, setNotif] = useState("");

  const handleChangeText = (event) =>
    setState({ ...state, [event.target.type]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then((success) => console.log(success))
      .catch((error) => setNotif(error.message));
  };


  return (
    <Form className="col-md-5">
        <h1>Login Page</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={handleChangeText}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={handleChangeText}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      { notif && <Card body className="mt-3 mb-3" variant="primary">{notif}</Card>}
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>

    </Form>
  );
};

const reduxState = state => ({
    popupProps : state.popup
})

export default connect(reduxState, null)(Login);
