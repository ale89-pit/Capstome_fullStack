import { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
} from "react-bootstrap";

import {
  FaHouseFloodWaterCircleArrowRight,
  FaPlugCircleBolt,
  FaRestroom,
  FaShower,
} from "react-icons/fa6";
import { HiWifi } from "react-icons/hi";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import { GiFoundryBucket } from "react-icons/gi";
import { FaTruckDroplet } from "react-icons/fa6";
import Checkbox from "./Checkbox";
import SelectProvinceComuni from "./SelectProvinceComuni";
import { useDispatch, useSelector } from "react-redux";
import {
  myHeadersToken,
  myHeadersTokenPhoto,
} from "../redux/actions/userAction";
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
  handlerEmail,
} from "../redux/actions/formFacilityAction";
import { useHref, useLocation, useParams } from "react-router-dom";
import { resetFacility } from "../redux/actions/facilityAction";
import { MdCloudUpload } from "react-icons/md";

export const API_URL_ADD_PHOTO = "http://localhost:8080/app/facilities/image";
function FacilityForm({ serviceFromModify }) {
  const API_URL_NEW_FACILITY = "http://localhost:8080/app/facilities";
  const [checkboxValues, setCheckboxValues] = useState(Array(10).fill(false));
  const [idService, setIdService] = useState([]);
  const dispatch = useDispatch();
  const formFacility = useSelector((state) => state.formFacility);
  const service = useSelector((state) => state.formFacility.service);
  const facility = useSelector((state) => state.facility.singleFacility);
  let fd = new FormData();
  let [imgData, setImgData] = useState(null);
  let [urlImg, setUrlImg] = useState("");

  const location = useLocation();
  const visibility = location.pathname !== "/add" ? "d-block" : "d-none";
  const params = useParams();
  const updateChechboxValues = Array(10).fill(false);
  const typeDefault =
    location.pathname !== "/add" ? facility.facilityType : "Seleziona tipo";

  // controlla i servizi selezionati che saranno inviati nel Json
  const handleCheckboxChange = (index, newValue, value) => {
    // console.log(e)

    const newCheckboxValues = [...checkboxValues];
    console.log("sono nell'hanldCheckboxChange");
    newCheckboxValues[index] = newValue;
    setCheckboxValues(newCheckboxValues);
    if (newValue) {
      //se il valore è vero aggiunge alla lista di servizi
      setIdService((prevIdService) => [...prevIdService, index + 1]);
      console.log(idService + " handleChange");
    } else {
      //se il valore da vero diventa falso lo toglie dalla lista
      setIdService((prevIdService) =>
        prevIdService.filter((id) => id !== index + 1)
      );
    }
  };

  const updateCheckBox = () => {
    console.log("sto aggiornando lo stato delle checkbox");
    console.log(
      serviceFromModify +
      "questi sono i servizi che gli passo appena il componente entra in /add/idFacility"
    );
    console.log(formFacility.service);
    let newIdService = [];
    if (formFacility.service.length !== 0) {
      formFacility.service.forEach((element) => {
        if (element >= 1 && element <= 10) {
          console.log("setto i valori della checqbox");
          newIdService = [...newIdService, element];

          updateChechboxValues[element - 1] = true;
        }
      });
      setIdService(newIdService);
    }
    console.log("qui dovrei aggiornare lo stato delle checkbox");
    setCheckboxValues(updateChechboxValues);
  };

  //invio dei dati appena inseriti
  const sendNewFacility = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL_NEW_FACILITY, {
        method: "POST",
        headers: myHeadersToken,
        body: JSON.stringify(formFacility),
        redirect: "follow",
      });
      if (response.ok) {
        resetForm();
        alert("struttura inserita");
      } else {
        alert("errore fetch");
      }
    } catch (error) { }
  };

  //controllo il cambiamento dello stato del inputField
  const handleFile = (e) => {
    let file = e.target.files[0];
    setImgData(file);
    console.log(file);
    fd.append("file", file);
    setUrlImg(URL.createObjectURL(e.target.files[0]));
    console.log(fd.get("file"));
  };
  //salvo la foto in locale e il persoro sul database

  const sendPhotoFacility = async (e) => {
    e.preventDefault();

    console.log(fd.get("file"));
    try {
      const response = await fetch(API_URL_ADD_PHOTO, {
        method: "POST",
        headers: myHeadersTokenPhoto,
        body: fd,
        redirect: "follow",
      });
      if (response.ok) {
        //recupero l'indirro della foto appena salvata
        dispatch(handlercover(response.url + "/" + fd.get("file").name));
      } else if (response.status === 417) {
        alert("nome file gia esistente");
      } else if (response.status === 500) {
        alert("file troppo grande");
        alert("errore fetch");
      }
    } catch (error) { }
  };

  const modifyFacility = async (e) => {
    e.preventDefault();
    {
      try {
        const response = await fetch(API_URL_NEW_FACILITY + "/" + params.id, {
          method: "PUT",
          headers: myHeadersToken,
          body: JSON.stringify(formFacility),
          redirect: "follow",
        });
        if (response.ok) {
          alert("struttura modificata");
          dispatch(resetForm());
        }
        const data = await response.json();
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  // useEffect(() => {

  //   updateCheckBox()

  // }, [])

  // useEffect(() => {
  //   dispatch(toggleService(idService))

  //   if (location.pathname !== '/add') {

  //     updateCheckBox()

  //   }

  // }, [!formFacility.service]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(toggleService(idService));

    if (location.pathname !== "/add") {
      updateCheckBox();
    }
  }, []);

  useEffect(() => {
    dispatch(toggleService(idService));
  }, [checkboxValues]);
  useEffect(() => {
    if (imgData) {
      fd.set("file", imgData);
    }
  }, [imgData, fd]);

  // useEffect(() => {
  //   dispatch(toggleService(idService))
  //   if (location.pathname !== '/add') {
  //     updateCheckBox()
  //   }
  // }, [])
  // useEffect(() => {
  //   if (location.pathname !== '/add') {
  //     dispatch(toggleService(idService))
  //     updateCheckBox()

  //     console.log(checkboxValues)
  //   }
  // }, [formFacility])

  return (
    <Container className="w-75 facility_card">
      <Row className=" mx-auto JUstify-content-center align-items-center">
        <Col xs={12} md={6} className=" my-3">
          {/* <img className="w-100 h-100" variant="top" src={"/RegisterForm.jpg"} /> */}
          <form
            className=" upload_file"
            action=""
            onClick={() => document.querySelector(".input-field").click()}
          >
            <span className="d-flex justify-content-center align-items-center">
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleFile}
                className="input-field mx-2"
                id="formFileLg"
              />

              {imgData ? (
                <img src={urlImg} alt="img" className="w-100 " />
              ) : (
                <MdCloudUpload color="white" />
              )}
              <p className="text-white m-0">{location.pathname !== "/add" ? "Aggiorna cover struttura" : "Upload Cover"}</p>
            </span>
          </form>

          <Button
            className={imgData !== null ? "d-block" : "d-none"}
            onClick={(e) => sendPhotoFacility(e)}
          >
            Invia
          </Button>
        </Col>
        <Col xs={12} md={6} className="P-2">
          {location.pathname !== "/add" && (
            <img src={formFacility.cover} alt="img" className="w-100 " />
          )}
        </Col>
      </Row>
      <form className="cardFormFacility">
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={6} className="mb-4 ">
            <Form.Group
              className="mb-3  d-flex align-items-center justify-content-beetwen  "
              controlId="exampleForm.ControlInputNome"
            >
              <div className="text-center w-50 me-2">
                {/* <Form.Label className="form-label">Nome struttura</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Nome struttura"
                  required
                  plaintext
                  className="border rounded  color-placeholder px-3"
                  autoFocus
                  name="nome"
                  value={
                    location.pathname !== "/add"
                      ? formFacility.name
                      : formFacility.name
                  }
                  onChange={(e) => dispatch(handlerName(e.target.value))}
                />
              </div>

              <div class="text-center w-50">
                {/* <Form.Label className=" form-label">Tipo</Form.Label> */}
                <Form.Select
                  onChange={(e) => dispatch(handlerType(e.target.value))}
                  className="my-2"
                  aria-label="Tipo"
                >
                  <option>{typeDefault}</option>
                  <option value="CAMPING">Campeggio</option>
                  <option value="PARKING_AREA">Parking Area</option>
                  <option value="FREE_PARKING_AREA">Free Parking Area</option>
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group
              className="mb-3 text-center"
              controlId="exampleForm.ControlInputEmail"
            >
              {/* <Form.Label className=" form-label">Descrizione</Form.Label> */}
              <Form.Control
                as="textarea"
                rows={7}
                placeholder="Inserisci descrizione della struttura"
                required
                plaintext
                className="border rounded color-placeholder px-3"
                name="descr"
                value={
                  location.pathname !== "/add"
                    ? formFacility.description
                    : formFacility.description
                }
                onChange={(e) => dispatch(handlerDescr(e.target.value))}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Label className=" form-labeltext-center w-100">
              Indirizzo
            </Form.Label>
            <div className="border dorder-secondary p-2">
              <SelectProvinceComuni />

              <Form.Group
                className="mb-3  text-center d-flex"
                controlId="exampleForm.ControlInputNome"
              >
                <div className="w-75 me-1">
                  {/* <Form.Label className=" form-label">Via/Piazza</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Via/piazza/Stale"
                    required
                    plaintext
                    className="border rounded  color-placeholder px-3"
                    autoFocus
                    name="indirizzo"
                    value={
                      location.pathname !== "/add"
                        ? formFacility.address.street
                        : formFacility.address.street
                    }
                    onChange={(e) => dispatch(handlerStreet(e.target.value))}
                  />
                </div>
                <div className="w-25">
                  {/* <Form.Label className=" form-label">Civico</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="civico"
                    plaintext
                    required
                    className="border rounded color-placeholder px-3"
                    name="civico"
                    value={
                      location.pathname !== "/add"
                        ? formFacility.address.streetNumber
                        : formFacility.address.streetNumber
                    }
                    onChange={(e) =>
                      dispatch(handlerStreetNumber(e.target.value))
                    }
                  />
                </div>
              </Form.Group>
            </div>
            <span className="d-flex flex-column justify-content-center align-items-center">
              <Form.Label className=" form-label text-center mt-1">
                Contatti
              </Form.Label>
              <Form.Group
                className=" p-2 text-center d-flex border dorder-secondary"
                controlId="exampleForm.ControlInputEmail"
              >
                <div className="w-50 mx-1">
                  {/* <Form.Label className=" form-label">Official site</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Official Site"
                    maxLength={255}
                    required
                    plaintext
                    className="border rounded color-placeholder px-3"
                    name="officialsitel"
                    value={
                      location.pathname !== "/add"
                        ? formFacility.officialSite
                        : formFacility.officialSite
                    }
                    onChange={(e) => dispatch(handlerSite(e.target.value))}
                  />
                </div>
                {/* <Form.Group className="mb-3 text-center" controlId="exampleForm.ControlInputUsername"> */}
                <div className="w-50 mx-1">
                  {/* <Form.Label className="  form-label">Telefono</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Telefono"
                    required
                    plaintext
                    className="border rounded color-placeholder px-3"
                    name="phone"
                    value={
                      location.pathname !== "/add"
                        ? formFacility.phoneNumber
                        : formFacility.phoneNumber
                    }
                    onChange={(e) => dispatch(handlerPhone(e.target.value))}
                  />
                  {/* </Form.Group> */}
                </div>
                <div className="w-50 mx-1">
                  {/* <Form.Label className="  form-label">Email</Form.Label> */}
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    plaintext
                    className="border rounded color-placeholder px-3"
                    name="email"
                    value={
                      location.pathname !== "/add"
                        ? formFacility.email
                        : formFacility.email
                    }
                    onChange={(e) => dispatch(handlerEmail(e.target.value))}
                  />
                </div>
              </Form.Group>
            </span>
          </Col>
          <Col>
            <Container>
              <Row className="justify-content-center">
                <Form.Label>Servizi</Form.Label>
                <Col className="col-12 p-3 mx-auto d-flex flex-wrap justify-content-center align-items-center border border-secondary">
                  {checkboxValues.map((value, index) => (
                    <Checkbox
                      key={index}
                      label={
                        index + 1 === 1 ? (
                          <FaHouseFloodWaterCircleArrowRight title="carico acqua" />
                        ) : index + 1 === 2 ? (
                          <FaPlugCircleBolt title="allaccio corrente 220v" />
                        ) : index + 1 === 3 ? (
                          <FaShower title="doccie" />
                        ) : index + 1 === 4 ? (
                          <div className="position-relative ">
                            <FaShower title="doccia calda" />
                            <Badge
                              bg="danger"
                              text="dark"
                              className="position-absolute opacity-75 top-50 start-50 translate-middle badge rounded-pill bg-danger z-n0"
                            >
                              hot
                            </Badge>
                          </div>
                        ) : index + 1 === 5 ? (
                          <FaRestroom title="Bagni" />
                        ) : index + 1 === 6 ? (
                          <HiWifi title="WiFi" />
                        ) : index + 1 === 7 ? (
                          <GiPoliceOfficerHead title="sorveglianza notturna" />
                        ) : index + 1 === 8 ? (
                          <GiFoundryBucket title="scarico cassetta" />
                        ) : index + 1 === 9 ? (
                          <FaTruckDroplet title="scarico acque grige" />
                        ) : (
                          <BsShop title="Market" />
                        )
                      }
                      descr={

                        index + 1 === 1 ? (
                          "Acqua"
                        ) : index + 1 === 2 ? (
                          " 220v"
                        ) : index + 1 === 3 ? (
                          "Doccie"
                        ) : index + 1 === 4 ? (
                          "Doccia calda"
                        ) : index + 1 === 5 ? (
                          "Bagni"
                        ) : index + 1 === 6 ? (
                          "WiFi"
                        ) : index + 1 === 7 ? (
                          "Sorveglianza notturna"
                        ) : index + 1 === 8 ? (
                          "Scarico cassetta"
                        ) : index + 1 === 9 ? (
                          "Scarico acque grige"
                        ) : (
                          "Market"
                        )
                      }
                      id={index}
                      checked={value}
                      value={index}
                      onClick={(newValue) =>
                        handleCheckboxChange(index, newValue, value)

                      }


                    />
                  ))}
                </Col>
              </Row>
            </Container>
          </Col>
          <Row>
            <Col xs={12}>
              <span className="d-flex">
                <button
                  onClick={sendNewFacility}
                  type="submit"
                  className={`m-2 btn btn-primary ${location.pathname !== "/add" ? " d-none" : "d-block"
                    }`}
                >
                  Invia
                </button>
                <button
                  type="reset"
                  value="Reset Form"
                  className={`m-2 btn btn-warning ${location.pathname !== "/add" ? " d-none" : "d-block"
                    }`}
                  onClick={() => dispatch(resetForm())}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  onClick={modifyFacility}
                  className={`m-2 btn btn-primary ${visibility}`}
                >
                  Modifica
                </button>
                <button
                  type="reset"
                  value="Reset Form"
                  className={`m-2 btn btn-danger ${visibility}`}
                >
                  Cancella
                </button>
              </span>
            </Col>
          </Row>
        </Row>
      </form>
    </Container>
  );
}

export default FacilityForm;

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
