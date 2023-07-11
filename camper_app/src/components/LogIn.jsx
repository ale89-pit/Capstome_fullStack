import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
    handlePassword,
    handleUser,
    handleLogin,
    logInThunk
} from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function LogIn() {

    const dispatch = useDispatch();
    const login = useSelector((state) => state.user)
    const isLogged = useSelector((state) => state.login.isLogged)
    const navigate = useNavigate();
    useEffect(() => {

    }, [isLogged])
    return (
        <Container>
            <Row>
                <Col className="col-12 col-md-6 col-lg-4 mx-auto mb-5">
                    <Form className="w-100 mx-auto cardRegister"
                        onSubmit={(e) => {
                            e.preventDefault()
                            console.log(login)
                            dispatch(logInThunk(login))
                            if (!isLogged) {
                                navigate('/')
                            }

                        }} >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInputUsername">
                            <Form.Label className="fw-bolder">Username</Form.Label>
                            <Form.Control type="text" placeholder="mario.r" required plaintext className="border  color-placeholder px-3 w-50 mx-auto"
                                name="userName"
                                // value={registerForm.userName}
                                onChange={(e) => dispatch(handleUser(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInputPassword">
                            <Form.Label className="fw-bolder ">Password</Form.Label>
                            <Form.Control type="password" placeholder="password" required plaintext className="border rounded  color-placeholder px-3 w-50 mx-auto"
                                name="password"
                                // value={registerForm.password}
                                onChange={(e) => dispatch(handlePassword(e.target.value))}
                            />
                        </Form.Group>
                        <button type="submit" className="m-2 btn btn-success">Login</button>
                        <button type="reset" value="Reset Form" className="m-2 btn btn-warning" >Reset</button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LogIn