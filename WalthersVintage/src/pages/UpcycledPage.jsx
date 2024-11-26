import React, { useState, useEffect } from 'react';
import Unika from '../components/UnikaTop';
import UCtopStort from '../assets/Images/Vjakke2.jpg';
import UClille from '../assets/Images/littlelife32.jpg';
import Footer from '../components/Footer';
import Bjaelke from '../components/Bjaelke';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../Data/firebase';
import SSUC3 from '../components/SSUC3';
import UCProduktkort from '../components/UCProduktkort';
import SSUC1 from '../components/SSUC1';

export const Upcycled = () => {
  const [products, setProducts] = useState([]); // Produkter fra "Vintage"
  const [productsHighlight, setProductsHighlight] = useState([]); // Produkter fra "Vintagehighlight"
  const nr2 = "nr2";

  // Hent produktdata fra Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      // Hent Vintage-produkter
      const querySnapshot = await getDocs(collection(db, "Upcycled"));
      const productsArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(productsArray);

      // Hent Vintagehighlight-produkter
      const highlightSnapshot = await getDocs(collection(db, "Upcycledhighlight"));
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
    <Unika
      UnikaH1={<h1>Upcycled</h1>}
      UnikaTopStort={UCtopStort}
      cirkelQuote={<p>Give<br />Clothes<br />A<br />Second<br />Change</p>}
      UnikaTopLille={UClille}
      unikaTxt={<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>}>
    </Unika>

    <Bjaelke>
      <h2>Make loved clothes last</h2>
    </Bjaelke>
      
    {productsHighlight.slice(0, 1).map((product) => (
        <SSUC3 key={product.id} product={product} imageClassName={nr2}/>
    ))}

    <div className="flex">
        <div className="produktFlex">
          {products.slice(0, 2).map((product) => (
            <UCProduktkort key={product.id} product={product} />
          ))}
        </div>
        <div className="produktFlex">
          {products.slice(2, 4).map((product) => (
            <UCProduktkort key={product.id} product={product} />
          ))}
        </div>     
      </div>

      {productsHighlight.slice(1, 2).map((product) => (
            <SSUC1 key={product.id} product={product} />
          ))}

            <Footer></Footer>
    </div>
  )
}
export default Upcycled