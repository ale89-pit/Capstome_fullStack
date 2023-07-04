import { Button, Col, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";


function Jumbotron() {
    return (
        <Row className="size">
            <Col className="jumbotron jumbotron-fluid mx-0 ">

                <div className="w-75 mx-auto  text-center">
                    <div className="card-jumboTitle">
                        <Link to={"/register"}>  <h1 className="display-4 text-light entry-title">Benvenuti nella nostra famiglia di camperisti e viaggiatori. Rendi ogni strada una tua personale scoperta
                        </h1></Link>
                    </div>
                    <p className="lead text-light"></p>
                    <h4>Trova l'avventura perfetta</h4>
                    <Form className="d-flex mb-5 justify-content-center align-items-center">

                        <Form.Control type="text" placeholder="Normal text" /><Button>Search</Button>
                    </Form>
                </div>

            </Col>
        </Row>
    )
}
// Benvenuti nella nostra community dedicata ai veri avventurieri on the road! Se ami esplorare il mondo con il tuo camper o qualsiasi altro mezzo, sei nel posto giusto. Unisciti a noi e scopri le meraviglie nascoste di luoghi lontani, condividi le tue esperienze e scambia informazioni con altri viaggiatori appassionati

export default Jumbotron

// Preparati a intraprendere un percorso senza limiti, a esplorare terre sconosciute e a creare ricordi che dureranno per sempre. Unisciti a noi oggi stesso e sperimenta la
//                         libertà e l'avventura che solo i viaggi on the road possono offrire