import React from 'react';
import { Link } from 'react-router-dom';


export const BeigeTxtPic = (props) => {
    const content = props.children;
    const {OvalImg, altTag, MidtContent, KnapLink } = props; 

  return (
    <div className='BaggSand'>
        <div className='beigeTxtPic'>
            <div className='txtLodVandret'>
                <div className='Txt2lodret'>
                    <div className='Lodretvenstre'>
                        {content}
                    </div>
                </div>
                <div className='TextMidt'>
                    {MidtContent}
                </div>
                <div className='Txt2lodret'>
                    <div className='Lodrethøjre'>
                        {content}
                    </div>
                </div>
            </div>
            <div className='OvalPic'>
                <img src={OvalImg} alt={altTag} className='OvalImg' loading="lazy"/>
            </div>
        </div>
        <div className='knapDiv3 beige'>
            <Link className='OvalKnap' to="/om">
                {KnapLink}
            </Link>
        </div>
       
    </div>
  )
}
export default BeigeTxtPic