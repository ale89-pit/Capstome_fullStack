import { useEffect } from "react"
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { getSingleFacility } from "../redux/actions/facilityAction"
import { FaHouseFloodWaterCircleArrowRight, FaPlugCircleBolt, FaRestroom, FaShower } from "react-icons/fa6"
import { HiWifi } from "react-icons/hi"
import { GrUserPolice } from "react-icons/gr"
import { BsShop } from "react-icons/bs"
import { GiFoundryBucket } from "react-icons/gi"
import { FaTruckDroplet } from "react-icons/fa6"
import { MdSignalCellularNull } from "react-icons/md";
import { AiFillHome, AiFillPhone } from "react-icons/ai"
import { HiMapPin } from "react-icons/hi2"



function DetailsFacility() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const detailFacility = useSelector((state) => state.facility.singleFacility)
    console.log(id)


    useEffect(() => {
        dispatch(getSingleFacility(id))
        console.log(detailFacility)
    }, [id])
    return (
        <Container >
            <Row>
                <Card.Title className="text-center fs-1 fw-bolder mb-4">{detailFacility.name}</Card.Title>
                <Col className="cardDetailPhoto mb-4">
                    <Card.Img variant="top" src={detailFacility.cover} />
                </Col>
                <Col className="d-flex flex-column h-100 justify-content-beetwen mb-2">
                    <Card className="mb-2">
                        <Card.Header>Descrizione</Card.Header>
                        <Card.Body>

                            <Card.Text>
                                {detailFacility.description}
                            </Card.Text>

                        </Card.Body>
                    </Card>



                    <Card>
                        <Card.Header>Contatti</Card.Header>
                        <Card.Body>

                            <Card.Text className="align-items-center">
                                <AiFillHome />
                                <Link to={detailFacility.officialSite} target="_blank" >Official Site</Link>
                            </Card.Text>
                            <Card.Text className="align-items-center">
                                <AiFillPhone />
                                {detailFacility.phoneNumber}
                            </Card.Text>
                            <Card.Text className="d-flex align-items-center">
                                <HiMapPin />
                                <span className="m-1">
                                    {detailFacility.address.comune.name}
                                </span>-
                                <span className="m-1">
                                    {detailFacility.address.comune.provincename.sign}
                                </span>-
                                <span className="m-1">
                                    {detailFacility.address.comune.provincename.region}
                                </span>


                            </Card.Text>
                        </Card.Body>
                    </Card>






                </Col>
                <Row className="mx-auto d-flex justify-content-beetwen">
                    <Col className="p-0 justify-content-center">

                        <Card className=" mb-2">
                            <Card.Header>Servizi Struttura</Card.Header>
                            <Card.Body>

                                <Card.Text className="d-flex flex-row align-items-center jusify-content-center">
                                    {detailFacility.serviceFacility !== null ? detailFacility.serviceFacility.map((s) => {

                                        switch (s.id) {
                                            case 1: return <FaHouseFloodWaterCircleArrowRight title="carico acqua" />
                                            case 2: return <FaPlugCircleBolt title="allaccio corrente 220v" />;
                                            case 3: return <FaShower title="doccie" />
                                            case 4: return <div className="position-relative"><FaShower title="doccia calda" /> <Badge bg="danger" text="dark" className="position-absolute top-100 start-50  translate-middle badge rounded-pill bg-danger z-n0">hot</Badge></div>
                                            case 5: return <FaRestroom title="Bagni" />
                                            case 6: return <HiWifi title="WiFi" />
                                            case 7: return <GrUserPolice title="sorveglianza notturna" />
                                            case 8: return <GiFoundryBucket title="scarico cassetta" />
                                            case 9: return <FaTruckDroplet title="scarico acque grige" />
                                            case 10: return <BsShop title="Market" />
                                        }
                                    }) : <MdSignalCellularNull />

                                    }

                                </Card.Text>
                            </Card.Body>
                        </Card>



                    </Col>
                    <Col className="">
                        <Card className="justify-content-center mx-auto
                        ">
                            <Card.Header>Contatti</Card.Header>
                            <Card.Body>

                                <Card.Text className="d-flex align-items-center">

                                    <Button variant="primary">commenta</Button>
                                    <Link className="btn bt-primary" to={"/add/" + detailFacility.id}>modifica</Link>


                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row >

            </Row >
            {/* <Card > */}
            {/* <Card.Img variant="top" src={detailFacility.cover} />
                <Card.Body> */}


            {/* 
            {/* </Card.Body>
            </Card> */}
        </Container >)

}

export default DetailsFacility