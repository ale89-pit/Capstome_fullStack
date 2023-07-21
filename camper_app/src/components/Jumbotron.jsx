import { useEffect, useState } from "react";
import { Button, Col, Row, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { myHeaders, myHeadersToken } from "../redux/actions/userAction";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { RiRoadMapFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { Multiselect } from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from "react-redux";
import { getAllFacility, handlerFacility } from "../redux/actions/facilityAction";
import Checkbox from "./Checkbox";


function Jumbotron() {
    const facility = useSelector((state) => state.facility.facility);
    const dispatch = useDispatch();
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

    return (
        <>

            <Row className="bgRoad">
                <Col xs={12} className=" mx-auto mt-5  text-center">

                    <img src={"./logo.jpg"}
                    />

                </Col>
                <Col className="align-items-stretch  d-md-flex" >
                    <span style={{ width: '18rem' }} className="mx-auto my-3">
                        <h4 className="text-center">Unisciti a noi!!!</h4>
                        <Card className="card-shadow bg-dark text-white h-md-100">
                            <Card.Body>

                                <Card.Title className="text-center"><BsFillChatSquareTextFill /></Card.Title>

                                <Card.Text>
                                    La nostra community è dedicata ai veri avventurieri on the road! Se ami esplorare il mondo con il tuo camper o qualsiasi altro mezzo, sei nel posto giusto.<Link to={"/register"} className="color-link" >Unisciti a noi</Link>
                                </Card.Text>
                                <Card.Link to={"/register"}>Register</Card.Link>
                                <Card.Link to={"/LogIn"}>LogIn </Card.Link>
                            </Card.Body>
                        </Card>
                    </span>
                    <span style={{ width: '18rem' }} className="mx-auto my-3">
                        <h4 className="text-center">Cerca le strutture per il tuo itinerario!!!</h4>
                        <Card className="card-shadow bg-dark text-white h-md-100">
                            <Card.Body>
                                <Card.Title className="text-center "><RiRoadMapFill /></Card.Title>

                                <Card.Text>
                                    Scopri le meraviglie nascoste di luoghi lontani, condividi le tue esperienze e scambia informazioni con altri viaggiatori appassionati
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </span>
                    <span style={{ width: '18rem' }} className="mx-auto my-3">
                        <h4 className="text-center">Conosci dei luighi interressanti e vuoi condividerli con noi?</h4>
                        <Card className="card-shadow bg-dark text-white h-md-100">
                            <Card.Body>
                                <Card.Title className="text-center"><FaUserFriends /></Card.Title>

                                <Card.Text>
                                    Insieme, possiamo creare una rete di conoscenza e supporto, Scopri itinerari unici, consigli preziosi e luoghi straordinari, condividi le tue foto e racconti, connettiti con la comunity
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </span>
                </Col>


            </Row>
            <Row>

                <Col className="jumbotron jumbotron-fluid d-flex  mb-2  mt-5 p-0">

                    <Card className="mx-auto w-75">
                        <Card.Header>
                            Conosci gia dove sosterai?
                        </Card.Header>
                        <Card.Body>
                            <p >Cerca il nome della struttura.</p>
                            <Form onSubmit={(e) => searchFacilityBySearchBar(e)} className="d-flex w-75 mb-5 justify-content-center align-items-center">

                                <Form.Control
                                    type="text"
                                    placeholder="Inserisci il nome o la località "
                                    onChange={(e) => {
                                        setQuerySearch(e.target.value)
                                    }}
                                /><Button type="submit">Search</Button>
                            </Form>
                            <div>
                                <p>Filtra per Comune</p>
                                {comuni && <Multiselect
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
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label="Camping"
                                value={"CAMPING"}
                                checked={filterType.includes("CAMPING")} // Imposta il valore "checked" in base allo stato "filteType"
                                onChange={() => handleCheckboxChange("CAMPING")}
                            />
                            <Form.Check // prettier-ignore
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
                                label="Free Parkin Area"
                                value={"FREE_PARKING_AREA"}
                                checked={filterType.includes("FREE_PARKING_AREA")} // Imposta il valore "checked" in base allo stato "filteType"
                                onChange={() => handleCheckboxChange("FREE_PARKING_AREA")}
                            />
                        </Card.Footer>
                    </Card>
                </Col>
            </Row >
            {/* <Row>

                <Col className="d-flex">

                    <Card className="mx-auto w-75">
                        <Card.Header>
                            Ricerca rapida per Regione
                        </Card.Header>
                        <Card.Body>
                            <p>regione</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}
        </>
    )
}
// Benvenuti nella nostra community dedicata ai veri avventurieri on the road! Se ami esplorare il mondo con il tuo camper o qualsiasi altro mezzo, sei nel posto giusto. Unisciti a noi e scopri le meraviglie nascoste di luoghi lontani, condividi le tue esperienze e scambia informazioni con altri viaggiatori appassionati

export default Jumbotron

// Preparati a intraprendere un percorso senza limiti, a esplorare terre sconosciute e a creare ricordi che dureranno per sempre. Unisciti a noi oggi stesso e sperimenta la
//                         libertà e l'avventura che solo i viaggi on the road possono offrire