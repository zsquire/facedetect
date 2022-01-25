import React, { Component } from "react";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import Rank from "./components/Rank/Rank"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import './App.css';


const app = new Clarifai.App({
  //ADD KEY TO BACKEND
  apiKey: ""
})

class App extends Component {
  state = {
    input: '',
    imageUrl: ''
  }
  onInputChange = (e) => {
    console.log(e.target.value)
    this.setState({ input: e.target.value })
  }

  onSubmit = () => {
    console.log("clicked")
    this.setState({ imageUrl: this.state.input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(
        function (response) {
          console.log(response.outputs[0].data.regions[1].region_info.bounding_box)
        },
        function (err) { }
      )
  }

  render() {
    return (
      <div>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>

    )
  }
}

export default App;
