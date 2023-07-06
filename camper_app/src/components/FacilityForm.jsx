import { useEffect, useRef, useState } from "react";
import { Badge, Button, Col, Container, Form, Row, ToggleButton } from "react-bootstrap"


import { FaHouseFloodWaterCircleArrowRight, FaPlugCircleBolt, FaRestroom, FaShower } from "react-icons/fa6"
import { HiWifi } from "react-icons/hi"
import { GrUserPolice } from "react-icons/gr"
import { BsShop } from "react-icons/bs"
import { GiFoundryBucket } from "react-icons/gi"
import { FaTruckDroplet } from "react-icons/fa6"
import { propTypes } from "react-bootstrap/esm/Image";
import { MdSignalCellularNull } from "react-icons/md";
import Checkbox from "./Checkbox";
import SelectProvinceComuni from "./SelectProvinceComuni";
import { useDispatch, useSelector } from "react-redux";
import { myHeaders, myHeadersToken, myHeadersTokenPhoto } from "../redux/actions/userAction";
import {
  handlerName,
  handlercover,
  handlerDescr,
  handlerPhone,
  handlerSite,
  toggleService,
  handlerType,
  handlerStreet,
  handlerStreetNumber,
  resetForm,

} from "../redux/actions/formFacilityAction"
import { useHref, useLocation, useParams } from "react-router-dom";

function FacilityForm() {
  const API_URL_NEW_FACILITY = "http://localhost:8080/app/facilities"
  const [checkboxValues, setCheckboxValues] = useState(Array(10).fill(false));
  const [idService, setIdService] = useState([])
  const dispatch = useDispatch()
  const formFacility = useSelector((state) => (state.formFacility))
  let fd = new FormData()
  let imgData = null



  const location = useLocation()
  const visibility = location.pathname !== "/add" ? "d-block" : "d-none"
  const params = useParams()
  const updateChechboxValues = Array(10).fill(false);




  // controlla i servizi selezionati che saranno inviati nel Json
  const handleCheckboxChange = (index, newValue, value) => {
    // console.log(e)

    const newCheckboxValues = [...checkboxValues];
    newCheckboxValues[index] = newValue;
    setCheckboxValues(newCheckboxValues);
    if (newValue) {
      //se il valore è vero aggiunge alla lista di servizi
      console.log(idService + " handleChange")
      setIdService((prevIdService) => [...prevIdService, index + 1]);
    } else {
      //se il valore da vero diventa falso lo toglie dalla lista
      setIdService((prevIdService) =>
        prevIdService.filter((id) => id !== index + 1)
      );
    }
  }


  const updateCheckBox = (() => {

    if (formFacility.service.length !== 0) {
      formFacility.service.forEach((element) => {
        if (element >= 1 && element <= 10) {
          setIdService((prevIdService) => [...prevIdService, element]);
          console.log(idService + " useEffect")
          updateChechboxValues[element - 1] = true;
        }
      });
    }
    setCheckboxValues(updateChechboxValues);
  });

  //invio dei dati appena inseriti
  const sendNewFacility = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(API_URL_NEW_FACILITY, {
        method: "POST",
        headers: myHeadersToken,
        body: JSON.stringify(formFacility),
        redirect: "follow",
      })
      if (response.ok) {
        dispatch(resetForm())
        alert("struttura inserita")
      } else {
        alert("errore fetch")
      }
    } catch (error) {

    }
  }



  //controllo il cambiamento dello stato del inputField
  const handleFile = (e) => {
    imgData = e.target.files[0];

    fd.append('file', imgData)



  }
  //salvo la foto in locale e il persoro sul database

  const sendPhotoFacility = async (e) => {
    e.preventDefault()


    try {
      const response = await fetch("http://localhost:8080/app/facilities/image", {
        method: "POST",
        headers: myHeadersTokenPhoto,
        body: fd,
        redirect: "follow",
      })
      if (response.ok) {

        //recupero l'indirro della foto appena salvata 
        dispatch(handlercover(response.url + "/" + fd.get("file").name));
        alert("foto aggiunta" + response.url + fd.get("file").name)
      } else if (response.status === 417) {
        alert("nome file gia esistente")
      } else if (response.status === 500) {
        alert("file troppo grande")
        alert("errore fetch")
      }
    } catch (error) {

    }
  }

  const modifyFacility = async (e) => {
    e.preventDefault()
    {
      try {
        const response = await fetch(API_URL_NEW_FACILITY + "/" + params.id, {
          method: "PUT",
          headers: myHeadersToken,
          body: JSON.stringify(formFacility),
          redirect: "follow",
        });
        if (response.ok) {
          alert("struttura modificata")
          dispatch(resetForm())
        }
        const data = await response.json();



      } catch (error) {
        console.log('error', error);
      }
    };
  }






  useEffect(() => {
    dispatch(toggleService(idService))



  }, [checkboxValues])




  return (
    <Container className="w-100">
      <Row className="cardRegister mx-auto">
        <Col>
          <Form className="w-75 w-xl-50 mx-auto">
            <Form.Group className="mb-3 text-center " controlId="exampleForm.ControlInputNome">
              <Form.Label className="fw-bolder form-label">Nome struttura</Form.Label>
              <Form.Control type="text" placeholder="Mario" required plaintext className="border rounded  color-placeholder px-3"
                autoFocus
                name="nome"
                value={formFacility.name}
                onChange={(e) => dispatch(handlerName(e.target.value))}
              />
            </Form.Group>
            <div class="text-center">
              <label for="formFileLg " class="form-label">Foto</label>
              <span className="d-flex"><input onChange={handleFile} class="form-control form-control-sm mx-2" id="formFileLg" type="file"></input>
                <Button onClick={(e) => sendPhotoFacility(e)}>Invia</Button></span>
            </div>

            <Form.Group className="mb-3 text-center" controlId="exampleForm.ControlInputEmail">
              <Form.Label className="fw-bolder form-label">Descrizione</Form.Label>
              <Form.Control as="textarea" placeholder="Inserisci  descrizione della struttura" maxLength={255} required plaintext className="border rounded color-placeholder px-3"
                name="descr"
                value={formFacility.description}
                onChange={(e) => dispatch(handlerDescr(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3 text-center" controlId="exampleForm.ControlInputEmail">
              <Form.Label className="fw-bolder form-label">Official site</Form.Label>
              <Form.Control type="text" placeholder="Https://www.example.com" maxLength={255} required plaintext className="border rounded color-placeholder px-3"
                name="descr"
                value={formFacility.officialSite}
                onChange={(e) => dispatch(handlerSite(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3 text-center" controlId="exampleForm.ControlInputUsername">
              <Form.Label className="fw-bolder form-label">telefono</Form.Label>
              <Form.Control type="text" placeholder="007123654" required plaintext className="border  color-placeholder px-3"
                name="phone"
                value={formFacility.phoneNumber}
                onChange={(e) => dispatch(handlerPhone(e.target.value))}
              />
            </Form.Group>
            <Container >
              <Row className="justify-content-center">
                <Col className="col-10 d-flex flex-wrap justy-content-center align-items-center">
                  {/* <div className="d-flex my-2 align-items-stretch justify-content-center"> */}
                  {checkboxValues.map((value, index) => (<Checkbox
                    key={index}
                    label={
                      (index + 1) === 1 ? (<FaHouseFloodWaterCircleArrowRight title="carico acqua" />)
                        : (index + 1) === 2 ? (<FaPlugCircleBolt title="allaccio corrente 220v" />)
                          : (index + 1) === 3 ? (<FaShower title="doccie" />)
                            : (index + 1) === 4 ? (
                              <div className="position-relative ">
                                <FaShower title="doccia calda" />
                                <Badge bg="danger" text="dark" className="position-absolute opacity-75 top-50 start-50 translate-middle badge rounded-pill bg-danger z-n0">hot</Badge>
                              </div>
                            )
                              : (index + 1) === 5 ? (<FaRestroom title="Bagni" />)
                                : (index + 1) === 6 ? (<HiWifi title="WiFi" />)
                                  : (index + 1) === 7 ? (<GrUserPolice title="sorveglianza notturna" />)
                                    : (index + 1) === 8 ? (<GiFoundryBucket title="scarico cassetta" />)
                                      : (index + 1) === 9 ? (<FaTruckDroplet title="scarico acque grige" />)
                                        : (<BsShop title="MArket" />)}
                    id={index}
                    // checked={value}
                    // onChanged={() => updateCheckBox()}
                    value={index}
                    onClick={(newValue) => handleCheckboxChange(index, newValue, value)}

                  />
                  ))}

                  {/* </div> */}
                </Col>
              </Row>
            </Container>

            <Form.Select onChange={(e) => dispatch(handlerType(e.target.value))} className="my-2" aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="CAMPING">Campeggio</option>
              <option value="PARKING_AREA">Parking Area</option>
              <option value="FREE_PARKING_AREA">Free Parking Area</option>
            </Form.Select>



            <SelectProvinceComuni />

            <Form.Group className="mb-3  text-center" controlId="exampleForm.ControlInputNome">
              <Form.Label className="fw-bolder form-label">Via/Piazza</Form.Label>
              <Form.Control type="text" placeholder="Via/piazza giacomo matteotti" required plaintext className="border rounded  color-placeholder px-3"
                autoFocus
                name="indirizzo"
                value={formFacility.address.street}
                onChange={(e) => dispatch(handlerStreet(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3 text-center" controlId="exampleForm.ControlInputCognome">
              <Form.Label className="fw-bolder form-label">Civico</Form.Label>
              <Form.Control type="text" placeholder="civico" plaintext required className="border rounded color-placeholder px-3"
                name="civico"
                value={formFacility.address.streetNumber}
                onChange={(e) => dispatch(handlerStreetNumber(e.target.value))}
              />
            </Form.Group>

            <button onClick={sendNewFacility} type="submit" className="m-2 button">Invia</button>
            <button type="reset" value="Reset Form" className="m-2 button" onClick={() => (dispatch(resetForm()))} >Reset</button>
            <button type="submit" onClick={modifyFacility} className={`m-2 button  ${visibility}`} >Modifica</button>
            <button type="reset" value="Reset Form" className={`m-2 button bg-warnig  ${visibility}`}  >Cancella</button>
          </Form>


        </Col>
      </Row>
    </Container>
  )
}

export default FacilityForm

// {
//     "name":"camping lupo",
//     "cover":"www.campeggio-solemg.com",
// 	"description":"Il campeggio offre un'esperienza immersa nella natura incontaminata dell'Italia. Situato ai piedi delle maestose montagne, il campeggio offre ampi spazi verdi, ideali per tende e camper. I visitatori possono godere di una ",
// 	"phoneNumber":"06540021",
// 	"officialSite":"www.campingluna.com",
// 	"service":[1,2,3,4,5,6,7,8,9],
// 	"facilityType":"CAMPING",
//     "address":{
//         "street":"via col vento",
//         "streetNumber":122,
//         "comune":5137
//     }
// }