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

  // className="d-flex "
  return (

    <Col className="col-12 col-md-6 col-lg-6 w-100 mx-auto">
      <Card className="my-4 w-100">

        <Row >
          <Col className="">

            <img className="imgSingleCard" variant="top" src={facProp.cover} />

          </Col >
          <Col className="col-md-6">
            <Card.Body >
              <Row>
                <Col>
                  <Link to={"/details/" + facProp.id}> <h3>{facProp.name}</h3> </Link>

                </Col>
              </Row>
              <Row>
                <Col className="d-flex">

                  <h5>{facProp.address.comune.name}</h5><Badge className="sizeBadge">{facProp.address.comune.provincename.sign}</Badge>
                </Col>
              </Row>
              <Row>
                <Col className="overflow-hidden">
                  <Card.Text className="text-truncate">
                    {facProp.description}
                  </Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>
                    <Link to={facProp.officialSite} target="_blank" title="official site">Official Site</Link>
                    <Link title="contatti" to={facProp.phoneNumber}><AiTwotonePhone /></Link>
                  </Card.Text>
                  <Badge bg="warning" text="dark" className="my-1 sizeBadge">
                    {facProp.facilityType}
                  </Badge>
                </Col>
              </Row>
              <div className="d-flex flex-row align-items-stretch jusify-content-center w-100">
                {facProp.serviceFacility !== null ? facProp.serviceFacility.map((s) => {

                  switch (s.id) {
                    case 1: return <div className="w-100"> <FaHouseFloodWaterCircleArrowRight title="carico acqua" /></div>
                    case 2: return <div><FaPlugCircleBolt title="allaccio corrente 220v" /></div>;
                    case 3: return <div><FaShower title="doccie" /></div>
                    case 4: return <div className="position-relative"><FaShower title="doccia calda" /> <Badge bg="danger" text="dark" className="position-absolute top-100 start-50  translate-middle badge rounded-pill bg-danger z-n0">hot</Badge></div>
                    case 5: return <div><FaRestroom title="Bagni" /></div>
                    case 6: return <div><HiWifi title="WiFi" /></div>
                    case 7: return <div><GrUserPolice title="sorveglianza notturna" /></div>
                    case 8: return <div><GiFoundryBucket title="scarico cassetta" /></div>
                    case 9: return <div><FaTruckDroplet title="scarico acque grige" /></div>
                    case 10: return <div><BsShop /></div>
                  }
                }) : <MdSignalCellularNull title="Market" />

                }
              </div>
            </Card.Body>
          </Col>
        </Row>


      </Card >


    </Col >
  )
}

export default SingleCardFacility