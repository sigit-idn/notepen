import { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { loginUserAPI } from "../../../config/redux/action";

const Login = (props) => {
  const [state, setState] = useState({ email: "", password: "" });
  useEffect(() => console.log(state.email))

  const handleChangeText = (event) =>
    setState({ ...state, [event.target.type]: event.target.value });

  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await props.actionLogin(state).catch((err) => err);

    if (response) {
        localStorage.setItem("user", JSON.stringify(response))
      history.push("/");
      setState({ email: "", password: "" });
    }
};

// document.dispatchEvent(new Event('change', {}))

  return (
    <Form className="col-md-5" onSubmit={handleSubmit}>
      <h1>Login Page</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={state.email}
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
          value={state.password}
          onChange={handleChangeText}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      {props.notificationProps && (
        <Card body className="mt-3 mb-3" variant="primary">
          {props.notificationProps}
        </Card>
      )}
      <Button variant="primary" type="submit" disabled={props.isLoadingProps}>
        {props.isLoadingProps ? "Loading" : "Login"}
      </Button>
    </Form>
  );
};

const globalState = (state) => ({
  popupProps: state.popup,
  globalUser : state.user,
  notificationProps: state.notification,
  isLoadingProps: state.isLoading,
});

const globalDispatch = (dispatch) => ({
  actionLogin: (data) => dispatch(loginUserAPI(data)),
});

export default connect(globalState, globalDispatch)(Login);
