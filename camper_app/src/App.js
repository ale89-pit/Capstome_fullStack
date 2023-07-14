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
import Preferences from "./components/Preferences";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container fluid className=" position-relative">
          <Row className="backGround size ">
            <Col className="">
              <NavBar />

              <Routes>
                <Route path="/" element={<Jumbotron />} />
              </Routes>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col className="w-100 mt-5 ">
              <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/logIn" element={<LogIn />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/" element={<Home />} />
                <Route path="/preferences" element={<Preferences />} />
                <Route path="/add" element={<FacilityForm />} />
                <Route path="/add/:id" element={<ModifyFacility />} />
                <Route path="/details/:id" element={<DetailsFacility />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Col>
          </Row>
          <Row>
            <Col className="w-100 bg-light ">
              <Footer></Footer>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
