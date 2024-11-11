import React from 'react';


export const BeigeTxtPic = (props) => {
    const content = props.children;
    const {OvalImg, altTag } = props; 

  return (
    <div>
        <div className='beigeTxtPic'>
            <div className='Txt2lodret'>
                <div className='TxtLodret højre'>
                    {content}
                </div>
            </div>
            <div className='OvalPic'>
                <img src={OvalImg} alt={altTag} className='OvalImg' loading="lazy"/>
            </div>
            <div className='Txt2lodret'>
                <div className='TxtLodret venstre'>
                    {content}
                </div>
            </div>
        </div>
       
    </div>
  )
}
export default BeigeTxtPic