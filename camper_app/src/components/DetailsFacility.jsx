import { useEffect, useState } from "react";
import {
    Badge,
    Button,
    Card,
    Col,
    Container,
    Form,
    Modal,
    Row,
    Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    getSingleFacility,
    setSingleFacility,
} from "../redux/actions/facilityAction";
import {
    FaHouseFloodWaterCircleArrowRight,
    FaPlugCircleBolt,
    FaRestroom,
    FaShower,
} from "react-icons/fa6";
import { HiWifi } from "react-icons/hi";
import { GrUserPolice } from "react-icons/gr";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import { GiFoundryBucket } from "react-icons/gi";
import { FaTruckDroplet } from "react-icons/fa6";
import { MdSignalCellularNull } from "react-icons/md";
import { AiFillHome, AiFillPhone, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiMapPin } from "react-icons/hi2";
import { ImMail3 } from "react-icons/im";
import { LuImagePlus, LuMessageSquarePlus } from "react-icons/lu";

import { myHeaders, myHeadersToken, myHeadersTokenPhoto } from "../redux/actions/userAction";
import Carousel from 'react-bootstrap/Carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { API_URL_ADD_PHOTO } from "./FacilityForm";
import moment from "moment";
import RatingStar from "./RatingStar";
import Weather from "./Weather";
import MapComponent from "./MapComponent";






function DetailsFacility() {
    const isLogged = useSelector((state) => state.login.isLogged);
    const isLoading = useSelector((state) => state.facility.isLoading);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const detailFacility = useSelector((state) => state.facility.singleFacility);
    const [comments, setComments] = useState([]);
    const profile = useSelector((state) => state.login.profile);
    const user_Id = profile ? profile[0]?.id : null;
    const photoFacilityFromUser = detailFacility.fotoUpLoadFromUser;
    const averageRating = detailFacility.average;
    let fd = new FormData();
    let imgData = null;



    const API_URL_SEND_COMMENT = "http://localhost:8080/app/comments";


    const [formComment, setFormComment] = useState({
        user_id: user_Id,

        facility_id: id,

        title: "",

        body: "",
    });


    window.scrollTo(0, 0)


    const handleFile = (e) => {
        imgData = e.target.files[0];
        console.log(imgData);
        fd.append("image", imgData);
    };

    const handleChange = (event) => {
        setFormComment({
            ...formComment,
            [event.target.name]: event.target.value,
        });
    };
    const [showModalError, setShowModalError] = useState(false);
    const [showModalImage, setshowModalImage] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setShowModalError(false);
        setshowModalImage(false);
    };
    const handleShow = () => {
        if (!isLogged) {
            setShowModalError(true);
        } else {
            setShow(true);
        }
    };
    const handlerShowImage = () => {
        setshowModalImage(true);
    };


    const addPhotoFromUser = async (e) => {
        e.preventDefault();
        try {
            console.log(fd.get("image"));
            let response = await fetch(API_URL_ADD_PHOTO + "/" + detailFacility.id, {
                method: "POST",
                headers: myHeadersTokenPhoto,
                body: fd,
                redirect: "follow",
            })
            if (response.ok) {
                dispatch(getSingleFacility(detailFacility.id))
                alert("foto aggiunta alla struttura da " + profile.userName)
            } else {
                alert("errore fetch")
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
                setShow(false);
                getComment()
                alert("commento inviato");
                setFormComment({
                    user_id: user_Id,

                    facility_id: id,

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

    const getComment = async () => {
        try {
            const response = await fetch(
                API_URL_SEND_COMMENT + "/allBy?facility_id=" + id,
                {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow",
                }
            );
            if (response.ok) {
                const data = await response.json();
                setComments(data);
                console.log(data)
                // getComment()

            }
        } catch (error) {
            console.log("error", error);
        }
    };


    useEffect(() => {
        dispatch(getSingleFacility(id));
        getComment();
        console.log(comments)

    }, []);

    useEffect(() => {
        // dispatch(setSingleFacility());
        getComment()
        console.log(comments)
    }, [id.comments, averageRating]);




    return (
        <>
            <Container className="w-75">
                {isLoading && (
                    <>
                        <p>Loading...</p>
                        <img src={"../camper2.gif"} />
                    </>
                )}
                {!isLoading && (
                    <>
                        <Row >
                            <Col xs={12} className="cardDetailPhoto  mb-4">
                                <Card.Img variant="top" style={{ maxHeight: "500px" }} src={detailFacility.cover} onError={(event) =>
                                (event.target.src =
                                    "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png")
                                } />
                            </Col>
                            <Col xs={12} className="d-flex justify-content-between">
                                <h4 className="fs-1 fw-bolder mb-4">
                                    {detailFacility.name}
                                </h4>
                                <div className="d-flex">
                                    {averageRating >= 5 ? < AiFillStar className="text-warning" /> :
                                        < AiOutlineStar />}
                                    {averageRating >= 4 ? <AiFillStar className="text-warning" /> : < AiOutlineStar />}
                                    {averageRating >= 3 ? <AiFillStar className="text-warning" /> : < AiOutlineStar />}
                                    {averageRating >= 2 ? <AiFillStar className="text-warning" /> : < AiOutlineStar />}
                                    {averageRating >= 1 ? <AiFillStar className="text-warning" /> : < AiOutlineStar />}
                                </div>
                            </Col>

                            <Col xs={12} sm={4}>
                                <Card className="mb-2 text-bg-dark" >
                                    <Card.Header>Contatti</Card.Header>
                                    <Card.Body>
                                        <Card.Text className="align-items-center">
                                            <AiFillHome />
                                            <Link to={detailFacility.officialSite} target="_blank">
                                                Official Site
                                            </Link>
                                        </Card.Text>

                                        <Card.Text className="align-items-center">
                                            <AiFillPhone />
                                            {detailFacility.phoneNumber}
                                        </Card.Text>
                                        <Card.Text className="align-items-center">
                                            <Link
                                                target="_blank"

                                                onClick={() =>
                                                    (window.location = `mailto:${detailFacility.email}`)
                                                }>
                                                {" "}
                                                <ImMail3 />
                                                {/* {detailFacility.email} */}
                                                Contatta Struttura
                                            </Link>
                                        </Card.Text>
                                        <Card.Text className="d-flex  align-items-center">
                                            <HiMapPin />
                                            <span className="d-flex flex-sm-column flex-lg-row">
                                                <span className="m-1">
                                                    {detailFacility.address.comune.name}
                                                </span>

                                                <span className="m-1">
                                                    {detailFacility.address.comune.provincename.sign}
                                                </span>

                                                <span className="m-1">
                                                    {detailFacility.address.comune.provincename.region}
                                                </span>

                                            </span>

                                        </Card.Text>
                                        <Card.Text>
                                            <span className="m-1">

                                                {detailFacility.address.street + ' ,' + detailFacility.address.streetNumber}
                                            </span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12} sm={8}>
                                <MapComponent address={detailFacility.address} nameFacility={detailFacility.name} />
                            </Col>
                            <Col xs={12} className="p-2">
                                <Weather city={detailFacility.address.comune.name} />
                            </Col>
                            <Col xs={12} className=" mb-2">
                                <Card className="mb-2 text-bg-dark">
                                    <Card.Header>Descrizione</Card.Header>
                                    <Card.Body>
                                        <Card.Text>{detailFacility.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>



                            <Row className="mx-auto d-flex justify-content-beetwen align-items-center">
                                <Col xs={12} md={7} className="p-0">
                                    <Card className=" mb-2 text-bg-dark">
                                        <Card.Header>Servizi Struttura</Card.Header>
                                        <Card.Body>
                                            <Card.Text className=" d-flex flex-row align-items-center jusify-content-center">
                                                {detailFacility.serviceFacility !== null ? (
                                                    detailFacility.serviceFacility.map((s) => {
                                                        switch (s.id) {
                                                            case 1:
                                                                return (
                                                                    <span className="m-2">
                                                                        <FaHouseFloodWaterCircleArrowRight key={s.id} title="carico acqua" />
                                                                    </span>
                                                                );
                                                            case 2:
                                                                return (
                                                                    <FaPlugCircleBolt key={s.id} title="allaccio corrente 220v" />
                                                                );
                                                            case 3:
                                                                return <FaShower key={s.id} title="doccie" />;
                                                            case 4:
                                                                return (
                                                                    <span key={s.id} className="position-relative">
                                                                        <FaShower title="doccia calda text-warnig" />{" "}
                                                                        <Badge
                                                                            bg="danger"
                                                                            text="dark"
                                                                            className="sizeResp   position-absolute top-100 start-50 w-xs-50  translate-middle badge rounded-pill bg-danger z-n0 ">
                                                                            hot
                                                                        </Badge>
                                                                    </span>
                                                                );
                                                            case 5:
                                                                return <FaRestroom key={s.id} title="Bagni" />;
                                                            case 6:
                                                                return <HiWifi key={s.id} title="WiFi" />;
                                                            case 7:
                                                                return (
                                                                    <GiPoliceOfficerHead key={s.id} title="sorveglianza notturna" />
                                                                );
                                                            case 8:
                                                                return (
                                                                    <GiFoundryBucket key={s.id} title="scarico cassetta" />
                                                                );
                                                            case 9:
                                                                return (
                                                                    <FaTruckDroplet key={s.id} title="scarico acque grige" />
                                                                );
                                                            case 10:
                                                                <FaTruckDroplet key={s.id} title="scarico acque grige" />
                                                                return <BsShop key={s.id} title="Market" />;
                                                        }
                                                    })
                                                ) : (
                                                    <MdSignalCellularNull />
                                                )}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} md={4} className="p-0 mx-auto">
                                    <Card
                                        className=" mb-2 justify-content-center mx-auto text-bg-dark
                        ">
                                        <Card.Header>Dai il tuo supporto!!</Card.Header>
                                        <Card.Body className="d-flex justify-content-between align-items-center">
                                            <RatingStar />
                                            <Card.Text >

                                                < LuMessageSquarePlus title="Aggiungi Commento" className="cursor-pointer" onClick={handleShow} />
                                                <LuImagePlus title="Aggiungi foto" className="cursor-pointer"
                                                    onClick={!isLogged ? handleShow : handlerShowImage}
                                                    carica foto
                                                /></Card.Text>





                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>

                                    <Card
                                        className=" mb-2 justify-content-center mx-auto text-bg-dark
                        ">
                                        <Card.Header>Vuoi modificare qualcosa di questa struttura?</Card.Header>
                                        <Card.Body>
                                            <Card.Text className="d-flex justify-content-between align-items-center">

                                                <Card.Text>Se hai trovato qualche informazione errata modifica la struttura!!</Card.Text>
                                                <Button
                                                    className="btn btn-primary mx-2"
                                                    onClick={
                                                        !isLogged
                                                            ? handleShow
                                                            : () => navigate("/add/" + detailFacility.id)
                                                    }>
                                                    modifica
                                                </Button>

                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>


                            <Col className="col-12 col-md-8 mb-5 mx-auto">
                                <h3>Le vostre foto!!</h3>
                                <LuImagePlus title="Aggiungi foto" className="cursor-pointer"
                                    onClick={!isLogged ? handleShow : handlerShowImage}
                                    carica foto
                                />
                                <Carousel infiniteLoop={true} showStatus={false}>

                                    {photoFacilityFromUser !== null
                                        ? photoFacilityFromUser.map((photo) => (


                                            <Carousel.Item key={photo.id}>
                                                <img src={photo.filePath} />
                                            </Carousel.Item>

                                        ))
                                        : ""}

                                </Carousel>


                            </Col>
                        </Row>
                        <Row>
                            {/* {comment.user.userName} */}
                            <Col className="mb-5">
                                < LuMessageSquarePlus title="Aggiungi Commento" className="cursor-pointer" onClick={handleShow} />
                                {comments.map((comment) => {
                                    return (
                                        <div key={comment.id} className="d-flex">
                                            <span className="mx-2">
                                                {" "}
                                                <img
                                                    className="rounded-circle"
                                                    width={100}
                                                    src={comment.user.photoProfile}></img>

                                            </span>
                                            <Card className="mb-2 text-bg-dark w-75" key={comment.id}>
                                                <Card.Header className="d-flex justify-content-between align-items-center">
                                                    <Card.Title>{comment.title}</Card.Title>
                                                    <p>{moment(comment.date).format('DD-MM-YYYY HH:mm')}</p>
                                                </Card.Header>

                                                <Card.Body>{comment.body}</Card.Body>
                                                <div className="triangle"></div>
                                            </Card>
                                        </div>
                                    );
                                })}
                            </Col>

                        </Row>

                    </>
                )
                }

                {/* modale per errore in caso di utente non registrato o non loggato */}

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
                {/* Modale per inserimento foto da parte degli utenti */}
                <Modal show={showModalImage} onHide={handleClose}>
                    <Form className=" mx-auto">
                        <Modal.Header closeButton>
                            <Modal.Title>Contribuisci anche tu!!</Modal.Title>
                        </Modal.Header>
                        <span class="text-center ">
                            <label for="formFileLg " class="form-label">
                                Foto
                            </label>
                            <input
                                onChange={handleFile}
                                class="form-control form-control-sm mx-2"
                                id="formFileLg"
                                type="file"></input>
                        </span>
                        {/* onClick={(e) => sendPhotoFacility(e)} */}
                        <Modal.Footer>
                            <Button onClick={addPhotoFromUser}>Invia</Button>
                            <Button
                                variant="secondary"
                                className="text-start"
                                onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                {/* Modale per l'inserimento dei commenti da parte degli utenti */}

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
                        </Modal.Footer>
                    </Form>

                </Modal>
            </Container >
        </>
    );
}

export default DetailsFacility;

// {
//     "user_id":1,

//      "facility_id":1,

//      "title":"campeggio bellissimo",

//      "body":"Ho avuto il piacere di trascorrere qualche giorno presso il campeggio XYZ e devo dire che è stata un'esperienza davvero piacevole. Situato in una bellissima area naturale, il campeggio offre tutto ciò che si può desiderare per un soggiorno all'aria aperta."
//  }
