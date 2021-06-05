import { Form, Button } from "react-bootstrap"

const InputForm = props => {
    const changeHandler = (event) =>
    props.setState({ ...props.state, [event.target.id]: event.target.value });
    return (
        <Form className="mb-3" {...props.rest}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="title"
            onChange={changeHandler}
            type="text"
            placeholder="Enter title"
            defaultValue={props.currentValue?.data.title}
            />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            id="content"
            onChange={changeHandler}
            as="textarea"
            rows={3}
            defaultValue={props.currentValue?.data.content}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    )
}

export default InputForm;