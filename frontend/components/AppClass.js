import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  x: 2,
  y: 2,
  steps: initialSteps,
  email: initialEmail,
  message: initialMessage,
  index: initialIndex,
  
}
const coordinates = [[1,1],[2,1],[3,1],[1,2],[2,2],[3,2],[1,3],[2,3],[3,3]]
export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = {
      ...initialState
    }    
  }
  upArrow = (e) => {
    e.preventDefault()
    if(this.state.index === 0 || this.state.index === 1 || this.state.index === 2){
      this.setState({message: "You can't go up"})
    }
    this.setState({
      index: this.state.index-3,
      y: this.state.y-1,
      steps: this.state.steps + 1})
  }
  
  downArrow = (e) => {
    e.preventDefault()
    if(this.state.index === 6 || this.state.index === 7 || this.state.index === 8){
      this.setState({message: "You can't go down"})
    }else
    this.setState({
      index:this.state.index+3,
      x: this.state.x+1,
      steps: this.state.steps + 1,
      message: ""
    })
  }

  leftArrow = (e) => {
    e.preventDefault()
    if(this.state.index === 0 || this.state.index === 3 || this.state.index === 6){
      this.setState({message: "You can't go left"})
    } else
    this.setState({
      index:this.state.index-1,
      x: this.state.x-1,
      steps: this.state.steps + 1,
      message: ""
    })
  }

  rightArrow = (e) => {
    e.preventDefault()
    if(this.state.index === 2 || this.state.index === 5 || this.state.index === 8){
      this.setState({message: "You can't go right"})
    }
    else
    this.setState({
      index:this.state.index+1,
      x: this.state.x+1,
      steps: this.state.steps + 1,
      message: ""
    })
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    // use if statements for coordinates or try to find an easier way
    
    
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    // use string interpolation
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
      ...initialState
    })
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    // hook to all buttons except reset
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    evt.preventDefault()
    this.setState({email: evt.target.value})
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    // http://localhost:9000/api/result
    evt.preventDefault()
    this.setState({
      x: this.state.x,
      y: this.state.y,
      steps: this.state.steps,
      email: this.state.email
    })
    console.log(this.state);
    const request = {x: this.state.x, y: this.state.y, steps: this.state.steps, email: this.state.email}
    axios.post("http://localhost:9000/api/result", request)
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          {/* add onclicks to all buttons and feed in the event */}
          <button onClick={this.leftArrow} id="left">LEFT</button>
          <button onClick={this.upArrow} id="up">UP</button>
          <button onClick={this.rightArrow }id="right">RIGHT</button>
          <button onClick={this.downArrow} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
