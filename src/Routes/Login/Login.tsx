import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from '../../main';

function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const isAuth = sessionStorage.getItem('AlanAIAuthToken') ? true : false;
    const auth = getAuth(firebaseApp);

    function toDashboard() {
        navigate(0);
        navigate("/dashboard");
    }

    async function authenticate() {
        await signInWithEmailAndPassword(auth, email, password)
            .then(credential => {
                sessionStorage.setItem('AlanAIAuthToken', credential.user.refreshToken)
                toDashboard();
            })
            .catch(e => {
                const code = e.code;
                const msg = e.message;
            });
    }

    async function signUp() {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(credential => {
                sessionStorage.setItem('AlanAIAuthToken', credential.user.refreshToken)
                toDashboard();
            })
            .catch(e => {
                const code = e.code;
                const msg = e.message;
            });
    }

    return ( 
        isAuth ?
            <Navigate to="/dashboard" /> :
            <div>
                <h1>Welcome to AlanAppointment!</h1> 
                    <label>
                        Email:
                        <input type="text" name="username" onChange={e => setEmail(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <br />
                    <button onClick={authenticate}>Login</button>
                    <button onClick={signUp}>Sign up</button>
            </div> 
    );
}

export default AuthPage;