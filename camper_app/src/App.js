import logo from "./logo.svg";
import "./App.css";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import FacilityForm from "./components/FacilityForm";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container fluid className="w-100">
          <Row>
            <Col>
              <NavBar />
            </Col>
          </Row>
          <Row>
            <Col>
              <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/logIn" element={<LogIn />} />
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<FacilityForm />} />
              </Routes>
            </Col>
          </Row>
          <Row>
            <Col className="fixed-bottom">
              <Footer></Footer>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
