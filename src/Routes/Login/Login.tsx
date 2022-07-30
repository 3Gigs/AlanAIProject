import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from '../../main';

function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function authenticate() {
        const auth = getAuth(firebaseApp);

        await signInWithEmailAndPassword(auth, email, password)
            .then(credential => {
                sessionStorage.setItem('AlanAIAuthToken', credential.user.refreshToken)
                navigate("/dashboard");
            })
            .catch(e => {
                const code = e.code;
                const msg = e.message;
            });
    }

    async function signUp() {
        const auth = getAuth(firebaseApp);

        await createUserWithEmailAndPassword(auth, email, password)
            .then(credential => {
                sessionStorage.setItem('AlanAIAuthToken', credential.user.refreshToken)
                navigate("/dashboard");
            })
            .catch(e => {
                const code = e.code;
                const msg = e.message;
            });
    }

    return (
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