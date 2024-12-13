import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../Data/firebase';
import { auth } from '../Data/firebase'; // Sørg for at importere auth, hvis du bruger Firebase Authentication
import pilHøjre from '../assets/Images/pilH.png';
import filterdukke from '../assets/Images/måledukke3.svg';
import pilVenstre from '../assets/Images/pilV.png';
import VProduktkort from '../components/VProduktkort';
import Footer from '../components/Footer';


export const VintageProdukt = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ brystmål: null, taljemål: null, hoftemål: null, type: [] });
  const [filterActivated, setFilterActivated] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const db = getFirestore();

  // Fetch user measurements based on the correct Firebase structure
  const fetchUserMeasurements = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return { bryst: data.bryst, talje: data.talje, hofte: data.hofte }; // Returér målene
      } else {
        console.error("No such user data!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
      return null;
    }
  };

  // Handle using user measurements
  const handleUseMyMeasurements = async () => {
    if (!auth.currentUser) return; // Sørg for, at en bruger er logget ind
    const userId = auth.currentUser.uid;
    const measurements = await fetchUserMeasurements(userId);
    if (measurements) {
      setFilter({
        ...filter,
        brystmål: parseInt(measurements.bryst, 10), // Pars værdierne til tal
        taljemål: parseInt(measurements.talje, 10),
        hoftemål: parseInt(measurements.hofte, 10),
      });
    }
  };

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "Vintage")); 
      const productsArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); 
      setProducts(productsArray); 
    };

    fetchProducts();
  }, []); 

  // Filter products
  const filterProducts = () => {
    if (!filterActivated) return products;
  
    const typeFilteredProducts = products.filter((product) => {
      if (filter.type.length === 0) return true; 
      return filter.type.some((type) => {
        if (type === "kjole/nederdele") return product.type === "kjoler" || product.type === "nederdele";
        if (type === "overdele") return product.type === "overdele-tight" || product.type === "overdele-box";
        return product.type === type;
      });
    });
  
    return typeFilteredProducts.filter((product) => {
      const isInRange = (userValue, productValue) => {
        return userValue >= productValue - 4 && userValue <= productValue;
      };
  
      const isMax = (userValue, productValue) => {
        return userValue <= productValue;
      };
  
      let matchesBrystmål = true;
      let matchesTaljemål = true;
      let matchesHoftemål = true;
  
      // Filtrér baseret på produktets type
      if (product.type === "jakker") {
        matchesBrystmål = filter.brystmål ? isInRange(filter.brystmål, product.brystmål) : true;
        matchesTaljemål = filter.taljemål ? isMax(filter.taljemål, product.taljemål) : true;
        matchesHoftemål = filter.hoftemål ? isMax(filter.hoftemål, product.hoftemål) : true;
      } else if (product.type === "bukser") {
        matchesBrystmål = true;
        matchesTaljemål = filter.taljemål ? isInRange(filter.taljemål, product.taljemål) : true;
        matchesHoftemål = filter.hoftemål ? isInRange(filter.hoftemål, product.hoftemål) : true;
      } else if (product.type === "kjoler" || product.type === "overdele-tight") {
        matchesBrystmål = filter.brystmål ? isInRange(filter.brystmål, product.brystmål) : true;
        matchesTaljemål = filter.taljemål ? isInRange(filter.taljemål, product.taljemål) : true;
        matchesHoftemål = filter.hoftemål ? isInRange(filter.hoftemål, product.hoftemål) : true;
      } else if (product.type === "nederdele") {
        matchesBrystmål = true; // Brystmål er irrelevant for nederdele
        matchesTaljemål = filter.taljemål ? isInRange(filter.taljemål, product.taljemål) : true;
        matchesHoftemål = filter.hoftemål ? isMax(filter.hoftemål, product.hoftemål) : true;
      } else if (product.type === "overdele-box") {
        matchesBrystmål = filter.brystmål ? filter.brystmål >= product.brystmål - 4 : true; // Accepter 0-4 cm mindre
        matchesTaljemål = filter.taljemål ? isMax(filter.taljemål, product.taljemål) : true;
        matchesHoftemål = filter.hoftemål ? isMax(filter.hoftemål, product.hoftemål) : true;
      }
  
      return matchesBrystmål && matchesTaljemål && matchesHoftemål;
    });
  };

  // Handle type filter click
  const handleTypeFilterClick = (type) => {
    const selectedTypes = filter.type.includes(type)
      ? filter.type.filter((t) => t !== type)
      : [...filter.type, type];
  
    setFilter({ ...filter, type: selectedTypes });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const filteredProducts = filterProducts();

  return (
    <div>
      <div id='filtreÅben'>
        <Link id='filterVenstre' to="/vintage">
          <img src={pilVenstre} alt='pil til venstre ikon' className='filterpil' loading="lazy"/>
          <p>Tilbage</p>
        </Link>
        <h2 id='linkH2' onClick={toggleFilter}>{isFilterOpen ? "Luk filtre" : "Åbn filtre"}</h2>
      </div>

      {isFilterOpen && (
      <div id='filterfunktion' className={isFilterOpen ? '' : 'collapsed'}>
        <Link id='filterTilbage' to="/strguide">
          <p>Størrelsesguide</p>
          <img src={pilHøjre} className='filterpil' alt='pil mod højre ikon' loading="lazy" />
        </Link>
        <div id='målOgDukke'>
          <div id='filterMål'>
            <div className='KropsmålsKnapDiv'>
              <h2>kropsmål</h2>
              <div className='OvalKnap kropsBtn' 
                onClick={() => {
                  if (!auth.currentUser) {
                    alert("Log ind eller opret en profil for at bruge dine mål");
                  } else {
                    handleUseMyMeasurements();
                  }
                }}>
                Brug mine mål
              </div>
            </div>
            <div className='dineMål'>
              <div className='filterLabel'>
                <label>Brystmål:</label>
              </div>
              <input
                type="number"
                value={filter.brystmål || ''} 
                onChange={(e) => setFilter({ ...filter, brystmål: parseInt(e.target.value) })}
                placeholder='Dit brystmål, hvor du er bredest'>
              </input>
            </div>
            <div className='dineMål'>
              <div className='filterLabel'>
                <label>TALJE</label>
              </div>
              <input
                type="number"
                value={filter.taljemål || ''} 
                onChange={(e) => setFilter({ ...filter, taljemål: parseInt(e.target.value) })}
                placeholder='Dit taljemål, hvor du er smallest'>
              </input>
            </div>
            <div className='dineMål'>
              <div className='filterLabel'>
                <label>HOFTE</label>
              </div>
              <input
                type="number"
                value={filter.hoftemål || ''} 
                onChange={(e) => setFilter({ ...filter, hoftemål: parseInt(e.target.value) })}
                placeholder='Dit hoftemål, hvor du er bredest'>
              </input>
            </div>
            <h2 className='KropsmålsKnapDiv'>style</h2>
            <div id='stylefilter'>
              <div className='styleBox borderR'>
                <button
                    type="button"
                    onClick={() => handleTypeFilterClick("kjole/nederdele")}
                    className={filter.type.includes("kjole/nederdele") ? "active" : ""}>
                    Kjole/Nederdele
                </button>

                <button
                 type="button"
                 onClick={() => handleTypeFilterClick("overdele")}
                 className={filter.type.includes("overdele") ? "active" : ""}>
                 Overdele
                </button>
              </div>
              <div className='styleBox'>
                <button
                   type="button"
                   onClick={() => handleTypeFilterClick("jakker")}
                   className={filter.type.includes("jakker") ? "active" : ""}>
                   Jakker
                </button>

                <button
                 type="button"
                 onClick={() => handleTypeFilterClick("bukser")}
                 className={filter.type.includes("bukser") ? "active" : ""}>
                 Bukser
                </button>
              </div>
            </div>
            <div id='filterBtnBox'>
              <button
                type='button'
                onClick={() => setFilterActivated(true)}
                id='filterBtn'>Sæt filtre</button>
            </div>
          </div>

          <div id='filterDukke'>
            <div id='FDbaggrund'>
              <img src={filterdukke} id='Fdukke' alt='illustration af opmåling af kropsmål' loading="lazy" />
            </div>
          </div>
        </div>
      </div>)}

      <div className="filterAlle">
        {filteredProducts.map((product) => (
          <VProduktkort key={product.id} product={product} />
        ))}
      </div>

    <Footer></Footer>
    </div>
  );
}

export default VintageProdukt;
