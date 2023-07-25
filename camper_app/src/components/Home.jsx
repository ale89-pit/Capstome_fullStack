import { useEffect } from "react";
import { getAllFacility } from "../redux/actions/facilityAction";
import { useDispatch, useSelector } from "react-redux";
import SingleCardFacility from "./SingleCardFacility";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";


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


                <Row>
                    <Col className="mx-auto">
                        <h3>Strutture</h3>
                    </Col>
                    <Row className="mb-5">
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