import { useEffect } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { MdOutlineSettings } from "react-icons/md";
import { PiGlobeStand } from "react-icons/pi"
import { TbLogout2, TbLogin } from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetUser, userProfile } from "../redux/actions/userAction";
import { logOut } from "../redux/actions/loginAction";
import { resetFacility } from "../redux/actions/facilityAction";
import { resetForm } from "../redux/actions/formFacilityAction";


function NavBar() {
    // const isLogged = useSelector((state)=>state.login.isLogged)
    const isLogged = useSelector((state) => state.login.isLogged)
    const loadProfile = useSelector((state) => state.login.loadProfile)
    const navigate = useNavigate();
    const visibilityRegister = isLogged ? "d-none" : "d-block";
    const username = useSelector((state) => state.user.userName)
    const profile = useSelector((state) => state.login.profile)
    const photoProfile = isLogged ? profile?.photoProfile : null


    const dispatch = useDispatch()

    const puliziaStato = () => {

        dispatch(logOut());

        dispatch(resetUser())
        navigate("/")

    }
    const goToaddFacility = (e) => {
        e.preventDefault()
        navigate("/add")
        dispatch(resetForm())

    }


    useEffect(() => {
        if (isLogged) {

            dispatch(userProfile(username))
        }

    }, [!isLogged, photoProfile])

    return (
        <Navbar expand="lg" className=" navbar-light bg-light fixed-top  px-3">
            <Container fluid className="bg-light mx-auto p-0 ">
                <Nav.Link onClick={() => navigate("/")}>      <Navbar.Brand className="m-auto logo" >
                    <img src="./logo.jpg" className="logo" />
                </Navbar.Brand></Nav.Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto bg-lg-none align-items-center">

                        <Nav.Link onClick={() => navigate("/")} className="color-link">Home</Nav.Link>
                        <Nav.Link onClick={(e) => goToaddFacility(e)} className={`${isLogged ? "d-block" : "d-none"} color-link`}>Aggiungi nuova Struttura</Nav.Link>
                        <Nav.Link onClick={() => navigate("/register")} className={`${visibilityRegister} color-link`}  >Register</Nav.Link>

                    </Nav>
                    <span className="d-flex align-items-center">
                        <Nav className="bg-none w-100  align-items-center ">
                            {profile !== null ? (

                                <NavDropdown title={<span className="custom-dropdown-title ">{loadProfile ? profile[0].nome : ""}</span>} id="basic-nav-dropdow " className="me-5" >

                                    <NavDropdown.Item href="#action/3.1">
                                        <Nav.Link className="color-link" onClick={() => navigate("/profile")}><MdOutlineSettings />Impostazioni</Nav.Link></NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        <Nav.Link className="color-link" onClick={() => navigate("/preferences")} > <PiGlobeStand />    Preferiti</Nav.Link>
                                    </NavDropdown.Item>

                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        <Nav.Link className="color-link" onClick={puliziaStato}>  <TbLogout2 /> LogOut</Nav.Link>
                                    </NavDropdown.Item>
                                </NavDropdown>) : (<Nav.Link onClick={() => navigate("/LogIn")}
                                    className="color-link w-100" >
                                    <TbLogin className="color-link" />LogIn</Nav.Link>)}
                        </Nav>
                        <img className="imgUser m-2" src={loadProfile ? profile[0].photoProfile : ""}
                        // onError={(event) =>
                        // (event.target.src =
                        //     "https://cdn.icon-icons.com/icons2/1189/PNG/512/1490793840-user-interface33_82361.png%22")
                        // } 
                        />
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default NavBar