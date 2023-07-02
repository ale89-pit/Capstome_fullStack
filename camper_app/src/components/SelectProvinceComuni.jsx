import { Form } from "react-bootstrap";
import { myHeadersToken } from "../redux/actions/userAction";
import { useEffect, useState } from "react";
import {handlerComune} from "../redux/actions/formFacilityAction"
import { useDispatch } from "react-redux";
function SelectProvinceComuni(){
const [province,setProvince] = useState([]);
const [comuni,setComuni] = useState([]);
const [selectedProvince,setSelectedProvince]= useState("")
const dispatch =useDispatch();


 const handleChangeProvince = (e)=>{
    console.log(e.target.value)
    setSelectedProvince(e.target.value)
 }
 

 const handlerProvince = async ()=>{
    try {
        const response = await fetch("http://localhost:8080/app/province",{
            method: 'GET',
            headers: myHeadersToken,
            redirect: 'follow'
        });
        if(response.ok){
        const data = await response.json();
        setProvince(data)
        // console.log(data)
        }
    } catch (error) {
        
    }

 } 

 const handleComuni = async (e)=>{
    e.preventDefault()
    try {
        const response = await fetch("http://localhost:8080/app/comuni?sign="+selectedProvince,{
            method: 'GET',
            headers: myHeadersToken,
            redirect: 'follow'
        });
        if(response.ok){
        const data = await response.json();
        setComuni(data)
        // console.log(data)
        }
    } catch (error) {
        
    }
 }
 
 useEffect(()=>{
    handlerProvince()
 },[])
    return(
        <>
    <Form.Select className="my-2" onChange={handleChangeProvince} onClick={handleComuni} aria-label="Default select example">
    <option>Provincia</option>


       {province!== null?province.map((p)=>  
       <option  value={p.sign}>{p.name}</option>)

       :(<Form.Select aria-label="Default select example">
            <option>Provincia</option>
        </Form.Select>)}

    </Form.Select>
    <Form.Select className="my-2" onChange={(e)=>dispatch(handlerComune(e.target.value))} aria-label="Default select example">
    <option>Provincia</option>


       {comuni!== null?comuni.map((c)=>  
       <option  value={c.id}>{c.name}</option>)

       :(<Form.Select aria-label="Default select example">
            <option>Provincia</option>
        </Form.Select>)}

    </Form.Select>
        </>
    )
}

export default SelectProvinceComuni