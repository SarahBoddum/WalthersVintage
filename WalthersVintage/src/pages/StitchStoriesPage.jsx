import React from 'react';
import Unika from '../components/UnikaTop';
import SStopStort from '../assets/Images/SSjakkeTop.webp';
import SSmærke from '../assets/Images/S_Smarke.jpg';
import Bjaelke from '../components/Bjaelke';



export const Stitch_Stories = () => {

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
    </div>
  )
}
export default Stitch_Stories