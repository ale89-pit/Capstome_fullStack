import { useEffect, useState } from "react"
import { Badge, Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getSingleFacility, setSingleFacility } from "../redux/actions/facilityAction"
import { FaHouseFloodWaterCircleArrowRight, FaPlugCircleBolt, FaRestroom, FaShower } from "react-icons/fa6"
import { HiWifi } from "react-icons/hi"
import { GrUserPolice } from "react-icons/gr"
import { BsShop } from "react-icons/bs"
import { GiFoundryBucket } from "react-icons/gi"
import { FaTruckDroplet } from "react-icons/fa6"
import { MdSignalCellularNull } from "react-icons/md";
import { AiFillHome, AiFillPhone } from "react-icons/ai"
import { HiMapPin } from "react-icons/hi2"
import { ImMail3 } from "react-icons/im"
import { myHeaders, myHeadersToken } from "../redux/actions/userAction"



function DetailsFacility() {
    const isLogged = useSelector((state) => state.login.isLogged)
    const isLoading = useSelector((state) => state.facility.isLoading)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const detailFacility = useSelector((state) => state.facility.singleFacility)
    const [comments,setComments] = useState([])
    const profile = useSelector((state) => state.login.profile);
    const user_Id = profile ? profile[0]?.id : null;
    
    
    
    
    console.log(comments)
    
    const API_URL_SEND_COMMENT = "http://localhost:8080/app/comments"
    
    const [formComment,setFormComment] = useState({
        
            user_id: user_Id,
             
             facility_id: id,
             
             title:"",
             
             body:""
             
    })
    
    const handleChange = (event) => {
        
        setFormComment({
            ...formComment,
            [event.target.name]: event.target.value
        });
    };
    const [showModalError, setShowModalError] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setShowModalError(false)
    }
    const handleShow = () => {
        if(!isLogged){
            setShowModalError(true)
        }else{

            setShow(true);
        }
    }
    const sendComment = async (e) => {
        e.preventDefault()
        console.log(formComment)
        try {
            const response = await fetch(API_URL_SEND_COMMENT,{
               method: 'POST',  
               headers: myHeadersToken,
               body: JSON.stringify(formComment),
               redirect: 'follow'
            })
            if(response.ok){
                alert("commento inviato")
                setFormComment({
                    user_id: user_Id,
                    
                    facility_id: id,
                    
                    title:"",
                    
                    body:""
                })
            }else{
                alert("fetch fallita")
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    const getComment =async ()=>{
try {
    const response = await fetch(API_URL_SEND_COMMENT + "/allBy?facility_id="+id,{
        method: 'GET',  
        headers: myHeaders,
        redirect: 'follow'
    })
    if(response.ok){
        const data = await response.json();
        setComments(data)
        // getComment()
        console.log("data",data)    
    }
} catch (error) {
    console.log('error', error);    
    
}
    }

    useEffect(() => {
        dispatch(getSingleFacility(id))
        getComment()
        console.log(detailFacility)
        
    }, [])

    useEffect(()=>{
        dispatch(setSingleFacility())
    },[id])
   
    return (
        <>
        <Container >
        {!isLoading && (
            <Row>
                <Card.Title className="text-center fs-1 fw-bolder mb-4">{detailFacility.name}</Card.Title>
                <Col className="cardDetailPhoto mb-4">
                    <Card.Img variant="top" src={detailFacility.cover} />
                </Col>
                <Col className="d-flex flex-column h-100 justify-content-beetwen mb-2">
                    <Card className="mb-2">
                        <Card.Header>Descrizione</Card.Header>
                        <Card.Body>

                            <Card.Text>
                                {detailFacility.description}
                            </Card.Text>

                        </Card.Body>
                    </Card>



                    <Card>
                        <Card.Header>Contatti</Card.Header>
                        <Card.Body>

                            <Card.Text className="align-items-center">
                                <AiFillHome />
                                <Link to={detailFacility.officialSite} target="_blank" >Official Site</Link>
                            </Card.Text>
                            <Card.Text className="align-items-center">
                                <AiFillPhone />
                                {detailFacility.phoneNumber}
                            </Card.Text>
                            <Card.Text className="align-items-center">
                            <Link target="_blank" to='javascript:void(0)'
      onClick={() => window.location =`mailto:${detailFacility.email}`}>    <ImMail3/>
                                {/* {detailFacility.email} */}
                                Contatta Struttura</Link>
                            </Card.Text>
                            <Card.Text className="d-flex align-items-center">
                                <HiMapPin />
                                <span className="m-1">
                                    {detailFacility.address.comune.name}
                                </span>-
                                <span className="m-1">
                                    {detailFacility.address.comune.provincename.sign}
                                </span>-
                                <span className="m-1">
                                    {detailFacility.address.comune.provincename.region}
                                </span>


                            </Card.Text>
                        </Card.Body>
                    </Card>






                </Col>
                <Row className="mx-auto d-flex justify-content-beetwen">
                    <Col className="p-0 justify-content-center">

                        <Card className=" mb-2">
                            <Card.Header>Servizi Struttura</Card.Header>
                            <Card.Body>

                                <Card.Text className="d-flex flex-row align-items-center jusify-content-center">
                                    {detailFacility.serviceFacility !== null ? detailFacility.serviceFacility.map((s) => {

                                        switch (s.id) {
                                            case 1: return <FaHouseFloodWaterCircleArrowRight title="carico acqua" />
                                            case 2: return <FaPlugCircleBolt title="allaccio corrente 220v" />;
                                            case 3: return <FaShower title="doccie" />
                                            case 4: return <div className="position-relative"><FaShower title="doccia calda" /> <Badge bg="danger" text="dark" className="position-absolute top-100 start-50  translate-middle badge rounded-pill bg-danger z-n0">hot</Badge></div>
                                            case 5: return <FaRestroom title="Bagni" />
                                            case 6: return <HiWifi title="WiFi" />
                                            case 7: return <GrUserPolice title="sorveglianza notturna" />
                                            case 8: return <GiFoundryBucket title="scarico cassetta" />
                                            case 9: return <FaTruckDroplet title="scarico acque grige" />
                                            case 10: return <BsShop title="Market" />
                                        }
                                    }) : <MdSignalCellularNull />

                                    }

                                </Card.Text>
                            </Card.Body>
                        </Card>



                    </Col>
                    <Col className="">
                        <Card className="justify-content-center mx-auto
                        ">
                            <Card.Header></Card.Header>
                            <Card.Body>

                                <Card.Text className="d-flex align-items-center">

                                    <Button variant="primary" onClick={handleShow}>commenta</Button>
                                    <Button className="btn btn-primary" onClick={!isLogged?handleShow:() => navigate("/add/" + detailFacility.id)}>modifica</Button>


                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row >
           <Col>

           {comments.map((comment)=>{
               return(
                   <Card className="mb-2">
                   
                       <Card.Header className="d-flex justify-content-between align-items-center">
                      <span> <img className="imgUser" src={comment.user.photoProfile}></img>
                        {comment.user.userName}</span>
                       <p>{comment.date}</p></Card.Header>
                       <Card.Title>{comment.title}</Card.Title>
                       <Card.Body>
                           {comment.body}
                       </Card.Body>
                   </Card>
           )})}
           </Col> 
            </Row >
            )}

            <Modal show={showModalError} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Effettua il login o registrati</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, ancora non fai parte della nosta famiglia! Cosa aspetti!!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to="/register" className="btn btn-primary"  >Register</Link>
          <Link to="/LogIn" className="btn btn-primary"  >LogIn</Link>
        </Modal.Footer>
      </Modal>

            
            <Modal show={show} onHide={handleClose}>
                    <Form onSubmit={sendComment}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Titolo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="name@example.com"
                                autoFocus
                                name="title"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Join</Form.Label>
                            <Form.Control as="textarea" rows={3}  onChange={handleChange} name="body"/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
                    </Form>
                
                
            </Modal>

        </Container >
        </>)

}

export default DetailsFacility


// {
//     "user_id":1,
     
//      "facility_id":1,
     
//      "title":"campeggio bellissimo",
     
//      "body":"Ho avuto il piacere di trascorrere qualche giorno presso il campeggio XYZ e devo dire che è stata un'esperienza davvero piacevole. Situato in una bellissima area naturale, il campeggio offre tutto ciò che si può desiderare per un soggiorno all'aria aperta."
//  }