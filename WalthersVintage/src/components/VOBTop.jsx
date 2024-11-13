import React from 'react';


export const VOBtop = (props) => {
    const {VOBimg, VOBalt, VOBmobilH1, VOBlaptopH1, content} = props;

  return (
    <div id='VOBtop'>
        <h1 className='mobil'>{VOBmobilH1}</h1>
        <img src={VOBimg} alt={VOBalt} id='VOBimg'/>
        <div id='VOBtxt'>
            <h1 className='laptop'>{VOBlaptopH1}</h1>
            <div className='streg'></div>
            <p>{content}</p>
        </div>
    </div>
  )
}
export default VOBtop