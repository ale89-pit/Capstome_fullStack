import { Button, Col, Form, Row } from "react-bootstrap"

function LogIn() {
    return (
        <Form className="w-50" >
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2" className="fw-bolder">
                    UserName
                </Form.Label>
                <Col sm="10">
                    <Form.Control defaultValue="email@example.com"
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2" className="fw-bolder">
                    Password
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="password" placeholder="Password" />
                </Col>
            </Form.Group>
            <Button>Login</Button>
            <Button>Reset</Button>
        </Form>
    )
}

export default LogIn