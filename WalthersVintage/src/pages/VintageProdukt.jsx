import React, { useState } from 'react';
import pilHøjre from '../assets/Images/pilH.png';
import filterdukke from '../assets/Images/måledukke3.svg'
import { Link } from 'react-router-dom';
import VProduktkort from '../components/VProduktkort';
import produktdata from '../Data/ProduktKort.json';

export const VintageProdukt = () => {
  const [products] = useState(produktdata.produktkort); // Brug produktdata.produktkort
  const [filter, setFilter] = useState({ brystmål: null, taljemål: null, hoftemål: null, type: [] });
  const [filterActivated, setFilterActivated] = useState(false);
  console.log("Aktivt filter:", filter);

  const filterProducts = () => {
    if (!filterActivated) return products;

    // 1. Filtrér baseret på type
    const typeFilteredProducts = products.filter((product) => {
      if (filter.type.length === 0) return true; // Hvis ingen type er valgt, vis alt
      return filter.type.some((type) => product.type === type); // Filtrér baseret på valgt type
    });

    // 2. Filtrér de allerede typefiltrerede produkter baseret på størrelser
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

  const filteredProducts = filterProducts();

  return (
    <div>
      <Link id='filtreÅben' to="/vintage#filtre">
        <h2>luk filtre</h2>
      </Link>

      <div id='filterfunktion'>
        <Link id='filterTilbage' to="/strguide">
          <p>Størrelsesguide</p>
          <img src={pilHøjre} id='filterpil' alt='pil mod højre ikon' />
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
                  className={filter.type.includes("kjole/nederdele") ? "active" : ""}
                >
                  Kjole/Nederdele
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeFilterClick("overdele")}
                  className={filter.type.includes("overdele") ? "active" : ""}
                >
                  Overdele
                </button>
              </div>
              <div className='styleBox'>
                <button
                  type="button"
                  onClick={() => handleTypeFilterClick("jakker")}
                  className={filter.type.includes("jakker") ? "active" : ""}
                >
                  Jakker
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeFilterClick("bukser")}
                  className={filter.type.includes("bukser") ? "active" : ""}
                >
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
      </div>

      <div className="filterAlle">
        {filteredProducts.map((product) => (
          <VProduktkort key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default VintageProdukt;