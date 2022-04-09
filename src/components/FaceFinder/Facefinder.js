import React from 'react';
import './FaceFinder.css';

const FaceFinder = ({imageUrl, boxes}) => {

    return (
        <div>
            <div>
                <h2>Found {boxes.length} faces</h2>
            </div>
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img id='inputImage' alt="" src={imageUrl} width='500px' height='auto'/>

                    {boxes.map(box => <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>)}           
                </div>   
            </div>              
        </div>
    )
}

export default FaceFinder;