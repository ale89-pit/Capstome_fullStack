import { useEffect, useState } from "react";
import { Button, Col, Row, Form, Card } from "react-bootstrap";
import { myHeaders, myHeadersToken } from "../redux/actions/userAction";

import { Multiselect } from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from "react-redux";
import { getAllFacility, handlerFacility } from "../redux/actions/facilityAction";

const Search = () => {

    // const facility = useSelector((state) => state.facility.facility);
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState();
    const [querySearch, setQuerySearch] = useState()
    const [filterType, setFilterType] = useState([]);

    const API_URL_QUERY_SEARCH = `http://localhost:8080/app/search?desc=${querySearch}&tit=${querySearch}`

    const API_URL_ALL_COMUNI = "http://localhost:8080/app/allComuni"

    const API_URL_FACILITY_BY_COMUNE = "http://localhost:8080/app/search/comune/"
    const [comuni, setComuni] = useState();

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
        if (comuni == null) {

            getAllComuni();

        }
    }, [querySearch, filterType])

    return (
        <Col className="jumbotron jumbotron-fluid d-flex  mb-0  mt-5 p-0" id="search">
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

        </Col>
    );
}

export default Search;