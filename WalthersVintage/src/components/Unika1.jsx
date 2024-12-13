import React from 'react';

export const Unika1 = ({ product }) => {
  return (
    <div className='unika1'>
      <div className='Unika-VH borderR'>
        <img className='unikaImg' src={product.billede} alt={product.alt} loading="lazy" />
        <h2 id='HihglightH2'>{product.overskrift}</h2>
      </div>
      <div className='Unika-VH'>
        <p id='hightlightTxt'>{product.text}</p>
        <div id='unikaRamme'>
          <h2>Styles:</h2>
          <div id='boxRamme'>
            <div className='unikaBox'>
              <p>{product.style1}</p>
            </div>
            <div className='unikaBox borderTop'>
              <p>{product.style2}</p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Unika1;