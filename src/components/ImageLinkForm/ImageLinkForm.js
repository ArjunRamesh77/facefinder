import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onSubmit}) => {

    console.log("booya")

    return (
        <div>
            <p className='f3'>
                {'This will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center form'>
                <div className='center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type="text" onChange={onInputChange}></input>
                    <button className='w-30 grow f4 link ph3 pv2 dib bg-light-purple' onClick={onSubmit}>Detect</button>
                </div>              
            </div>
        </div>
    )
}

export default ImageLinkForm;