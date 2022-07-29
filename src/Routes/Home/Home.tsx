import { Navigate } from "react-router-dom";

function Home() {
    function handleClick() {
        return (<Navigate to="/home" />);
    }

    return(
        <div>
            <h1>Welcome to AlanAppointments!</h1>
            <button onClick={handleClick}>Login</button>
        </div>
    ) 
}

export default Home;