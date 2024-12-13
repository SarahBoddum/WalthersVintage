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
      UTlilleAlt={'I think I like this little life broderi'}
      UnikaTopStort={UCtopStort}
      UTstortAlt={'Lisbeth i vintage skjorte med forskellige broderede motiver'}
      cirkelQuote={<p>Give<br />Clothes<br />A<br />Second<br />Change</p>}
      UnikaTopLille={UClille}
      unikaTxt={<p>Jeg elsker at arbejde med mine hænder og broderi er bare en fantastisk måde at lade mine hænder og fantasi få frit løb. Derfor har jeg lavet en lille collection af vintagetøj, jeg har udsmykket med de fineste håndlavede broderier.</p>}>
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