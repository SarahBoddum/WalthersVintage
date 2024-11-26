import React, { useState, useEffect } from 'react';
import VOBtop from '../components/VOBTop';
import vintageJakke from '../assets/Images/RjakkeV1.jpg';
import { Link } from 'react-router-dom';
import VProduktkort from '../components/VProduktkort';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../Data/firebase';
import vintageStatisk1 from '../assets/Images/placeholder2.png';
import Unika1 from '../components/Unika1';
import Footer from '../components/Footer';

export const Vintage = () => {
  const [products, setProducts] = useState([]); // Produkter fra "Vintage"
  const [productsHighlight, setProductsHighlight] = useState([]); // Produkter fra "Vintagehighlight"

  // Hent produktdata fra Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      // Hent Vintage-produkter
      const querySnapshot = await getDocs(collection(db, "Vintage"));
      const productsArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(productsArray);

      // Hent Vintagehighlight-produkter
      const highlightSnapshot = await getDocs(collection(db, "Vintagehighlight"));
      const highlightArray = highlightSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductsHighlight(highlightArray);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Topsektion */}
      <VOBtop
        VOBmobilH1={<h1>Vintage</h1>}
        VOBlaptopH1={<h1>Vintage</h1>}
        VOBimg={vintageJakke}
        content={
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        }
      />

      {/* Filter */}
      <Link id="filtre" to="/VintageProdukt">
        <h2>Filter</h2>
      </Link>

      {/* Produkter - Første sektion */}
      <div className="filterAlle vintagePage">
        <div className="produktFlex">
          {products.slice(0, 2).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>

        <div className="statiskStemning">
          <div className="vintageCirkel"></div>
          <img src={vintageStatisk1} alt="Udsnit af mit tøj" className="SStemningsImg" />
        </div>
      </div>

      {/* Produkter - Fleksibelt layout */}
      <div className="flex">
        <div className="produktFlex">
          {products.slice(2, 4).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        <div className="produktFlex">
          {products.slice(4, 6).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        
      </div>

      {/* Highlight sektion */}
      <div className="highlightSection">
        {productsHighlight.slice(0, 1).map((product) => (
          <Unika1 key={product.id} product={product} />
        ))}
      </div>

      {/* Produkter - Anden sektion */}
      <div className="flex">
        <div className="produktFlex">
          {products.slice(6, 8).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        <div className="produktFlex">
          {products.slice(8, 10).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
      </div>
   
      <Footer></Footer>
    </div>
  );
};

export default Vintage;