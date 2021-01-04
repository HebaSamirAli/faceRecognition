
import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import './App.css';

// const serverURL = 'https://vast-island-73881.herokuapp.com';

const app = new Clarifai.App({
  apiKey:'86c2d8d007e94bf696b9249bd39bae64'
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200
      }
    }
  }
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      input:'',
      imageUrl:'',
      modelID1:'d02b4508df58432fbb84e800597b8959',
      modelID2:'c0c0ac362b03416da06ab3fa36fb58e3',
      box:{},
      route: 'signin',
      isSignedIn:false,

      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined : ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined : data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
 
  displayFaceBox = (box) => {
    this.setState({box:box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }


  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
          this.state.input)
        .then(response => { 
          if (response){
            
            fetch('https://face-recognition-detection-api.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
              .then(response => response.json())
              .then(count => { this.setState(Object.assign(this.state.user, { entries: count })) 
              })
          }
          this.displayFaceBox(this.calculateFaceLocation(response)) 
        })
        .catch(err => console.log(err));    
  }

  onRouteChange = (route) => {
    this.setState( {route : route} );
    if(route === 'home'){
      this.setState({isSignedIn:true});
    }else {
      this.setState({isSignedIn:false});
    }
  }
  
  render(){
    const { isSignedIn, imageUrl , route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
              params={particlesOptions}
            />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {
          route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition imageUrl={imageUrl} box={box}/>
            </div>
          :(
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
        }
      </div>
    );
  }
}

export default App;
