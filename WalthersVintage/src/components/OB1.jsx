import React from 'react';


export const OB1 = (props) => {
    const {OBh2, OBp, obImgAlt, obImg} = props; 

  return (
    <div id='obtop'>
        <div id='OBramme'>
            <div className='Detaljer-VH heightFit'>
                <h2 id='Obh2'>{OBh2}</h2>
                <p id='Obhp'>{OBp}</p>
            </div>
            <div className='Detaljer-VH borderL heightFit'>
                <img src={obImg} alt={obImgAlt} id='OBimg'  loading="lazy"/>
            </div>
        </div>
        <div id='nudeBjalke'></div>
    </div>
  )
}
export default OB1;