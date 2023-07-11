import { useEffect } from "react";
import { getAllFacility } from "../redux/actions/facilityAction";
import { useDispatch, useSelector } from "react-redux";
import SingleCardFacility from "./SingleCardFacility";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { RiRoadMapFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";

function Home() {
    const dispatch = useDispatch()

    //recupero dallo stato tutte le strutture disponibili

    const allFacility = useSelector((state) => state.facility.facility)
    const isLoadingAll = useSelector((state) => state.facility.isLoadingAll)
    useEffect(() => {

        dispatch(getAllFacility())

    }, [])
    return (
        <>

            <Container className="mx-auto ">
                <Row >
                    <Col className="align-items-stretch d-block d-md-flex" >
                        <Card style={{ width: '18rem' }} className="mx-auto my-3 card-shadow">
                            <Card.Body>
                                <Card.Title className="text-center"><BsFillChatSquareTextFill /></Card.Title>

                                <Card.Text>
                                    La nostra community è dedicata ai veri avventurieri on the road! Se ami esplorare il mondo con il tuo camper o qualsiasi altro mezzo, sei nel posto giusto.<Link to={"/register"} className="color-link" >Unisciti a noi</Link>
                                </Card.Text>
                                <Card.Link to={"/register"}>Register</Card.Link>
                                <Card.Link to={"/LogIn"}>LogIn </Card.Link>
                            </Card.Body>
                        </Card>


                        <Card style={{ width: '18rem' }} className="mx-auto my-3 card-shadow">
                            <Card.Body>
                                <Card.Title className="text-center "><RiRoadMapFill /></Card.Title>

                                <Card.Text>
                                    Scopri le meraviglie nascoste di luoghi lontani, condividi le tue esperienze e scambia informazioni con altri viaggiatori appassionati
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '18rem' }} className="mx-auto my-3 card-shadow">
                            <Card.Body>
                                <Card.Title className="text-center"><FaUserFriends /></Card.Title>

                                <Card.Text>
                                    Insieme, possiamo creare una rete di conoscenza e supporto, Scopri itinerari unici, consigli preziosi e luoghi straordinari, condividi le tue foto e racconti, connettiti con la comunity
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="mx-auto">
                        <h3>Strutture</h3>
                    </Col>
                    <Row>
                        {/* col-12 col-md-6 col-lg-6 w-100 mx-auto */}

                        {isLoadingAll ? (<Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>

                        </Spinner>) : (allFacility.map((f) => <SingleCardFacility key={f.id} facProp={f} />))}

                    </Row>

                </Row>
            </Container>
        </>
    )
}

export default Home;