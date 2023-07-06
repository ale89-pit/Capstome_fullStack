import { useParams } from "react-router-dom";
import FacilityForm from "./FacilityForm";
import { useEffect, useState } from "react";
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

} from "../redux/actions/formFacilityAction"
import { useDispatch } from "react-redux";

function ModifyFacility() {
    const dispatch = useDispatch();
    const param = useParams()
    const [dataService, setDataService] = useState([])

    let id = param.id


    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const getFacilityToModify = async () => {
        try {
            const response = await fetch("http://localhost:8080/app/" + id, requestOptions);
            const data = await response.json();
            console.log(data)
            dispatch(handlerName(data.name));
            dispatch(handlercover(data.cover));
            dispatch(handlerDescr(data.description));
            dispatch(handlerPhone(data.phoneNumber));
            dispatch(handlerSite(data.officialSite));

            const newDataService = data.serviceFacility.map(element => element.id);
            setDataService(newDataService);
            console.log(newDataService)
            dispatch(toggleService(newDataService));

            dispatch(handlerType(data.type));

            dispatch(handlerStreet(data.address.street));
            dispatch(handlerStreetNumber(data.address.streetNumber));

        } catch (error) {
            console.log('error', error);
        }
    };
    useEffect(() => {
        getFacilityToModify()
    }, [id]);

    return (
        <FacilityForm />
    )
}

export default ModifyFacility;