import React from 'react';
import { Link } from 'react-router-dom';


export const Testimonial = (props) => {
    const {buePic, bueAlt, TopContent, BundContent, TestiContent, TestiH2, buetilOval, solgtNone, solgt} = props;

  return (
    <div className='testiTxtPic'>
        <div className='testiHøjre'>
            <div className='bueramme'>
                <img src={buePic} className={`buePic ${buetilOval}`} alt={bueAlt} loading="lazy"/>
                <div className={`solgt ${solgtNone}`}><p>{solgt}</p></div>
            </div>
            <h2>{TestiH2}</h2>
        </div>
        <div className='testiVenstre'>
            <div className='bjalkeTop'>{TopContent}</div>
            <div className='testiTxt'>{TestiContent}</div>
            <div className='bjalkeBund'>{BundContent}</div>
        </div>
    </div>
    
  )
}
export default Testimonial