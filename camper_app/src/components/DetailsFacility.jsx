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
        <Container>
            <Row>
                <Card.Title className="text-center fs-1 fw-bolder mb-4">{detailFacility.name}</Card.Title>
                <Col>
                    <Card.Img variant="top" src={detailFacility.cover} />
                </Col>
                <Col className="d-flex flex-column h-100 justify-content-beetwen">

                    <Card.Text>
                        {detailFacility.description}
                    </Card.Text>

                    <div>  <h4>Contatti</h4>
                        <Link to={detailFacility.officialSite} target="_blank" >{detailFacility.officialSite}</Link> <Link>    {detailFacility.phoneNumber}</Link>
                    </div>

                </Col>
                <Row>
                    <Col>

                        <h4>Servizi Struttura</h4>
                        <div className="d-flex flex-row align-items-stretch jusify-content-center">
                            {detailFacility.serviceFacility !== null ? detailFacility.serviceFacility.map((s) => {

                                switch (s.id) {
                                    case 1: return <FaHouseFloodWaterCircleArrowRight />
                                    case 2: return <FaPlugCircleBolt />;
                                    case 3: return <FaShower />
                                    case 4: return <div className="position-relative"><FaShower /> <Badge bg="danger" text="dark" className="position-absolute top-100 start-50  translate-middle badge rounded-pill bg-danger z-n0">hot</Badge></div>
                                    case 5: return <FaRestroom />
                                    case 6: return <HiWifi />
                                    case 7: return <GrUserPolice />
                                    case 8: return <GiFoundryBucket />
                                    case 9: return <FaTruckDroplet />
                                    case 10: return <BsShop />
                                }
                            }) : <MdSignalCellularNull />

                            }
                        </div> */
                    </Col>
                </Row>
                <Button variant="primary">commenta</Button>
                <Button variant="primary">modifica</Button>
            </Row>
            {/* <Card > */}
            {/* <Card.Img variant="top" src={detailFacility.cover} />
                <Card.Body> */}


            {/* 
            {/* </Card.Body>
            </Card> */}
        </Container >)

}

export default DetailsFacility