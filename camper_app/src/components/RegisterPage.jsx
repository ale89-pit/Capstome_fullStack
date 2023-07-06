import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function RegisterPage() {

    const navigation = useNavigate();
    const [registerForm, setRegisterForm] = useState({
        nome: "",
        cognome: "",
        userName: "",
        email: "",
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
                    <Form.Control type="text" placeholder="mario.r" required plaintext className="border color-placeholder px-3"
                        name="userName"
                        value={registerForm.userName}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputPassword">
                    <Form.Label className="fw-bolder ">Password</Form.Label>
                    <Form.Control type="password" placeholder="password" required plaintext className="border rounded  color-placeholder px-3"
                        name="password"
                        value={registerForm.password}
                        onChange={handleChange} />
                </Form.Group>
                <button type="submit" className="m-2 button">Register</button>
                <button type="reset" value="Reset Form" className="m-2 button" onClick={() => resetForm()}>Reset</button>
            </Form>




        </Container>
    )
}

export default RegisterPage;
