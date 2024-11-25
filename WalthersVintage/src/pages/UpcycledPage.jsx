import React from 'react';
import Unika from '../components/UnikaTop';
import UCtopStort from '../assets/Images/Vjakke2.jpg';
import UClille from '../assets/Images/littlelife32.jpg';
import Footer from '../components/Footer';




export const Upcycled = () => {

  return (
    <div>
    <Unika
      UnikaH1={<h1>Upcycled</h1>}
      UnikaTopStort={UCtopStort}
      cirkelQuote={<p>Give<br />Clothes<br />A<br />Second<br />Change</p>}
      UnikaTopLille={UClille}
      unikaTxt={<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>}>
    </Unika>
      
     <Footer></Footer>
    </div>
  )
}
export default Upcycled