import { Badge, Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHouseFloodWaterCircleArrowRight, FaPlugCircleBolt, FaRestroom, FaShower } from "react-icons/fa6"
import { HiWifi } from "react-icons/hi"
import { GrUserPolice } from "react-icons/gr"
import { BsShop } from "react-icons/bs"
import { GiFoundryBucket } from "react-icons/gi"
import { FaTruckDroplet } from "react-icons/fa6"
import { AiFillHeart, AiFillHome, AiFillStar, AiOutlineHeart, AiOutlineStar, AiTwotonePhone } from "react-icons/ai"
import { BiMessageDetail } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux";
import { myHeadersToken, userProfile } from "../redux/actions/userAction";

import { ImMail3 } from "react-icons/im";
import { useState } from "react";
import RatingStar from "./RatingStar";
function SingleCardFacility({ facProp }) {
  //gli passo le propieta di ogni struttura per mostrarle nalla home
  const API_URL_ADD_REMOVE_PREFERENCE = "http://localhost:8080/app/users/"
  const API_URL_SEND_COMMENT = "http://localhost:8080/app/comments";

  const isLogged = useSelector((state) => state.login.isLogged);
  const profile = useSelector((state) => state.login.profile) || [];
  const user_id = profile.length > 0 ? profile[0]?.id : null;
  const userName = profile.length > 0 ? profile[0]?.userName : null;
  const preferences = profile.length > 0 ? profile[0]?.preference : null;
  const dispatch = useDispatch();

  const [formComment, setFormComment] = useState({
    user_id: user_id,

    facility_id: facProp.id,

    title: "",

    body: "",
  });

  const [showModalError, setShowModalError] = useState(false);

  const averageRating = facProp.average;

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShowModalError(false);

  };
  const handleShow = () => {
    if (!isLogged) {
      setShowModalError(true);
    } else {
      setShow(true);
    }
  };


  const handleChange = (event) => {
    setFormComment({
      ...formComment,
      [event.target.name]: event.target.value,
    });
  };


  const addToPreference = async () => {
    try {
      let response = await fetch(API_URL_ADD_REMOVE_PREFERENCE + user_id + "/" + facProp.id, {
        method: "PUT",
        headers: myHeadersToken,
        redirect: "follow",
      })
      if (response.ok) {

        dispatch(userProfile(userName))
      } else {
        alert("errore")
      }

    } catch (error) {

    }
  }

  const removeFromPreference = async () => {
    try {
      let response = await fetch(API_URL_ADD_REMOVE_PREFERENCE + user_id + "/" + facProp.id, {
        method: "DELETE",
        headers: myHeadersToken,
        redirect: "follow",
      })
      if (response.ok) {

        dispatch(userProfile(userName))
      } else {
        alert("errore")
      }

    } catch (error) {

    }
  }

  const sendComment = async (e) => {
    e.preventDefault();
    console.log(formComment);
    try {
      let response = await fetch(API_URL_SEND_COMMENT, {
        method: "POST",
        headers: myHeadersToken,
        body: JSON.stringify(formComment),
        redirect: "follow",
      });
      if (response.ok) {
        setShow(false)
        alert("commento inviato");
        setFormComment({
          user_id: user_id,

          facility_id: facProp.id,

          title: "",

          body: "",
        });
      } else {
        alert("fetch fallita");
      }
    } catch (error) {
      console.log("error", error);
    }
  };



  return (
    <>
      <Col className="col-12  mx-auto ">
        {/* my-4 pb-4 */}
        <Card className=" card-shadow singleCard">
          <Row className="d-flex align-items-center">
            <Col className="col-12 col-md-2" >

              <Link to={"/details/" + facProp.id}>     <img className="w-100 imgSingleCard align-self-center justify-content-center" variant="top" src={facProp.cover} /></Link>



            </Col >
            <Col className="col-12 col-md-10 ">
              <Card.Body className="w-100">
                <Row>
                  <Col className="d-flex justify-content-between">
                    <Link to={"/details/" + facProp.id}> <h5>{facProp.name}</h5> </Link>
                    <span>
                      <BiMessageDetail onClick={handleShow} className="cursor-pointer" title="commenta" />



                      {preferences && preferences.some((element) => element.id === facProp.id) ? (
                        <AiFillHeart
                          onClick={isLogged ? removeFromPreference : handleShow}
                          className="cursor-pointer text-danger"
                          title="remove from preference"
                        />
                      ) : (
                        <AiOutlineHeart
                          onClick={isLogged ? addToPreference : handleShow}
                          className="cursor-pointer "
                          title="add to preference"
                        />
                      )}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex align-items-center">

                    <h6 className="my-1 mx-2">{facProp.address.comune.name}</h6><Badge className=" my-1">{facProp.address.comune.provincename.sign}</Badge>
                  </Col>
                </Row>
                <Row>
                  <Col className="">
                    <Card.Text className="font-size overflow-scroll text-break my-1" style={{ maxHeight: '100px' }}>
                      {facProp.description}
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text className="my-1">
                      <Link to={facProp.officialSite} target="_blank" title="official site"><AiFillHome /></Link>
                      <Link title="contatti" to={facProp.phoneNumber}><AiTwotonePhone className="mx-2" /></Link>
                      <Link
                        target="_blank"
                        title="contatta struttura"
                        onClick={() =>
                          (window.location = `mailto:${facProp.email}`)
                        }>
                        {" "}
                        <ImMail3 />
                        {/* {detailFacility.email} */}

                      </Link>
                    </Card.Text>
                    <Badge bg="warning" text="dark" className="my-1 ">
                      {facProp.facilityType}
                    </Badge>
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>

          <Row className="p-2">
            <Col xs={8} className=" my-1  d-flex">
              {facProp.serviceFacility !== null ? facProp.serviceFacility.map((s) => {

                switch (s.id) {
                  case 1: return <FaHouseFloodWaterCircleArrowRight key={s.id} title="carico acqua" />
                  case 2: return <FaPlugCircleBolt key={s.id} title="allaccio corrente 220v" />;
                  case 3: return <FaShower key={s.id} title="doccie" />
                  case 4: return <span key={s.id} className="position-relative"><FaShower title="doccia calda" /> <Badge bg="danger" text="dark" className="sizeResp position-absolute top-100 start-50  translate-middle badge rounded-pill bg-danger z-n0">hot</Badge></span>
                  case 5: return <FaRestroom key={s.id} title="Bagni" />
                  case 6: return <HiWifi key={s.id} title="WiFi" />
                  case 7: return <GrUserPolice key={s.id} title="sorveglianza notturna" />
                  case 8: return <GiFoundryBucket key={s.id} title="scarico cassetta" />
                  case 9: return <FaTruckDroplet key={s.id} title="scarico acque grige" />
                  case 10: return <BsShop title="Market" key={s.id} />
                }
              }) : ""

              }
            </Col>
            <Col xs={4} className="d-flex justify-content-end">
              {averageRating >= 5 ? < AiFillStar className="text-warning" /> :
                < AiOutlineStar />}
              {averageRating >= 4 ? <AiFillStar className="text-warning" /> : < AiOutlineStar />}
              {averageRating >= 3 ? <AiFillStar className="text-warning" /> : < AiOutlineStar />}
              {averageRating >= 2 ? <AiFillStar className="text-warning" /> : < AiOutlineStar />}
              {averageRating >= 1 ? <AiFillStar className="text-warning" /> : < AiOutlineStar />}
            </Col>
          </Row>




        </Card >

      </Col>

      <Modal show={showModalError} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Effettua il login o registrati</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, ancora non fai parte della nosta famiglia! Cosa aspetti!!!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
          <Link to="/LogIn" className="btn btn-primary">
            LogIn
          </Link>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={sendComment}>
          <Modal.Header closeButton>
            <Modal.Title>Dicci la tua!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                placeholder="name@example.com"
                autoFocus
                name="title"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Join</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleChange}
                name="body"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
            <RatingStar />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default SingleCardFacility