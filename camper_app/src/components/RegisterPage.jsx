import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { myHeadersToken, myHeadersTokenPhoto, userProfile } from "../redux/actions/userAction";


function RegisterPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const profile = useSelector((state) => state.login.profile && state.login.profile[0]);
    const idProfile = profile?.id ?? null;


    console.log(profile)
    const navigation = useNavigate();


    const [showModalImage, setshowModalImage] = useState(false);
    const visibility = location.pathname !== "/register" ? "d-none" : "d-block"
    const disabled = location.pathname === "/register" ? false : true
    const photoformVisibility = location.pathname !== "/register" ? "cursor-pointer" : ""
    const title = location.pathname !== "/register" ? "Modifica account" : "Crea il tuo Account!!"
    let fd = new FormData()
    let imgData = null
    const API_URL_SEND_PHOTO = `http://localhost:8080/app/users/${idProfile}/image`
    const API_URL_MODIFY_USER = `http://localhost:8080/app/users/${idProfile}`


    const handlerShowImage = () => {
        setshowModalImage(true);
    };
    const handleClose = () => {


        setshowModalImage(false);
    };

    const handleFile = (e) => {
        imgData = e.target.files[0];

        fd.append("image", imgData)
    }

    const sendPhotoUser = async (e) => {
        console.log(fd)
        e.preventDefault();
        try {
            const response = await fetch(API_URL_SEND_PHOTO, {
                method: "POST",
                headers: myHeadersTokenPhoto,
                body: fd,
                redirect: "follow",
            })
            if (response.ok) {

                dispatch(userProfile(profile.userName))

                alert("foto aggiunta")
            } else if (response.status === 417) {
                alert("nome file gia esistente")
            } else if (response.status === 500) {
                alert("file troppo grande")
                alert("errore fetch")
            }
        } catch (error) {

        }
    }

    const [registerForm, setRegisterForm] = useState({
        nome: location.pathname !== "/register" ? profile?.nome : "",
        cognome: location.pathname !== "/register" ? profile?.cognome : "",
        userName: location.pathname !== "/register" ? profile?.userName : "",
        email: location.pathname !== "/register" ? profile?.email : "",
        password: ""
    });
    const resetForm = () => {
        setRegisterForm({
            nome: "",
            cognome: "",
            userName: "",
            email: "",
            password: ""
        })
    }
    const handleChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerForm)
            });
            console.log("Response status:", response.status);
            if (response.ok) {
                console.log("Registrazione avvenuta con successo");
                alert("Registrazione avviata con successo");
                navigation("/LogIn");
                //  dispatch(resetForm());
            } else {
                console.log("Errore durante la registrazione " + registerForm);
                alert("Errore durante la registrazione");

            }
        } catch (error) {
            console.log("Si è verificato un errore durante la richiesta di registrazione");
            alert(error);
        }
    }



    const modifyUser = async () => {
        console.log(registerForm);
        try {
            const response = await fetch(API_URL_MODIFY_USER, {
                method: "PUT",
                headers: myHeadersToken,
                body: JSON.stringify(registerForm)
            });

            if (response.ok) {
                console.log("User Aggiornato con Successo");
                alert("User Aggiornato con Successo");
                dispatch(userProfile(profile.userName));


            } else {
                console.log("Errore durante la modifica " + registerForm);
                alert("Errore durante la modifica");

            }
        } catch (error) {
            console.log("Si è verificato un errore durante la richiesta di modifica");
            alert(error);
        }
    }


    return (
        <Container fluid className=" my-5 px-0 bgRoad">
            < Row >
                <Col className="col-12 col-md-6 col-lg-3  mx-auto my-5">


                    <div className="user_card ">
                        <div className="d-flex justify-content-center">
                            <div onClick={handlerShowImage} className={`${photoformVisibility} brand_logo_container`}>
                                <img src={location.pathname !== "/register" ?
                                    (profile.photoProfile ? profile.photoProfile : "./AddUser.png") : "./AddUser.png"} className="brand_logo" alt="Logo" title="Foto profilo" />

                            </div>
                        </div>


                        <div className="d-flex justify-content-center form_container">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control
                                 input_user"
                                        required plaintext
                                        placeholder="nome" name="nome"
                                        value={registerForm.nome}
                                        onChange={handleChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control input_user"
                                        required plaintext placeholder="cognome"
                                        name="cognome"
                                        value={registerForm.cognome}
                                        onChange={handleChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-at"></i></span>
                                    </div>
                                    <input type="email" className="form-control input_user"
                                        required plaintext
                                        placeholder="email"
                                        name="email"
                                        value={registerForm.email}
                                        onChange={handleChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control input_user"
                                        required plaintext placeholder="username"
                                        name="userName"
                                        value={registerForm.userName}
                                        onChange={handleChange} />
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control input_pass"
                                        required plaintext
                                        placeholder="password"
                                        name="password"
                                        value={registerForm.password}
                                        disabled={disabled}
                                        onChange={handleChange}
                                        style={{
                                            backgroundColor: disabled ? 'gray' : 'white',
                                            color: disabled ? 'gray' : 'black',
                                        }}
                                    />
                                </div>

                                <div className="d-flex justify-content-center my-3 login_container">

                                    <button type="submit" className={`${visibility} btn login_btn my-2`}>Register</button>

                                </div>
                            </form>
                            <div className="d-flex justify-content-center login_container mb-3">
                                <button onClick={modifyUser} className={`${location.pathname !== "/profile" ? "d-none" : "d-block"} btn login_btn my-2`}>Modifica</button>
                                {/* <button type="reset" value="Reset Form" className="m-2 btn btn-warning" onClick={() => resetForm()}>Reset</button> */}
                            </div>
                        </div>

                        <div className="mt-4">

                        </div>

                    </div>

                </Col>




            </Row >
            <Modal show={showModalImage} onHide={handleClose}>
                <Form className=" mx-auto">
                    <Modal.Header closeButton>
                        <Modal.Title>Aggiungi la tua foto profilo!!!</Modal.Title>
                    </Modal.Header>
                    <span className="d-flex">
                        <input onChange={handleFile} className="form-control form-control-sm mx-2" id="formFileLg" type="file" name="image">

                        </input>

                    </span>

                    <Modal.Footer>
                        <Button className="btn login_btn w-25" onClick={(e) => sendPhotoUser(e)}>Invia</Button>
                        <Button
                            variant="secondary"
                            className="text-start"
                            onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container >
    )
}

export default RegisterPage;
