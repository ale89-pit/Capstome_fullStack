import { useEffect } from "react";
import { getAllFacility } from "../redux/actions/facilityAction";
import { useDispatch, useSelector } from "react-redux";
import SingleCardFacility from "./SingleCardFacility";
import { Container } from "react-bootstrap";

function Home(){
    const dispatch = useDispatch()

    //recupero dallo stato tutte le strutture disponibili
    
    const allFacility = useSelector((state)=>state.facility.facility)

    useEffect(()=>{
        console.log("sto nello use effetc")
        dispatch(getAllFacility())
        console.log(allFacility)
    },[])
    return (
        <Container>
    {allFacility.map((f)=> <SingleCardFacility key={f.id} facProp={f} />) }
    </Container>
    )
}

export default Home;