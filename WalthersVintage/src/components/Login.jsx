import React, { useState, useEffect } from "react";
import { auth } from "../Data/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../components/AuthContext"; 
import { useNavigate } from "react-router-dom"; 

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");

    const { handleLogout, currentUser } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/min-side", { replace: true });
        }
    }, [currentUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Du er nu logget ind!");
                navigate("/min-side", { replace: true });
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Din konto er oprettet!");
            }
        } catch (err) {
            if (err.code === "auth/user-not-found") {
                setError("Bruger ikke fundet. Tjek dine oplysninger.");
            } else if (err.code === "auth/wrong-password") {
                setError("Forkert adgangskode. Prøv igen.");
            } else if (err.code === "auth/email-already-in-use") {
                setError("Denne email er allerede i brug.");
            } else {
                setError("Noget gik galt. Prøv igen.");
            }
        }
    };

    return (
        <div id="loginPage">
            <h1>{isLogin ? "Login" : "Opret Konto"}</h1>
            <p>Med en bruger på Walthers Vintage får du mulighed for at gemme dine kropsmål og nemt bruge dem, når du skal filtrere, så du ikke skal måle dig hver gang og medsende dem, når du lægger en specialbestilling.</p>
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
                        <button
                            type="button"
                            className='OvalKnap'
                            onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Opret en konto" : "Har allerede en konto? Login"}
                        </button>
                    </div>
                </div>
            </form>
            
            {currentUser && <button onClick={handleLogout}>Log ud</button>}
        </div>
    );
};

export default LoginPage;
