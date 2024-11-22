import React, { useState, useEffect } from 'react';
import VOBtop from '../components/VOBTop';
import vintageJakke from '../assets/Images/RjakkeV1.jpg';
import { Link } from 'react-router-dom';
import VProduktkort from '../components/VProduktkort';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../Data/firebase';
import vintageStatisk1 from '../assets/Images/placeholder2.png';

export const Vintage = () => {
  const [products, setProducts] = useState([]); // State til produkter

  // Hent produktdata fra Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "Vintage")); // Firestore collection "Vintage"
      const productsArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); // Array af dokumenter
      setProducts(productsArray); // Sæt produkterne i state
    };

    fetchProducts();
  }, []); // Hent data én gang, når komponentet loades

  return (
    <div>
      <VOBtop
        VOBmobilH1={<h1>Vintage</h1>}
        VOBlaptopH1={<h1>vintage</h1>}
        VOBimg={vintageJakke}
        content={
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        }
      ></VOBtop>

      <Link id="filtre" to="/VintageProdukt">
        <h2>filter</h2>
      </Link>

      <div className="filterAlle vintagePage">
        <div className="produktFlex">
          {products.slice(0, 2).map((product) => (
            <div id={product.id} key={product.id}>
              <VProduktkort product={product} />
            </div>
          ))}
        </div>

        <div className="statiskStemning">
          <div className="vintageCirkel"></div>
          <img src={vintageStatisk1} alt="Udsnit af mit tøj" className="SStemningsImg" />
        </div>
      </div>

      {/* Gentagelse af produktsektioner med slice */}
      <div className="produktFlex">
        {products.slice(2, 4).map((product) => (
          <div id={product.id} key={product.id}>
            <VProduktkort product={product} />
          </div>
        ))}
      </div>
      <div className="produktFlex">
        {products.slice(4, 6).map((product) => (
          <div id={product.id} key={product.id}>
            <VProduktkort product={product} />
          </div>
        ))}
      </div>
      <div className="produktFlex">
        {products.slice(6, 8).map((product) => (
          <div id={product.id} key={product.id}>
            <VProduktkort product={product} />
          </div>
        ))}
      </div>
      <div className="produktFlex">
        {products.slice(8, 10).map((product) => (
          <div id={product.id} key={product.id}>
            <VProduktkort product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vintage;