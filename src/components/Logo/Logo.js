import React from 'react';
import Tilt from 'react-parallax-tilt';
import LogoImage from './Logo.png';
import './Logo.css';

const Logo = () => {

    return (
        <div className='ma4 mt0'>
            <Tilt>
                <div className='Tilt br2 shadow-2' style={{ height: '100px', width: '100px'}}>
                    <img alt='' style={{paddingTop: '20px'}} src={LogoImage}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;