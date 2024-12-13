import React, { useState, useEffect } from "react";
import { db, setDoc} from "../Data/firebase";
import { getFirestore, getDocs, collection, doc, getDoc } from 'firebase/firestore';// Firebase import
import { useAuth } from "../components/AuthContext"; // For at få brugerens autentificerede info
import Footer from "../components/Footer";
import DProduktkort from "../components/Dproduktkort";
import { auth } from "../Data/firebase";
import Bjaelke from "../components/Bjaelke"

export const Minside = () => {
  const { currentUser, logout } = useAuth(); // Hent brugerens data fra AuthContext
  const [bryst, setBryst] = useState(null);
  const [talje, setTalje] = useState(null);
  const [hofte, setHofte] = useState(null);
  const [hojde, setHojde] = useState(null);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [isMinSideVisible, setIsMinSideVisible] = useState(true); // State til toggle

  // Funktion til at toggle synlighed
  const toggleMinSideVisibility = () => {
    setIsMinSideVisible(!isMinSideVisible);
  };

  // Hent eksisterende mål fra Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setBryst(userData.bryst || null);
            setTalje(userData.talje || null);
            setHofte(userData.hofte || null);
            setHojde(userData.hojde || null);
          }
        } catch (error) {
          console.error("Fejl ved hentning af brugerdata:", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  // Hent produkter fra Firebase baseret på mål
  useEffect(() => {
    const fetchProducts = async () => {
      if (bryst && talje && hofte) {
        try {
          const querySnapshot = await getDocs(collection(db, "Vintage"));
          const productsArray = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          const filteredProducts = productsArray.filter((product) => {
            const isInRange = (userValue, productValue) =>
              userValue >= productValue - 4 && userValue <= productValue;
            const isMax = (userValue, productValue) =>
              userValue <= productValue;

            let matchesBryst = true;
            let matchesTalje = true;
            let matchesHofte = true;

            if (product.type === "jakker") {
              matchesBryst = isInRange(bryst, product.brystmål);
              matchesTalje = isMax(talje, product.taljemål);
              matchesHofte = isMax(hofte, product.hoftemål);
            } else if (product.type === "bukser") {
              matchesBryst = true;
              matchesTalje = isInRange(talje, product.taljemål);
              matchesHofte = isInRange(hofte, product.hoftemål);
            } else if (product.type === "kjoler" || product.type === "overdele-tight") {
              matchesBryst = isInRange(bryst, product.brystmål);
              matchesTalje = isInRange(talje, product.taljemål);
              matchesHofte = isInRange(hofte, product.hoftemål);
            } else if (product.type === "nederdele") {
              matchesBryst = true; // Brystmål er irrelevant
              matchesTalje = isInRange(talje, product.taljemål);
              matchesHofte = isMax(hofte, product.hoftemål);
            } else if (product.type === "overdele-box") {
              matchesBryst = bryst >= product.brystmål - 4;
              matchesTalje = isMax(talje, product.taljemål);
              matchesHofte = isMax(hofte, product.hoftemål);
            }

            return matchesBryst && matchesTalje && matchesHofte;
          });

          setProducts(filteredProducts);
        } catch (error) {
          console.error("Fejl ved hentning af produkter:", error);
        }
      }
    };

    fetchProducts();
  }, [bryst, talje, hofte]);

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
          { merge: true }
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
// Simpel test af logout for debugging
const testLogout = async () => {
  try {
    await auth.signOut(); // Direkte kald til Firebase Authentication
    console.log("Logout virker!"); // Hvis dette virker, kan problemet være i AuthContext
  } catch (err) {
    console.error("Fejl:", err.message);
  }
};

  return (
    <div className="margintopMinside">
      {isMinSideVisible && (
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
              value={bryst || ""}
              onChange={(e) => setBryst(e.target.value)}
              placeholder="Brystvidde, hvor du er breddest"
            />
          </div>
          <div className="minformFlex">
            <label>Taljemål:</label>
            <input
              type="number"
              value={talje || ""}
              onChange={(e) => setTalje(e.target.value)}
              placeholder="Taljevidde, hvor du er smallest"
            />
          </div>
          <div className="minformFlex">
            <label>Hoftemål:</label>
            <input
              type="number"
              value={hofte || ""}
              onChange={(e) => setHofte(e.target.value)}
              placeholder="Hoftevidde, hvor du er breddest"
            />
          </div>
          <div className="minformFlex">
            <label>Højde:</label>
            <input
              type="number"
              value={hojde || ""}
              onChange={(e) => setHojde(e.target.value)}
              placeholder="Højde i cm"
            />
          </div>
          <div className="minformFlex minBtn">
            <button className="OvalKnap MinSidebtn" type="submit">
              Gem Mål
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {currentUser && (
            <div>
              <button type="button" className="OvalKnap MinSidebtn" onClick={testLogout}>Logout</button>
            </div>
            )}
          </div>
        </form>
      </div>
       )}
      <Bjaelke>
        {<h2  onClick={toggleMinSideVisibility} style={{ cursor: "pointer" }}>{isMinSideVisible ? "Luk mål" : "Åbn mål"}</h2>}
      </Bjaelke>

      <div id="matches">
        <h1>Dine matches</h1>
        <p>Her er alle de produkter, der matcher dine kropsmål lige nu. Hold jævnligt øje, da jeg løbende tilføjer nye produkter. Håber du finder noget, du kan lide</p>
        {products.length > 0 ? (
          <div className="filterAlle">
            {products.map((product) => (
              <DProduktkort key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p>Ingen produkter matcher dine mål.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Minside;
