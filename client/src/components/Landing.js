import React from 'react';
import Photo from '../images/movieapplogo.png';

const Landing = () => {
    return(
        <div>
            <div className='landing'>
                <div className='landing-text'>
                    <h1 className='landing-h1'>Read. Watch. Review.</h1>
                </div>
                <h3 className='landing-h3'>An endless cycle.</h3>
                <img className='landing-image' src={Photo} alt='Landing'/>
            </div>
        </div>
    )
}

export default Landing;