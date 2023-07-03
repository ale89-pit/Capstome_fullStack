import { useEffect, useState } from "react";
import { Badge, Col, Container, Form, Row, ToggleButton } from "react-bootstrap"

import {FaHouseFloodWaterCircleArrowRight, FaPlugCircleBolt, FaRestroom, FaShower} from "react-icons/fa6"
import {HiWifi} from "react-icons/hi"
import {GrUserPolice} from "react-icons/gr"
import {BsShop} from "react-icons/bs"
import {GiFoundryBucket} from "react-icons/gi"
import {FaTruckDroplet} from "react-icons/fa6"
import { propTypes } from "react-bootstrap/esm/Image";
import { MdSignalCellularNull } from "react-icons/md";
import Checkbox from "./Checkbox";
import SelectProvinceComuni from "./SelectProvinceComuni";
import { useDispatch, useSelector } from "react-redux";
import { myHeadersToken } from "../redux/actions/userAction";
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

function FacilityForm () {
    const API_URL_NEW_FACILITY = "http://localhost:8080/app/facilities"
    const [checkboxValues, setCheckboxValues] = useState(Array(10).fill(false));
    const [idService,setIdService] = useState([])
    const dispatch = useDispatch()
    const formFacility = useSelector((state)=> (state.formFacility))

  const handleCheckboxChange = (index,newValue,value) => {
    // console.log(e)
    console.log(index)
    const newCheckboxValues = [...checkboxValues];
        newCheckboxValues[index] = newValue;
        setCheckboxValues(newCheckboxValues);
        if (newValue) {
            //se il valore è vero aggiunge alla lista di servizi
            setIdService((prevIdService) => [...prevIdService, index + 1]);
          } else {
            //se il valore da vero diventa falso lo toglie dalla lista
            setIdService((prevIdService) =>
              prevIdService.filter((id) => id !== index + 1)
            );
          }
    }
   
const sendNewFacility= async(e)=>{
    e.preventDefault()
    console.log(formFacility)
    try {
        const response = await fetch(API_URL_NEW_FACILITY,{
            method: "POST",
            headers: myHeadersToken,
            body: JSON.stringify(formFacility),
            redirect: "follow",
        })
        if(response.ok){
            dispatch(resetForm)
            alert("struttura inserita")
        }else{
            alert("errore fetch")
        }
    } catch (error) {
        
    }
}
 
    
  
  useEffect(()=>{
    dispatch(toggleService(idService))
    console.log(idService)
   },[checkboxValues])


     return (
        <Container className="w-100">
        <Form className="w-75 w-xl-50 mx-auto">
            <Form.Group className="mb-3  " controlId="exampleForm.ControlInputNome">
                <Form.Label className="fw-bolder text-light">Nome</Form.Label>
                <Form.Control type="text" placeholder="Mario" required plaintext className="border rounded text-light color-placeholder px-3"
                    autoFocus
                    name="nome"

                    onChange={(e) => dispatch(handlerName(e.target.value))}
                     />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInputCognome">
                <Form.Label className="fw-bolder text-light">Percorso foto</Form.Label>
                <Form.Control type="text" placeholder="http://percosofotoOnline" plaintext required className="border rounded text-light color-placeholder px-3"
                    name="percorso"
                    // value={registerForm.cognome}
                    onChange={(e) => dispatch(handlercover(e.target.value))}
                    />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInputEmail">
                <Form.Label className="fw-bolder text-light">Description</Form.Label>
                <Form.Control type="text" placeholder="Inserisci una breve descrizione della struttura" maxLength={255} required plaintext className="border rounded text-light color-placeholder px-3"
                    name="descr"
                    // value={registerForm.email}
                    onChange={(e) => dispatch(handlerDescr(e.target.value))}
                    />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInputEmail">
                <Form.Label className="fw-bolder text-light">Official site</Form.Label>
                <Form.Control type="text" placeholder="Inserisci una breve descrizione della struttura" maxLength={255} required plaintext className="border rounded text-light color-placeholder px-3"
                    name="descr"
                    // value={registerForm.email}
                    onChange={(e) => dispatch(handlerSite(e.target.value))}
                    />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInputUsername">
                <Form.Label className="fw-bolder text-light">Phone Number</Form.Label>
                <Form.Control type="text" placeholder="007123654" required plaintext className="border text-light color-placeholder px-3"
                    name="phone"
                    // value={registerForm.userName}
                    onChange={(e) => dispatch(handlerPhone(e.target.value))}
                    />
            </Form.Group>
            <Container >
                <Row className="justify-content-center">
                    <Col className="col-10 d-flex flex-wrap justy-content-center align-items-center">
            {/* <div className="d-flex my-2 align-items-stretch justify-content-center"> */}
            {checkboxValues.map((value, index) => ( <Checkbox
          key={index}
          label={
            (index+1) === 1 ? (<FaHouseFloodWaterCircleArrowRight />)
            : (index+1) === 2 ? (<FaPlugCircleBolt />)
            : (index+1) === 3 ? (<FaShower />)
            : (index+1) === 4 ? (
              <div className="position-relative ">
                <FaShower />
                <Badge bg="danger" text="dark" className="position-absolute top-100 start-50 translate-middle badge rounded-pill bg-danger z-n0">hot</Badge>
              </div>
            )
            : (index+1) === 5 ? (<FaRestroom />)
            : (index+1) === 6 ? (<HiWifi />)
            : (index+1) === 7 ? (<GrUserPolice />)
            : (index+1) === 8 ? (<GiFoundryBucket />)
            : (index+1) === 9 ? (<FaTruckDroplet />)
            : (<BsShop />)}
          id={index+1}      
          checked={value}
          value={index}
          onClick={(newValue)=>handleCheckboxChange(index,newValue,value)}
                
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

    <Form.Group className="mb-3  " controlId="exampleForm.ControlInputNome">
                <Form.Label className="fw-bolder text-light">Via/Piazza</Form.Label>
                <Form.Control type="text" placeholder="Mario" required plaintext className="border rounded text-light color-placeholder px-3"
                    autoFocus
                    name="nome"
                    // value={registerForm.nome}
                    onChange={(e)=>dispatch(handlerStreet(e.target.value))}
                     />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInputCognome">
                <Form.Label className="fw-bolder text-light">Civico</Form.Label>
                <Form.Control type="number" placeholder="http://percosofotoOnline" plaintext required className="border rounded text-light color-placeholder px-3"
                    name="cognome"
                    // value={registerForm.cognome}
                    onChange={(e)=>dispatch(handlerStreetNumber(e.target.value))}
                    />
            </Form.Group>

            <button onClick={sendNewFacility}type="submit" className="m-2 button">Invia</button>
            <button type="reset" value="Reset Form" className="m-2 button" onClick={()=>(dispatch(resetForm()))} >Reset</button>
            {/* <button  type="submit" className="m-2 button" >Modifica</button>
            <button type="reset" value="Reset Form" className="m-2 button bg-warnig" >Cancella</button> */}
        </Form>




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