import { Badge, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHouseFloodWaterCircleArrowRight, FaPlugCircleBolt, FaRestroom, FaShower } from "react-icons/fa6"
import { HiWifi } from "react-icons/hi"
import { GrUserPolice } from "react-icons/gr"
import { BsShop } from "react-icons/bs"
import { GiFoundryBucket } from "react-icons/gi"
import { FaTruckDroplet } from "react-icons/fa6"
import { MdSignalCellularNull } from "react-icons/md";
function SingleCardFacility({ facProp }) {
  //gli passo le propieta di ogni struttura per mostrarle nalla home
  // "C:/Users/Aless/Desktop/Camper_App/Camper_App_Server/src/main/resources/imageFacility/foto.jpg


  return (
    <>
      <Card className="my-4">
        <Container fluid className="d-flex ">
          <Card.Img className="w-25" variant="top" src={facProp.cover} />
          <Card.Body className="d-flex flex-column justify-content-start">

            <Link to={"/details/" + facProp.id}> <h1>{facProp.name}</h1> </Link>
            <div className="d-flex">
              <h4>{facProp.address.comune.name}</h4><Badge>{facProp.address.comune.provincename.sign}</Badge></div>
            <Card.Text>
              {facProp.description}
            </Card.Text>
            <Card.Text>
              <Link>{facProp.officialSite}</Link> <Link>{facProp.phoneNumber}</Link>
            </Card.Text>
            <Badge bg="warning" text="dark" className="my-1">
              {facProp.facilityType}
            </Badge>
            <div className="d-flex flex-row align-items-stretch jusify-content-center">
              {facProp.serviceFacility !== null ? facProp.serviceFacility.map((s) => {

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
            </div>
          </Card.Body>
        </Container>
      </Card>

    </>)
}

export default SingleCardFacility