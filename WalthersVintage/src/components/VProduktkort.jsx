import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; // For Firebase
import { db } from "../Data/firebase"; 


export const VProduktkort = ({product, currentUser }) => {
  
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProduct = async () => {
    setIsSaved(!isSaved); // Skift ikonets farve ved klik

    // Hvis bruger er logget ind, gem produktet i Firestore
    if (currentUser) {
      try {
        const userDocRef = doc(db, "users", currentUser.uid, "savedProducts", product.id);
        await setDoc(userDocRef, product);
        console.log("Produkt gemt i Firebase!");
      } catch (error) {
        console.error("Fejl ved gemning af produkt i Firebase:", error.message);
      }
    } else {
      // Hvis bruger ikke er logget ind, gem produktet i sessionStorage
      const savedProducts = JSON.parse(sessionStorage.getItem("savedProducts")) || [];
      if (!savedProducts.some((savedProduct) => savedProduct.id === product.id)) {
        savedProducts.push(product);
        sessionStorage.setItem("savedProducts", JSON.stringify(savedProducts));
        console.log("Produkt gemt i sessionStorage!");
      }
    }
  };

  return (
    <div className='produktKort'>
        <h3>{product.overskrift}</h3>
        <div id='produktStreg'></div>
        <Link to={`/produkt/${product.id}`} state={{ product }}>
          <img id='produktbillede' src={product.billede} alt={product.alt} loading="lazy"/>
        </Link>
        <p>Str.: {product.størrelse}</p>
        <p>Pris: {product.pris} kr.</p>
        <Link to={`/produkt/${product.id}`} state={{ product }}>
          <button type='button' id='produktBtn'>Læs mere</button>
        </Link>
    </div>
  )
}
export default VProduktkort;