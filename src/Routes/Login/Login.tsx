import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../main";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AlanButton } from "@alan-ai/alan-sdk-web/dist/AlanButton";
import { initAlanBtn } from "../../App";

function AuthPage () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const isAuth = sessionStorage.getItem('AlanAIAuthToken') ? true : false;
  const auth = getAuth(firebaseApp);
  const isAuth = auth?.currentUser;
  console.log(isAuth);

  useEffect(() => {
    initAlanBtn();
    ((window as any).alanBtnInstance as AlanButton).setVisualState({ screen: "Login" });
  }, []);

  function toDashboard () {
    navigate(0);
    navigate("/dashboard");
  }

  async function authenticate () {
    await signInWithEmailAndPassword(auth, email, password)
      .then(credential => {
        toDashboard();
      })
      .catch(e => {
        const msg = e.message;
        alert(msg);
      });
  }

  async function signUp () {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(credential => {
        toDashboard();
      })
      .catch(e => {
        const msg = e.message;
        alert(msg);
      });
  }

  return (
    isAuth
      ? <Navigate to="/dashboard" />
      : <div className="d-flex justify-content-center Login">
                <Card className="p-3 mt-1">
                    <h1>Welcome to AlanAppointment!</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
                            <Form.Text className="text-muted">
                                We&aposll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" onClick={authenticate}>
                            Login
                        </Button>
                        <Button variant="success" className="mx-2" onClick={signUp}>
                            Sign Up
                        </Button>
                    </Form>
                </Card>
            </div>
  );
}

export default AuthPage;
