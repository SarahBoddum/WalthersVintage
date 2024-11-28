import React, { useState } from "react";
import { auth } from "../Data/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../components/AuthContext"; // Importér useAuth fra AuthContext
import { useNavigate } from "react-router-dom"; // Importér useNavigate

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true); // Toggles between login and sign-up
    const [error, setError] = useState("");

    const { handleLogout, currentUser } = useAuth(); // Henter handleLogout og currentUser fra konteksten
    const navigate = useNavigate(); // Bruger useNavigate til at navigere til en ny side

    // Hvis brugeren allerede er logget ind, send dem til MinSide
    if (currentUser) {
        navigate("/min-side", { replace: true });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Du er nu logget ind!");
                navigate("/min-side", { replace: true }); // Send brugeren til MinSide
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Din konto er oprettet!");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div id="loginPage">
            <h1>{isLogin ? "Login" : "Opret Konto"}</h1>
            <p>Med en bruger på Walthers Vintage får du mulighed for at gemme dine kropsmål og nemt bruge dem, når du skal filtrere, så du ikke skal måle dig hver gang.</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form id='loginForm' onSubmit={handleSubmit}>
                <input
                    className="loginput"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="loginput"
                    type="password"
                    placeholder="Adgangskode"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div id="loginbtndiv">
                    <div className="loginbtn borderR">
                        <button className='OvalKnap' type="submit">{isLogin ? "Login" : "Opret Konto"}</button>
                    </div>
                    <div className="loginbtn">
                        <button className='OvalKnap' onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Opret en konto" : "Har allerede en konto? Login"}
                        </button>
                    </div>
                </div>
            </form>
            
            <button onClick={handleLogout}>Log ud</button> {/* Tilføj en logud-knap */}
        </div>
    );
};

export default LoginPage;
