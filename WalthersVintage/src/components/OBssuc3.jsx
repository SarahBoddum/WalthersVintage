import React from 'react';

export const OBssuc3 = (props) => {
    const {OBh2, OBstortbillede, OBstortbilledeAlt, OBlillebillede, OBlillebilledeAlt, content} = props; 

  return (
    <div className='ssuctop'>
      <div id='ssuc3Pics'>
        <img src={OBstortbillede} alt={OBstortbilledeAlt} className='nr2' loading="lazy"/>
        <div id='ssuc3PicCirkel'>
          <div id='flex'>
            <img src={OBlillebillede} alt={OBlillebilledeAlt} id='ssuc3Pic2' loading="lazy" />
            <div id='ssuc3Cirkel'>
            </div>
          </div>
        </div>
      </div>
      <div className='OBssuc3text'>
        <h2>{OBh2}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default OBssuc3;
