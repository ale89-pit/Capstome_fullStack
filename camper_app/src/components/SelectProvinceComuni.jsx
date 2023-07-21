import { Form } from "react-bootstrap";
import { myHeadersToken } from "../redux/actions/userAction";
import { useEffect, useState } from "react";
import { handlerComune } from "../redux/actions/formFacilityAction"
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
function SelectProvinceComuni() {
    const location = useLocation()
    const [province, setProvince] = useState([]);
    const [comuni, setComuni] = useState([]);
    const dispatch = useDispatch();
    const facility = useSelector((state) => state.facility.singleFacility)
    const provinciaDefault = location.pathname !== "/add" ? facility.address.comune.provincename.name : "Provincia"
    const comuneDefault = location.pathname !== "/add" ? facility.address.comune.name : "Comune"

    const [selectedProvince, setSelectedProvince] = useState(provinciaDefault)


    const handleChangeProvince = (e) => {



        setSelectedProvince(e.target.value)

    }


    const getProvince = async () => {
        try {
            const response = await fetch("http://localhost:8080/app/province", {
                method: 'GET',
                headers: myHeadersToken,
                redirect: 'follow'
            });
            if (response.ok) {
                const data = await response.json();
                setProvince(data)

                if (location.pathname !== "/add") {
                    setSelectedProvince(facility.address.comune.provincename.sign)

                }// console.log(data)
            }
        } catch (error) {

        }

    }

    const getComuni = async () => {

        try {
            const response = await fetch("http://localhost:8080/app/comuni?sign=" + selectedProvince, {
                method: 'GET',
                headers: myHeadersToken,
                redirect: 'follow'
            });
            if (response.ok) {
                const data = await response.json();
                setComuni(data)
                // console.log(data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getProvince()

        if (location.pathname !== "/add") {
            dispatch(handlerComune(facility.address.comune.id))
        }

    }, [])
    return (
        <div className="d-flex">
            <span className="d-flex flex-column p-1 mx-1 align-items-center justify-content-center">
                {/* <Form.Label>Provincia</Form.Label> */}
                <Form.Select className="mx-2" onClick={getComuni} onChange={handleChangeProvince} aria-label="Default select example">
                    <option>{provinciaDefault}</option>



                    {province !== null ? province.map((p) =>
                        <option key={p.sign} value={p.sign}>{p.name}</option>)

                        : (<Form.Select aria-label="Default select example">
                            <option></option>
                        </Form.Select>)}

                </Form.Select>
            </span>
            <span className="d-flex flex-column p-1 mx-1 align-items-center justify-content-center">
                {/* <Form.Label>Comune</Form.Label> */}
                <Form.Select className="mx-2" onChange={(e) => dispatch(handlerComune(e.target.value))} aria-label="Default select example">
                    <option>{comuneDefault}</option>


                    {comuni !== null ? comuni.map((c) =>
                        <option key={c.id} value={c.id}>{c.name}</option>)

                        : (<Form.Select aria-label="Default select example">
                            <option></option>
                        </Form.Select>)}

                </Form.Select>
            </span>
        </div>
    )
}

export default SelectProvinceComuni