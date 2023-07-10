import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { myHeadersTokenPhoto, userProfile } from "../redux/actions/userAction";


function RegisterPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const profile = useSelector((state) => state.login.profile && state.login.profile[0]);
    const idProfile = profile?.id ?? null;


    console.log(profile)
    const navigation = useNavigate();


    const visibility = location.pathname !== "/register" ? "d-none" : "d-block"
    const disabled = location.pathname === "/register" ? false : true
    const photoformVisibility = location.pathname !== "/profile" ? "d-none" : "d-block"
    let fd = new FormData()
    let imgData = null
    const API_URL_SEND_PHOTO = `http://localhost:8080/app/users/${idProfile}/image`



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

                alert("foto aggiunta" + response.url + fd.get("file").name)
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

        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        });
    }
    const handleSubmit = async (event) => {

        console.log(event)
        event.preventDefault();
        console.log(registerForm)



        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerForm)
            });

            if (response.ok) {
                console.log("Registrazione avvenuta con successo");
                alert("Registrazione avviata con successo");
                resetForm();
                navigation("/LogIn");
            } else {
                console.log("Errore durante la registrazione " + registerForm);
                alert("Errore durante la registrazione");

            }
        } catch (error) {
            console.log("Si è verificato un errore durante la richiesta di registrazione");
            alert(error);
        }

    };





    return (
        <Container className="w-100">
            <Form onSubmit={handleSubmit} className="w-75 w-xl-50 mx-auto">
                <div class={`{text-center w-75 ${photoformVisibility} `}>
                    <label for="formFileLg " class="form-label">Foto</label>
                    <span className=""><input onChange={handleFile} class="form-control form-control-sm mx-2" id="formFileLg" type="file" name="image"></input>
                        <Button onClick={(e) => sendPhotoUser(e)}>Invia</Button>
                    </span>
                </div>
                <Form.Group className="mb-3  " controlId="exampleForm.ControlInputNome">
                    <Form.Label className="fw-bolder ">Nome</Form.Label>
                    <Form.Control type="text" placeholder="Mario" required plaintext className="border rounded  color-placeholder px-3"
                        autoFocus
                        name="nome"
                        value={registerForm.nome}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputCognome">
                    <Form.Label className="fw-bolder ">Cognome</Form.Label>
                    <Form.Control type="text" placeholder="Rossi" plaintext required className="border rounded color-placeholder px-3"
                        name="cognome"
                        value={registerForm.cognome}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputEmail">
                    <Form.Label className="fw-bolder ">Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" required plaintext className="border rounded  color-placeholder px-3"
                        name="email"
                        value={registerForm.email}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputUsername">
                    <Form.Label className="fw-bolder ">Username</Form.Label>
                    <Form.Control type="text" placeholder="mario.r" required plaintext className="border rounded  color-placeholder px-3"
                        name="userName"
                        value={registerForm.userName}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputPassword">
                    <Form.Label className="fw-bolder ">Password</Form.Label>
                    <Form.Control type="password" disabled={disabled} placeholder="password" required plaintext className="border rounded  color-placeholder px-3"
                        name="password"
                        value={registerForm.password}
                        onChange={handleChange}
                        style={{ color: disabled ? 'gray' : 'white' }} />
                </Form.Group>
                <button type="submit" className={`${visibility} m-2 button }`}>Register</button>
                <button type="submit" className={`${location.pathname == "profile" ? "d-block" : "d-none"}m-2 button`}>Modifica</button>
                <button type="reset" value="Reset Form" className="m-2 button" onClick={() => resetForm()}>Reset</button>
            </Form>




        </Container>
    )
}

export default RegisterPage;
