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
    const provinciaDefault = location.pathname !== "/add" ? facility.address.comune.provincename.sign : ""
    const comuneDefault = location.pathname !== "/add" ? facility.address.comune.id : ""

    const [selectedProvince, setSelectedProvince] = useState(provinciaDefault)
    console.log(facility)

    const handleChangeProvince = (e) => {
        console.log(e.target.value)


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
                    setSelectedProvince(provinciaDefault)
                    console.log(provinciaDefault + "provincia default")
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
            dispatch(handlerComune(comuneDefault))
        }

    }, [])
    return (
        <div className="d-flex">
            <select className="mx-2" onClick={getComuni} onChange={handleChangeProvince} aria-label="Default select example">
                <option>Provincia
                </option>


                {province !== null ? province.map((p) =>
                    <option key={p.sign} value={p.sign}>{p.name}</option>)

                    : (<Form.Select aria-label="Default select example">
                        <option></option>
                    </Form.Select>)}

            </select>
            <Form.Select className="mx-2" onChange={(e) => dispatch(handlerComune(e.target.value))} aria-label="Default select example">
                <option>Comune</option>


                {comuni !== null ? comuni.map((c) =>
                    <option key={c.id} value={c.id}>{c.name}</option>)

                    : (<Form.Select aria-label="Default select example">
                        <option></option>
                    </Form.Select>)}

            </Form.Select>
        </div>
    )
}

export default SelectProvinceComuni