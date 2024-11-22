import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../Data/firebase';
import pilHøjre from '../assets/Images/pilH.png';
import filterdukke from '../assets/Images/måledukke3.svg';
import pilVenstre from '../assets/Images/pilV.png';
import VProduktkort from '../components/VProduktkort';

export const VintageProdukt = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ brystmål: null, taljemål: null, hoftemål: null, type: [] });
  const [filterActivated, setFilterActivated] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

 
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "Vintage")); 
      const productsArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); 
      setProducts(productsArray); 
    };

    fetchProducts();
  }, []); 


  const filterProducts = () => {

    
    if (!filterActivated) return products;

  
    const typeFilteredProducts = products.filter((product) => {
      if (filter.type.length === 0) return true; 
      return filter.type.some((type) => product.type === type); 
    });

    return typeFilteredProducts.filter((product) => {
      const isInRange = (userValue, productValue) => {
        return userValue && userValue >= productValue - 4 && userValue <= productValue;
      };

      let matchesBrystmål = true;
      let matchesTaljemål = true;
      let matchesHoftemål = true;

      if (filter.type.includes("jakker")) {
        matchesBrystmål = filter.brystmål ? isInRange(filter.brystmål, product.brystmål) : true;
        matchesTaljemål = filter.taljemål ? filter.taljemål <= product.taljemål : true;
        matchesHoftemål = filter.hoftemål ? filter.hoftemål <= product.hoftemål : true;
      } else if (filter.type.includes("bukser")) {
        matchesBrystmål = true;
        matchesTaljemål = filter.taljemål ? isInRange(filter.taljemål, product.taljemål) : true;
        matchesHoftemål = filter.hoftemål ? isInRange(filter.hoftemål, product.hoftemål) : true;
      } else if (filter.type.includes("kjole/nederdele")) {
        matchesBrystmål = filter.brystmål ? isInRange(filter.brystmål, product.brystmål) : true;
        matchesTaljemål = filter.taljemål ? isInRange(filter.taljemål, product.taljemål) : true;
        matchesHoftemål = filter.hoftemål ? isInRange(filter.hoftemål, product.hoftemål) : true;
      } else if (filter.type.includes("overdele")) {
        matchesBrystmål = filter.brystmål ? isInRange(filter.brystmål, product.brystmål) : true;
        matchesTaljemål = filter.taljemål ? isInRange(filter.taljemål, product.taljemål) : true;
        matchesHoftemål = true;
      }

      return matchesBrystmål && matchesTaljemål && matchesHoftemål;
    });
  };

  const handleTypeFilterClick = (type) => {
    const selectedTypes = filter.type.includes(type)
      ? filter.type.filter((t) => t !== type)
      : [...filter.type, type];

    console.log("Clicked type:", type);
    console.log("Updated types:", selectedTypes);

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
          <img src={pilVenstre} alt='pil til venstre ikon' className='filterpil'/>
          <p>Tilbage</p>
        </Link>
        <h2 id='linkH2' onClick={toggleFilter}>{isFilterOpen ? "Luk filtre" : "Åbn filtre"}</h2>
      </div>

      {isFilterOpen && (
      <div id='filterfunktion' className={isFilterOpen ? '' : 'collapsed'}>
        <Link id='filterTilbage' to="/strguide">
          <p>Størrelsesguide</p>
          <img src={pilHøjre} className='filterpil' alt='pil mod højre ikon' />
        </Link>
        <div id='målOgDukke'>
          <div id='filterMål'>
            <h2>kropsmål</h2>
            <div className='dineMål'>
              <div className='filterLabel'>
                <label>Brystmål:</label>
              </div>
              <input
                type="number"
                onChange={(e) => setFilter({ ...filter, brystmål: parseInt(e.target.value) })}
                placeholder='Dit brystmål, hvor du er bredest'></input>
            </div>
            <div className='dineMål'>
              <div className='filterLabel'>
                <label>TALJE</label>
              </div>
              <input
                type="number"
                onChange={(e) => setFilter({ ...filter, taljemål: parseInt(e.target.value) })}
                placeholder='Dit taljemål, hvor du er smallest'></input>
            </div>
            <div className='dineMål'>
              <div className='filterLabel'>
                <label>HOFTE</label>
              </div>
              <input
                type="number"
                onChange={(e) => setFilter({ ...filter, hoftemål: parseInt(e.target.value) })}
                placeholder='Dit hoftemål, hvor du er bredest'></input>
            </div>
            <h2>style</h2>
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
              <img src={filterdukke} id='Fdukke' alt='illustration af opmåling af kropsmål' />
            </div>
          </div>
        </div>
      </div>)}

      <div className="filterAlle">
        {filteredProducts.map((product) => (
          <VProduktkort key={product.id} product={product} />
        ))}
      </div>

      
    </div>
  );
}

export default VintageProdukt;