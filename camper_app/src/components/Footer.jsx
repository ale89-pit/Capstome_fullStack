import { CDBSidebarFooter } from 'cdbreact'
import { CDBBtn, CDBIcon, CDBBox } from 'cdbreact';
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <CDBSidebarFooter className="w-100 " >
            <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '90%' }}>
                <CDBBox display="flex" justifyContent="around" className="flex-wrap">
                    <CDBBox alignSelf="center">
                        <a href="/" className="d-flex align-items-center p-0 text-dark">
                            <img alt="logo" src="./giramondo.png" width="30px" />
                            <span className="ms-3 h5 font-weight-bold">Giramondo</span>
                        </a>
                        <CDBBox className="mt-5" display="flex">
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
                    <CDBBox>
                        <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                            Giramondo
                        </p>
                        <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
                            <Link href="/">Resources</Link>
                            <Link href="/">About Us</Link>
                            <Link href="/">Contact</Link>
                            <Link href="/">Blog</Link>
                        </CDBBox>
                    </CDBBox>
                    <CDBBox>
                        <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                            Help
                        </p>
                        <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
                            <Link href="/">Support</Link>
                            <Link href="/">Sign Up</Link>
                            <Link href="/">Sign In</Link>
                        </CDBBox>
                    </CDBBox>
                </CDBBox>
                <small className="text-center mt-5 text-dark">&copy; Alessio Pitorri, {new Date().getFullYear()}. All rights reserved.</small>
            </CDBBox>
        </CDBSidebarFooter>
    )
}

export default Footer