import React from 'react';
import VOBtop from '../components/VOBTop';
import vintageJakke from '../assets/Images/RjakkeV1.jpg';
import { Link } from 'react-router-dom';


export const Vintage = () => {

  return (
    <div>
      <VOBtop
      VOBmobilH1={<h1>Vintage</h1>}
      VOBlaptopH1={<h1>vintage</h1>}
      VOBimg={vintageJakke}
      content={<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>}>  
      </VOBtop>

      <div id='filtre'>
        <Link></Link>
      </div>
    </div>
  )
}
export default Vintage