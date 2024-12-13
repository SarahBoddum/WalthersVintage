import React, { useState, useEffect } from 'react';
import VOBtop from '../components/VOBTop';
import vintageJakke from '../assets/Images/RjakkeV1.jpg';
import { Link } from 'react-router-dom';
import VProduktkort from '../components/VProduktkort';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../Data/firebase';
import vintageStatisk1 from '../assets/Images/placeholder2.jpg';
import Unika1 from '../components/Unika1';
import Footer from '../components/Footer';
import filter from '../assets/Images/filter.svg'

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
        VOBalt={'Lisbeth i vintage ruskindsjakke'}
        content={
          <p>
            Alt mit vintage er særligt udvalgt og handpicked fra hele verdenen. Jeg udvælger kun det, jeg selv ville gå i og går altid efter kvalitetsvarer, der passer ind i det aktuelle modebillede. 
          </p>
        }
      />

      {/* Filter */}
      <Link id="filtre" to="/VintageProdukt">
        <img src={filter} className='filterSvg' alt='filter ikon' loading="lazy"/>
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
          <img src={vintageStatisk1} alt="Udsnit af mit tøj" className="SStemningsImg" loading="lazy"/>
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

      {/*KOPIER DETTE FOR AT FÅ FLERE KASSER----------------------- */}


      {/* Produkter - Fleksibelt layout */}
      <div className="flex">
        <div className="produktFlex">
          {products.slice(10, 12).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        <div className="produktFlex">
          {products.slice(12, 14).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        
      </div>

      {/* Highlight sektion */}
      <div className="highlightSection">
        {productsHighlight.slice(1, 2).map((product) => (
          <Unika1 key={product.id} product={product} />
        ))}
      </div>

      {/* Produkter - Anden sektion */}
      <div className="flex">
        <div className="produktFlex">
          {products.slice(14, 16).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        <div className="produktFlex">
          {products.slice(16, 18).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
      </div>

       {/*KOPIER DETTE FOR AT FÅ FLERE KASSER----------------------- */}

       {/* Produkter - Fleksibelt layout */}
      <div className="flex">
        <div className="produktFlex">
          {products.slice(18, 20).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        <div className="produktFlex">
          {products.slice(20, 22).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        
      </div>

      {/* Highlight sektion */}
      <div className="highlightSection">
        {productsHighlight.slice(2, 3).map((product) => (
          <Unika1 key={product.id} product={product} />
        ))}
      </div>

      {/* Produkter - Anden sektion */}
      <div className="flex">
        <div className="produktFlex">
          {products.slice(22, 24).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        <div className="produktFlex">
          {products.slice(24, 26).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
      </div>

       {/*KOPIER DETTE FOR AT FÅ FLERE KASSER----------------------- */}

       {/* Produkter - Fleksibelt layout */}
      <div className="flex">
        <div className="produktFlex">
          {products.slice(26, 28).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        <div className="produktFlex">
          {products.slice(28, 30).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        
      </div>

      {/* Highlight sektion */}
      <div className="highlightSection">
        {productsHighlight.slice(3, 4).map((product) => (
          <Unika1 key={product.id} product={product} />
        ))}
      </div>

      {/* Produkter - Anden sektion */}
      <div className="flex">
        <div className="produktFlex">
          {products.slice(30, 32).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        <div className="produktFlex">
          {products.slice(32, 34).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
      </div>

       {/*KOPIER DETTE FOR AT FÅ FLERE KASSER----------------------- */}

       {/* Produkter - Fleksibelt layout */}
      <div className="flex">
        <div className="produktFlex">
          {products.slice(34, 36).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        <div className="produktFlex">
          {products.slice(36, 38).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        
      </div>

      {/* Highlight sektion */}
      <div className="highlightSection">
        {productsHighlight.slice(4, 5).map((product) => (
          <Unika1 key={product.id} product={product} />
        ))}
      </div>

      {/* Produkter - Anden sektion */}
      <div className="flex">
        <div className="produktFlex">
          {products.slice(38, 40).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        <div className="produktFlex">
          {products.slice(40, 42).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
      </div>

       {/*KOPIER DETTE FOR AT FÅ FLERE KASSER----------------------- */}

       {/* Produkter - Fleksibelt layout */}
      <div className="flex">
        <div className="produktFlex">
          {products.slice(42, 44).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        <div className="produktFlex">
          {products.slice(44, 46).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        
      </div>

      {/* Highlight sektion */}
      <div className="highlightSection">
        {productsHighlight.slice(5, 6).map((product) => (
          <Unika1 key={product.id} product={product} />
        ))}
      </div>

      {/* Produkter - Anden sektion */}
      <div className="flex">
        <div className="produktFlex">
          {products.slice(46, 48).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
        <div className="produktFlex">
          {products.slice(48, 50).map((product) => (
            <VProduktkort key={product.id} product={product} />
          ))}
        </div>
      </div>

       {/*KOPIER DETTE FOR AT FÅ FLERE KASSER----------------------- */}
   
      <Footer></Footer>
    </div>
  );
};

export default Vintage;