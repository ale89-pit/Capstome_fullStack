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
import { BsShop } from "react-icons/bs";
import { GiFoundryBucket } from "react-icons/gi";
import { FaTruckDroplet } from "react-icons/fa6";
import { MdSignalCellularNull } from "react-icons/md";
import { AiFillHome, AiFillPhone } from "react-icons/ai";
import { HiMapPin } from "react-icons/hi2";
import { ImMail3 } from "react-icons/im";
import { myHeaders, myHeadersToken, myHeadersTokenPhoto } from "../redux/actions/userAction";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { API_URL_ADD_PHOTO } from "./FacilityForm";
import { CDBCarousel, CDBCarouselInner, CDBCarouselItem, CDBView } from "cdbreact";






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
    let fd = new FormData();
    let imgData = null;



    const API_URL_SEND_COMMENT = "http://localhost:8080/app/comments";


    const [formComment, setFormComment] = useState({
        user_id: user_Id,

        facility_id: id,

        title: "",

        body: "",
    });

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
        dispatch(setSingleFacility());
        getComment()
    }, [id.comments]);



    return (
        <>
            <Container className="w-75">
                {isLoading && (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )}
                {!isLoading && (
                    <>
                        <Row className="cardRegister align-items-stretch">
                            <Card.Title className="text-center fs-1 fw-bolder mb-4">
                                {detailFacility.name}
                            </Card.Title>
                            <Col xs={12} className="cardDetailPhoto mb-4">
                                <Card.Img variant="top" style={{ maxHeight: "500px" }} src={detailFacility.cover} />
                            </Col>

                            <Col xs={12} sm={8} className=" mb-2">
                                <Card className="mb-2">
                                    <Card.Header>Descrizione</Card.Header>
                                    <Card.Body>
                                        <Card.Text>{detailFacility.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12} sm={4}>
                                <Card>
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
                                        <Card.Text className="d-flex align-items-center">
                                            <HiMapPin />
                                            <span className="m-1">
                                                {detailFacility.address.comune.name}
                                            </span>
                                            -
                                            <span className="m-1">
                                                {detailFacility.address.comune.provincename.sign}
                                            </span>
                                            -
                                            <span className="m-1">
                                                {detailFacility.address.comune.provincename.region}
                                            </span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>



                            <Row className="mx-auto d-flex justify-content-beetwen">
                                <Col xs={12} sm={4} className="p-0 justify-content-center">
                                    <Card className=" mb-2">
                                        <Card.Header>Servizi Struttura</Card.Header>
                                        <Card.Body>
                                            <Card.Text className="d-flex flex-row align-items-center jusify-content-center">
                                                {detailFacility.serviceFacility !== null ? (
                                                    detailFacility.serviceFacility.map((s) => {
                                                        switch (s.id) {
                                                            case 1:
                                                                return (
                                                                    <FaHouseFloodWaterCircleArrowRight key={s.id} title="carico acqua" />
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
                                                                            className="position-absolute top-100 start-50  translate-middle badge rounded-pill bg-danger z-n0 ">
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
                                                                    <GrUserPolice key={s.id} title="sorveglianza notturna" />
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
                                <Col xs={12} sm={4} className="">
                                    <Card
                                        className="justify-content-center mx-auto
                        ">
                                        <Card.Header>Dai il tuo supporto!!</Card.Header>
                                        <Card.Body>
                                            <Card.Text className="d-flex align-items-center">
                                                <Button
                                                    variant="primary"
                                                    className="mx-2"
                                                    onClick={handleShow}>
                                                    commenta
                                                </Button>
                                                <Button
                                                    className="btn btn-primary mx-2"
                                                    onClick={
                                                        !isLogged
                                                            ? handleShow
                                                            : () => navigate("/add/" + detailFacility.id)
                                                    }>
                                                    modifica
                                                </Button>
                                                <Button
                                                    className="btn btn-primary mx-2"
                                                    onClick={!isLogged ? handleShow : handlerShowImage}>
                                                    carica foto
                                                </Button>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Col className="mb-5">
                                {comments.map((comment) => {
                                    return (
                                        <Card className="mb-2" key={comment.id}>
                                            <Card.Header className="d-flex justify-content-between align-items-center">
                                                <span>
                                                    {" "}
                                                    <img
                                                        className="imgUser"
                                                        src={comment.user.photoProfile}></img>
                                                    {comment.user.userName}
                                                </span>
                                                <p>{comment.date}</p>
                                            </Card.Header>
                                            <Card.Title>{comment.title}</Card.Title>
                                            <Card.Body>{comment.body}</Card.Body>
                                        </Card>
                                    );
                                })}
                            </Col>
                            <h3>Le vostre foto!!</h3>
                            <Col className="col-12 col-md-8 mx-auto">
                                <Carousel infiniteLoop={true}>
                                    {photoFacilityFromUser !== null
                                        ? photoFacilityFromUser.map((photo) => (
                                            <div key={photo.id}>
                                                <img src={photo.filePath} />
                                            </div>
                                        ))
                                        : ""}
                                </Carousel>


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
                            <Modal.Title>Modal heading</Modal.Title>
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
