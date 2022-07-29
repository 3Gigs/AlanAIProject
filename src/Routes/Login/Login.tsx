import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function authenticate() {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then(credential => {
                
            })
            .catch(e => {
                const code = e.code;
                const msg = e.message;
            });
    }

    async function signUp() {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(credential => {

            })
            .catch(e => {
                const code = e.code;
                const msg = e.message;
            });
    }

    return (
        <div>
            <h1>Welcome to AlanAppointment!</h1> 
            <form onSubmit={authenticate}>
                <label>
                    Username:
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
            </form>
        </div>
    );
}

function Login() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setIsAuth(getAuth() ? true : false);
    }, [isAuth]);

    if(getAuth() !== null) {
        return (
            <Navigate to="/dashboard" />
        )
    }
    else {
        return <AuthPage />
    }
}

export default Login;