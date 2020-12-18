import React from 'react';
// import Tilt from 'react-tilt';
import brain from './brain.png';

import './Logo.css';


const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <div className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner"> 
                    <img style={{paddingTop:'15px' ,width: '70px', height: '70px'}} alt='logo' src={brain}/> 
                </div>
            </div>
        </div>
    );
}
export default Logo;