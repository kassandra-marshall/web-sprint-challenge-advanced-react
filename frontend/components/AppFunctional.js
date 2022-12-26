import React, { useState } from 'react'
import axios from 'axios'
/**
 * 4. figure out how to change times to time for a single step
 */
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  
  const [values, setValues] = useState({
    message: initialMessage,
    email: initialEmail,
    steps: initialSteps,
    index: initialIndex,
    x: 2,
    y: 2
  })
  const upArrow = (e) => {
    e.preventDefault()
    if(values.y <= 1){
      console.log("click")
      setValues({ ...values, 
        message: "You can't go up"
      })
    }else
    setValues({ ...values,
      index: values.index - 3,
      y: values.y - 1,
      steps: values.steps + 1,
      message: ""
    })
  }
  const downArrow = (e) => {
    e.preventDefault()
    if(values.y >= 3){
      setValues({...values,
        message: "You can't go down"})
    }else
    setValues({
      index: values.index + 3,
      x: values.x,
      y: values.y + 1,
      steps: values.steps + 1,
      message: ""
    })
  }
  const leftArrow = (e) => {
    e.preventDefault()
    if(values.x <= 1){
      setValues({...values,
        message: "You can't go left"})
    }else
    setValues({
      index: values.index - 1,
      x: values.x - 1,
      y: values.y,
      steps: values.steps + 1,
      message: ""
    })
  }
  const rightArrow = (e) => {
    e.preventDefault(e)
    if(values.x >= 3){
      setValues({...values,
        message: "You can't go right"})
    }else
    setValues({
      index: values.index + 1,
      x: values.x + 1,
      y: values.y,
      steps: values.steps + 1,
      message: ""
    })
  }
  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setValues({
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
      x: 2,
      y: 2
    })
    const inputField = document.querySelector("#email");
    inputField.value = ""
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setValues({...values,
      email: evt.target.value})
  }

  function onSubmit(evt) {
    evt.preventDefault()
    const request = {x: values.x, y: values.y, steps: values.steps, email: values.email}
    // Use a POST request to send a payload to the server.
    axios.post("http://localhost:9000/api/result", request)
    .then(res => setValues({...values, message: res.data.message}))
    .catch(err => setValues({...values, message: err.response.data.message}))
    const inputField = document.querySelector("#email");
    inputField.value = ""
    setValues({
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
      x: 2,
      y: 2
    }) 
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({values.x}, {values.y})</h3>
        {/* KM: figure out how to change times to time for a single step */}
        <h3 id="steps">You moved {values.steps === 1 ? `${values.steps} time`: `${values.steps} times`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === values.index ? ' active' : ''}`}>
              {idx === values.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{values.message}</h3>
      </div>
      <div id="keypad">
        <button onClick={leftArrow} id="left">LEFT</button>
        <button onClick={upArrow} id="up">UP</button>
        <button onClick={rightArrow} id="right">RIGHT</button>
        <button onClick={downArrow} id="down">DOWN</button>
        <button onClick ={reset}id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
