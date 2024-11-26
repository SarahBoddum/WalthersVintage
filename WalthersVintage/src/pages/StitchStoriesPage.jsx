import React, { useState, useEffect } from 'react';
import Unika from '../components/UnikaTop';
import SStopStort from '../assets/Images/SSjakkeTop.webp';
import SSmærke from '../assets/Images/S_Smarke.jpg';
import Bjaelke from '../components/Bjaelke';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../Data/firebase';
import SSUC1 from '../components/SSUC1.jsx';
import SSUC2 from '../components/SSUC2.jsx';
import SSUC3 from '../components/SSUC3.jsx';
import Footer from '../components/Footer';


export const Stitch_Stories = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      
      const querySnapshot = await getDocs(collection(db, "StitchStories"));
      const productsArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(productsArray);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Unika
        UnikaH1={<h1>Stitch_Stories</h1>}
        UnikaTopStort={SStopStort}
        cirkelQuote={<p>Good<br />Things<br />Take<br />Time</p>}
        UnikaTopLille={SSmærke}
        unikaTxt={<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>}>
      </Unika>
      <Bjaelke>
        {<h2>THANK YOU FOR BEING AN AMAZING CUSTOMER</h2>}
      </Bjaelke>
          
      {products.slice(0, 1).map((product) => (
            <SSUC1 key={product.id} product={product} />
          ))}

      {products.slice(1, 2).map((product) => (
            <SSUC2 key={product.id} product={product} />
          ))}

        <Bjaelke>
          <h2>and having a fantastic taste</h2>
        </Bjaelke>
        
        {products.slice(2, 3).map((product) => (
            <SSUC3 key={product.id} product={product} />
          ))}
        
        {products.slice(3, 4).map((product) => (
            <SSUC2 key={product.id} product={product} />
          ))}
        
       <Footer></Footer>
      
    </div>
    
  )
}
export default Stitch_Stories