import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHouseFloodWaterCircleArrowRight, FaPlugCircleBolt, FaRestroom, FaShower } from "react-icons/fa6"
import { HiWifi } from "react-icons/hi"
import { GrUserPolice } from "react-icons/gr"
import { BsShop } from "react-icons/bs"
import { GiFoundryBucket } from "react-icons/gi"
import { FaTruckDroplet } from "react-icons/fa6"
import { MdSignalCellularNull } from "react-icons/md";
import { AiFillHeart, AiFillStar, AiOutlineHeart, AiOutlineStar, AiTwotonePhone } from "react-icons/ai"
import { BiMessageDetail } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux";
import { myHeadersToken, userProfile } from "../redux/actions/userAction";
import { useEffect } from "react";
function SingleCardFacility({ facProp }) {
  //gli passo le propieta di ogni struttura per mostrarle nalla home
  const API_URL_ADD_REMOVE_PREFERENCE = "http://localhost:8080/app/users/"



  const user_id = useSelector((state) => state.login.profile[0]?.id) || null;
  const userName = useSelector((state) => state.login.profile[0]?.userName) || null;
  const preferences = useSelector((state) => state.login.profile[0]?.preference) || null;
  const dispatch = useDispatch();




  const addToPreference = async () => {
    try {
      let response = await fetch(API_URL_ADD_REMOVE_PREFERENCE + user_id + "/" + facProp.id, {
        method: "PUT",
        headers: myHeadersToken,
        redirect: "follow",
      })
      if (response.ok) {

        dispatch(userProfile(userName))
      } else {
        alert("errore")
      }

    } catch (error) {

    }
  }

  const removeFromPreference = async () => {
    try {
      let response = await fetch(API_URL_ADD_REMOVE_PREFERENCE + user_id + "/" + facProp.id, {
        method: "DELETE",
        headers: myHeadersToken,
        redirect: "follow",
      })
      if (response.ok) {

        dispatch(userProfile(userName))
      } else {
        alert("errore")
      }

    } catch (error) {

    }
  }




  return (
    <Col className="col-12 col-md-6 col-lg-6 mx-auto">

      <Card className="my-4 pb-4 card-shadow singleCard">
        <Row>
          <Col className="d-flex justify-content-end">
            <BiMessageDetail className="cursor-pointer" title="commenta" />
            {preferences.some((element) => element.id === facProp.id) ? (
              <AiFillHeart
                onClick={removeFromPreference}
                className="cursor-pointer text-danger"
                title="remove from preference"
              />
            ) : (
              <AiOutlineHeart
                onClick={addToPreference}
                className="cursor-pointer "
                title="add to preference"
              />
            )}








          </Col>
        </Row>

        <Row >
          <Col className="col-12 col-md-6" >

            <Link to={"/details/" + facProp.id}>     <img className="w-100 imgSingleCard" variant="top" src={facProp.cover} /></Link>

          </Col >
          <Col className="col-12 col-md-6">
            <Card.Body className="w-100">
              <Row>
                <Col>
                  <Link to={"/details/" + facProp.id}> <h4>{facProp.name}</h4> </Link>

                </Col>
              </Row>
              <Row>
                <Col className="d-flex">

                  <h5>{facProp.address.comune.name}</h5><Badge className="sizeBadge">{facProp.address.comune.provincename.sign}</Badge>
                </Col>
              </Row>
              <Row>
                <Col className="overflow-hidden">
                  <Card.Text className="fs-6 text-break" style={{ maxHeight: '100px' }}>
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
            </Card.Body>
          </Col>
        </Row>

        <Row >
          <Col className="grid p-2  d-flex">
            {facProp.serviceFacility !== null ? facProp.serviceFacility.map((s) => {

              switch (s.id) {
                case 1: return <FaHouseFloodWaterCircleArrowRight key={s.id} title="carico acqua" />
                case 2: return <FaPlugCircleBolt key={s.id} title="allaccio corrente 220v" />;
                case 3: return <FaShower key={s.id} title="doccie" />
                case 4: return <div key={s.id} className="position-relative"><FaShower title="doccia calda" /> <Badge bg="danger" text="dark" className="position-absolute top-100 start-50  translate-middle badge rounded-pill bg-danger z-n0">hot</Badge></div>
                case 5: return <FaRestroom key={s.id} title="Bagni" />
                case 6: return <HiWifi key={s.id} title="WiFi" />
                case 7: return <GrUserPolice key={s.id} title="sorveglianza notturna" />
                case 8: return <GiFoundryBucket key={s.id} title="scarico cassetta" />
                case 9: return <FaTruckDroplet key={s.id} title="scarico acque grige" />
                case 10: return <BsShop title="Market" key={s.id} />
              }
            }) : ""

            }
          </Col>
        </Row>




      </Card >

    </Col>

  )
}

export default SingleCardFacility