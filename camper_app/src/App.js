import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import { Col, Container, Row } from "react-bootstrap";

import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import DetailsFacility from "./components/DetailsFacility";

import NavBar from "./components/NavBar";
import Jumbotron from "./components/Jumbotron";
import ModifyFacility from "./components/ModifyFacility";
import NotFound from "./components/NotFound";
import ProfilePage from "./components/ProfilePage";
import FacilityForm from "./components/FacilityForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container fluid className="w-100 m-0 p-0">
          <Row className="backGround size mb-5">
            <Col fluid className=" m-0">
              <NavBar />

              <Routes>
                <Route path="/" element={<Jumbotron />} />
              </Routes>
            </Col>
          </Row>

          <Row>
            <Col>
              <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/logIn" element={<LogIn />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<FacilityForm />} />
                <Route path="/add/:id" element={<ModifyFacility />} />
                <Route path="/details/:id" element={<DetailsFacility />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Col>
          </Row>
          <Row>
            <Col className="w-100 bg-light">
              <Footer></Footer>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
