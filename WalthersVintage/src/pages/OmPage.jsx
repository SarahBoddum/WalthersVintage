import React, { useState } from 'react';
import produktdata from '../Data/ProduktKort.json'; // Korrekt importeret navn

const Om = () => {
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
            <div className="filter">
                <label>Type:</label>
                <div className="type-box">
                    <div className="type-row">
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
                    <div className="type-row">
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
                </div>
                <label>
                    Brystmål:
                    <input
                        type="number"
                        onChange={(e) => setFilter({ ...filter, brystmål: parseInt(e.target.value) })}
                        placeholder="Indtast brystmål"
                    />
                </label>
                <label>
                    Taljemål:
                    <input
                        type="number"
                        onChange={(e) => setFilter({ ...filter, taljemål: parseInt(e.target.value) })}
                        placeholder="Indtast taljemål"
                    />
                </label>
                <label>
                    Hoftemål:
                    <input
                        type="number"
                        onChange={(e) => setFilter({ ...filter, hoftemål: parseInt(e.target.value) })}
                        placeholder="Indtast hoftemål"
                    />
                </label>
                <button type="button" onClick={() => setFilterActivated(true)}>
                    Anvend Filter
                </button>
            </div>

            <div className="produkt-kort-container">
                {filteredProducts.map((product, index) => (
                    <div key={index} className="produkt-kort">
                        <img src={product.billede} alt={product.overskrift} />
                        <h3>{product.overskrift}</h3>
                        <p>Pris: {product.pris} DKK</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Om;