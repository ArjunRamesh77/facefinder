import React from 'react';
import Logo from '../Logo/Logo';
import Rank from '../Rank/Rank';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import FaceFinder from '../FaceFinder/Facefinder';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          input: '',
          imageUrl: '',
          faceBoxes: [],
        }
      }
        
    calculateFaceLocation = (data) => {
        const faces = data.outputs[0].data.regions;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);

        return faces.map(faceObj => {
            const face = faceObj.region_info.bounding_box;

            console.log(face);

            return {
                    leftCol: face.left_col * width,
                    topRow: face.top_row * height,
                    rightCol: width - (face.right_col * width),
                    bottomRow: height - (face.bottom_row * height),
                }
            }
        );     
    }

    displayFaceBox = (boxes) => {
        this.setState({faceBoxes: boxes});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    updateEntries = () => {
        fetch('https://vast-taiga-63527.herokuapp.com/image', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: this.props.user.id,
            })
        })
        .then(resp => resp.json())
        .then(entries => {
            this.props.updateEntriesForUser(Number(entries));
        })
    }

    onSubmit = () => {
        console.log("WTCFDFFF", this.state.input);
        this.setState({imageUrl: this.state.input})

        fetch('https://vast-taiga-63527.herokuapp.com:3000/clarifai/image', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: this.state.input
            })
         })
         .then(res => res.json())
         .then(res => {
            this.displayFaceBox(this.calculateFaceLocation(res));
            this.updateEntries();
        })
        .catch(err => {

        })
    }
   
    render() {

        const {faceBoxes, imageUrl} = this.state;
        const {user} = this.props;

        return (
            <div> 
                <Logo />
                <Rank user={user}/>
                <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onSubmit={this.onSubmit} />
                <FaceFinder boxes={faceBoxes} imageUrl={imageUrl}/>             
            </div>
        )
    }
}

export default Home;