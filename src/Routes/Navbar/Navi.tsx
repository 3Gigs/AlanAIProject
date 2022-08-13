import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../../main";
import "../../Scss/navbar.scss";
import DropDown from "../../Components/DropDown";

function Navi () {
  const auth = getAuth(firebaseApp);
  const [email, setEmail] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setEmail(user.email);
      } else {
        setEmail("");
      }
    });
  }, []);

  return (
    <div>
      <nav id="Navbar">
        <div id="NavBrand">
          <Link to="/">
            <img src="/assets/calendar.svg" alt="Logo" id="NavLogo" />
          </Link>
        </div>
        <div id="NavContainerLeft">
          <Link to="/dashboard" className="NavItem">Dashboard</Link>
        </div>
        <div id="NavContainerRight">
          <button id="ThemeModeButton" className="NavItem">☀️</button>
          <DropDown toggle=
            {
              <span className="material-symbols-outlined IconAlignFix">
                account_circle
              </span>
            }
          >
            <div>
              {email
                ? <div>
                  <p>{email}</p>
                  <Link to="/logout">Logout</Link>
                </div>
                : <Link to="/login">Sign in</Link>
              }
            </div>
          </DropDown>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

// TODO: Replicate this navbar with own design
// <Navbar bg="light" expand="lg">
//     <Container>
//         <Navbar.Brand href="/">AlanAppointments</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//                 <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
//             </Nav>
//         </Navbar.Collapse>
//         {email
//           ? <Navbar.Collapse className="justify-content-end">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle icon-right-spacing" viewBox="0 0 16 16">
//                         <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
//                         <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
//                     </svg>
//                     <NavDropdown title={email} id="basic-nav-dropdown">
//                         <NavDropdown.Item href="/logout">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right icon-right-spacing" viewBox="0 0 16 16">
//                                 <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
//                                 <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
//                             </svg>
//                             Logout
//                         </NavDropdown.Item>
//                     </NavDropdown>
//             </Navbar.Collapse>
//           : <Nav.Link href="/login">Sign In</Nav.Link>
//         }
//     </Container>
// </Navbar>

export default Navi;
