import { CDBSidebarFooter } from 'cdbreact'
import { CDBBtn, CDBIcon, CDBBox } from 'cdbreact';
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <CDBSidebarFooter className="shadow">
            <CDBBox
                display="flex"
                justifyContent="between"
                alignItems="center"
                className="mx-auto py-4 flex-wrap"
                style={{ width: '80%' }}
            >
                <CDBBox display="flex" alignItems="center">
                    <a href="/" className="d-flex align-items-center p-0 text-dark">
                        <img
                            alt="logo"
                            src="./logo.jpg"
                            width="30px"
                        />
                        <span className="ms-4 h5 mb-0 font-weight-bold">Giramondo</span>
                    </a>
                    <small className="ms-2">&copy;Alessio Pitorri, {new Date().getFullYear()}. All rights reserved.</small>
                </CDBBox>
                <CDBBox display="flex">
                    <CDBBtn flat color="dark" className="p-2">
                        <CDBIcon fab icon="facebook-f" />
                    </CDBBtn>
                    <CDBBtn flat color="dark" className="mx-3 p-2">
                        <CDBIcon fab icon="twitter" />
                    </CDBBtn>
                    <CDBBtn flat color="dark" className="p-2">
                        <CDBIcon fab icon="instagram" />
                    </CDBBtn>
                </CDBBox>
            </CDBBox>
        </CDBSidebarFooter>

    )
}

export default Footer