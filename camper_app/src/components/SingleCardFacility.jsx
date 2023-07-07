import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHouseFloodWaterCircleArrowRight, FaPlugCircleBolt, FaRestroom, FaShower } from "react-icons/fa6"
import { HiWifi } from "react-icons/hi"
import { GrUserPolice } from "react-icons/gr"
import { BsShop } from "react-icons/bs"
import { GiFoundryBucket } from "react-icons/gi"
import { FaTruckDroplet } from "react-icons/fa6"
import { MdSignalCellularNull } from "react-icons/md";
import { AiTwotonePhone } from "react-icons/ai"
function SingleCardFacility({ facProp }) {
  //gli passo le propieta di ogni struttura per mostrarle nalla home
  // "C:/Users/Aless/Desktop/Camper_App/Camper_App_Server/src/main/resources/imageFacility/foto.jpg


  return (
    <>
      <Card className="my-4 w-100">
        <Container fluid className="d-flex ">
          {/* <Row className="w-100">
            <Col className="w-25"> */}

          <img className="imgSingleCard" variant="top" src={facProp.cover} />

          {/* </Col>
            <Col> */}
          <Card.Body className="d-flex flex-column justify-content-start overflow-hidden">

            <Link to={"/details/" + facProp.id}> <h1>{facProp.name}</h1> </Link>
            <div className="d-flex">
              <h4>{facProp.address.comune.name}</h4><Badge>{facProp.address.comune.provincename.sign}</Badge></div>
            <Card.Text className="">
              {facProp.description}
            </Card.Text>
            <Card.Text>
              <Link to={facProp.officialSite} target="_blank" title="official site">Official Site</Link>
              <Link title="contatti" to={facProp.phoneNumber}><AiTwotonePhone /></Link>
            </Card.Text>
            <Badge bg="warning" text="dark" className="my-1 sizeBadge">
              {facProp.facilityType}
            </Badge>
            <div className="d-flex flex-row align-items-stretch jusify-content-center">
              {facProp.serviceFacility !== null ? facProp.serviceFacility.map((s) => {

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
                  case 10: return <BsShop />
                }
              }) : <MdSignalCellularNull title="Market" />

              }
            </div>
          </Card.Body>
          {/* </Col>
          </Row> */}
        </Container>

      </Card>

    </>)
}

export default SingleCardFacility