import React from 'react'


const Inputs = (props) => {

      function qTitleInput (event) {
        if (event.target.value !== localStorage.getItem('questionsTitle')) 
          localStorage.setItem('questionsTitle', event.target.value)
      }
    
      function q1Input (event) {
        if (event.target.value !== localStorage.getItem('Question1')) 
          localStorage.setItem('Question1', event.target.value)
      }
    
      function q2Input (event) {
        if (event.target.value !== localStorage.getItem('Question2')) 
          localStorage.setItem('Question2', event.target.value)
      }
    
      function q3Input (event) {
        if (event.target.value !== localStorage.getItem('Question3')) 
          localStorage.setItem('Question3', event.target.value)
      }
    
      function q4Input (event) {
        if (event.target.value !== localStorage.getItem('Question4')) 
          localStorage.setItem('Question4', event.target.value)
      };
    
    
    return (
        <div style={{display: `${props.display}`}}>
            <p>Questions Title:<br /><span style={{color: 'red'}}>{props.questionsTitle}</span></p>
            <input type='text' placeholder='Translation of red text goes here...' onChange={qTitleInput} style={{border: 'solid 0.5px black', width: '80%', height: '15px'}}/>
            <br />
            <hr />
            <p>Question #1:<br /><span style={{color: 'red'}}>{props.Question1}</span></p>
            <input type='text' placeholder='Translation of red text goes here...' onChange={q1Input} style={{border: 'solid 0.5px black', width: '80%', height: '15px'}}/>
            <br />
            <hr />
            <p>Question #2:<br /><span style={{color: 'red'}}>{props.Question2}</span></p>
            <input type='text' placeholder='Translation of red text goes here...' onChange={q2Input} style={{border: 'solid 0.5px black', width: '80%', height: '15px'}}/>
            <br />
            <hr />
            <p>Question #3:<br /><span style={{color: 'red'}}>{props.Question3}</span></p>
            <input type='text' placeholder='Translation of red text goes here...' onChange={q3Input} style={{border: 'solid 0.5px black', width: '80%', height: '15px'}}/>
            <br />
            <hr />
            <p>Question #4:<br /><span style={{color: 'red'}}>{props.Question4}</span></p>
            <input type='text' placeholder='Translation of red text goes here...' onChange={q4Input} style={{border: 'solid 0.5px black', width: '80%', height: '15px'}}/>
            <br />
        </div>
    )
    
}

export default Inputs;