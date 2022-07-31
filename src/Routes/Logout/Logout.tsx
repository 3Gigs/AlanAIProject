import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../../main"
import Card from "react-bootstrap/Card"

function Logout() {
    const auth = getAuth(firebaseApp)
    let navigate = useNavigate();

    signOut(auth).then(() => {
        alert("Signed out!");
        sessionStorage.removeItem("AlanAIAuthToken");
        navigate("/")
    })
    .catch((e) => {
        alert(e.message);
        return(
            <div>
                <h1>There was an error while trying to log you out!</h1>
                <Card>
                    <Card.Body>
                        <Card.Title>{e.message}</Card.Title>
                        <Card.Text>{e.code}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    });

    return <h1>Logging you out...</h1>
}

export default Logout;