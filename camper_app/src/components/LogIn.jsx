import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
    handlePassword,
    handleUser,
    handleLogin,
    logInThunk
} from "../redux/actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function LogIn() {

    const dispatch = useDispatch();
    const login = useSelector((state) => state.user)
    const isLogged = useSelector((state) => state.login.isLogged)
    const navigate = useNavigate();
    
    const [showModalError, setShowModalError] = useState(false);

    const handleClose = () => {
        
        setShowModalError(false);
        
    };
        
           
      
    


    useEffect(() => {

    }, [isLogged])
    return (
        <Container fluid className="my-5 mx-0 bgRoad">
            <Row>
                  <Col className="col-12 col-md-6 col-lg-4 mx-auto my-5">
                        <div className="user_card ">
                            <div className="d-flex justify-content-center">
                                <div className="brand_logo_container">
                                    <img src="./logo.jpg" className="brand_logo" alt="Logo" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center form_container">
                                <form onSubmit={async (e) => {
                                    e.preventDefault()
                                    
                              let status = await dispatch(logInThunk(login))
                              console.log(status===400)
                              if(status === 400 || status ===500){
                                setShowModalError(true);
                                }else if(status === 200){ {
                                    navigate('/')
                          }
                                }}}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" className="form-control input_user"
                                        required plaintext placeholder="username" name="userName"
                                            // value={registerForm.password}
                                            onChange={(e) => dispatch(handleUser(e.target.value))} />
                                    </div>
                                    <div className="input-group mb-2">
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <input type="password" className="form-control input_pass" 
                                        required plaintext placeholder="password" name="password"
                                            // value={registerForm.password}
                                            onChange={(e) => dispatch(handlePassword(e.target.value))} />
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                            <label className="custom-control-label" for="customControlInline">Remember me</label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-3 login_container">
                                        <button type="submit" className="btn login_btn">Login</button>
            
                                    </div>
                                </form>
                            </div>
            
                            <div className="mt-4">
                                <div className="d-flex justify-content-center links">
                                    Don't have an account? <Link to={"/register"} className="ml-2">Sign Up</Link>
                                </div>
                                <div className="d-flex justify-content-center links">
                                    <a href="#">Forgot your password?</a>
                                </div>
                            </div>
                        </div>
                  
                        </Col> 
            </Row>
            <Modal show={showModalError} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Qualcosa è andato Storto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Credenziali non valide
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                   
                        
                    </Modal.Footer>
                </Modal>
        </Container>
    )
}

export default LogIn




// <Form className="w-100 mx-auto cardRegister"
// onSubmit={(e) => {
//     e.preventDefault()
//     console.log(login)
//     dispatch(logInThunk(login))
//     if (!isLogged) {
//         navigate('/')
//     }
    
// }} >
// <Form.Group className="mb-3" controlId="exampleForm.ControlInputUsername">
//     <Form.Label className="fw-bolder">Username</Form.Label>
//     <Form.Control type="text" placeholder="mario.r" required plaintext className="border  color-placeholder px-3 w-50 mx-auto"
//         name="userName"
//         // value={registerForm.userName}
//         onChange={(e) => dispatch(handleUser(e.target.value))}
//     />
// </Form.Group>

// <Form.Group className="mb-3" controlId="exampleForm.ControlInputPassword">
//     <Form.Label className="fw-bolder ">Password</Form.Label>
//     <Form.Control type="password" placeholder="password" required plaintext className="border rounded  color-placeholder px-3 w-50 mx-auto"
//         name="password"
//         // value={registerForm.password}
//         onChange={(e) => dispatch(handlePassword(e.target.value))}
//     />
//     </Form.Group>
//     <button type="submit" className="btn login_btn">Login</button>
//     <button type="reset" value="Reset Form" className="m-2 btn btn-warning" >Reset</button>
//     </Form>