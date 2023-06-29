import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"


function NavBar() {
    return (
        <Navbar expand="lg" className=" navSpace">
            <Container fluid>
                <Navbar.Brand href="#home"><img src="./giramondo.png" className="logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto bg-lg-none ">

                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                    <Nav className="bg-none me-5">
                        <NavDropdown title="User" id="basic-nav-dropdow " className="bg-none me-5" >
                            <img className="imgUser" src="http://placekitten.com/200/300" />
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar