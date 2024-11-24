import React from 'react';


export const KurvKontakt = (props) => {
    const {LisbethKontakt, laptopLisbeth, kontakth1, content} = props

  return (
    <div id='KurvKontakt'>
        <div id='KKtop'>
            <img src={LisbethKontakt} className='KKimg mobil'alt='Lisbeth'/>
            <div id='KKtext'>
                <h1>{kontakth1}</h1>
                <p>{content}</p>
            </div>
        </div>
        <div id='formularImg'>
            <img src={laptopLisbeth} className='KKimgStor laptop' alt='Lisbeth'/>
            <div id='kontaktformular'>
                <div className='inputKontakt'>
                    <div className='mailEmne'>
                        <div className='labelKontakt'>
                            <label>Mail :</label>
                        </div>
                        <input className='inputKontakt' placeholder='din-mail@email.com'></input>
                    </div>
                    <div className='mailEmne'>
                        <div className='labelKontakt'>
                            <label>Emne :</label>
                        </div>
                        <input className='inputKontakt' placeholder='______________'></input>
                    </div>  
                </div>
                <input id='inputbesked' placeholder='Din besked...'></input>
                <div className='knapDiv3 KKknap'>
                    <div className='OvalKnap'>Send</div>
                </div>
            </div>
        </div>
    
    </div>
  )
}
export default KurvKontakt