import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { MdOutlineSettings } from "react-icons/md";
import {PiGlobeStand} from "react-icons/pi"
import {TbLogout2,TbLogin} from "react-icons/tb"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const isLogged = useSelector((state)=>state.login.isLogged)
    const navigate = useNavigate();
    const visibilityRegister = isLogged? "d-none":"d-block";
    const goHome= ()=>{
    navigate("/Home")
}

    return (
        <Navbar expand="lg" className="navSpace navbar-dark ">
            <Container fluid>
                <Navbar.Brand href="#home"><img src="./giramondo.png" className="logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto bg-lg-none ">

                        <Nav.Link onClick={()=>goHome()} className="color-link">Home</Nav.Link>
                        <Nav.Link onClick={()=>navigate("/")} className={`${visibilityRegister} color-link`}  >Register</Nav.Link>
                        <Nav.Link onClick={()=>navigate("/LogIn")} 
                        className="color-link" >
                            <TbLogin className="color-link" />LogIn</Nav.Link>
                    </Nav>
                    <img className="imgUser" src="http://placekitten.com/200/300" />                    <Nav className="bg-none me-5">
                        <NavDropdown  title={<span className="custom-dropdown-title">menu</span>}  menuProps={{ className: "custom-dropdown-arrow" }} id="basic-nav-dropdow " className="bg-none me-5 " >
                            
                            <NavDropdown.Item   href="#action/3.1">
                            <Nav.Link className="color-link" ><MdOutlineSettings />Impostazioni</Nav.Link></NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                            <Nav.Link className="color-link" > <PiGlobeStand />    Preferiti</Nav.Link>
                            </NavDropdown.Item>
                            
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                            <Nav.Link className="color-link" >  <TbLogout2 /> LogOut</Nav.Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar