import React, { useState, useEffect } from "react";
import { db, auth, setDoc, doc, getDoc } from "../Data/firebase"; // Firebase import
import { useAuth } from "../components/AuthContext"; // For at få brugerens autentificerede info
import Footer from "../components/Footer";

export const Minside = () => {
  const { currentUser, logout } = useAuth(); // Hent brugerens data og logout-funktion fra AuthContext
  const [bryst, setBryst] = useState("");
  const [talje, setTalje] = useState("");
  const [hofte, setHofte] = useState("");
  const [hojde, setHojde] = useState("");
  const [error, setError] = useState("");

  // Hent eksisterende mål, hvis de findes i Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setBryst(userData.bryst || "");
          setTalje(userData.talje || "");
          setHofte(userData.hofte || "");
          setHojde(userData.hojde || "");
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  // Log ud-knappen
  const handleLogout = async () => {
    try {
      await logout(); // Brug logout fra AuthContext (skal kalde signOut(auth))
      alert("Du er nu logget ud!");
      console.log("Logout success"); // Debugging
    } catch (error) {
      console.error("Fejl ved log ud:", error.message);
      setError("Kunne ikke logge ud. Prøv igen senere.");
    }
  };

  // Simpel test af logout for debugging
  const testLogout = async () => {
    try {
      await auth.signOut(); // Direkte kald til Firebase Authentication
      console.log("Logout virker!"); // Hvis dette virker, kan problemet være i AuthContext
    } catch (err) {
      console.error("Fejl:", err.message);
    }
  };

  // Gem mål i Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bryst || !talje || !hofte || !hojde) {
      setError("Alle felter skal udfyldes.");
      return;
    }

    try {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(
          userDocRef,
          {
            bryst,
            talje,
            hofte,
            hojde,
          },
          { merge: true } // Merge = opdater kun de felter, der er ændret
        );

        alert("Dine mål er gemt!");
      } else {
        setError("Du skal være logget ind for at gemme dine mål.");
      }
    } catch (error) {
      console.error("Fejl ved gemning af data:", error.message);
      setError("Der opstod en fejl. Prøv igen.");
    }
  };

  return (
    <div id="minside">
      <h1>Min side</h1>
      <p>
        Velkommen! Dette er din genvej til den nemmeste betjening uanset om du
        er interesseret i en vintage style eller et produkt lavet helt fra
        bunden. Indtast dine kropsmål her og anvend dem, når du skal finde det,
        der passer til din krop eller send dem automatisk med, når du bestiller
        et produkt. Så laver jeg mønstret, så det passer lige til din krop.
      </p>
      <form id="minForm" onSubmit={handleSubmit}>
        <div className="minformFlex">
          <label>Brystmål:</label>
          <input
            type="number"
            value={bryst}
            onChange={(e) => setBryst(e.target.value)}
            placeholder="Brystvidde, hvor du er breddest"
          />
        </div>
        <div className="minformFlex">
          <label>Taljemål:</label>
          <input
            type="number"
            value={talje}
            onChange={(e) => setTalje(e.target.value)}
            placeholder="Taljevidde, hvor du er smallest"
          />
        </div>
        <div className="minformFlex">
          <label>Hoftemål:</label>
          <input
            type="number"
            value={hofte}
            onChange={(e) => setHofte(e.target.value)}
            placeholder="Hoftevidde, hvor du er breddest"
          />
        </div>
        <div className="minformFlex">
          <label>Højde:</label>
          <input
            type="number"
            value={hojde}
            onChange={(e) => setHojde(e.target.value)}
            placeholder="Højde i cm"
          />
        </div>
        <div className="minformFlex minBtn">
          <button className="OvalKnap" type="submit">
            Gem Mål
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {currentUser && (
          <div>
            <button className="OvalKnap" onClick={testLogout}>Logout</button>
          </div>
          )}
        </div>
      </form>
      <Footer></Footer>

    </div>
  );
};

export default Minside;
