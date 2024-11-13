import React from 'react';
import { Link } from 'react-router-dom';


export const Testimonial = (props) => {
    const {buePic, bueAlt, TopContent, BundContent, TestiContent, TestiH2} = props;

  return (
    <div className='testiTxtPic'>
        <div className='testiHøjre'>
            <div className='bueramme'>
                <img src={buePic} className='buePic' alt={bueAlt}/>
                <div className='solgt'><p>solgt</p></div>
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