import { useEffect, useRef, useState } from "react";
import { Button, Col, Row, Form, Card } from "react-bootstrap";
import { myHeaders, myHeadersToken } from "../redux/actions/userAction";

import { Multiselect } from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from "react-redux";
import { getAllFacility, handlerFacility } from "../redux/actions/facilityAction";

import { Link, useParams } from "react-router-dom";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { RiRoadMapFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { Animator, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, ScrollContainer, ScrollPage, Sticky, StickyIn, ZoomIn, batch } from 'react-scroll-motion';

import { Link as ScrollLink, Element } from "react-scroll";
import Search from "./Search";



function Jumbotron() {
    const facility = useSelector((state) => state.facility.facility);
    const dispatch = useDispatch();
    const searchSectionRef = useRef(null)
    const [selectedItem, setSelectedItem] = useState();
    const [querySearch, setQuerySearch] = useState()
    const [filterType, setFilterType] = useState([]);

    const API_URL_QUERY_SEARCH = `http://localhost:8080/app/search?desc=${querySearch}&tit=${querySearch}`

    const API_URL_ALL_COMUNI = "http://localhost:8080/app/allComuni"

    const API_URL_FACILITY_BY_COMUNE = "http://localhost:8080/app/search/comune/"
    const [comuni, setComuni] = useState();
    const [regioni, setRegioni] = useState([]);

    const handleCheckboxChange = (value) => {
        // Crea una copia dell'array filterTypes
        const updatedFilterTypes = [...filterType];

        // Controlla se il valore è già presente nell'array
        const index = updatedFilterTypes.indexOf(value);

        // Se il valore è già presente, lo rimuovi dall'array
        // Altrimenti, lo aggiungi all'array
        if (index !== -1) {
            updatedFilterTypes.splice(index, 1);
        } else {
            updatedFilterTypes.push(value);
        }

        // Aggiorna lo stato con l'array aggiornato
        setFilterType(updatedFilterTypes);

    };


    const getAllComuni = async () => {
        try {
            let response = await fetch(API_URL_ALL_COMUNI, {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            })
            if (response.ok) {
                let result = await response.json()

                setComuni(result)




            }
        } catch (error) {

        }
    }
    const onRemove = () => {
        setSelectedItem(null)
        dispatch(getAllFacility())
    }

    const onSelect = async (selectedList, selectedItem) => {
        console.log(selectedItem.name + "selected")
        setSelectedItem(selectedItem.name)
        const getFacilityByComune = async () => {

            try {
                let response = await fetch(API_URL_FACILITY_BY_COMUNE + selectedItem.name, {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow",
                })
                if (response.ok) {
                    let result = await response.json()
                    console.log(result)
                    dispatch(handlerFacility(result))
                } else {
                    alert("nessuna struttura trovata")
                }
            } catch (error) {

            }
        }

        await getFacilityByComune();

    }

    // const filterResultComune = (e) => {
    //     e.preventDefault()
    //     let queryFilterFromComuni = []
    //     console.log("sto filtrando i risultati dei comuni" + querySearch)
    //     facility.filter((item) => {
    //         if (item.name.toLowerCase().includes(querySearch.toLowerCase()) || item.description.toLowerCase().includes(querySearch.toLowerCase())) {

    //             queryFilterFromComuni.push(item)
    //         }
    //     })
    //     console.log(queryFilterFromComuni)
    // }

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
                if (filterType.length > 0) {
                    // Se ci sono checkbox attive, filtra i risultati in base ai tipi selezionati

                    result = result.filter((facility) => filterType.includes

                        (facility.facilityType));
                }

                dispatch(handlerFacility(result))
                console.log(result)
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
        if (comuni == null) {

            getAllComuni();

        }

    }, [])
    useEffect(() => {

    }, [querySearch, filterType])

    const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
    const FadeUp = batch(Fade(), Move(), Sticky());
    const FadeUp2 = batch(Fade(-100, 100), Move(500, 200, 200, -500), Sticky());
    return (
        <>
            <ScrollContainer>
                <Row className="h-100 ">
                    <Col xs={12} className=" mx-auto mt-5 d-flex justify-content-center align-items-center  bgRoad text-center">

                        <img src={"./logo.jpg"}
                        />

                    </Col>

                </Row>
                <Row className="m-2 p-2">
                    <Col xs={12} className="  d-md-flex mb-5" >
                        <ScrollPage page={0}>
                            <Animator animation={FadeUp} className="w-100 m-0 bg-light" >
                                <div className="mx-auto my-3  d-flex" >

                                    <img src="https://citynews-today.stgy.ovh/~media/original-hi/37377055997333/road-trip-2.jpg" style={{ width: '50%', borderRadius: '15px' }} />

                                    <div className="d-flex flex-column justify-content-center align-items-center p-5">
                                        {/* <BsFillChatSquareTextFill /> */}


                                        <h3>
                                            Benvenuti su "Giramondo"! Il nostro sito è la casa virtuale di una comunità appassionata di viaggiatori on the road, nato per condividere  avventure, ispirarci reciprocamente e scoprire i luoghi più straordinari del mondo.</h3> <Link to={"/register"} className="color-link" >Unisciti a noi</Link>


                                        <Link to={"/LogIn"}>LogIn </Link>
                                    </div>
                                </div>
                            </Animator>
                        </ScrollPage>
                    </Col>
                </Row>
                <Row className="m-2 p-2">
                    <Col xs={12}>
                        <ScrollPage page={1}>
                            <Animator animation={FadeUp} className="w-100 m-0 bg-light">
                                <div className="mx-auto my-3  d-flex" >
                                    <div className="d-flex flex-column justify-content-center align-items-center p-5">
                                        {/* <RiRoadMapFill /> */}


                                        <h3>Scopri le meraviglie nascoste di luoghi lontani, condividi le tue esperienze e scambia informazioni con altri viaggiatori appassionati.</h3>
                                    </div>
                                    <img src="https://www.idoinitaly.it/wp-content/uploads/2018/03/Places-in-Italy-6-1024x687-1024x675.jpg" style={{ width: '50%', borderRadius: '15px' }} />
                                </div>
                            </Animator>
                        </ScrollPage>
                    </Col>
                </Row>
                <Row className="m-5 p-2">
                    <Col xs={12}>
                        <ScrollPage page={2}>
                            <Animator animation={FadeUp} className="w-100 m-0 bg-light">
                                <div className="mx-auto my-3  d-flex">
                                    <img src="https://img.freepik.com/free-photo/friends-warming-up-their-hands-around-camp-fire-after-hiking-mountains-retro-camper-van_482257-31583.jpg?w=996&t=st=1690046726~exp=1690047326~hmac=edd14479e260beaafb90f7950ee0ae65d5529ca18b8cba32198ee2af8e2db09c" style={{ width: '50%', borderRadius: '15px' }} />
                                    <div className="d-flex flex-column justify-content-center align-items-center p-5">
                                        {/* <FaUserFriends /> */}


                                        <h3> Insieme possiamo creare una rete di conoscenza e supporto. Scopri itinerari unici, consigli preziosi e luoghi straordinari, condividi le tue foto e i tuoi racconti, connettiti con la community!!!</h3>

                                    </div>
                                </div>
                            </Animator>
                        </ScrollPage>
                    </Col>

                </Row>
                <Row className="my-4 p-2">
                    {/* <Search /> */}
                    {/* <Col className="jumbotron jumbotron-fluid d-flex  mb-0  mt-5 p-0" >
                        <Card className="mx-auto w-75 bg-dark text-white" >
                            <Card.Header>
                                Sai già dove sosterai?
                            </Card.Header>
                            <Card.Body className="d-flex w-100">
                                <div className="d-flex flex-column w-100">
                                    <p>Cerca il nome della struttura.</p>
                                    <Form onSubmit={(e) => searchFacilityBySearchBar(e)} className="d-flex w-100 mb-5 justify-content-center align-items-center">

                                        <Form.Control
                                            className="w-100 mx-2"
                                            type="text"
                                            placeholder="Inserisci il nome o la località "
                                            onChange={(e) => {
                                                setQuerySearch(e.target.value)
                                            }}
                                        /><Button type="submit" className="mx-2">Search</Button>
                                    </Form>
                                </div>
                                <div className="d-flex flex-column ">
                                    <p>Filtra per Comune</p>
                                    {comuni && <Multiselect className="text-dark"
                                        options={comuni} // Options to display in the dropdown
                                        selectedValues={comuni.name
                                        }// Preselected value to persist in dropdown
                                        onSelect={onSelect}// Function will trigger on select event
                                        onRemove={onRemove}// Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                    />}
                                </div>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between">
                                Filtra per tipo
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Camping"
                                    value={"CAMPING"}
                                    checked={filterType.includes("CAMPING")} // Imposta il valore "checked" in base allo stato "filteType"
                                    onChange={() => handleCheckboxChange("CAMPING")}
                                />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Parking Area"
                                    value={"PARKING_AREA"}
                                    checked={filterType.includes("PARKING_AREA")} // Imposta il valore "checked" in base allo stato "filteType"
                                    onChange={() => handleCheckboxChange("PARKING_AREA")}
                                />
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                    label="Free Parking Area"
                                    value={"FREE_PARKING_AREA"}
                                    checked={filterType.includes("FREE_PARKING_AREA")} // Imposta il valore "checked" in base allo stato "filteType"
                                    onChange={() => handleCheckboxChange("FREE_PARKING_AREA")}
                                />
                            </Card.Footer>
                        </Card>

                    </Col> */}
                </Row >
            </ScrollContainer>
        </>
    )
}
// Benvenuti nella nostra community dedicata ai veri avventurieri on the road! Se ami esplorare il mondo con il tuo camper o qualsiasi altro mezzo, sei nel posto giusto. Unisciti a noi e scopri le meraviglie nascoste di luoghi lontani, condividi le tue esperienze e scambia informazioni con altri viaggiatori appassionati

export default Jumbotron

// Preparati a intraprendere un percorso senza limiti, a esplorare terre sconosciute e a creare ricordi che dureranno per sempre. Unisciti a noi oggi stesso e sperimenta la
//                         libertà e l'avventura che solo i viaggi on the road possono offrire