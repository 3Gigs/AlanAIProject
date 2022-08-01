import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./reduxStore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { Auth, getAuth, User } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaJ9SH6y7-0z5BCqw1YZOuzmzIgcjxXB0",
  authDomain: "alanappointment-1898a.firebaseapp.com",
  projectId: "alanappointment-1898a",
  storageBucket: "alanappointment-1898a.appspot.com",
  messagingSenderId: "481710126514",
  databaseURL: "https://alanappointment-1898a-default-rtdb.firebaseio.com/",
  appId: "1:481710126514:web:b8616fd39f1b076dfb20ab"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp);
const initializeAuth = (auth: Auth) => new Promise<User | null>((resolve, reject) => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    unsubscribe();
    resolve(user);
  }, reject);
});

(async () => {
  await initializeAuth(getAuth(firebaseApp));

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
})();
