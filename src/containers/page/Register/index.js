import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { registerUserAPI } from "../../../config/redux/action";

const Register = props => {
  const [state, setState] = useState({ email: "", password: "" });

  const handleChangeText = (event) =>
    setState({ ...state, [event.target.type]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    const {email, password} = state;
    props.registerAPI({email, password});
    setState({ email: "", password: "" })
  };

  return (
    <Form className="col-md-5" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={state.email}
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
          value={state.password}
          onChange={handleChangeText}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      { props.globalProps.notification && <Card body className="mt-3 mb-3" variant="primary">{props.globalProps.notification}</Card>}
      <Button variant="primary" type="submit" disabled={props.globalProps.isLoading}>
        Register
      </Button>
    </Form>
  );
};

const globalState = (state) => ({globalProps : state})
const globalDispatch = dispatch => ({
    registerAPI : (data) => dispatch(registerUserAPI(data))
})

export default connect(globalState, globalDispatch)(Register);
