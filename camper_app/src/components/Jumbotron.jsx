import { useEffect, useState } from "react";
import { Button, Col, Row, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { myHeadersToken } from "../redux/actions/userAction";
import SingleCardFacility from "./SingleCardFacility";


function Jumbotron() {
    const [querySearch, setQuerySearch] = useState();
    const API_URL_QUERY_SEARCH = `http://localhost:8080/app/search?desc=${querySearch}&tit=${querySearch}`
    const [queryResult, setQueryResult] = useState();



    const searchFacilityBySearchBar = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(API_URL_QUERY_SEARCH, {
                method: "GET",
                headers: myHeadersToken,
                redirect: "follow",
            });
            if (response.ok) {
                let result = await response.json()
                console.log(result)
                setQueryResult(result)
            } else {
                if (response.status === 400) {
                    alert("nessuna struttura trovata")
                }

            }
        } catch (error) {
            alert("errore fetch")
        }
    }
    useEffect(() => {

    }, [querySearch])

    return (
        <>
            <Row className="size">
                <Col className="jumbotron jumbotron-fluid  mt-5 p-0">
                    {/* <div className="title">
                    Benvenuti  <br />
                    nella nostra famiglia <br />
                    di camperisti e viaggiatori<br />
                    Rendi <br />
                    ogni strada una tua <br />
                    personale <br />
                    scoperta<br />
                </div> */}
                    <div className="w-50 mx-auto mt-5  text-center">
                        {/* <div className="card-jumboTitle">
                        <Link to={"/register"}>  <h1 className="display-4  entry-title">Benvenuti nella nostra famiglia di camperisti e viaggiatori. Rendi ogni strada una tua personale scoperta
                        </h1></Link>
                    </div> */}
                        <p className="lead text-light"></p>
                        <h4 className="searchTitle">Cerca</h4>
                        <Form onSubmit={(e) => searchFacilityBySearchBar(e)} className="d-flex w-75 mb-5 justify-content-center align-items-center">

                            <Form.Control
                                type="text"
                                placeholder="Inserisci il nome o la località "
                                onChange={(e) => {
                                    setQuerySearch(e.target.value)
                                }}
                            /><Button type="submit">Search</Button>
                        </Form>
                    </div>

                </Col>
            </Row>
            <Row>
                {queryResult && <h4 className="text-center">{queryResult.length} risultati</h4>}
                {
                    queryResult && queryResult.map((item) => {
                        return (
                            <Card className="w-50 mx-auto">
                                <img src={item.cover} className="card-img-top w-25" alt="..."></img>
                                <h5>{item.name}</h5>
                            </Card>
                        )
                    })
                }
            </Row>
        </>
    )
}
// Benvenuti nella nostra community dedicata ai veri avventurieri on the road! Se ami esplorare il mondo con il tuo camper o qualsiasi altro mezzo, sei nel posto giusto. Unisciti a noi e scopri le meraviglie nascoste di luoghi lontani, condividi le tue esperienze e scambia informazioni con altri viaggiatori appassionati

export default Jumbotron

// Preparati a intraprendere un percorso senza limiti, a esplorare terre sconosciute e a creare ricordi che dureranno per sempre. Unisciti a noi oggi stesso e sperimenta la
//                         libertà e l'avventura che solo i viaggi on the road possono offrire