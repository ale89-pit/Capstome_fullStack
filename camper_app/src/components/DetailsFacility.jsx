import { useEffect } from "react"
import { Badge, Button, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { getSingleFacility } from "../redux/actions/facilityAction"
import { FaHouseFloodWaterCircleArrowRight, FaPlugCircleBolt, FaRestroom, FaShower } from "react-icons/fa6"
import { HiWifi } from "react-icons/hi"
import { GrUserPolice } from "react-icons/gr"
import { BsShop } from "react-icons/bs"
import { GiFoundryBucket } from "react-icons/gi"
import { FaTruckDroplet } from "react-icons/fa6"
import { MdSignalCellularNull } from "react-icons/md";




function DetailsFacility() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const detailFacility = useSelector((state) => state.facility.singleFacility)
    console.log(id)


    useEffect(() => {
        dispatch(getSingleFacility(id))
        console.log(detailFacility)
    }, [id])
    return (

        <Card >
            <Card.Img variant="top" src={detailFacility.cover} />
            <Card.Body>
                <Card.Title>{detailFacility.name}</Card.Title>
                <Card.Text>
                    {detailFacility.description}
                </Card.Text>
                <Link href={detailFacility.officialSite} target="_blank" >{detailFacility.officialSite}</Link> <Link>{detailFacility.phoneNumber}</Link>
                <Button variant="primary">Go somewhere</Button>
                <div className="d-flex flex-row align-items-stretch jusify-content-center">
                    {detailFacility.serviceFacility !== null ? detailFacility.serviceFacility.map((s) => {

                        switch (s.id) {
                            case 1: return <FaHouseFloodWaterCircleArrowRight />
                            case 2: return <FaPlugCircleBolt />;
                            case 3: return <FaShower />
                            case 4: return <div className="position-relative"><FaShower /> <Badge bg="danger" text="dark" className="position-absolute top-100 start-50  translate-middle badge rounded-pill bg-danger z-n0">hot</Badge></div>
                            case 5: return <FaRestroom />
                            case 6: return <HiWifi />
                            case 7: return <GrUserPolice />
                            case 8: return <GiFoundryBucket />
                            case 9: return <FaTruckDroplet />
                            case 10: return <BsShop />
                        }
                    }) : <MdSignalCellularNull />

                    }
                </div>
            </Card.Body>
        </Card>)

}

export default DetailsFacility