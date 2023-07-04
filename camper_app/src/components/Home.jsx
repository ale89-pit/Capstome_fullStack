import { useEffect } from "react";
import { getAllFacility } from "../redux/actions/facilityAction";
import { useDispatch, useSelector } from "react-redux";
import SingleCardFacility from "./SingleCardFacility";
import { Card, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
    const dispatch = useDispatch()

    //recupero dallo stato tutte le strutture disponibili

    const allFacility = useSelector((state) => state.facility.facility)
    const isLoadingAll = useSelector((state) => state.facility.isLoadingAll)
    useEffect(() => {
        console.log("sto nello use effetc")
        dispatch(getAllFacility())
        console.log(allFacility)
    }, [])
    return (
        <>

            <Container className="mx-auto col-8">
                <div className="d-flex justify-content-center">
                    <Card style={{ width: '18rem' }} className="m-2">
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>

                            <Card.Text>
                                La nostra community è dedicata ai veri avventurieri on the road! Se ami esplorare il mondo con il tuo camper o qualsiasi altro mezzo, sei nel posto giusto.<Link to={"/register"} className="color-link" >Unisciti a noi</Link>
                            </Card.Text>
                            <Card.Link to={"/register"}>Register</Card.Link>
                            <Card.Link to={"/LogIn"}>LogIn </Card.Link>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }} className="m-2">
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>

                            <Card.Text>
                                Scopri le meraviglie nascoste di luoghi lontani, condividi le tue esperienze e scambia informazioni con altri viaggiatori appassionati
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }} className="m-2">
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>

                            <Card.Text>
                                Insieme, possiamo creare una rete di conoscenza e supporto, Scopri itinerari unici, consigli preziosi e luoghi straordinari, condividi le tue foto e racconti, connettiti con la comunity
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <h3></h3>
                {isLoadingAll ? (<Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>) : (allFacility.map((f) => <SingleCardFacility key={f.id} facProp={f} />))}
            </Container>
        </>
    )
}

export default Home;